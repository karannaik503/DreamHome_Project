
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Table from '../helpers/propertyTable';
import Display_fields from "../helpers/property_textfield"

// import Display_fields from "../helpers/staff_textfield"

function PropertyView() {
  return (
    <>
      {/* <Container> */}
      <Navbar/>
      <div className="d-flex">
        <Sidebar />
        <div className="flex-fill p-2 mx-3 my-4">
          <h1 className="text-center">Property Listing</h1>
          <Display_fields />
          <Table />
        </div>
      </div>
      {/* </Container> */}
    </>
  );
}

export default PropertyView;