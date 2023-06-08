import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Navbar from "../../components/Navbar.jsx";
import Sidebar from "../../components/Sidebar.jsx";
import { useParams } from 'react-router-dom';

function Report() {
  const { propertyno } = useParams();
  return (
    <>
      <Navbar />
      <div className='formBranchContainer'>
        <Sidebar />
        <div className='formBranchContainer2'>
          <Form>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridPropNum">
                <Form.Label>Property Number</Form.Label>
                <Form.Select defaultValue={propertyno}>
                  <option>{propertyno}</option>
                  <option>...</option>
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col} controlId="formGridClientNum">
                <Form.Label>Client Number</Form.Label>
                <Form.Select defaultValue="Choose...">
                  <option>Choose...</option>
                  <option>...</option>
                </Form.Select>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridViewDate">
                <Form.Label>View Date</Form.Label>
                <Form.Control type="date" defaultValue={new Date().toISOString().substr(0, 10)} />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridComment">
                <Form.Label>Comment</Form.Label>
                <Form.Control as="textarea" rows={3} />
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

export default Report;
