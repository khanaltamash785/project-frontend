import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";

function ColorSchemesExample() {
  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Ecommerce</Navbar.Brand>
          </LinkContainer>
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/about">
              <Nav.Link>About us</Nav.Link>
            </LinkContainer>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default ColorSchemesExample;
