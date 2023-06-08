import React, { useState, useEffect } from 'react';

function Property_textfield({propertyNo}) {
  const [propertyData, setPropertyData] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/propertyreportlisting/${propertyNo}/`)
      .then(response => response.json())
      .then(data => setPropertyData(data));
  }, []);
  
  return (
    <>
      {propertyData && (
        <div className="container text-center my-4">
          <div className="row ">
            <div className="col shadow-sm m-2 " style={{ backgroundColor: '#f8f9fa' }}>
              <h4>Property no.</h4>
              <p>{propertyData.property.propertyno}</p>
            </div>
            <div className="col shadow-sm m-2 " style={{ backgroundColor: '#f8f9fa' }}>
              <h4>Property address</h4>
              <p>{propertyData.property.address}</p>
            </div>

            <div className="col shadow-sm m-2 " style={{ backgroundColor: '#f8f9fa' }}>
              <h4>Type</h4>
              <p>{propertyData.property.proptype}</p>
            </div>
            <div className="col shadow-sm m-2 " style={{ backgroundColor: '#f8f9fa' }}>
              <h4>Rooms</h4>
              <p>{propertyData.property.rooms}</p>
            </div>

            <div className="col shadow-sm m-2 " style={{ backgroundColor: '#f8f9fa' }}>
              <h4>Rent </h4>
              <p>{propertyData.property.rent}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Property_textfield;