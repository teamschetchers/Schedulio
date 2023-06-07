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

import { TablePagination } from "@mui/material";
import { Link } from "react-router-dom";

import { getAllServices } from "../../../Redux/Admin/admin.actions";
import { useNavigate } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";

const ListServices = () => {
  const [page, setPage] = useState(0);
  const [service, setService] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const services = useSelector((state: any) => state?.admin?.services);
  console.log("services", services);
  // const eventDelete = useSelector((state) => state.admin);
  // const { events: allEvents, success } = eventDelete;

  useEffect(() => {
    dispatch(getAllServices() as any);
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    setService(services);
  }, [services]);

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
          <h3>Services</h3>
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
                    StartTime
                  </TableCell>
                  <TableCell align="right" white-space="nowrap">
                    EndTime
                  </TableCell>
                  <TableCell align="right" white-space="nowrap" component="div">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {service
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  ?.map((s) => (
                    <TableRow
                      key={s._id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {s.name}
                      </TableCell>
                      <TableCell white-space="nowrap">{s.category}</TableCell>
                      <TableCell white-space="nowrap">{s.location}</TableCell>
                      <TableCell align="right" white-space="nowrap">
                        {s.startTime === "00:00"
                          ? "12:00 am"
                          : s.startTime === "12:00"
                          ? "12:00 pm"
                          : s.startTime > "12:00"
                          ? `${s.startTime} pm`
                          : `${s.startTime} am`}
                      </TableCell>
                      <TableCell align="right" white-space="nowrap">
                        {s.endTime === "00:00"
                          ? "12:00 am"
                          : s.endTime === "12:00"
                          ? "12:00 pm"
                          : s.endTime > "12:00"
                          ? `${s.endTime} pm`
                          : `${s.endTime} am`}
                      </TableCell>
                      <TableCell align="right" white-space="nowrap">
                        <Link to={`/editService/${s._id}`} state={{ s }}>
                          <EditIcon />
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={service?.length}
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

export default ListServices;
