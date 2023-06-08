import { useState, useEffect } from "react";
import { Table } from 'react-bootstrap';
import axios from "axios";
import '../views/lease.css'

function LeaseTable() {
  const [leaseList, setleaseList] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/leasebyactive/")
      .then((response) => {
        setleaseList(response.data.active);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Table striped bordered hover variant="green" className="table-green">
        <thead>
          <tr>
            <th>lease No</th>
            <th>Client No</th>
            <th>Property No</th>
            <th>Rent</th>
            <th>Rent finish</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(leaseList) && leaseList.map((lease) => (
            <tr key={lease.id}>
              <td>{lease.leaseno}</td>
              <td>{lease.clientno}</td>
              <td>{lease.propertyno}</td>
              <td>{lease.rent}</td>
              <td>{lease.rent_finish}</td>
              <td>{lease.address}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default LeaseTable;
