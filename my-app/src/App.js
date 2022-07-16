import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Suplier from "./pages/suplier/Suplier";
import SuplierCreate from "./pages/suplier/Create";
import Barang from "./pages/barang/Barang";
import NavbarComponent from "./component/navbarComponent";
import SuplierDetail from "./pages/suplier/Detail";
import SuplierEdit from "./pages/suplier/Edit";
import BarangCreate from "./pages/barang/Create";
import BarangDetail from "./pages/barang/Detail";
import BarangEdit from "./pages/barang/Edit";
import Dummy from "./pages/barang/Dummy";


export default function App() {
  return (
    <BrowserRouter>
      <NavbarComponent />
      <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/suplier" element={<Suplier />} />
          <Route path="/suplier/create" element={<SuplierCreate />} />
          <Route path="/suplier/:id" element={<SuplierDetail />} />
          <Route path="/suplier/:id/edit" element={<SuplierEdit />} />
          
          <Route path="/barang" element={<Barang />} />
          <Route path="/barang/create" element={<BarangCreate />} />
          <Route path="/barang/:id" element={<BarangDetail />} />
          <Route path="/barang/:id/edit" element={<BarangEdit />} />
          <Route path="/barang/dummy" element={<Dummy />} />

      </Routes>
    </BrowserRouter>
  );
}
