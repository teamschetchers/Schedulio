import { useLocation } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Alert, Button } from "@mui/material";
import { FormControl, FormLabel } from "@mui/joy";
import TextField from "@mui/material/TextField";

// import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { bookedSlots, createBooking } from "../../Redux/Admin/admin.actions";

const ServiceDetail = () => {
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [allSlots, setAllSlots] = useState([]);

  const location = useLocation();
  const data = location.state;

  const slots = useSelector((state: any) => state?.admin?.slots);
  console.log("slots", slots);
  useEffect(() => {
    dispatch(bookedSlots(data.id) as any);
  }, []);
  useEffect(() => {
    setAllSlots(slots);
  }, [slots]);
  return (
    <>
      <div style={{ width: "80%", margin: "0 auto", marginTop: "30px" }}>
        <div className="d-flex flex-column">
          <div className="mt-3 mb-3 d-flex flex-column align-items-center justify-content-center">
            <h4>{data?.name}</h4>
            <div className="d-flex align-items-center">
              <LocationOnIcon sx={{ marginRight: 1, color: "#38C2E0" }} />
              <span>{data.location}</span>
            </div>
          </div>
          <div className="mt-3 d-flex justify-content-between">
            <img style={{ width: "50%" }} src={data.imageUrl.url} alt="" />

            <div
              className="w-50 d-flex flex-column"
              style={{ marginLeft: "30px" }}
            >
              <h5>Working Hours</h5>
              <span>
                {data.startTime === "00:00"
                  ? "12:00 am"
                  : data.startTime === "12:00"
                  ? "12:00 pm"
                  : data.startTime > "12:00"
                  ? `${data.startTime} pm`
                  : `${data.startTime} am`}
                {" - "}

                {data.endTime === "00:00"
                  ? "12:00 am"
                  : data.endTime === "12:00"
                  ? "12:00 pm"
                  : data.endTime > "12:00"
                  ? `${data.endTime} pm`
                  : `${data.endTime} am`}
              </span>
              <div className="mt-4">
                <h5>Booked Slots</h5>
                <span>{allSlots?.length === 0 && "none"}</span>
                <div>
                  <div className="d-flex flex-column">
                    {allSlots?.map((d) => (
                      <span>
                        {d.bookingStartTime === "00:00"
                          ? "12:00 am"
                          : d.bookingStartTime === "12:00"
                          ? "12:00 pm"
                          : d.bookingStartTime > "12:00"
                          ? `${d.bookingStartTime} pm`
                          : `${d.bookingStartTime} am`}
                        {" - "}

                        {d.bookingEndTime === "00:00"
                          ? "12:00 am"
                          : d.bookingEndTime === "12:00"
                          ? "12:00 pm"
                          : d.bookingEndTime > "12:00"
                          ? `${d.bookingEndTime} pm`
                          : `${d.bookingEndTime} am`}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <h5>Available Slots</h5>
                <span>
                  All Slots are available{" "}
                  {allSlots?.length !== 0 && "except booked slots"}
                </span>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <Button
              onClick={() => setModalShow(true)}
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
              Book now
            </Button>
          </div>
        </div>
      </div>
      <MyVerticallyCenteredModal
        show={modalShow}
        id={data.id}
        setStartTime={setStartTime}
        startTime={startTime}
        setEndTime={setEndTime}
        endTime={endTime}
        bookingStartTime={data.startTime}
        bookingEndTime={data.endTime}
        allSlots={allSlots}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};

function MyVerticallyCenteredModal(props) {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state?.login?.userInfo);
  const bookNow = () => {
    function diffMinutes(x: Date, y: Date) {
      return (y.getTime() - x.getTime()) / 1000 / 60;
    }
    function convertTimeToMinutes(time) {
      const [, hh, mm] = time.match(/(\d{2}):(\d{2})/);
      const minutes = parseInt(hh, 10) * 60 + parseInt(mm, 10);
      return minutes;
    }

    if (
      props.startTime >= props.bookingStartTime &&
      props.startTime <= props.bookingEndTime &&
      props.endTime >= props.bookingStartTime &&
      props.endTime <= props.bookingEndTime &&
      props.startTime < props.endTime
    ) {
      var a = new Date();
      var b = new Date();
      a.setHours(props.startTime.split(":")[0], props.startTime.split(":")[1]);
      b.setHours(props.endTime.split(":")[0], props.endTime.split(":")[1]);

      let minutes = diffMinutes(a, b);
      if (minutes < 30) {
        toast.error("Booking Time cannot be less than 30 minutes", {
          autoClose: 3000,
        });
      } else {
        const res = props?.allSlots?.find(
          (slot) =>
            (convertTimeToMinutes(props.startTime) >
              convertTimeToMinutes(slot.bookingStartTime) &&
              convertTimeToMinutes(props.startTime) <
                convertTimeToMinutes(slot.bookingEndTime)) ||
            (convertTimeToMinutes(props.endTime) >
              convertTimeToMinutes(slot.bookingStartTime) &&
              convertTimeToMinutes(props.endTime) <
                convertTimeToMinutes(slot.bookingEndTime)) ||
            (convertTimeToMinutes(props.startTime) <
              convertTimeToMinutes(slot.bookingStartTime) &&
              convertTimeToMinutes(props.endTime) >
                convertTimeToMinutes(slot.bookingEndTime))
        );

        if (res) {
          toast.error("Cant Book in already Booked Slot", {
            autoClose: 3000,
          });
        } else {
          dispatch(
            createBooking(
              user._id,
              props.id,
              props.startTime,
              props.endTime
            ) as any
          );
        }
      }
    } else {
      toast.error("Booking Time must be between Working hours", {
        autoClose: 3000,
      });
    }
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <div className="row mb-2">
          <div className="col-md-6">
            <FormControl>
              <FormLabel>Booking Start Time</FormLabel>
              <TextField
                margin="normal"
                required
                fullWidth
                id="startTime"
                name="startTime"
                type="time"
                value={props.startTime}
                onChange={(e) => props.setStartTime(e.target.value)}
              />
            </FormControl>
          </div>

          <div className="col-md-6">
            <FormControl>
              <FormLabel>Booking End Time</FormLabel>
              <TextField
                margin="normal"
                required
                fullWidth
                name="endTime"
                type="time"
                id="endTime"
                value={props.endTime}
                onChange={(e) => props.setEndTime(e.target.value)}
              />
            </FormControl>
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <Button
            onClick={bookNow}
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
            Book now
          </Button>
        </div>
      </Modal.Body>

      {/* <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}

      <ToastContainer />
    </Modal>
  );
}

export default ServiceDetail;
