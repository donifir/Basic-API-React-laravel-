import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import ReactSelect from "react-select";


export default function Create() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [supliers, setSupliers] = useState([]);
  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState("");
  const [stok, setStok] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [gambar, setGambar] = useState("");
  const [suplier, setSuplier] = useState(null);
  const [suplierId, setSuplierId] = useState("");
  const [suplierNama, setSuplierNama] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);

  async function getBarang() {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/barang/${id}`
      );
      console.log(response.data.data.nama_suplier, "this barang");
      setNama(response.data.data.nama_barang);
      setHarga(response.data.data.harga);
      setStok(response.data.data.stok);
      setKeterangan(response.data.data.keterangan);
      setSuplier(response.data.data.id_suplier);
      setSuplierId(response.data.data.id_suplier);
      setSuplierNama(response.data.data.nama_suplier);
      // setGambar(response.data.data.gambar);
    } catch (error) {
      console.error(error);
    }
  }

  const getSuplier = async () => {
    try {
      let response = await axios.get(`http://127.0.0.1:8000/api/suplier`);
      setSupliers(response.data.response);
      setLoading(false);
      // console.log(response.data);
    } catch (e) {
      console.log(e.message);
    }
  };
  const imageHandler = (event) => {
    setGambar(event.target.files[0]);
  };

  const createBarang = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("nama_barang", nama);
    formData.append("harga", harga);
    formData.append("stok", stok);
    formData.append("keterangan", keterangan);
    formData.append("gambar", gambar);
    formData.append("suplier", suplier);

    axios
      .post(`http://localhost:8000/api/barang/${id}/update`, formData)
      .then(function (response) {
        navigate("/barang");
        // console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getSuplier();
    getBarang();
  }, [id]);

  return (
    <div className="container pt-3">
      <div className="card">
        <div className="card-header">
          Header{" "}
          <Link
            to="/barang"
            className="btn btn-primary btn-sm float-end"
            role="button"
          >
            Back
          </Link>
        </div>
        <div className="card-body">
          <form onSubmit={createBarang}>
            <div className="mb-3">
              <label htmlFor="nama" className="form-label">
                Nama Barang
              </label>
              <input
                type="text"
                className="form-control"
                id="nama"
                value={nama}
                onChange={(event) => {
                  setNama(event.target.value);
                }}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="harga" className="form-label">
                Harga
              </label>
              <input
                type="text"
                className="form-control"
                id="harga"
                value={harga}
                onChange={(event) => {
                  setHarga(event.target.value);
                }}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="stok" className="form-label">
                Stok
              </label>
              <input
                type="text"
                className="form-control"
                id="stok"
                value={stok}
                onChange={(event) => {
                  setStok(event.target.value);
                }}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="suplier" className="form-label">
                Suplier
              </label>
              <select
                defaultValue=""
                className="form-select"
                id="suplier"
                onChange={(event) => {
                  setSuplier(event.target.value);
                }}
              >
                <option value={suplierId} disabled>{suplierNama}</option>
                {supliers.map((suplier) => (
                  <option
                    key={suplier.id}
                    value={suplier.id}
                  >
                    {suplier.nama_suplier}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="keterangan" className="form-label">
                Keterangan
              </label>
              <input
                type="text"
                className="form-control"
                id="keterangan"
                value={keterangan}
                onChange={(event) => {
                  setKeterangan(event.target.value);
                }}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="gambar" className="form-label">
                Gambar
              </label>
              <input
                type="file"
                onChange={imageHandler}
                className="form-control"
                id="gambar"
              />

              {/* <img
                src={`http://localhost:8000/image/${gambar}`}
                class="img-fluid w-25 p-3"
                alt="..."
              /> */}
              {/* <span className="text-danger">{validationError.gambar}</span> */}
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
