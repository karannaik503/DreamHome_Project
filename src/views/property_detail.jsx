import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, ListGroup } from "react-bootstrap";
import { Container } from "react-bootstrap";
import axios from "axios";

const PropertyDetail = () => {
  const { propertyNo } = useParams();
  const [property, setProperty] = useState({});

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/properties/${propertyNo}/`)
      .then((response) => {
        setProperty(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [propertyNo]);

  return (
    <Container className="d-flex justify-content-center my-5">
      <Card style={{ width: "50%" }}>
        <Card.Header>Property Details</Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <strong>Property No:</strong> {property.propertyno}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Rooms:</strong> {property.rooms}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Rent:</strong> {property.rent}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Address:</strong> {property.address}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Registration Date:</strong> {property.regdate}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Rent Status:</strong> {property.rent_status}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Property Type:</strong> {property.proptype}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Registered Owner:</strong> {property.regowner}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Registered Staff:</strong> {property.regstaff}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Registered Branch:</strong> {property.regbranch}
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </Container>
  );
};

export default PropertyDetail;
