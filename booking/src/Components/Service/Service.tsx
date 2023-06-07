import { Key } from "react";
import ServiceCard from "../Service-Card/Service-Card";
import "./Service.css";

const Service = ({ array, handleBookingClick, title, text }) =>
  array && (
    <div className="mb-5 div d-flex flex-column">
      <h3>{title}</h3>
      <span>{text}</span>
      <div
        style={{
          width: "90%",
          margin: "0 auto",
          marginTop: "20px",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {array?.map(
          (
            listing: {
              _id: any;
              image: any;
              name: any;
              location: any;
              startTime: any;
              endTime: any;
            },
            index: Key
          ) => (
            <ServiceCard
              id={listing?._id}
              key={index}
              imageUrl={listing?.image}
              name={listing?.name}
              location={listing?.location}
              onBookingClick={handleBookingClick}
              startTime={listing?.startTime}
              endTime={listing?.endTime}
            />
          )
        )}
      </div>
    </div>
  );

export default Service;
