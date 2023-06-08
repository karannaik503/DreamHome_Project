import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Branch from './pages/branchForm/branch';
import Home from './pages/home/home';
import Staff from './pages/staff/staff';
import StaffDetail from './views/staff_detail';
import Client from './pages/client/client';
import ClientDetail from './views/client_detail';
import PropertyForRent from './pages/propertyForRent/propertyForRent';
import PrivateOwner from './pages/privateOwner/privateOwner';
import StaffView from './views/staff'
import BranchView from './views/branch'
import PropertyView from './views/property'
import PropertyDetail from './views/property_detail'
import ReportView from './views/report';
import MatchView from './views/match';
import Lease from './pages/lease/lease'
import ReportForm from './pages/Report/viewReport';
import LeaseView from './views/lease_view'
import LeaseFinal from './views/leasefinal';
import { BranchProvider } from './context/branch_ctx';


function App() {
  return (
    <>
        <BranchProvider>
      <Router>
        <Routes>
        <Route path="/home" element={<Home />}/>
        <Route path="/branch" element={<Branch />}/>
        <Route path="/staff" element={<Staff />}/>
        <Route path="/staff/:staffNo" element={<StaffDetail />}/>
        <Route path="/client" element={<Client />}/>
        <Route path="/client/:clientNo" element={<ClientDetail />}/>
        <Route path="/propertyForRent" element={<PropertyForRent/>}/>
        <Route path="/propertyForRent/:propertyNo" element={<PropertyDetail/>}/>
        <Route path="/privateOwner" element={<PrivateOwner/>}/>
        <Route path="/staff-view" element={<StaffView/>}/>
        <Route path="/branch-view" element={<BranchView/>}/>
        <Route path="/property-view" element={<PropertyView/>}/>
        <Route path="/property-report/:propertyno" element={<ReportView/>}/>
        <Route path="/propertymatch/:propertyno?" element={<MatchView/>}/>
        <Route path="/lease/:propertyno" element={<Lease />}/>
        <Route path="/report/:propertyno" element={<ReportForm/>}/>
        <Route path="/lease-view" element={<LeaseView/>}/>
        <Route path="/lease-final" element={<LeaseFinal/>}/>
        </Routes>
      </Router>
      </BranchProvider>
    </>
  );
}

export default App;
