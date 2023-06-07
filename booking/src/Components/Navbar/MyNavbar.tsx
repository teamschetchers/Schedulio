import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { useDispatch, useSelector } from "react-redux";
import { signout } from "../../Redux/Admin/admin.actions";

function MyNavbar() {
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(signout() as any);
  };
  const user = useSelector((state: any) => state?.login?.userInfo);
  return (
    <Navbar expand="lg" style={{ backgroundColor: "#dedfe0" }}>
      <Container fluid>
        <Navbar.Brand href="/">Services </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            {/* <Nav.Link href="/">Services</Nav.Link> */}

            {user && user.role === "admin" && (
              <Nav.Link href="/admin">Admin</Nav.Link>
            )}
            {user && user.role === "user" && (
              <Nav.Link href="/bookings">Booking</Nav.Link>
            )}
          </Nav>
          <Nav.Link onClick={handleLogOut}>Logout</Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
