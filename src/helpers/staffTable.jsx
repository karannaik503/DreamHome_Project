import {useContext, useEffect, useState } from "react";
import { Table } from 'react-bootstrap';
import axios from "axios";
import { BranchContext } from '../context/branch_ctx';
import { Link } from "react-router-dom";


function StaffTable() {
  const { selectedBranch} = useContext(BranchContext) ;
    const [staffList, setStaffList] = useState([]);
  
    useEffect(() => {
      if (selectedBranch) {
        axios
          .get(`http://127.0.0.1:8000/api/stafflisting/${selectedBranch}/`)
          .then((response) => {
            setStaffList(response.data.staff);
          })
          .catch((error) => console.log(error));
      }
    }, [selectedBranch]);
  
    return (
      <>
        <Table striped bordered hover variant="light">
          <thead>
            <tr>
              <th>Staff No</th>
              <th>Name</th>
              <th>Position</th>
            </tr>
          </thead>
          <tbody>
          {Array.isArray(staffList) && staffList.map((staff) => (
              <tr key={staff.staff_no}>
                <td>
                  <Link to={`/staff/${staff.staff_no}`}>
                  {staff.staff_no}
                  </Link>
                  </td>
                <td>{staff.fname} {staff.lname}</td>
                <td>{staff.pos}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </>
    );
  }
  
  export default StaffTable;
  

// import { useEffect, useState } from "react";
// import { Table } from 'react-bootstrap';
// import axios from "axios";

// function StaffTable() {
//   const [staffList, setStaffList] = useState([]);

//   useEffect(() => {
//     axios
//       .get("http://127.0.0.1:8000/api/stafflisting/B00001/")
//       .then((response) => setStaffList(response.data))
//       .catch((error) => console.log(error));
//   }, []);

//   return (
//     <>
//       <Table striped bordered hover variant="dark">
//         <thead>
//           <tr>
//             <th>Staff No</th>
//             <th>Name</th>
//             <th>Position</th>
//           </tr>
//         </thead>
//         <tbody>
//           {staffList.map((staff) => (
//             <tr key={staff.id}>
//               <td>{staff.staff_no}</td>
//               <td>{staff.name}</td>
//               <td>{staff.position}</td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </>
//   );
// }

// export default StaffTable;


// import React from "react";
// // import {Table} from 'react-bootstrap/Table';

// import { Table } from 'react-bootstrap';
// import { useState, useEffect } from "react";
// import axios from "axios";

// function StaffTable() {
//     const [staffList, setStaffList] = useState([]);

//     useEffect(() => {
//         axios
//           .get("http://127.0.0.1:8000/api/stafflisting/B00001/")
//           .then((response) => setStaffList(response.data))
//           .catch((error) => console.log(error));
//       }, []);


//     return (
//         <>
//         <Table striped bordered hover variant="dark">
//         <thead>
//           <tr>
//             <th>Staff No</th>
//             <th>Name</th>
//             <th>Position</th>
//           </tr>
//         </thead>
//         <tbody>
//           {staffList.map((staff) => (
//             <tr key={staff.id}>
//               <td>{staff.staff_no}</td>
//               <td>{staff.name}</td>
//               <td>{staff.position}</td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//       </>
//     );
// }

// export default StaffTable;
