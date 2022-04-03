import React from 'react'
import { Container, Navbar, Nav } from "react-bootstrap"
import "../Assets/css/NavbarHome.css"
export default function NavbarHome() {
    return (
        <div className="NavbarHome">
            <Navbar collapseOnSelect expand="lg" variant="dark" >
                <Container>
                    <Navbar.Brand href="/" >Vermeg</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                        </Nav>
                        <Nav>
                            <Nav.Link href="/sign-in" >Login</Nav.Link>
                            <Nav.Link eventKey={2} href="/sign-up" >SignUp</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}
