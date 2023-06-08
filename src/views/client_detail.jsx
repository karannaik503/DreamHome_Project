import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, ListGroup } from "react-bootstrap";
import { Container } from "react-bootstrap";
import axios from "axios";

const ClientDetail = () => {
  const { clientNo } = useParams();
  const [client, setClient] = useState({});

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/client/${clientNo}`)
      .then((response) => {
        setClient(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [clientNo]);

  return (
    <Container className="d-flex justify-content-center my-5">
      <Card style={{ width: "50%" }}>
        <Card.Header>Client Details</Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <strong>Client No:</strong> {client.clientno}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>First Name:</strong> {client.fname}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Last Name:</strong> {client.lname}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Max Rent:</strong> {client.maxrent}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Date of Registration:</strong> {client.regdate}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Preferred Property Type:</strong> {client.preftype}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Registered Branch:</strong> {client.regbranch}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Registered Staff:</strong> {client.regstaff}
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </Container>
  );
};

export default ClientDetail;
