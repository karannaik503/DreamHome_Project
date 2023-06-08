import { useState } from 'react';
import axios from 'axios';
import cors from 'cors';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Navbar from "../../components/Navbar.jsx"
import Sidebar from "../../components/Sidebar.jsx"
import "./branch.css"

function Branch() {

  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = (event) => {
    console.log("function is working")
    event.preventDefault();

    const data = {
      address: address,
      telno: phoneNumber
    };

    axios.post('http://127.0.0.1:8000/api/branch/', data, cors())
      .then(response => {
        alert("Your Branch has been created")
      })
      .catch(error => {
        console.error(error);
      });

      setAddress("");
      setPhoneNumber("");
  };

  return (    
    <>
    <Navbar />
    <div className='formBranchContainer'>
    <Sidebar />
    <div className='formBranchContainer2'>
    <Form onSubmit={handleSubmit}>
    <Form.Group className="mb-3" controlId="formBranchAddress">
    <Form.Label>Branch Address</Form.Label>
    <Form.Control placeholder="Enter Address"  value={address} onChange={(event) => setAddress(event.target.value)}/>
    </Form.Group>
    <Form.Group className="mb-3" controlId="formTelephoneNumber">
    <Form.Label>Telephone Number</Form.Label>
    <Form.Control  placeholder="Enter your Number" value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)} />
    </Form.Group>
    <Button variant="outline-primary" type="submit">Submit</Button>{' '}
    </Form>
    </div>
    </div>
    </>
  );
}

export default Branch;


// import { useState } from 'react';
// import axios from 'axios';

// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
// import Navbar from "../../components/Navbar.jsx"
// import Sidebar from "../../components/Sidebar.jsx"
// import "./branch.css"

// function Branch() {

//   const [address, setAddress] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');

//   const handleSubmit = (event) => {
//     console.log("function is working")
//     event.preventDefault();

//     const data = {
//       address: address,
//       phoneNumber: phoneNumber
//     };

//     axios.post('http://127.0.0.1:8000/api/branch/', data)
//       .then(response => {
//         console.log(response.data);
//       })
//       .catch(error => {
//         console.error(error);
//       });
//   };

//   return (    
//     <>
//     <Navbar />
//     <div className='formBranchContainer'>
//     <Sidebar />
//     <div className='formBranchContainer2'>
//     <Form onSubmit={handleSubmit}>
//     <Form.Group className="mb-3" controlId="formBranchAddress">
//     <Form.Label>Branch Address</Form.Label>
//     <Form.Control placeholder="Enter Address"  value={address} onChange={(event) => setAddress(event.target.value)}/>
//     </Form.Group>
//     <Form.Group className="mb-3" controlId="formTelephoneNumber">
//     <Form.Label>Telephone Number</Form.Label>
//     <Form.Control  placeholder="Enter your Number" value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)} />
//     </Form.Group>
//     </Form>
//     <Button variant="outline-primary" type="submit">Submit</Button>{' '}
//     </div>
//     </div>
//     </>
//     );
// }

// export default Branch;