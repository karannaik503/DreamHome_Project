import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, ListGroup } from "react-bootstrap";
import { Container } from "react-bootstrap";
import axios from "axios";

const StaffDetail = () => {
  const { staffNo } = useParams();
  const [staff, setStaff] = useState({});

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/staff/${staffNo}`)
      .then((response) => {
        setStaff(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [staffNo]);

  return (
    <Container className="d-flex justify-content-center my-5">
      <Card style={{ width: "50%" }}>
        <Card.Header>Staff Details</Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <strong>Staff No:</strong> {staff.staff_no}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>First Name:</strong> {staff.fname}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Last Name:</strong> {staff.lname}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Sex:</strong> {staff.sex}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Date of Birth:</strong> {staff.dob}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Branch No:</strong> {staff.branch_no}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Position:</strong> {staff.pos}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Salary:</strong> {staff.salary}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Supervisor No:</strong> {staff.supervisor_no || "N/A"}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Manager Date:</strong> {staff.manager_date || "N/A"}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Manager Bonus:</strong> {staff.manager_bonus || "N/A"}
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </Container>
  );
};

export default StaffDetail;
