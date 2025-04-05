import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { baseurl } from '../../Basurl/Baseurl';
import { useEffect } from 'react'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import InputAdornment from "@mui/material/InputAdornment";
export default function Appointments() {
  const [appointments, setAppointments] = useState([])
  const [searchApiData, setSearchApiData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
     const [filterValue, setFilterValue] = useState("");

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const EditButton = (e, id) => {
    // navigate("/Admin/edit-patient", {
    //   state: {
    //     patientId: id,

    //   },
    // })
  }
  const PatientDetail = (e, id) => {
    // navigate("/Admin/Patient-Detail", {
    //   state: {
    //     patientId: id,

    //   },
    // })
  }
  const getAppointments = () => {
    axios.get(`${baseurl}all_appointment`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response.data)
        if (response.status === 200) {
          setAppointments(response.data.data)
          setSearchApiData(response.data.data)
        } else {
          console.error("Failed to fetch job titles:", response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching job titles:", error);
      });
  };

  useEffect(() => {
    getAppointments();
  }, []);

  const handleFilter = (event) => {
    if (event.target.value === "") {
      setAppointments(searchApiData);
    } else {
      const filterResult = searchApiData.filter((item) => {
        const enquiryId = item.patientId?.toLowerCase() || "";
        // const emailMatches = item.job_Desciption.toLowerCase();
        const country = item.Hospital_name?.toLowerCase() || "";
        const searchValue = event.target.value.toLowerCase();

        // Check if the full name, last name, or email includes the search value
        return (
          enquiryId.includes(searchValue) ||
          country.includes(searchValue)
        );
      });
      setAppointments(filterResult);
    }
    setFilterValue(event.target.value);
  };
  const handleClearFilter = () => {
    setFilterValue("");
    setAppointments(searchApiData);
  };
  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="row">
            <div className="col-md-12">
              <h4 className="page-title">Manage Appointments</h4>
            </div>
          </div>
          <div className="main_content">
            <div className="row">
              <div className="col-sm-4 col-md-9 col-lg-3">
                <TextField
                  sx={{ width: "100%" }}
                  label="Search By Patient ID and Hospital name"
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
              {/* <div className="col-sm-8 col-9 text-right m-b-20">
                <Link to="/Admin/add-appointments" className="btn btn btn-primary btn-rounded float-right"><i
                  className="fa fa-plus"></i> New Appointment</Link>
              </div> */}
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
                            Patient ID
                          </TableCell>
                          <TableCell align="left" style={{ minWidth: "150px", "fontWeight": "bold" }}>
                            Patient Name
                          </TableCell>
                          <TableCell align="left" style={{ minWidth: "150px", "fontWeight": "bold" }}>
                            Disease Name
                          </TableCell>
                          <TableCell align="left" style={{ minWidth: "150px", "fontWeight": "bold" }}>
                            Appointment ID
                          </TableCell>
                          <TableCell align="left" style={{ minWidth: "150px", "fontWeight": "bold" }}>
                            Appointment Date
                          </TableCell>
                          <TableCell align="left" style={{ minWidth: "150px", "fontWeight": "bold" }}>
                            Hospital name
                          </TableCell>
                          <TableCell align="left" style={{ minWidth: "150px", "fontWeight": "bold" }}>
                           Status
                          </TableCell>

                          {/* <TableCell align="left" style={{ minWidth: "100px", "fontWeight": "bold" }}>
                            Active/Inactive
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
                        {appointments
                          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map((info, i) => {


                            return (
                              <TableRow
                                hover
                                role="checkbox"
                                tabIndex={-1}
                                key={info.code}

                              >
                                 <TableCell align="left">{page * rowsPerPage + i + 1}</TableCell> {/* Corrected line */}
                                <TableCell>
                                  {info.patientId}</TableCell>
                                <TableCell>{info.patientName}</TableCell>
                                <TableCell>{info.disease_name}</TableCell>
                                <TableCell>{info.appointmentId}</TableCell>
                                <TableCell>{info.appointment_Date}</TableCell>
                                <TableCell>{info.Hospital_name}</TableCell>
                                <TableCell>{info.appointement_status}</TableCell>



                                {/* <TableCell align="left" className="dropdown dropdown-action"> <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown"
                                  aria-expanded="false"><i className="fa fa-ellipsis-v"></i></a>
                                  <div className="dropdown-menu dropdown-menu-right">
                                    <a className="dropdown-item" onClick={(e) => EditButton(e, info.patientId)}><i className="fa fa-pencil m-r-5"></i>
                                      Edit</a>
                                    <a
                                      className="dropdown-item"
                                      onClick={(e) => PatientDetail(e, info.patientId)}

                                    >
                                      <i className="fa fa-id-card-o m-r-5"></i> Detail
                                    </a>
                                    <a
                                      className="dropdown-item"
                                      // onClick={(e) => handledelet(e, info.patientId)}
                                    >
                                      <i className="fa fa-trash-o m-r-5"></i> Delete
                                    </a>
                                  </div></TableCell>   */}

                              </TableRow>
                            );
                          })}
                      </TableBody>
                    </Table>
                    <TablePagination
                      component="div"
                      count={appointments.length}
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
        <div id="delete_appointment" className="modal fade delete-modal" role="dialog">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body text-center">
                <img src="assets/img/sent.png" alt="" width="50" height="46" />
                <h3>Are you sure want to delete this Appointment?</h3>
                <div className="m-t-20"> <a href="#" className="btn btn-white" data-dismiss="modal">Close</a>
                  <button type="submit" className="btn btn-danger">Delete</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}