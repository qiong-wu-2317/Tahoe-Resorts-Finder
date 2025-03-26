import React, { useState } from 'react';
import PropTypes from "prop-types";
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import BookingsList from './BookingsList';

const NavigationBar = () => {
  const [showBookings, setShowBookings] = useState(false);

  const handleShowBookings = () => setShowBookings(true);
  const handleCloseBookings = () => setShowBookings(false);

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">Tahoe Resorts Finder</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/trails">Trails</Nav.Link>
              <Nav.Link as={Link} to="/courses">Courses</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <div className="ms-auto">
            <Button variant="outline-light" onClick={handleShowBookings}>
              View All Bookings
            </Button>
          </div>
        </Container>
      </Navbar>

      <BookingsList 
        show={showBookings}
        handleClose={handleCloseBookings}
      />
    </>
  );
};

NavigationBar.propTypes = {
  onAddInsurance: PropTypes.func.isRequired,
  onCompareModeChange: PropTypes.func.isRequired,
  selectedPlans: PropTypes.array.isRequired,
};

export default NavigationBar;
