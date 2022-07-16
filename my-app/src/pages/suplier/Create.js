import React, { useState } from "react";
import { Container, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import swal from "sweetalert2";

export default function Create() {
  const navigate = useNavigate();
  const [namaSuplier, setNama] = useState("");
  const [alamatSuplier, setAlamat] = useState("");
  const [telpSuplier, setTelp] = useState("");
  const [errorValidate, setError] = useState("");

  const formData = new FormData();
  formData.append("namasuplier", namaSuplier);
  formData.append("alamatsuplier", alamatSuplier);
  formData.append("telpsuplier", telpSuplier);

  const createSuplier = async (e) => {
    e.preventDefault();
    await axios
      .post(`http://127.0.0.1:8000/api/suplier/create`, formData)
      .then(function (response) {
        swal.fire("Success?", "Data berhasil ditambah", "success");
        navigate("/suplier");
        // console.log(response);
      })
      .catch(function (error) {
        setError(error.response.data.errors);
        // console.log(error.response.data.errors.alamatsuplier);
      });
  };

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
          <Form onSubmit={createSuplier}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Nama Suplier</Form.Label>
              <Form.Control
                type="text"
                value={namaSuplier}
                onChange={(event) => {
                  setNama(event.target.value);
                }}
              />
               <span className="text-danger">{errorValidate.namasuplier}</span>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Telp Suplier</Form.Label>
              <Form.Control
                type="text"
                value={telpSuplier}
                onChange={(event) => {
                  setTelp(event.target.value);
                }}
              />
               <span className="text-danger">{errorValidate.telpsuplier}</span>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Alamat Supplier</Form.Label>
              <Form.Control
                type="text"
                value={alamatSuplier}
                onChange={(event) => {
                  setAlamat(event.target.value);
                }}
              />
              <span className="text-danger">{errorValidate.alamatsuplier}</span>
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
