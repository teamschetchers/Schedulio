import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const ServiceCard = ({
  id,
  imageUrl,
  name,
  location,
  onBookingClick,
  startTime,
  endTime,
}) => {
  return (
    <Link
      to={`/details/${id}`}
      state={{ id, imageUrl, name, location, startTime, endTime }}
    >
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "20rem",
          borderRadius: 5,
          marginRight: 5,
          marginBottom: 2,
        }}
      >
        <CardMedia
          component="img"
          sx={{ mt: 3, width: "90%", height: "200px", borderRadius: 5 }}
          image={imageUrl.url}
          alt={name}
        />
        <CardContent
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
            <LocationOnIcon sx={{ marginRight: 1, color: "#38C2E0" }} />
            {location}
          </Typography>
          <div className="d-flex align-items-center justify-content-center">
            <Button
              variant="contained"
              onClick={onBookingClick}
              sx={{ backgroundColor: "#38C2E0", mt: 3, width: "150px" }}
            >
              Book now
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ServiceCard;
