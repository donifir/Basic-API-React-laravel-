import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [barangs, setBarang] = useState([]);

  async function getBarangs() {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/barang/${id}`
      );
      setBarang(response.data.data);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  const deleteProduct = async (id) => {
    await axios
      .delete(`http://localhost:8000/api/barang/${id}`)
      .then(({ data }) => {
        Swal.fire({
          icon: "success",
          text: data.message,
        });
        navigate("/barang");
      })
      .catch(({ response: { data } }) => {
        Swal.fire({
          text: data.message,
          icon: "error",
        });
      });
  };

  useEffect(() => {
    getBarangs();
  }, [id]);

  return (
    <div className="container pt-3">
      <div className="card">
        <div className="card-header">
          header
          <Link
            to="/barang"
            className="btn btn-primary btn-sm float-end"
            role="button"
          >
            Back
          </Link>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-4">
              <div className="card">
                <div className="card-body">
                  <img
                    src={`http://localhost:8000/image/${barangs.gambar}`}
                    class="img-fluid"
                    alt="..."
                  />
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card">
                <div className="card-body">
                  <div className="row mb-3">
                    <div className="col-3">Nama Barang</div>
                    <div className="col-1">:</div>
                    <div className="col">{barangs.nama_barang}</div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-3">Suplier</div>
                    <div className="col-1">:</div>
                    <div className="col">{barangs.nama_suplier}</div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-3">Harga</div>
                    <div className="col-1">:</div>
                    <div className="col">{barangs.harga}</div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-3">Stok</div>
                    <div className="col-1">:</div>
                    <div className="col">{barangs.stok}</div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-3">Keterangan</div>
                    <div className="col-1">:</div>
                    <div className="col">{barangs.keterangan}</div>
                  </div>
                </div>
                <div className="card-footer">
                  <div class="d-grid gap-2 d-md-block text-center">
                    <div class="row">
                      <div class="col">
                        <Link
                          to={`/barang/${barangs.id}/edit`}
                          className="btn btn-primary btn-sm"
                          role="button"
                        >
                          Edit
                        </Link>
                      </div>
                      <div class="col">
                        <button
                          type="button"
                          class="btn btn-danger btn-sm"
                          onClick={() => deleteProduct(barangs.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
