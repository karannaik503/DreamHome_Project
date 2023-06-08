import Container from 'react-bootstrap/Container';
import { useContext, useState, useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import { AsyncTypeahead, Typeahead } from 'react-bootstrap-typeahead';
import React from 'react';
import { BranchContext } from '../context/branch_ctx';
import { NavLink } from 'react-router-dom';


// import '../components/';


function BasicExample() {
  const [selected, setSelected] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [inputClassName, setInputClassName] = useState('');
  const { selectedBranch, setSelectedBranch } = useContext(BranchContext);
  // const [placeholder, setPlaceholder] = useState(`Branch: ${selectedBranch}`);

  // useEffect(() => {
  //   setSelected([{ branch_no: selectedBranch }]);
  // }, [selectedBranch]);

  const handleSearch = async (query) => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/branch/search?q=${query}`);
      const data = await response.json();
      setOptions(data);
      setIsLoading(false);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelect = (selected) => {
    if (selected && selected.length > 0 && selected[0].branch_no) {
      console.log(selected)
      setSelected(selected);
      setInputClassName('my-input-class');
      setSelectedBranch(selected[0].branch_no);
    }
  };

  const filterByFields = (option, query) => {
    const branchNo = option.branch_no.toLowerCase();
    const address = option.address.toLowerCase();
    const q = typeof query === 'string' ? query.toLowerCase() : '';
    return branchNo.includes(q) || address.includes(q);
  };

  return (
    <Navbar bg="secondary" expand="lg" >
      <Container>
        <Navbar.Brand href="#home">Dream Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto d-flex justify-content-center align-items-center">
            <AsyncTypeahead
              id="basic-typeahead-single"
              labelKey="branch_no"
              placeholder={selectedBranch ? `Branch: ${selectedBranch}` : 'Please select a branch'}
              isLoading={isLoading}
              onSearch={(search) => handleSearch(search)}
              onChange={handleSelect}
              options={options}
              filterBy={(option, text) => filterByFields(option, text)}

              renderMenuItemChildren={(option, props) => (
                <div onClick={() => {
                  if (option && option.branch_no) { // Check if option and branch_no exist
                    setSelected([option.branch_no]); // Update selected state with branch_no
                  }
                  if (props.onClick) {
                    props.onClick(option);
                  }
                }}>
                  {option && option.branch_no && option.address ? `${option.branch_no}-${option.address}` : ''}
                </div>
              )}
            // renderMenuItemChildren={(option, props) => (
            //   <div onClick={() => {
            //     if (option && option.branch_no) { //@#@#@# check if option and branch_no exist
            //       setSelected([option.branch_no]); // update selected state with branch_no
            //     } // update selected state with branch_no
            //       if (props.onClick) {
            //         props.onClick(option);
            //       }
            //   }}>
            //     {option && option.branch_no && option.address ? `${option.branch_no}-${option.address}` : ''}
            //   </div>
            // )}

            />

            <NavDropdown title="Forms" id="basic-nav-dropdown">
              <NavDropdown.Item as={NavLink} to="/branch" activeClassName="activeClicked">
                Branch
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/client" activeClassName="activeClicked">
                Client
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/propertyForRent" activeClassName="activeClicked">
                Property for rent
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/privateowner" activeClassName="activeClicked">
                Private Owner
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/staff" activeClassName="activeClicked">
                Staff
              </NavDropdown.Item>
              {/* <NavDropdown.Item href="/staff">
                Staff
              </NavDropdown.Item>
              <NavDropdown.Item href="/staff">
                Branch
              </NavDropdown.Item>
              <NavDropdown.Item href="/client">
                Client
              </NavDropdown.Item>
              <NavDropdown.Item href="/propertyForRent">
                Property for rent
              </NavDropdown.Item>
              <NavDropdown.Item href="/privateowner">
                Private Owner
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.4">
                Form
              </NavDropdown.Item> */}
              {/* <NavDropdown.Divider /> */}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default React.memo(BasicExample);



// import Container from 'react-bootstrap/Container';
// import { useState } from 'react';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
// import Button from 'react-bootstrap/Button';
// import ButtonGroup from 'react-bootstrap/ButtonGroup';
// import Dropdown from 'react-bootstrap/Dropdown';
// import { AsyncTypeahead,Typeahead } from 'react-bootstrap-typeahead';

// function BasicExample() {
//   const [selected, setSelected] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [options, setOptions] = useState([]);

//   const handleSearch = async (query) => {
//     setIsLoading(true);
//     try {
//       const response = await fetch(`http://127.0.0.1:8000/api/branch/search?q=${query}`);
//       const data = await response.json();
//       setOptions(data);
//       setIsLoading(false);
//       return data;
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <Navbar bg="secondary" expand="lg" >
//       <Container>
//         <Navbar.Brand href="#home">Dream Home</Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="ms-auto d-flex justify-content-center align-items-center">
//           <AsyncTypeahead
//       id="basic-typeahead-single"
//       labelKey={["branch_no", "address"]}
//       placeholder="Branch"
//       isLoading={isLoading}
//       onSearch={(search) => handleSearch(search)}
//       onChange={setSelected}
//       options={options}
//       renderMenuItemChildren={(option, props) => (
//         <div onClick={() => props.onClick(option)}>
//           {option.branch_no}-{option.address}
//         </div>
//       )}
//     />
//             <NavDropdown title="Forms" id="basic-nav-dropdown">
//               <NavDropdown.Item href="/staff">
//                 Staff
//               </NavDropdown.Item>
//               <NavDropdown.Item href="/staff">
//                 Branch
//               </NavDropdown.Item>
//               <NavDropdown.Item href="/client">
//                 Client
//               </NavDropdown.Item>
//               <NavDropdown.Item href="/propertyForRent">
//                 Property for rent
//               </NavDropdown.Item>
//               <NavDropdown.Item href="/privateowner">
//                 Private Owner
//               </NavDropdown.Item>
//               {/* <NavDropdown.Divider /> */}
//               <NavDropdown.Item href="#action/3.4">
//                 Form
//               </NavDropdown.Item>
//             </NavDropdown>
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// }

// export default BasicExample;


// import Container from 'react-bootstrap/Container';
// import { useState } from 'react';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
// import Button from 'react-bootstrap/Button';
// import ButtonGroup from 'react-bootstrap/ButtonGroup';
// import Dropdown from 'react-bootstrap/Dropdown';
// import { AsyncTypeahead,Typeahead } from 'react-bootstrap-typeahead';

// function BasicExample() {
//   const [selected, setSelected] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSearch = async (query) => {
//     setIsLoading(true);

//     try {
//       const response = await fetch(`/branch/search?query=${query}`);
//       const data = await response.json();

//       setIsLoading(false);
//       return data;
//     } catch (error) {
//       console.error(error);
//     }

//   return (
//     <Navbar bg="secondary" expand="lg" >
//       <Container>
//         <Navbar.Brand href="#home">Dream Home</Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="ms-auto d-flex justify-content-center align-items-center">
//           <AsyncTypeahead
//       id="basic-typeahead-single"
//       labelKey="branch_no"
//       placeholder="Branch"
//       isLoading={isLoading}
//       onSearch={handleSearch}
//       onChange={setSelected}
//       renderMenuItemChildren={(option, props) => (
//         <div onClick={() => props.onClick(option)}>
//           {option.address}
//         </div>
//       )}
//     />
//             <NavDropdown title="Forms" id="basic-nav-dropdown">
//               <NavDropdown.Item href="/staff">
//                 Staff
//               </NavDropdown.Item>
//               <NavDropdown.Item href="/staff">
//                 Branch
//               </NavDropdown.Item>
//               <NavDropdown.Item href="/client">
//                 Client
//               </NavDropdown.Item>
//               <NavDropdown.Item href="/propertyForRent">
//                 Property for rent
//               </NavDropdown.Item>
//               <NavDropdown.Item href="/privateowner">
//                 Private Owner
//               </NavDropdown.Item>
//               {/* <NavDropdown.Divider /> */}
//               <NavDropdown.Item href="#action/3.4">
//                 Form
//               </NavDropdown.Item>
//             </NavDropdown>
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// }
// }
// export default BasicExample;

// import Container from 'react-bootstrap/Container';
// import { useState } from 'react';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
// import Button from 'react-bootstrap/Button';
// import ButtonGroup from 'react-bootstrap/ButtonGroup';
// import Dropdown from 'react-bootstrap/Dropdown';
// import { Typeahead } from 'react-bootstrap-typeahead';

// function BasicExample() {
//   const [selected, setSelected] = useState([]);
//   return (
//     <Navbar bg="secondary" expand="lg" >
//       <Container>
//         <Navbar.Brand href="#home">Dream Home</Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="ms-auto d-flex justify-content-center align-items-center">
//           <Typeahead
//       id="basic-typeahead-single"
//       labelKey="name"
//       options={[
//         { name: 'Action' },
//         { name: 'Another action' },
//         { name: 'Something else' },
//       ]}
//       placeholder="Branch"
//       selected={selected}
//       onChange={setSelected}
//       renderMenuItemChildren={(option, props) => (
//         <div onClick={() => props.onClick(option)}>
//           {option.name}
//         </div>
//       )}
//     />
//             <NavDropdown title="Forms" id="basic-nav-dropdown">
//               <NavDropdown.Item href="/staff">
//                 Staff
//               </NavDropdown.Item>
//               <NavDropdown.Item href="/staff">
//                 Branch
//               </NavDropdown.Item>
//               <NavDropdown.Item href="/client">
//                 Client
//               </NavDropdown.Item>
//               <NavDropdown.Item href="/propertyForRent">
//                 Property for rent
//               </NavDropdown.Item>
//               <NavDropdown.Item href="/privateowner">
//                 Private Owner
//               </NavDropdown.Item>
//               {/* <NavDropdown.Divider /> */}
//               <NavDropdown.Item href="#action/3.4">
//                 Form
//               </NavDropdown.Item>
//             </NavDropdown>
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// }

// export default BasicExample;