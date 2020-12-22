import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

// To show up once you signed in.
const authenticatedOptions = (
  <Fragment>
    <Nav.Link href="#change-password">Change Password</Nav.Link>
    <Nav.Link href="#sign-out">Sign Out</Nav.Link>
    <p>|</p>
    <Nav.Link href="#add-merch">Sell Your Stuff</Nav.Link>
    <Nav.Link href="#merch">For Sale</Nav.Link>
  </Fragment>
)

// To show up even if you're not signed in.
const unauthenticatedOptions = (
  <Fragment>
    <Nav.Link href="#sign-up">Sign Up</Nav.Link>
    <Nav.Link href="#sign-in">Log In</Nav.Link>
  </Fragment>
)

// To show up always.
const alwaysOptions = (
  <Fragment>
    <Nav.Link href="#/">Home</Nav.Link>
  </Fragment>
)

// This defines the Header component, passing in the user as a param.
const Header = ({ user }) => (
  <Navbar className="color-nav" variant="light" expand="md">
    <Navbar.Brand href="#" className="navlogo">
      merchzoid.
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        { user && <span className="navbar-text mr-2">Welcome, {user.email}</span>}
        { alwaysOptions }
        { user ? authenticatedOptions : unauthenticatedOptions }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
