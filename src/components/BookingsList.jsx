import React, { useState, useEffect } from 'react';
import { Modal, Table, Button } from 'react-bootstrap';
import { collection, getDocs, getFirestore, deleteDoc, doc } from 'firebase/firestore';
import { app } from '../../db/firebaseConfig.js';
import EditBookingModal from './EditBookingModal';

const db = getFirestore(app);

const BookingsList = ({ show, handleClose }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const fetchBookings = async () => {
    try {
      const bookingsCollection = collection(db, 'books');
      const bookingsSnapshot = await getDocs(bookingsCollection);
      const bookingsList = bookingsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setBookings(bookingsList);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (show) {
      fetchBookings();
    }
  }, [show]);

  const handleDelete = async (bookingId) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        await deleteDoc(doc(db, 'books', bookingId));
        fetchBookings();
      } catch (error) {
        console.error('Error deleting booking:', error);
        alert('Failed to delete booking');
      }
    }
  };

  const handleEdit = (booking) => {
    setSelectedBooking(booking);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedBooking(null);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>All Bookings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading ? (
            <div className="text-center p-4">Loading bookings...</div>
          ) : (
            <div className="table-responsive">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Booking Date</th>
                    <th>Preferred Date</th>
                    <th>Customer</th>
                    <th>Resort</th>
                    <th>Lesson Type</th>
                    <th>Time Window</th>
                    <th>Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking.id}>
                      <td>{new Date(booking.bookingDate).toLocaleDateString()}</td>
                      <td>{booking.date}</td>
                      <td>
                        {booking.firstName} {booking.lastName}<br />
                        <small className="text-muted">{booking.email}</small>
                      </td>
                      <td>{booking.resort}</td>
                      <td>{booking.lessonType}</td>
                      <td>{booking.timeWindow}</td>
                      <td>${booking.price}</td>
                      <td>
                        <div className="d-flex gap-2">
                          <Button 
                            variant="outline-primary" 
                            size="sm"
                            onClick={() => handleEdit(booking)}
                          >
                            Edit
                          </Button>
                          <Button 
                            variant="outline-danger" 
                            size="sm"
                            onClick={() => handleDelete(booking.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <EditBookingModal
        show={showEditModal}
        handleClose={handleCloseEditModal}
        booking={selectedBooking}
        onUpdate={fetchBookings}
      />
    </>
  );
};

export default BookingsList; 