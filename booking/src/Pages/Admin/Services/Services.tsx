import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { FormControl, FormLabel } from "@mui/joy";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch } from "react-redux";
import { createNewService } from "../../../Redux/Admin/admin.actions";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Services = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [service, setServices] = useState("restaurant");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [file, setFile] = useState();

  const handleChange = (event: SelectChangeEvent) => {
    setServices(event.target.value as string);
  };

  const createService = (event) => {
    event.preventDefault();
    dispatch(
      createNewService(
        title,
        location,
        startTime,
        endTime,
        service,
        file && file[0],
        navigate
      ) as any
    );
  };

  return (
    <Box
      component="form"
      style={{ width: "80%", margin: "0 auto", marginTop: 20 }}
      onSubmit={createService}
      noValidate
    >
      <h4 className="text-center mb-5">Add New Service</h4>
      <div className="row mb-2">
        <div className="col-md-6">
          <FormControl>
            <FormLabel>Title</FormLabel>
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              name="title"
              placeholder="Chez Clement"
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormControl>
        </div>
        <div className="col-md-6">
          <FormControl>
            <FormLabel>Location</FormLabel>
            <TextField
              margin="normal"
              required
              fullWidth
              name="location"
              id="location"
              placeholder="Tartu mnt 54, Tallinn"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </FormControl>
        </div>
      </div>
      <div className="row mb-2">
        <div className="col-md-6">
          <FormControl>
            <FormLabel>Start Time</FormLabel>
            <TextField
              margin="normal"
              required
              fullWidth
              id="startTime"
              name="startTime"
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </FormControl>
        </div>

        <div className="col-md-6">
          <FormControl>
            <FormLabel>End Time</FormLabel>
            <TextField
              margin="normal"
              required
              fullWidth
              name="endTime"
              type="time"
              id="endTime"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </FormControl>
        </div>
      </div>
      <div className="row mb-2">
        <div className="col-md-6">
          <FormControl>
            <FormLabel>Services</FormLabel>
            <Select value={service} label="Service" onChange={handleChange}>
              <MenuItem value={"restaurant"}>Restaurant</MenuItem>
              <MenuItem value={"spa"}>SPA</MenuItem>
              <MenuItem value={"clinic"}>Dental Clinic</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="col-md-6">
          <FormControl>
            <FormLabel>Image</FormLabel>

            <input
              type="file"
              className="w-100"
              style={{
                border: "1px solid lightgray",
                padding: "13px 14px",
                borderRadius: "4px",
              }}
              onChange={(e) => setFile(e.target.files as any)}
            />
          </FormControl>
        </div>
      </div>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          type="submit"
          variant="contained"
          sx={{
            mt: 3,
            backgroundColor: "#38C2E0",
            width: "150px",
            height: "40px",
            display: "flex",
          }}
        >
          Create
        </Button>
      </Box>
      <ToastContainer />
    </Box>
  );
};

export default Services;
