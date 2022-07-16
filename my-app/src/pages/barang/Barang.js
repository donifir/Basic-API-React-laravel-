import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Barang() {
  const [barangs, setBarangs] = useState([]);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getUser() {
    try {
      const response = await axios.get(" http://127.0.0.1:8000/api/barang");
      setBarangs(response.data.data);
      console.log(response.data.data);
      setLoading(false);
    } catch (error) {
      setErrors(error.response);
      console.error(error.response);
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header>
          List barang
          <Link
            to="/barang/create"
            className="btn btn-primary btn-sm float-end"
            role="button"
          >
            Create
          </Link>
        </Card.Header>

        {/* isi cardbody
        isi tabel */}
        <Card.Body>
          {loading ? (
            <div
              className="spinner-border text-primary position-relative start-50"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama Barang</th>
                  <th>Harga</th>
                  <th>Stok</th>
                  <th>Suplier</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {errors.status}
                {barangs.map((barang, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{barang.nama_barang}</td>
                    <td>{barang.harga}</td>
                    <td>{barang.stok}</td>
                    <td>{barang.nama_suplier}</td>
                    <td>
                      <Link
                        to={`/barang/${barang.id}`}
                        className="btn btn-primary btn-sm float-end"
                        role="button"
                      >
                        Detail
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}
