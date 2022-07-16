import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function Edit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [telp, setTelp] = useState("");

  async function getSuplier() {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/suplier/${id}`
      );

      setNama(response.data.data.nama_suplier);
      setAlamat(response.data.data.alamat_suplier);
      setTelp(response.data.data.telp_suplier);
      setLoading(false);
      //   console.log(response.data.data);
    } catch (error) {
      console.error(error);
    }
  }

  const updateSuplier = async (e) => {
    const formData = new FormData();
    formData.append("namasuplier", nama);
    formData.append("alamatsuplier", alamat);
    formData.append("telpsuplier", telp);

    e.preventDefault();
    await axios
      .post(`http://127.0.0.1:8000/api/suplier/${id}/edit`, formData)
      .then(function (response) {
        Swal.fire("Success?", "Data berhasil diubah", "success");
        navigate("/suplier");
        console.log(response);
      })
      .catch(function (error) {
        // setError(error.response.data.errors);
        console.log(error.response);
      });
  };

  useEffect(() => {
    getSuplier();
  }, []);

  return (
    <Container className="pt-4">
      <Card>
        <Card.Header>
          Create Suplier
          <Link
            to="/suplier"
            className="btn btn-primary btn-sm float-end"
            role="button"
          >
            Home
          </Link>
        </Card.Header>

        <Card.Body>
          <Form onSubmit={updateSuplier}>
            <Form.Group className="mb-3" controlId="nama">
              <Form.Label>Nama Suplier</Form.Label>
              <Form.Control
                type="text"
                value={nama}
                onChange={(event) => {
                  setNama(event.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="telp">
              <Form.Label>Telp Suplier</Form.Label>
              <Form.Control
                type="text"
                value={telp}
                onChange={(event) => {
                  setTelp(event.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="alamat">
              <Form.Label>Alamat Suplier</Form.Label>
              <Form.Control
                type="text"
                value={alamat}
                onChange={(event) => {
                  setAlamat(event.target.value);
                }}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
