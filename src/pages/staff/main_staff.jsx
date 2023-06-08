import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Navbar from "../../components/Navbar.jsx";
import Sidebar from "../../components/Sidebar.jsx";
import axios from "axios";
import cors from "cors";
import { useContext } from "react";
import { BranchContext } from '../../context/branch_ctx';

function Staff2() {

  const { selectedBranch, setSelectedBranch } = useContext(BranchContext);
  console.log(`staff-branch=>${selectedBranch}`)

  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    dob: "",
    sex: "",
    pos: "",
    salary: "",
    manager_bonus: "",
    branch_no: "",
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
      .post("http://127.0.0.1:8000/api/staff/", formData,cors())
      .then((response) => {
        // console.log(`data${formData}`);
        // TODO: handle success case
      })
      .catch((error) => {
        console.error(error);
        // TODO: handle error case
      });

      // console.log(formData);
  };

  return (
    <>
      <Navbar />
      <div className="d-flex">
        <Sidebar />
        <div className="flex-fill p-2 mx-3 my-4">
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
                <Form.Control
                  placeholder="Position"
                  name="pos"
                  value={formData.pos}
                  onChange={handleChange}
                />
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
              <Form.Group as={Col} controlId="formGridBranchNo">
                <Form.Label>Branch Number</Form.Label>
                <Form.Control
                  placeholder="Branch Number"
                  name="branch_no"
                  value={formData.branch_no}
                  onChange={handleChange}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridSupervisorNo">
                <Form.Label>Supervisor Number</Form.Label>
                <Form.Control
                  placeholder="Supervisor Number"
                  name="supervisor_no"
                  value={formData.supervisor_no}
                  onChange={handleChange}
                />
              </Form.Group>
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

export default Staff2;