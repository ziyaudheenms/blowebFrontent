import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from './Logo.png'
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
function Bar() {
  return (
    <Navbar expand="lg" className="bg-dark">
      <Container fluid>
        <Navbar.Brand href="#" className="text-light jersey-25-regular">
          <h1 className="Head fs-1 text-center">Bloweb</h1>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" className="bg-light"/>
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="ms-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Link to='/home' style={{
            textDecoration:'none'
          }}>
            <Nav.Link href="/" className="fs-5 text-light fw-lighter" style={{
              textDecoration:'none'
            }}>
              Home
            </Nav.Link>
            </Link>
            <NavLink to='/Profile' style={{
            textDecoration:'none'
          }}>
            <Nav.Link href="/Profile" className="fs-5 text-light fw-lighter">
              Profile
            </Nav.Link>
            </NavLink>
            <NavLink to='/Create' style={{
            textDecoration:'none'
          }}>
            <Nav.Link href="/Create" className="fs-5 text-light fw-lighter">
              Create
            </Nav.Link>
            </NavLink>
            <NavLink to='/Users' style={{
            textDecoration:'none'
          }}>
            <Nav.Link href="/Users" className="fs-5 text-light fw-lighter">
              Users
            </Nav.Link>
            </NavLink>
          </Nav>
          <NavLink to='/' style={{
            textDecoration:'none'
          }}>
          <Button variant="outline-danger" className="mx-2 fs-5 btn">
            Login
          </Button>
          </NavLink>
          <NavLink to='/SignUp' style={{
            textDecoration:'none'
          }}>
          <Button variant="outline-primary" className="fs-5 btn">
            SignUp
          </Button>
          </NavLink>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Bar;
