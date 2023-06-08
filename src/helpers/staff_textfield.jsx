import React, { useState, useEffect } from 'react';

function Staff_textfield() {
  const [propertyData, setPropertyData] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/stafflisting/B00004/')
      .then(response => response.json())
      .then(data => setPropertyData(data),
      );
  }, []);
  return (
    <>
      {propertyData && (
        <div className="container text-center my-4">
          <div className="row ">
            <div className="col shadow-sm m-2 " style={{ backgroundColor: '#f8f9fa' }}>
              <h4>Branch no.</h4>
              <p>{propertyData.branch.branch_no}</p>
            </div>
            <div className="col shadow-sm m-2 " style={{ backgroundColor: '#f8f9fa' }}>
              <h4>Branch address</h4>
              <p>{propertyData.branch.address}</p>
            </div>

            <div className="col shadow-sm m-2 " style={{ backgroundColor: '#f8f9fa' }}>
              <h4>Telephone no.</h4>
              <p>{propertyData.branch.telno}</p>
            </div>
            <div className="col shadow-sm m-2 " style={{ backgroundColor: '#f8f9fa' }}>
              <h4>Manager</h4>
              <p>{propertyData.manager_name}</p>
            </div>

            <div className="col shadow-sm m-2 " style={{ backgroundColor: '#f8f9fa' }}>
              <h4>No. of employees </h4>
              <p>{propertyData.length}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
//   return (
//     <>
//       <div className="container text-center my-4">
//         <div className="row ">
//           <div className="col shadow-sm m-2 " style={{ backgroundColor: '#f8f9fa' }}>
//             <h4>Branch no.</h4>
//             <p>dynamic data</p>
//           </div>
//           <div className="col shadow-sm m-2 " style={{ backgroundColor: '#f8f9fa' }}>
//             <h4>Branch address</h4>
//             <p>dynamic data</p>
//           </div>

//           <div className="col shadow-sm m-2 " style={{ backgroundColor: '#f8f9fa' }}>
//             <h4>Telephone no.</h4>
//             <p>dynamic data</p>
//           </div>
//           <div className="col shadow-sm m-2 " style={{ backgroundColor: '#f8f9fa' }}>
//             <h4>Manager</h4>
//             <p>dynamic data</p>
//           </div>

//           <div className="col shadow-sm m-2 " style={{ backgroundColor: '#f8f9fa' }}>
//             <h4>No. of employees </h4>
//             <p>dynamic data</p>
//           </div>
//         </div>
//       </div>
// </>
//   );
}

export default Staff_textfield;