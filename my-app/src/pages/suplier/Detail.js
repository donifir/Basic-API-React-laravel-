import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function Detail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [suplier, setSuplier] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getSuplier() {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/suplier/${id}`
      );
      setSuplier(response.data.data);
      setLoading(false);
      //   console.log(response.data.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getSuplier();
  }, []);

  const deleteProduct = async (id) => {
    const isConfirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      return result.isConfirmed;
    });

    if (!isConfirm) {
      return;
    }

    await axios
      .delete(`http://localhost:8000/api/suplier/${id}`)
      .then(({ data }) => {
        Swal.fire({
          icon: "success",
          text: data.message,
        });
        // getBarang();
        navigate("/suplier");
      })
      .catch(({ response: { data } }) => {
        Swal.fire({
          text: data.message,
          icon: "error",
        });
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
          {loading ? (
            <div className="d-flex justify-content-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <>
              <div className="row mb-3">
                <div className="col-3">Nama Suplier</div>
                <div className="col-1">:</div>
                <div className="col">{suplier.nama_suplier}</div>
              </div>
              <div className="row mb-3">
                <div className="col-3">Telp Suplier</div>
                <div className="col-1">:</div>
                <div className="col">{suplier.telp_suplier}</div>
              </div>
              <div className="row mb-3">
                <div className="col-3">Alamat Suplier</div>
                <div className="col-1">:</div>
                <div className="col">{suplier.alamat_suplier}</div>
              </div>
            </>
          )}
        </Card.Body>
        <Card.Footer>
          <div className="row">
            <div className="col-4 text-center">
              <Link
                to={`/suplier/${suplier.id}/edit`}
                className="btn btn-primary btn-sm"
                role="button"
              >
                Edit
              </Link>
            </div>
            <div className="col text-center">
              <button
                type="button"
                class="btn btn-danger btn-sm"
                onClick={() => deleteProduct(suplier.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </Card.Footer>
      </Card>
    </Container>
  );
}
