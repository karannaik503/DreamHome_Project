
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Table from '../helpers/branchTable';
// import Display_fields from "../helpers/staff_textfield"

function BranchView() {
  return (
    <>
      {/* <Container> */}
      <Navbar/>
      <div className="d-flex">
        <Sidebar />
        <div className="flex-fill p-2 mx-3 my-4">
          <h1 className="text-center">Branches</h1>
          <Table />
        </div>
      </div>
      {/* </Container> */}
    </>
  );
}

export default BranchView;