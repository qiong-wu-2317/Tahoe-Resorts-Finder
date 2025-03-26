import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Badge } from 'react-bootstrap';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { app } from '../../db/firebaseConfig';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/TrailFilter.css';

const db = getFirestore(app);

const TrailFilter = () => {
  const [location, setLocation] = useState('All Locations');
  const [minPrice, setMinPrice] = useState('0');
  const [maxPrice, setMaxPrice] = useState('1000');
  const [level, setLevel] = useState('All Levels');
  const [filteredTrails, setFilteredTrails] = useState(null);
  const [trails, setTrails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrails = async () => {
      try {
        const trailsCollection = collection(db, 'trails');
        const trailsSnapshot = await getDocs(trailsCollection);
        const trailsList = trailsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setTrails(trailsList);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching trails:', error);
        setLoading(false);
      }
    };

    fetchTrails();
  }, []);

  const locations = [
    'All Locations',
    'South Lake Tahoe, CA',
    'Truckee, CA',
    'Olympic Valley, CA'
  ];

  const levels = [
    'All Levels',
    'Beginner',
    'Intermediate',
    'Advanced'
  ];

  const handleSearch = () => {
    let results = [...trails];
    
    if (location !== 'All Locations') {
      results = results.filter(trail => trail.location === location);
    }

    if (level !== 'All Levels') {
      results = results.filter(trail => trail.level === level);
    }

    const min = parseFloat(minPrice) || 0;
    const max = parseFloat(maxPrice) || Infinity;
    results = results.filter(trail => {
      const price = trail.price || 0;
      return price >= min && price <= max;
    });

    setFilteredTrails(results);
  };

  const resetFilters = () => {
    setLocation('All Locations');
    setMinPrice('0');
    setMaxPrice('1000');
    setLevel('All Levels');
    setFilteredTrails(null);
  };

  const displayedTrails = filteredTrails || trails;

  if (loading) {
    return (
      <Container className="py-4">
        <div className="text-center">
          <h2>Loading trails...</h2>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <h1 className="mb-4">Trail Filter</h1>
      <Form className="mb-4">
        <Row className="g-3">
          <Col md={3}>
            <Form.Group>
              <Form.Label>Location</Form.Label>
              <Form.Select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label>Trail Level</Form.Label>
              <Form.Select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
              >
                {levels.map((lvl) => (
                  <option key={lvl} value={lvl}>
                    {lvl}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Daily Price Range</Form.Label>
              <Row className="g-2">
                <Col>
                  <Form.Control
                    type="number"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    min="0"
                  />
                </Col>
                <Col>
                  <Form.Control
                    type="number"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    min="0"
                  />
                </Col>
              </Row>
            </Form.Group>
          </Col>
          <Col md={2} className="d-flex align-items-end">
            <div className="d-grid gap-2">
              <Button variant="primary" onClick={handleSearch}>
                Search
              </Button>
              <Button variant="outline-secondary" onClick={resetFilters}>
                Reset
              </Button>
            </div>
          </Col>
        </Row>
      </Form>

      <Row className="g-4">
        {displayedTrails.map((trail) => (
          <Col key={trail.id} md={12}>
            <Card className="resort-card">
              <Row className="g-0">
                <Col md={4}>
                  <Card.Img
                    src={trail.imageUrl}
                    alt={trail.name}
                    className="resort-image"
                  />
                </Col>
                <Col md={8}>
                  <Card.Body>
                    <Card.Title as="h2">{trail.name}</Card.Title>
                    <Card.Text className="location">
                      {trail.resort} - {trail.location}
                    </Card.Text>
                    <Card.Text>Length: {trail.length}</Card.Text>
                    <Card.Text>Vertical Drop: {trail.verticalDrop}</Card.Text>
                    <Badge bg="secondary" className="trail-level">
                      Level: {trail.level}
                    </Badge>
                    <Card.Text className="mt-2">
                      Price: ${trail.price}/day
                    </Card.Text>
                    <Card.Text className="mt-2">
                      {trail.description}
                    </Card.Text>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default TrailFilter; 