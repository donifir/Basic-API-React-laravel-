import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Suplier() {
  const [loading, setLoading] = useState(true);
  const [supliers, setSuplier] = useState([]);

  const getSuplier = async () => {
    try {
      let response = await axios.get(`http://127.0.0.1:8000/api/suplier`);
      setSuplier(response.data.response);
      setLoading(false);
      console.log(response.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    getSuplier();
  }, []);

  return (
    <Container className="pt-4">
      <Card>
        <Card.Header>
          List Suplier
          <Link
            to="/suplier/create"
            className="btn btn-primary btn-sm float-end"
            role="button"
          >
            Create
          </Link>
        </Card.Header>
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
                  <th>Nama Suplier</th>
                  <th>Telp Suplier</th>
                  <th>Alamat Suplier</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {supliers.map((sup, index) => {
                  var num = index + 1;
                  return (
                    <tr key={index}>
                      <td>{num++}</td>
                      <td>{sup.nama_suplier}</td>
                      <td>{sup.telp_suplier}</td>
                      <td>{sup.alamat_suplier}</td>
                      <td>
                        <div className="text-center">
                          <Link
                            to={`/suplier/${sup.id}`}
                            className="btn btn-success btn-sm"
                            role="button"
                          >
                            Detail
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}
