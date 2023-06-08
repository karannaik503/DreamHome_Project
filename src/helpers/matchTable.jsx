import { useState, useEffect } from "react";
import { Table } from 'react-bootstrap';
import axios from "axios";
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function MatchTable({ propertyNo }) {
  const [matchData, setMatchData] = useState(null);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/propertymatch/${propertyNo}/`)
      .then((response) => {
        setMatchData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [propertyNo]);

  if (!matchData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {/* <h2>Matches for {matchData.property.propertyno}</h2> */}
      <Table striped bordered hover variant="light">
        <thead>
          <tr>
            <th>Client Number</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Registration Date</th>
            <th>Mail Client</th>
          </tr>
        </thead>
        <tbody>
          {matchData.client && matchData.client.map((client) => (
            <tr key={client.clientno}>
              <td>
                  <Link to={`/client/${client.clientno}`}>
                  {client.clientno}
                  </Link></td>
              <td>{client.fname}</td>
              <td>{client.lname}</td>
              <td>{client.regdate}</td>
              <td><Link>
                <FontAwesomeIcon icon={faEnvelope}style={{ color: "#C4C4C4", }} />
              </Link>{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default MatchTable;
