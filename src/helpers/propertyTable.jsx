import { useContext, useState, useEffect } from "react";
import { Table, Button } from 'react-bootstrap';
import axios from "axios";
import { BranchContext } from '../context/branch_ctx';
import { Link, NavLink } from "react-router-dom";
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { faFile } from '@fortawesome/free-solid-svg-icons';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function PropertyByBranchTable({ branchNo }) {

    const [branchData, setBranchData] = useState(null);
    const { selectedBranch } = useContext(BranchContext);
    const [propertyMatchCounts, setPropertyMatchCounts] = useState({});

    useEffect(() => {
        axios
            .get(`http://127.0.0.1:8000/api/propertieslisting/${selectedBranch}/`)
            .then((response) => {
                setBranchData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [selectedBranch]);

    useEffect(() => {
        const fetchPropertyMatchCounts = async () => {
            const counts = {};
            for (const property of branchData.property) {
                const response = await axios.get(`http://127.0.0.1:8000/api/propertymatch/${property.propertyno}`);
                counts[property.propertyno] = response.data.length;
            }
            setPropertyMatchCounts(counts);
        };
        if (branchData) {
            fetchPropertyMatchCounts();
        }
    }, [branchData]);

    const handleDelete = (propertyId) => {
        axios
            .delete(`http://127.0.0.1:8000/api/properties/${propertyId}/`)
            .then((response) => {
                // Remove the deleted row from the table
                setBranchData(prevBranchData => ({
                    ...prevBranchData,
                    property: prevBranchData.property.filter(property => property.id !== propertyId)
                }));
                // setPropertyData(propertyData.filter(property => property.propertyno !== propertyId));
            })
            .catch((error) => {
                console.log(error);
            }); 
    };

    if (!branchData) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <h2>{branchData.branch_name}</h2>
            <Table striped bordered hover variant="light">
                <thead>
                    <tr>
                        <th>Property Name</th>
                        <th>Property Type</th>
                        <th>Rent Price</th>
                        <th>Address</th>
                        <th>Rooms</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {branchData.property &&
                        branchData.property.map((property) => (
                            <tr key={property.id}>
                                <td>
                                    <NavLink to={`/propertyForRent/${property.propertyno}`}>
                                        {property.propertyno}
                                    </NavLink>
                                </td>
                                <td>{property.proptype}</td>
                                <td>{property.rent}</td>
                                <td style={{ maxWidth: '200px', whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", wordWrap: "break-word" }}>{property.address}</td>
                                <td>{property.rooms}</td>
                                <td>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <NavLink to={`/report/${property.propertyno}`}>
                                            <FontAwesomeIcon icon={faComment} style={{ color: "#000000", }} />
                                        </NavLink>{"   "}
                                        <NavLink>
                                            <button onClick={() => handleDelete(property.propertyno)} style={{ border: "none" }} >
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>
                                        </NavLink>{" "}{" "}
                                        <NavLink to={`/property-report/${property.propertyno}`} style={{ marginRight: '53px' }}>
                                            <FontAwesomeIcon icon={faFile} style={{ color: "#000000", }} />
                                        </NavLink>{" "}

                                        <NavLink to={`/propertymatch/${property.propertyno}`}>
                                            <span>{propertyMatchCounts[property.propertyno]} matches</span>
                                        </NavLink>
                                        <NavLink to={`/lease/${property.propertyno}`}>
                                            <Button variant="outline-info" size="sm">Lease</Button>
                                        </NavLink>
                                    </div>

                                </td>
                            </tr>
                        ))}
                </tbody>
            </Table>
        </>
    );
}

export default PropertyByBranchTable;
