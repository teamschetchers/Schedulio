import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Services from "./Pages/Services/services";
import Auth from "./Pages/Auth/Auth";
import AdminPanel from "./Pages/Admin/Admin";
import { useSelector } from "react-redux";
import UpdateService from "./Pages/Admin/UpdateService/UpdateService";
import ServiceDetail from "./Pages/Details/Details";
import MyNavbar from "./Components/Navbar/MyNavbar";
import Bookings from "./Pages/Booking/Booking";
import ListBookings from "./Pages/Admin/ListBookings/ListBookings";
import ListAllBookings from "./Pages/Admin/ListAllBookings/ListAllBookings";

function App() {
  const user = useSelector((state: any) => state?.login?.userInfo);

  return (
    <BrowserRouter>
      {user && <MyNavbar />}
      {!user && <Navigate to="/auth" />}
      <Routes>
        <Route path="/auth" element={<Auth />} />
        {user && (
          <>
            <Route path="/" element={<Services />} />
            <Route path="/details/:id" element={<ServiceDetail />} />
            <Route path="/bookings" element={<Bookings />} />
          </>
        )}
        {user && user.role === "admin" && (
          <>
            <Route path="/" element={<Services />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/editService/:id" element={<UpdateService />} />
            <Route path="/details/:id" element={<ServiceDetail />} />
            <Route path="/bookings" element={<ListBookings />} />
            <Route path="/allbookings" element={<ListAllBookings />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
