import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Navbar from "../../components/Navbar.jsx"
import Sidebar from "../../components/Sidebar.jsx"

import React, { useContext, useState, useEffect } from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { BranchContext } from '../../context/branch_ctx';


function Client() {
  const { selectedBranch, setSelectedBranch } = useContext(BranchContext);

  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    regbranch:`${selectedBranch}`,
    preference: "",
    maxrent: "",
    regdate: "",
    regstaff: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form data:', formData);
    fetch('http://127.0.0.1:8000/api/client/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        alert("Form has been submitted")
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        // handle successful response here
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  //@@@@@@@@@@@@@@@@@@@@@@@@@@2
  const [label_key, setLabel_key] = useState("name");
  const [boolean, setBoolean] = useState(false);

  const handleMenuItemClick = (selected) => {
    setLabel_key("staff_no");
    setBoolean(true);
    setFormData((prevState) => ({
      ...prevState,
      regstaff: selected.staff_no // Set regStaff to the selected staff's staff_no value
    }));
  }

  const handleSelect = (selected) => {
    // if(selected && selected.length > 0 && selected[0].branch_no) {
    console.log(selected)
    if (boolean) {
      setLabel_key("staff_no");
      setBoolean(false);
    } else {
      setLabel_key("name");
    }
    // }
  };
  //@@@@@@@@@@@@@@@@@@@@@@@@@@2


  const [staffOptions, setStaffOptions] = useState([]);

  useEffect(() => {
    const fetchStaffOptions = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/preferences/');
        const data = await response.json();
        setStaffOptions(data);
        console.log(staffOptions)
      } catch (error) {
        console.error(error);
      }
    };
    fetchStaffOptions();
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const [stf, setstf] = useState([]);

  const handleSearch = async (query) => {
    setIsLoading(true);
    try {

      const response = await fetch(`http://127.0.0.1:8000/api/staff/${selectedBranch}/search?q=${query}`);
      const data = await response.json();
      setstf(data);
      console.log(data)
      setIsLoading(false);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  // const handleSelect = (selected) => {
  //   // if(selected && selected.length > 0 && selected[0].branch_no) {
  //     console.log(selected)
  //     // setSelected(selected);
  //     // setInputClassName('my-input-class');
  //     // setSelectedBranch(selected[0].branch_no);
  //   // }
  // };

  return (
    <>
      <Navbar />
      <div className='formBranchContainer'>
        <Sidebar />
        <div className='formBranchContainer2'>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">

              <Form.Group as={Col} controlId="formGridFname">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  name="fname"
                  placeholder="Enter First Name"
                  value={formData.fname}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridLname">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  name="lname"
                  placeholder="Enter Last Name"
                  value={formData.lname}
                  onChange={handleChange}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridRegBranch">
                <Form.Label>Branch</Form.Label>
                <Form.Select defaultValue="Choose..." disabled>
                  <option>{selectedBranch}</option>
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridRegStaff">
                <Form.Label>Preference Types</Form.Label>
                <Form.Control as="select" defaultValue="Choose..." name="preference"
                  value={formData.preference}
                  onChange={handleChange}>
                  <option>Choose...</option>
                  {staffOptions.map((staff) => (
                    <option key={staff.id} value={staff.id}>
                      {staff.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              {/* <Form.Group as={Col} controlId="formGridPrefType">
      <Form.Label>Preference Type</Form.Label>
      <Form.Control  placeholder="Enter Preference" />
      </Form.Group> */}
              <Form.Group as={Col} controlId="formGridMaxRent">
                <Form.Label>Max. Rent</Form.Label>
                <Form.Control
                  name="maxrent"
                  placeholder="Enter Max. Rent"
                  value={formData.maxrent}
                  onChange={handleChange}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridRegDate">
                <Form.Label>Registration Date</Form.Label>
                <Form.Control
                  name="regdate"
                  type="date"
                  value={formData.regdate}
                  onChange={(event) =>
                    handleChange({
                      target: {
                        name: "regdate",
                        value: event.target.value,
                      },
                    })
                  }
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridRegStaff">
                <Form.Label id="staff">Staff</Form.Label>
                <AsyncTypeahead
                  id="basic-typeahead-single"
                  labelKey={label_key}
                  placeholder="staff"
                  isLoading={isLoading}
                  onSearch={(search) => handleSearch(search)}
                  onChange={handleSelect}
                  options={stf}
                  renderMenuItemChildren={(option) => (
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() => handleMenuItemClick(option)}
                    >
                      <span>{option.staff_no}</span>
                      <span>  {option.name}</span>
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
      </Form.Group>       */}
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