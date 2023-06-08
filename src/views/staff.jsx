
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Table from '../helpers/staffTable';
import Display_fields from "../helpers/staff_textfield"

function staff() {
  return (
    <>
      {/* <Container> */}
      <Navbar />

      <div className="d-flex">
        <Sidebar />
        <div className="flex-fill p-2 mx-3 my-4">
          <h1 className="text-center">Staff Listing</h1>
          <Display_fields />
          <Table />
        </div>
      </div>
    </>
  );
}

export default staff;