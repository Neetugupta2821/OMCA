import React from 'react'
import { Link } from 'react-router-dom'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useState, useEffect } from 'react'
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import TextField from "@mui/material/TextField";
import { useSelector, useDispatch } from 'react-redux'
import { GetAllServices } from '../../reducer/ServiceSlice'
import { useNavigate } from "react-router-dom";
import { image } from '../../Basurl/Baseurl'
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import { ActiveService } from '../../reducer/ServiceSlice'

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Swal from "sweetalert2";
import InputAdornment from "@mui/material/InputAdornment";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
export default function AllServices() {
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [rows, setRows] = useState([]);
    const [filterValue, setFilterValue] = useState("");
    const dispatch = useDispatch()
    const { Service, loading, error } = useSelector((state) => state.Service)
    const [seekerStatus, setSeekerStatus] = React.useState({});
    const [searchApiData, setSearchApiData] = useState([]);
    useEffect(() => {

        dispatch(GetAllServices())
        console.log(error, Service)
    }, [dispatch])

    useEffect(() => {
        if (Service) {
            setRows(Service);
            setSearchApiData(Service)

        }
    }, [Service]);
    console.log(Service)

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const EditButton = (e, id) => {
        navigate("/Admin/edit-patient", {
            state: {
                patientId: id,

            },
        })
    }
    const PatientDetail = (e, id) => {
        navigate("/Admin/Patient-Detail", {
            state: {
                patientId: id,

            },
        })
    }

    // const handledelet =(e,id)=>{
    //   e.preventDefault();
    //   alert("dcvdfg")
    //   console.log(id)
    // }
    const handledelet = (e, patientId) => {

        e.preventDefault();


    };


    const handleChange = (event, id) => {
        const { value } = event.target;
        setSeekerStatus(value)

    }


    const dataActiveInactive = async (id, currentState) => {
        try {
            const result = await dispatch(ActiveService({ id: id })).unwrap();
            console.log("API Response:", result); // Debug API response
    
            // Ensure state updates correctly
            setRows((prevServices) =>
                prevServices.map((service) =>
                    service.serviceId === id 
                        ? { ...service, isActive: !currentState } // Toggle state in UI
                        : service
                )
            ); 
    
            // Swal.fire("Status!", !currentState ? "Activated." : "Deactivated.", "success");
            Swal.fire("Status!",  "Status updated successfully", "success");
        } catch (err) {
            console.error("Error:", err);
            const errorMessage = err?.message || JSON.stringify(err);
    
            Swal.fire({
                title: "Error!",
                text: errorMessage,
                icon: "error",
            });
        }
    };
    

    const handleClickOpen = async (e, id) => {
        e.preventDefault(); // Prevent default behavior of the event

        // try {
        //   // Dispatch the action and await its result
        //   const result = await dispatch(StatusPatient({ id: id, status: Number(seekerStatus) })).unwrap();

        //   // Show success alert
        //   Swal.fire("Success!", "Patient details updated successfully.", "success");
        //   dispatch(GetAllPatients());

        //   // Navigate to the patients page

        // } catch (err) {
        //   // Handle errors and show an error alert
        //   Swal.fire("Error!", err?.message || "An error occurred", "error");
        // }abcdefghijklmnokrstuvwxyz
        //abcdefghijklmnoqrstuvwxyz
        //abcdefghijklmnopqrstuvwxyz
    };

    const handleFilter = (event) => {
        if (event.target.value === "") {
            setRows(searchApiData);
        } else {
            const filterResult = searchApiData.filter((item) => {
                const enquiryId = item.serviceId?.toLowerCase() || "";
                // const emailMatches = item.job_Desciption.toLowerCase();
                const country = item.serviceName?.toLowerCase() || "";
                const searchValue = event.target.value.toLowerCase();

                // Check if the full name, last name, or email includes the search value
                return (
                    enquiryId.includes(searchValue) ||
                    country.includes(searchValue)
                );
            });
            setRows(filterResult);
        }
        setFilterValue(event.target.value);
    };
    const handleClearFilter = () => {
        setFilterValue("");
        setRows(searchApiData);
    };
    return (
        <>
            <div className="page-wrapper">
                <div className="content">
                    <div className="row">
                        <div className="col-md-12">
                            <h4 className="page-title">Manage Services</h4>
                        </div>
                    </div>
                    <div className="main_content">
                        <div className="row">
                            <div className="col-sm-4 col-md-9 col-lg-3">
                                <TextField
                                    sx={{ width: "100%" }}
                                    label="Search By Service Id and Name"
                                    id="outlined-size-small"
                                    size="small"
                                    value={filterValue}
                                    onChange={(e) => handleFilter(e)}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                {filterValue && (
                                                    <IconButton onClick={handleClearFilter} edge="end">
                                                        <ClearIcon />
                                                    </IconButton>
                                                )}
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </div>
                            <div className="col-sm-8 col-md-9 text-right m-b-20">
                                <Link to="/Admin/add-Services" className="btn btn btn-primary btn-rounded float-right"><i
                                    className="fa fa-plus"></i> New Services</Link>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="table-responsive">
                                    <TableContainer component={Paper} style={{ overflowX: 'auto' }}>
                                        <Table stickyHeader aria-label="sticky table">
                                            <TableHead>
                                                <TableRow style={{ "white-space": "nowrap" }}>
                                                    <TableCell align="left" style={{ minWidth: "80px", "fontWeight": "bold" }}  >
                                                        S. No.
                                                    </TableCell>
                                                    <TableCell align="left" style={{ minWidth: "60px", "fontWeight": "bold" }}>
                                                        Service ID
                                                    </TableCell>
                                                    <TableCell align="left" style={{ minWidth: "150px", "fontWeight": "bold" }}>
                                                        Service Name
                                                    </TableCell>
                                                    <TableCell align="left" style={{ minWidth: "150px", "fontWeight": "bold" }}>
                                                        Price
                                                    </TableCell>
                                                    <TableCell align="left" style={{ minWidth: "150px", "fontWeight": "bold" }}>
                                                        Duration
                                                    </TableCell>
                                                    {/* <TableCell align="left" style={{ minWidth: "150px", "fontWeight": "bold" }}>
                                                        description
                                                    </TableCell> */}
                                                    <TableCell align="left" style={{ minWidth: "150px", "fontWeight": "bold" }}>
                                                        Status
                                                    </TableCell>
                                                    {/* <TableCell align="left" style={{ minWidth: "150px", "fontWeight": "bold" }}>
                            View
                          </TableCell> */}

                                                    {/* <TableCell align="left" style={{ minWidth: "100px" }}>
                    candidateCounts
                  </TableCell> */}
                                                    {/* <TableCell align="left" style={{ minWidth: "85px", "fontWeight": "bold" }}>
                                                        Action
                                                    </TableCell> */}
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {(rows || [])
                                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                    .map((info, i) => (
                                                        <TableRow hover role="checkbox" tabIndex={-1} key={info.code || i}>
                                                            <TableCell align="left">{page * rowsPerPage + i + 1}</TableCell> {/* Corrected line */}
                                                            <TableCell>{info.serviceId}</TableCell>
                                                            <TableCell>{info.serviceName}</TableCell>
                                                            <TableCell>{info.price}</TableCell>
                                                            <TableCell>{info.duration}</TableCell>
                                                            {/* <TableCell>{info.description}</TableCell> */}
                                                            <TableCell align="left">
                                                                <BootstrapSwitchButton
                                                                    width={100}
                                                                    checked={Boolean(info.isActive)}  // Ensure it's always boolean
                                                                    onlabel="Active"
                                                                    offlabel="Inactive"
                                                                    onstyle="success"
                                                                    onChange={() => dataActiveInactive(info.serviceId, info.isActive)}
                                                                />
                                                            </TableCell>



                                                            {/* <TableCell align="left" className="dropdown dropdown-action">
                                                                <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                                                                    <i className="fa fa-ellipsis-v"></i>
                                                                </a>
                                                                <div className="dropdown-menu dropdown-menu-right">
                                                                    <a className="dropdown-item" onClick={(e) => EditButton(e, info.patientId)}>
                                                                        <i className="fa fa-pencil m-r-5"></i> Edit
                                                                    </a>
                                                                    <a className="dropdown-item" onClick={(e) => PatientDetail(e, info.patientId)}>
                                                                        <i className="fa fa-id-card-o m-r-5"></i> Detail
                                                                    </a>
                                                                    <a className="dropdown-item" onClick={(e) => handledelet(e, info.patientId)}>
                                                                        <i className="fa fa-trash-o m-r-5"></i> Delete
                                                                    </a>
                                                                </div>
                                                            </TableCell> */}
                                                        </TableRow>
                                                    ))}
                                            </TableBody>

                                        </Table>
                                        <TablePagination
                                            component="div"
                                            count={rows.length}
                                            page={page}
                                            onPageChange={handleChangePage}
                                            rowsPerPage={rowsPerPage}
                                            rowsPerPageOptions={[]}
                                        // onRowsPerPageChange={handleChangeRowsPerPage}
                                        />
                                    </TableContainer>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            {/* <div id="delete_patient" className="modal fade delete-modal" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body text-center">
              <img src="assets/img/sent.png" alt="" width="50" height="46" />
              <h3>Are you sure want to delete this Patient?</h3>
              <div className="m-t-20"> <a href="#" className="btn btn-white" data-dismiss="modal">Close</a>
                <button type="submit" className="btn btn-danger">Delete</button>
              </div>
            </div>
          </div>
        </div>

      </div> */}
        </>
    )
}
