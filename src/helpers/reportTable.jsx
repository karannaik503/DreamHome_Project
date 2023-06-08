import { useState, useEffect } from "react";
import { Table } from 'react-bootstrap';
import axios from "axios";
import { Link } from "react-router-dom";


function ReportTable({ propertyNo }) {
  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/propertyreportlisting/${propertyNo}/`)
      .then((response) => {
        setReportData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [propertyNo]);

  if (!reportData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h2>Reports for {reportData.property.propertyno}</h2>
      <Table striped bordered hover variant="light">
        <thead>
          <tr>
            <th>Client Name</th>
            <th>Client Number</th>
            <th>View Date</th>
            <th>Comments</th>
          </tr>
        </thead>
        <tbody>
          {reportData.report && reportData.report.map((report) => (
            <tr key={`${report.clientno}_${report.view_date}`}>
              <td>{report.clientName}</td>
              <td>
                  <Link to={`/client/${report.clientno}`}>
                  {report.clientno}
                  </Link>
                </td>
              <td>{report.view_date}</td>
              <td>{report.comment}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default ReportTable;
