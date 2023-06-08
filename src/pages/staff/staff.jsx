import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Navbar from "../../components/Navbar.jsx";
import Sidebar from "../../components/Sidebar.jsx";
import axios from "axios";
import cors from "cors";
import { useEffect, useContext } from "react";
import { BranchContext } from '../../context/branch_ctx';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';


function Staff() {

  const [staffOptions, setStaffOptions] = useState([]);
  // const { selectedBranch, setSelectedBranch } = useContext(BranchContext);

  useEffect(() => {
    const fetchStaffOptions = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/supervisor/${selectedBranch}`);
        const data = await response.json();
        if (Array.isArray(data)) {
          setStaffOptions(data);
        } else {
          setStaffOptions([]);
        }
        console.log(`data---->${data}`)
        // console.log(staffOptions)
      } catch (error) {
        console.error(error);
      }
    };
    fetchStaffOptions();
  }, []);
  //

///@@@@@@@@@@@@@@@@@@@@@@
  const { selectedBranch, setSelectedBranch } = useContext(BranchContext);
  const [stf, setstf] = useState([]);
  const [SelectedStaff, setSelectedStaff] = useState([]);

  // const handleSearch = async (query) => {
  //   try {

  //     const response = await fetch(`http://127.0.0.1:8000/api/supervisor/${selectedBranch}/search?q=${query}`);
  //     const data = await response.json();
  //     setstf(data);
  //     console.log(data)
  //     return data;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };


  // const handleSelect = (selected) => {
  //     console.log(selected)
  // };



  const handleSelect = (selected) => {
    // if(selected && selected.length > 0 && selected.staff_no) {
    //   setSelectedStaff(selected);
    //   console.log(selected)
    // }
    console.log(selected)
  };


  //

  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    dob: "",
    sex: "",
    pos: "",
    salary: "",
    manager_bonus: "",
    branch_no: `${selectedBranch}`,
    supervisor_no: "",
    manager_date: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { dob, manager_date: managerDate } = formData;

    // Convert dob to yyyy-mm-dd format
    const dobParts = dob.split('-');
    const newDob = `${dobParts[2]}-${dobParts[1]}-${dobParts[0]}`;


    // Convert managerDate to yyyy-mm-dd format
    const managerDateParts = managerDate.split('-');
    const newManagerDate = `${managerDateParts[2]}-${managerDateParts[1]}-${managerDateParts[0]}`;

    const updatedFormData = {
      ...formData,
      dob: newDob,
      manager_date: newManagerDate,
    };
    console.log(formData);

    axios
      .post("http://127.0.0.1:8000/api/staff/", formData, cors())
      .then((response) => {
        // console.log(`data${formData}`);
        // TODO: handle success case
      })
      .catch((error) => {
        console.error(error);
        console.log(formData);
      });

    // console.log(formData);
  };

  return (
    <>
      <Navbar />
      <div className="formBranchContainer">
        <Sidebar />
        <div className="formBranchContainer2">
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridFname">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  placeholder="Enter First Name"
                  name="fname"
                  value={formData.fname}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridLname">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  placeholder="Enter Last Name"
                  name="lname"
                  value={formData.lname}
                  onChange={handleChange}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridDOB">
                <Form.Label>DOB</Form.Label>
                <Form.Control
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridSex">
                <Form.Label>Sex</Form.Label>
                <Form.Control
                  placeholder="Gender"
                  name="sex"
                  value={formData.sex}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridPOS">
                <Form.Label>Position</Form.Label>
                <Form.Select
                  name="pos"
                  value={formData.pos}
                  onChange={handleChange}
                >
                  <option value="">Select...</option>
                  <option value="manager">Manager</option>
                  <option value="employee">Assistant</option>
                  <option value="supervisor">Supervisor</option>
                </Form.Select>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridSalary">
                <Form.Label>Salary</Form.Label>
                <Form.Control
                  placeholder="Salary"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridManagerBonus">
                <Form.Label>Manager Bonus</Form.Label>
                <Form.Control
                  placeholder="Manager Bonus"
                  name="manager_bonus"
                  value={formData.manager_bonus}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridRegBranch">
                <Form.Label>Branch</Form.Label>
                <Form.Select defaultValue="Choose..." disabled>
                  <option>{selectedBranch}</option>
                </Form.Select>
              </Form.Group>

            </Row>

            <Row className="mb-3">

            <Form.Group as={Col} controlId="formGridRegStaff">
                <Form.Label>Supervisor</Form.Label>
                <Form.Control as="select" defaultValue="Choose..." name="supervisor_no" value={formData.staff_no} onChange={handleChange}>
                  <option>Choose...</option>
                  {staffOptions?.map((staff) => (
                    <option key={staff.staff_no} value={staff.staff_no}>
                      {staff.staff_no}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              {/* <Form.Group as={Col} controlId="formGridStaff">
                <Form.Label>Staff</Form.Label>
                <AsyncTypeahead
                  id="basic-typeahead-single"
                  labelKey="name"
                  isLoading={isLoading}
                  onSearch={(search) => handleSearch(search)}
                  onChange={handleSelect}
                  options={stf}
                  selected={selectedStaff}
                  renderMenuItemChildren={(option) => (
                    <div>
                      <span>{option && option.staff_no && `${option.staff_no}`}</span>
                      <span> {option.name}</span>
                    </div>
                  )}
                />
              </Form.Group> */}
              
              {/* <Form.Group as={Col} controlId="formGridRegStaff">
                <Form.Label id="staff">staff_no</Form.Label>
                <AsyncTypeahead
                  id="basic-typeahead-single"
                  labelKey="staff_no"
                  placeholder="Supervisor"
                  onSearch={(search) => handleSearch(search)}
                  onChange={handleSelect}
                  options={stf}
                  renderMenuItemChildren={(option) => (
                    <div>
                      <span>{option.staff_no}</span>
                    </div>
                  )}
                />
              </Form.Group> */}

              {/* <Form.Group as={Col} controlId="formGridSupervisorNo">
                <Form.Label>Supervisor Number</Form.Label>
                <Form.Control
                  placeholder="Supervisor Number"
                  name="supervisor_no"
                  value={formData.supervisor_no}
                  onChange={handleChange}
                />
              </Form.Group> */}
              <Form.Group as={Col} controlId="formGridManagerDate">
                <Form.Label>Manager Date</Form.Label>
                <Form.Control
                  type="date"
                  name="manager_date"
                  value={formData.manager_date}
                  onChange={handleChange}
                />
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

export default Staff;