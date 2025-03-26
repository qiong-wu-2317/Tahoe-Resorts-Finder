import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Badge } from 'react-bootstrap';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { app } from '../../db/firebaseConfig.js';
import BookingModal from './BookingModal';
import 'bootstrap/dist/css/bootstrap.min.css';

const db = getFirestore(app);

const CourseFilter = () => {
  const [lessonType, setLessonType] = useState('All');
  const [lessonLevel, setLessonLevel] = useState('All');
  const [ageGroup, setAgeGroup] = useState('All');
  const [resort, setResort] = useState('All');
  const [period, setPeriod] = useState('All');
  const [lessons, setLessons] = useState([]);
  const [filteredLessons, setFilteredLessons] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(null);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const lessonsCollection = collection(db, 'lessons');
        const lessonsSnapshot = await getDocs(lessonsCollection);
        const lessonsList = lessonsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setLessons(lessonsList);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching lessons:', error);
        setLoading(false);
      }
    };

    fetchLessons();
  }, []);

  const lessonTypes = ['All', 'Private', 'Group'];
  const lessonLevels = ['All', 'Beginner', 'Advanced'];
  const ageGroups = ['All', 'Adult', 'Child'];
  const resorts = ['All', 'Heavenly Mountain Resort', 'Northstar California', 'Palisades Tahoe'];
  const periods = ['All', 'Morning', 'Afternoon', 'Full Day'];

  const handleSearch = () => {
    let results = [...lessons];
    
    if (lessonType !== 'All') {
      results = results.filter(lesson => lesson.lessonType === lessonType);
    }

    if (lessonLevel !== 'All') {
      results = results.filter(lesson => lesson.level === lessonLevel);
    }

    if (ageGroup !== 'All') {
      results = results.filter(lesson => lesson.ageGroup === ageGroup);
    }

    if (resort !== 'All') {
      results = results.filter(lesson => lesson.resort === resort);
    }

    if (period !== 'All') {
      results = results.filter(lesson => {
        const timeWindow = lesson.timeWindow.toLowerCase();
        const selectedPeriod = period.toLowerCase();
        return timeWindow.includes(selectedPeriod);
      });
    }

    setFilteredLessons(results);
  };

  const handleReset = () => {
    setLessonType('All');
    setLessonLevel('All');
    setAgeGroup('All');
    setResort('All');
    setPeriod('All');
    setFilteredLessons(null);
  };

  const handleBookClick = (lesson) => {
    setSelectedLesson(lesson);
    setShowBookingModal(true);
  };

  const handleCloseModal = () => {
    setShowBookingModal(false);
    setSelectedLesson(null);
  };

  const displayedLessons = filteredLessons || lessons;

  if (loading) {
    return (
      <Container className="py-4">
        <div className="text-center">
          <h2>Loading lessons...</h2>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <h1 className="mb-4">Lesson Filter</h1>
      <Form className="mb-4">
        <Row className="g-3">
          <Col md={4}>
            <Form.Group>
              <Form.Label>Lesson Type</Form.Label>
              <Form.Select
                value={lessonType}
                onChange={(e) => setLessonType(e.target.value)}
              >
                {lessonTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Lesson Level</Form.Label>
              <Form.Select
                value={lessonLevel}
                onChange={(e) => setLessonLevel(e.target.value)}
              >
                {lessonLevels.map((level) => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Age Group</Form.Label>
              <Form.Select
                value={ageGroup}
                onChange={(e) => setAgeGroup(e.target.value)}
              >
                {ageGroups.map((age) => (
                  <option key={age} value={age}>{age}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row className="g-3 mt-2">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Resort</Form.Label>
              <Form.Select
                value={resort}
                onChange={(e) => setResort(e.target.value)}
              >
                {resorts.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Period</Form.Label>
              <Form.Select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
              >
                {periods.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col className="d-flex justify-content-end gap-2">
            <Button variant="outline-secondary" onClick={handleReset}>
              Reset
            </Button>
            <Button variant="primary" onClick={handleSearch}>
              Search
            </Button>
          </Col>
        </Row>
      </Form>

      <Row className="g-4">
        {displayedLessons.map((lesson) => (
          <Col key={lesson.id} md={12}>
            <Card>
              <Card.Body>
                <Row>
                  <Col md={8}>
                    <Card.Title>{lesson.resort}</Card.Title>
                    <Card.Text>
                      <strong>Type:</strong> {lesson.lessonType}<br />
                      <strong>Level:</strong> {lesson.level}<br />
                      <strong>Age Group:</strong> {lesson.ageGroup}<br />
                      <strong>Time:</strong> {lesson.timeWindow}<br />
                      <strong>Max Participants:</strong> {lesson.maxParticipants}<br />
                      <strong>Instructor:</strong> {lesson.instructor}
                    </Card.Text>
                    <Card.Text className="text-muted">
                      {lesson.description}
                    </Card.Text>
                  </Col>
                  <Col md={4} className="text-end">
                    <h3>${lesson.price}</h3>
                    <Badge bg={lesson.lessonType === 'Private' ? 'primary' : 'success'} className="mb-2">
                      {lesson.lessonType}
                    </Badge>
                    <div>
                      <Button 
                        variant="primary" 
                        className="mt-2"
                        onClick={() => handleBookClick(lesson)}
                      >
                        Book Now
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <BookingModal
        show={showBookingModal}
        handleClose={handleCloseModal}
        lesson={selectedLesson}
      />
    </Container>
  );
};

export default CourseFilter; 