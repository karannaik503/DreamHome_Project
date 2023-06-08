
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Table from '../views/lease_view';
import Table2 from '../views/inactivelisting'

function LeaseFinal() {
  return (
    <>
      {/* <Container> */}
      <Navbar />

      <div className="d-flex">
        <Sidebar />
        <div className="flex-fill p-2 mx-3 my-4">
          <h1 className="text-center">Active Listing</h1>
          <Table />
          <h1 className="text-center">InActive Listing</h1>
          <Table2 />
        </div>
      </div>
    </>
  );
}

export default LeaseFinal;