import React, { useEffect, useState } from "react";
import { getAllServices } from "../../Redux/Admin/admin.actions";
import { useDispatch, useSelector } from "react-redux";
import "./services.css";
import Service from "../../Components/Service/Service";

const Services = () => {
  const [clinic, setClinic] = useState([]);
  const [restaurant, setRestaurant] = useState([]);
  const [spa, setSpa] = useState([]);
  const dispatch = useDispatch();
  const services = useSelector((state: any) => state?.admin?.services);
  useEffect(() => {
    dispatch(getAllServices() as any);
  }, []);

  useEffect(() => {
    const res = services?.filter((ser: any) => ser?.category === "restaurant");
    setRestaurant(res);
    const s = services?.filter((ser: any) => ser?.category === "spa");
    setSpa(s);
    const cli = services?.filter((ser: any) => ser?.category === "clinic");
    setClinic(cli);
  }, [services]);
  const handleBookingClick = () => {
    // handle booking click event
  };

  return (
    <div className="mt-4">
      <Service
        array={restaurant}
        title={"Hungry? Reserve a Table"}
        text={"Choose Restaurants Near You"}
        handleBookingClick={handleBookingClick}
      />

      <Service
        array={spa}
        title={"Relax at our Selection of Spas"}
        text={"Choose Spas Near You"}
        handleBookingClick={handleBookingClick}
      />

      <Service
        array={clinic}
        title={"Book Appointments"}
        text={"Choose Dental Clinics Near You"}
        handleBookingClick={handleBookingClick}
      />
    </div>
  );
};

export default Services;
