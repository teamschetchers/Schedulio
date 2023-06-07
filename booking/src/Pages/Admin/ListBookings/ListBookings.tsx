import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector, useDispatch } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { TablePagination } from "@mui/material";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import {
  getAllAdminBookings,
  updateStatus,
} from "../../../Redux/Admin/admin.actions";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ListBookings = () => {
  const [page, setPage] = useState(0);
  const [booking, setBookings] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const dispatch = useDispatch();

  const bookings = useSelector((state: any) => state?.admin?.allBookings);

  const user = useSelector((state: any) => state?.login?.userInfo);
  console.log("bookings", bookings);

  useEffect(() => {
    dispatch(getAllAdminBookings() as any);
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    setBookings(bookings);
  }, [bookings]);

  const changeBookingStatus = (serviceId, status) => {
    dispatch(updateStatus(serviceId, status) as any);
  };

  return (
    <>
      <div
        className="mt-3"
        style={{
          display: "flex",
          flexDirection: "column",
          width: "85%",
          margin: "0 auto",
        }}
      >
        <div className="mb-3 d-flex justify-content-between">
          <h3>New Bookings</h3>
        </div>
        <div className="events">
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              aria-label="simple table"
              table-layout="fixed"
            >
              <TableHead>
                <TableRow>
                  <TableCell white-space="nowrap">Title</TableCell>
                  <TableCell white-space="nowrap">Service</TableCell>
                  <TableCell white-space="nowrap">Location</TableCell>
                  <TableCell align="right" white-space="nowrap">
                    Start Time
                  </TableCell>
                  <TableCell align="right" white-space="nowrap">
                    End Time
                  </TableCell>
                  <TableCell white-space="nowrap">Status</TableCell>

                  <TableCell align="right" white-space="nowrap" component="div">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {booking
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  ?.map((s) => (
                    <TableRow
                      key={s._id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {s?.serviceDetails?.name}
                      </TableCell>
                      <TableCell white-space="nowrap">
                        {s?.serviceDetails?.category}
                      </TableCell>
                      <TableCell white-space="nowrap">
                        {s?.serviceDetails?.location}
                      </TableCell>
                      <TableCell align="right" white-space="nowrap">
                        {s?.bookingStartTime === "00:00"
                          ? "12:00 am"
                          : s?.bookingStartTime === "12:00"
                          ? "12:00 pm"
                          : s?.bookingStartTime > "12:00"
                          ? `${s?.bookingStartTime} pm`
                          : `${s?.bookingStartTime} am`}
                      </TableCell>
                      <TableCell align="right" white-space="nowrap">
                        {s?.bookingEndTime === "00:00"
                          ? "12:00 am"
                          : s?.bookingEndTime === "12:00"
                          ? "12:00 pm"
                          : s?.bookingEndTime > "12:00"
                          ? `${s?.bookingEndTime} pm`
                          : `${s?.bookingEndTime} am`}
                      </TableCell>
                      <TableCell white-space="nowrap">{s?.status}</TableCell>
                      <TableCell align="right" white-space="nowrap">
                        {(s?.status === "pending" ||
                          s?.status === "waiting") && (
                          <>
                            <Button
                              className="mb-2"
                              type="submit"
                              variant={`success`}
                              onClick={() =>
                                changeBookingStatus(s?._id, "accepted")
                              }
                            >
                              Accept
                            </Button>

                            <Button
                              className="mb-2"
                              style={{ marginLeft: "10px" }}
                              type="submit"
                              variant={`danger`}
                              onClick={() =>
                                changeBookingStatus(s?._id, "rejected")
                              }
                            >
                              Reject
                            </Button>
                          </>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={booking?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </div>
    </>
  );
};

export default ListBookings;
