import { useState, useEffect } from "react";
import { Table } from 'react-bootstrap';
import axios from "axios";

function BranchTable() {
  const [branchList, setBranchList] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/branch/")
      .then((response) => {
        setBranchList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Table striped bordered hover variant="light">
        <thead>
          <tr>
            <th>Branch Name</th>
            <th>Location</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {branchList.map((branch) => (
            <tr key={branch.id}>
              <td>{branch.branch_no}</td>
              <td>{branch.address}</td>
              <td>{branch.telno}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default BranchTable;
