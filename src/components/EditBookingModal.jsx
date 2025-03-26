import React, { useState, useEffect, useCallback } from 'react';
import { Modal, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { doc, updateDoc, getFirestore } from 'firebase/firestore';
import { app } from '../../db/firebaseConfig.js';

const EditBookingModal = ({ show, handleClose, booking, onUpdate }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    date: '',
    specialRequests: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  useEffect(() => {
    if (booking) {
      setFormData({
        firstName: booking.firstName || '',
        lastName: booking.lastName || '',
        email: booking.email || '',
        phone: booking.phone || '',
        date: booking.date || '',
        specialRequests: booking.specialRequests || ''
      });
    }
  }, [booking]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    try {
      const db = getFirestore(app);
      const bookingRef = doc(db, 'books', booking.id);
      const updateData = {
        ...formData,
        lessonId: booking.lessonId,
        lessonType: booking.lessonType,
        resort: booking.resort,
        timeWindow: booking.timeWindow,
        price: booking.price,
      };

      await updateDoc(bookingRef, updateData);
      
      setSubmitStatus({
        type: 'success',
        message: 'Booking updated successfully!'
      });

      if (onUpdate) {
        onUpdate();
      }

      setTimeout(() => {
        handleClose();
        setSubmitStatus({ type: '', message: '' });
      }, 2000);

    } catch (error) {
      console.error('Error updating booking:', error);
      setSubmitStatus({
        type: 'danger',
        message: 'An error occurred while updating your booking. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [booking, formData, handleClose, onUpdate]);

  if (!booking) return null;

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Edit Booking at {booking.resort}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3">
          <h5>Lesson Details:</h5>
          <p>
            <strong>Type:</strong> {booking.lessonType}<br />
            <strong>Time:</strong> {booking.timeWindow}<br />
            <strong>Price:</strong> ${booking.price}
          </p>
        </div>

        {submitStatus.message && (
          <Alert variant={submitStatus.type} className="mb-3">
            {submitStatus.message}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Preferred Date</Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Special Requests</Form.Label>
            <Form.Control
              as="textarea"
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleInputChange}
              rows={3}
            />
          </Form.Group>

          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button 
              variant="primary" 
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Updating...' : 'Update Booking'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditBookingModal; 