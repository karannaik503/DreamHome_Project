import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import MatchTable from '../helpers/matchTable';
import Display_fields from "../helpers/match_textfield"
import { useParams } from 'react-router-dom';

function MatchView() {
  const { propertyno } = useParams();

  return (
    <>
      {/* <Container> */}
      <Navbar />
      <div className="d-flex">
        <Sidebar />
        <div className="flex-fill p-2 mx-3 my-4">
          <h1 className="text-center">Property Listing</h1>
          {propertyno ? (
            <><Display_fields propertyNo={propertyno} />
            <MatchTable propertyNo={propertyno} style={{ paddingLeft: 0, marginLeft: 0 }} /></>
          ) : (
            <p>Please choose a property</p>
          )}
        </div>
      </div>
      {/* </Container> */}
    </>
  );

  // return (
  //   <>
  //     <Navbar/>
  //     <Row>
  //       <Col sm={3}>
  //         <Sidebar style={{ paddingRight: 0, marginRight: 0 }} />
  //       </Col>
  //       <Col sm={9}>
  //         {propertyno ? (
  //           <MatchTable propertyNo={propertyno} style={{ paddingLeft: 0, marginLeft: 0 }} />
  //         ) : (
  //           <p>Please choose a property</p>
  //         )}
  //       </Col>
  //     </Row>
  //   </>
  // );
}

export default MatchView;
