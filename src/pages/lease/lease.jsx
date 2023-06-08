import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Navbar from "../../components/Navbar.jsx"
import Sidebar from "../../components/Sidebar.jsx"
import { useParams } from 'react-router-dom';
import React, { useContext, useState, useEffect } from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { BranchContext } from '../../context/branch_ctx';
import axios from 'axios';


function Lease() {

  //
  const [isLoading, setIsLoading] = useState(false);
  const { selectedBranch, setSelectedBranch } = useContext(BranchContext);
  const [stf, setstf] = useState([]);

  //
  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setformData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  
  const [formData, setformData] = useState({
    // leaseno: "",
    rent: "" ,
    payment_method: "",
    deposit_paid: "",
    // rent_finish: "",
    rent_start: "",
    duration: 0,
    clientno: "",
    propertyno:"",
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedFormData = {
      // leaseno: formData.leaseno,
      rent: +formData.rent,
      payment_method: formData.payment_method,
      deposit_paid: +formData.deposit_paid,
      // rent_finish: formData.rent_finish,
      rent_start: formData.rent_start,
      duration: +formData.duration,
      clientno: formData.clientno,
      propertyno:`${propertyno}`,
    };

    axios
      .post("http://127.0.0.1:8000/api/lease/", updatedFormData)
      .then((response) => {
        // TODO: handle success case
        console.log(updatedFormData);
        alert("form has been submitted");
        console.log(typeof updatedFormData.rent); // "number"

      })
      .catch((error) => {
        console.error(error);
        console.log(updatedFormData);
        console.log(typeof updatedFormData.rent); // "number"
        console.log(typeof +updatedFormData.rent); // "number"

        // TODO: handle error case
      });
  };

  //


  const handleSearch = async (query) => {
    setIsLoading(true);
    try {

      const response = await fetch(`http://127.0.0.1:8000/api/client/${selectedBranch}/search?q=${query}`);
      const data = await response.json();
      setstf(data);
      console.log(data)
      setIsLoading(false);
      return data;
    } catch (error) {
      console.error(error);
    }
  };




  //@@@@@@@@@@@@@@@@@@@@@@@@@@2
  const [label_key, setLabel_key] = useState("name");
  const [boolean, setBoolean] = useState(false);

  const handleMenuItemClick = (selected) => {
    setLabel_key("client_no");
    setBoolean(true);
    setformData((prevState) => ({
      ...prevState,
      clientno: selected.client_no, // Set regStaff to the selected staff's staff_no value
    }));
  }

  const handleSelect = (selected) => {
    // if(selected && selected.length > 0 && selected[0].branch_no) {
    console.log(selected)
    if (boolean) {
      setLabel_key("client_no");
      setBoolean(false);
    } else {
      setLabel_key("name");
    }
    // }
  };
  //@@@@@@@@@@@@@@@@@@@@@@@@@@2

  //

  const { propertyno } = useParams();
  return (
    <>
      <Navbar />
      <div className='formBranchContainer'>
        <Sidebar />
        <div className='formBranchContainer2'>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              {/* 
              <Form.Group as={Col} controlId="formGridClientNo">
                <Form.Label>Client No.</Form.Label>
                <Form.Select defaultValue="Choose...">
                  <option>Choose...</option>
                  <option>...</option>
                </Form.Select>
              </Form.Group> */}

              <Form.Group as={Col} controlId="formGridRegStaff">
                <Form.Label id="staff">Client No</Form.Label>
                <AsyncTypeahead
                  id="basic-typeahead-single"
                  labelKey={label_key}
                  placeholder="Client no"
                  isLoading={isLoading}
                  value={formData.clientno}
                  onSearch={(search) => handleSearch(search)}
                  onChange={handleSelect}
                  options={stf}
                  renderMenuItemChildren={(option) => (
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() => handleMenuItemClick(option)}
                    >
                      <span>{option.client_no}</span>
                      <span> {option.name}</span>
                    </div>
                  )}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPropertyNo">
                <Form.Label>Property No.</Form.Label>
                <Form.Select defaultValue={propertyno}>
                  <option>{propertyno}</option>
                  <option>...</option>
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridRent">
                <Form.Label>Rent</Form.Label>
                <Form.Control placeholder="Enter Rent" name="rent"
                  value={formData.rent} onChange={handleOnChange} />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridPaymentMethod">
                <Form.Label>Payment Method</Form.Label>
                <Form.Control placeholder="Enter Payment Method" name="payment_method" onChange={handleOnChange}
                  value={formData.payment_method} />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridDepositPaid">
                <Form.Label>Deposit Paid</Form.Label>
                {/* <Form.Control as="select" defaultValue="Choose..." name="deposit_paid" value={formData.deposit_paid} onChange={handleOnChange}></Form.Control> */}
                <Form.Select defaultValue="Choose..." name="deposit_paid" value={formData.deposit_paid} onClick={handleOnChange} onChange={handleOnChange}>
                  <option>1</option>
                  <option>0</option>
                </Form.Select>
              </Form.Group>
              
            </Row>

            <Row className='mb-3'>

              <Form.Group as={Col} controlId="formGridRentStart">
                <Form.Label>Rent Start</Form.Label>
                <Form.Control type='date' placeholder="Rent Start" name="rent_start" onChange={handleOnChange}
                  value={formData.rent_start} />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridDuration">
                <Form.Label>Duration (in days)</Form.Label>
                <Form.Control placeholder="Enter Duration" name="duration" type = "Number" onChange={handleOnChange}
                  value={formData.duration} />
              </Form.Group>
            </Row>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
}

export default Lease;
