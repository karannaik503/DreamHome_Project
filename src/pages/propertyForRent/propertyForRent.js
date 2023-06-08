import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Navbar from "../../components/Navbar.jsx"
import Sidebar from "../../components/Sidebar.jsx"
import React, { useContext, useState, useEffect } from 'react';
import { BranchContext } from '../../context/branch_ctx';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import axios from 'axios';

function Client() {
  const { selectedBranch, setSelectedBranch } = useContext(BranchContext);

  //api connection @@@@@@@@@@@@
  const [formData, setFormData] = useState({
    rooms: "",
    rent: "",
    address: "",
    regbranch: `${selectedBranch}`,
    regdate: "",
    proptype: "",
    regowner: "",
    regstaff: "",
  });

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedFormData = {
      rooms: formData.rooms,
      rent: formData.rent,
      address: formData.address,
      regbranch: formData.regbranch,
      regdate: formData.regdate,
      proptype: formData.proptype,
      regowner: formData.regowner,
      regstaff: formData.regstaff,
    };

    axios
      .post("http://127.0.0.1:8000/api/properties/", updatedFormData)
      .then((response) => {
        
        console.log(updatedFormData);
        alert("form has been submitted");
      })
      .catch((error) => {
        console.error(error);
        console.log(updatedFormData);
      });
  };
     
  // @@@@@@@@@@@@
    
  //
  const [ownerOptions, setownerOptions] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [stf, setstf] = useState([]);

  const [isLoading2, setIsLoading2] = useState(false);
  const [stf2, setstf2] = useState([]);



  const handleSearch = async (query) => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/owner/${selectedBranch}/search?q=${query}`);
      const data = await response.json();
      setstf(data);
      console.log(`owner${data}`)
      setIsLoading(false);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch2 = async (query) => {
    setIsLoading2(true);
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/staff/${selectedBranch}/search?q=${query}`);
      const data2 = await response.json();
      setstf2(data2);
      console.log(`owner${data2}`)
      setIsLoading2(false);
      return data2;
    } catch (error) {
      console.error(error);
    }
  };

  // const handleSelect = (selected) => {
  //   // if(selected && selected.length > 0 && selected[0].branch_no) {
  //     console.log(selected)
  //     // setSelected(selected);
  //     // setInputClassName('my-input-class');
  //     // setSelectedBranch(selected[0].branch_nw);
  //   // }
  // };

  //@@@@@@@@@@@@@OWNER@@@@@@@@@@@@@2

  const [label_key, setLabel_key] = useState("ownername");
  const [boolean, setBoolean] = useState(false);

  const handleMenuItemClick = (selected) => {
    setLabel_key("ownerno");
    setBoolean(true);
    setFormData((prevState) => ({
      ...prevState,
      regowner: selected.ownerno, // Set regStaff to the selected staff's staff_no value
    }));
  }

  const handleSelect = (selected) => {
    console.log(selected);
    if (boolean) {
      setLabel_key("ownerno");
      setBoolean(false);
    } else {
      setLabel_key("ownername");
    }
  };

  //@@@@@@@@@@@@@@@@@@@@

  //@@@@@@@@@@@@@STAFF@@@@@@@@@@@@@2

  const [label_key2, setLabel_key2] = useState("name");
  const [boolean2, setBoolean2] = useState(false);

  const handleMenuItemClick2 = (selected) => {
    setLabel_key2("staff_no");
    setBoolean2(true);
    setFormData((prevState) => ({
      ...prevState,
      regstaff: selected.staff_no, // Set regStaff to the selected staff's staff_no value
    }));
  }

  const handleSelect2 = (selected) => {
    console.log(selected);
    if (boolean2) {
      setLabel_key2("staff_no");
      setBoolean2(false);
    } else {
      setLabel_key2("name");
    }
  };

  //@@@@@@@@@@@@@@@@@@@@



  //
  const [staffOptions, setStaffOptions] = useState([]);
  // const { selectedBranch, setSelectedBranch } = useContext(BranchContext);

  useEffect(() => {
    const fetchStaffOptions = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/preferences/');
        const data = await response.json();
        setStaffOptions(data);
        // console.log(staffOptions)
      } catch (error) {
        console.error(error);
      }
    };
    fetchStaffOptions();
  }, []);
  //

  return (
    <>
      <Navbar />
      <div className='formBranchContainer'>
        <Sidebar />
        <div className='formBranchContainer2'>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">

              <Form.Group as={Col} controlId="formGridRegStaff">
                <Form.Label>Property Types</Form.Label>
                <Form.Control as="select" defaultValue="Choose..." name="proptype" value={formData.proptype} onChange={handleOnChange}>
                  <option>Choose...</option>
                  {staffOptions.map((staff) => (
                    <option key={staff.id} value={staff.id}>
                      {staff.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              {/* <Form.Group as={Col} controlId="formGridPropType">
      <Form.Label>Property Type</Form.Label>
      <Form.Control  placeholder="Enter Property Type" />
      </Form.Group> */}

              <Form.Group as={Col} controlId="formGridRooms">
                <Form.Label>Rooms</Form.Label>
                <Form.Control placeholder="Rooms" name="rooms" value={formData.rooms} onChange={handleOnChange} />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridRent">
                <Form.Label>Rent</Form.Label>
                <Form.Control placeholder="Rent"  name="rent" value={formData.rent} onChange={handleOnChange} />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridAdress">
                <Form.Label>Address</Form.Label>
                <Form.Control placeholder="Enter Address"  name="address" value={formData.address} onChange={handleOnChange} />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridRegDate" >
                <Form.Label>Registration Date</Form.Label>
                <Form.Control type="date"  name="regdate" value={formData.regdate} onChange={handleOnChange} />
              </Form.Group>
            </Row>

            <Row className="mb-3">

              {/* <Form.Group as={Col} controlId="formGridRegOwner">
      <Form.Label>Owner</Form.Label>
      <Form.Select defaultValue="Choose...">
      <option>Choose...</option>
      <option>...</option>
      </Form.Select>
      </Form.Group> */}

              <Form.Group as={Col} controlId="formGridRegStaff">
                <Form.Label id="owner">Owner</Form.Label>
                <AsyncTypeahead
                  id="basic-typeahead-single"
                  labelKey={label_key} // Update labelKey to the name field
                  placeholder="owner"
                  isLoading={isLoading}
                  onSearch={(search) => handleSearch(search)}
                  onChange={handleSelect}
                  options={stf}
                  renderMenuItemChildren={(option) => (
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() => handleMenuItemClick(option)}
                    >
                      <span>{option.ownerno}</span>
                      <span> {option.ownername}</span>
                    </div>
                  )}
                />
              </Form.Group>

              {/* <Form.Group as={Col} controlId="formGridRegStaff">
      <Form.Label>Staff</Form.Label>
      <Form.Select defaultValue="Choose...">
      <option>Choose...</option>
      <option>...</option>
      </Form.Select>
      </Form.Group> */}


              <Form.Group as={Col} controlId="formGridRegStaff">
                <Form.Label id="staff">Staff</Form.Label>
                <AsyncTypeahead
                  id="basic-typeahead-single"
                  labelKey={label_key2}
                  placeholder="staff"
                  isLoading={isLoading2}
                  onSearch={(search) => handleSearch2(search)}
                  onChange={handleSelect2}
                  options={stf2}
                  renderMenuItemChildren={(option) => (
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() => handleMenuItemClick2(option)}
                    >
                      <span>{option.staff_no}</span>
                      <span> {option.name}</span>
                    </div>
                  )}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridRegBranch">
                <Form.Label>Branch</Form.Label>
                <Form.Select defaultValue="Choose..." disabled>
                  <option>{selectedBranch}</option>
                </Form.Select>
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

export default Client;