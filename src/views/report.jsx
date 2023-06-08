import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar'
import ReportTable from '../helpers/reportTable';
import Property_textfield from '../helpers/report_textfield';
import { useParams } from 'react-router-dom';


function ReportView() {
  const { propertyno } = useParams();

  return (
    <>
      {/* <Container> */}
      <Navbar />

      <div className="d-flex">
        <Sidebar />
        <div className="flex-fill p-2 mx-3 my-4">
          <h1 className="text-center">Staff Listing</h1>
          <Property_textfield propertyNo={propertyno} />
          <ReportTable propertyNo={propertyno} />
        </div>
      </div>
    </>
  );

  
}

export default ReportView;
