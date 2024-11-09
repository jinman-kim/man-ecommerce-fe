// src/components/Navbar.js
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Navbar as BootstrapNavbar, Nav, Container } from "react-bootstrap";

function Navbar() {
  return (
    <BootstrapNavbar bg="dark" variant="dark" expand="lg">
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/">
          <img
            src="/man_tokki.png"
            alt="로고"
            width="30" // 이미지 너비
            height="30" // 이미지 높이
            className="d-inline-block align-top"
            style={{ marginRight: "8px" }} // 텍스트와 이미지 간격
          />
          만개장터
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" end>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/brand">
              Brand
            </Nav.Link>
            <Nav.Link as={NavLink} to="/community">
              Community
            </Nav.Link>
            <Nav.Link as={NavLink} to="/qna">
              Q&A
            </Nav.Link>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
}

export default Navbar;
