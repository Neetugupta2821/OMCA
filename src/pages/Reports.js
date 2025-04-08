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
import { GetAllPatients } from '../reducer/PatientsSlice'
import { useNavigate } from "react-router-dom";
import { image } from '../Basurl/Baseurl'
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import { DeletePatient } from '../reducer/PatientsSlice'
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Swal from "sweetalert2";
import { StatusPatient } from '../reducer/PatientsSlice'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Autocomplete from '@mui/material/Autocomplete';
import { GetAllTreatment } from '../reducer/TreatmentSlice'
import axios from "axios";
import { baseurl } from '../Basurl/Baseurl';
import DatePicker, { DateObject } from 'react-multi-date-picker';
export default function Reports() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const dispatch = useDispatch()
  const { patient, loading, error } = useSelector((state) => state.patient)
  const { Treatment } = useSelector((state) => state.Treatment)
  const [seekerStatus, setSeekerStatus] = React.useState({});
  const [treatmentname, setTreatmentname] = useState([])
  const [selectedJobTitle, setSelectedJobTitle] = useState('');
  const [dateRange, setDateRange] = useState([null, null]);


  const startDate = dateRange?.[0]?.format('YYYY-MM-DD') || '';
  const endDate = dateRange?.[1]?.format('YYYY-MM-DD') || '';
  
  const [fromdate, setFromdate] = useState(startDate)
  const [todate, setTodate] = useState(endDate)
  console.log(Treatment)
  const [report, setReport] = useState({
    country: " ",
    treatment:" "
    
  })
  const submitInputdata = (e) => {
    const { name, value } = e.target;
    setReport({ ...report, [name]: value });
  };
  const handleJobTitleChange = (event, value) => {
    setSelectedJobTitle(event.target.value);
  };

  useEffect(() => {

    dispatch(GetAllTreatment())

  }, [dispatch])

  useEffect(() => {
    if (Treatment) {
      setTreatmentname(Treatment);
    }
  }, [Treatment]);
  useEffect(() => {

    dispatch(GetAllPatients())
    console.log(error, patient)
  }, [dispatch])

  useEffect(() => {
    if (patient) {
      setRows(patient);
    }
  }, [patient]);
  console.log(patient)
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

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          dispatch(DeletePatient({ id: patientId }))
            .unwrap() // If using Redux Toolkit, unwrap to handle success/failure easily
            .then(() => {
              return dispatch(GetAllPatients());
            })
            .then((newData) => {
              Swal.fire("Deleted!", "patient has been deleted.", "success");
              setRows(newData.payload); // Update rows with the latest data
            })
            .catch((err) => {
              Swal.fire("Error!", err?.message || "An error occurred", "error");
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Hospital data is safe :)",
            icon: "error",
          });
        }
      });
  };


  const handleChange = (event, id) => {
    const { value } = event.target;
    setSeekerStatus(value)

  }

  const handleClickOpen = async (e, id) => {
    e.preventDefault(); // Prevent default behavior of the event

    try {
      // Dispatch the action and await its result
      const result = await dispatch(StatusPatient({ id: id, status: Number(seekerStatus) })).unwrap();

      // Show success alert
      Swal.fire("Success!", "Patient details updated successfully.", "success");
      dispatch(GetAllPatients());

      // Navigate to the patients page

    } catch (err) {
      // Handle errors and show an error alert
      Swal.fire("Error!", err?.message || "An error occurred", "error");
    }
  };

  const getReportData = () => {
 console.log(report.treatment)
    axios
      .get(
        `${baseurl}exportfilteredpatient/?startDate=${encodeURIComponent(startDate||'')}&treatment_name=${encodeURIComponent(report.treatment.trim())}&endDate=${encodeURIComponent(endDate||'')}&country=${encodeURIComponent(report.country.trim() || '')}`,
        {
          responseType: "blob", // Important to set the response type to 'blob'
        }
      )
      .then((response) => {
        // Create a URL for the file
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        // You can set a default file name here
        link.setAttribute("download", `report_${report}.xlsx`);
        document.body.appendChild(link);
        link.click();
        link.remove(); // Clean up after download
      })
      .catch((error) => {
        Swal.fire(
          "Error",
          `No Patient Found`,
          "error"
        );
      })
      .finally(() => {
        // Resetting states regardless of success or error

      });
  };

  console.log(seekerStatus)
  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="row">
            <div className="col-md-12">
              <h4 className="page-title">Reports</h4>
            </div>
          </div>
          <div className="main_content">
            <div className="row d-flex">
              <div className="col-sm-3 date_pick  col-3">
                <DatePicker
                  value={dateRange}
                  format="MM/DD/YYYY"
                  placeholder="Start Date , End Date"
                  onChange={setDateRange}
                  range
                  numberOfMonths={2}
                />
              </div>
              <div className='col-sm-3 col-3'>
                <TextField id="outlined-basic" label="country" variant="outlined" size="small" onChange={submitInputdata} name="country" value={report.country}/>
              </div>
              <div className='col-sm-3  col-3'>
                <TextField id="outlined-basic" label="treatment name" variant="outlined" size="small" onChange={submitInputdata} name="treatment"   value={report.treatment}  />
              </div>
              <div className="col-sm-3 text-end  col-3">
                <button className="btn btn btn-primary" href="job-grid" onClick={getReportData}>
                  Report
                </button>
              </div>
              {/* <div className='col-sm-2'>
                <TextField id="outlined-basic" label="gender" variant="outlined" size="small" onChange={submitInputdata} name="gender" value={report.gender}/>
              </div> */}
              {/* <div className='col-sm-3'>
                <Autocomplete
                  className=''
                  disablePortal
                  id="combo-box-job-title"
                  options={Treatment.map(item => (item.course_name))}
                  value={selectedJobTitle}
                  onChange={handleJobTitleChange}
                  size="small"
                  sx={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} label="treatment name" />}
                />
              </div> */}
              {/* <div className='col-sm-2'>
                <TextField id="outlined-basic" label="age" variant="outlined" size="small" onChange={submitInputdata} name="age" value={report.age} />
              </div> */}
               
              {/* <div className="col-sm-8 col-9 text-right m-b-20">
                <Link to="/Admin/add-patient" className="btn btn btn-primary btn-rounded float-right"><i
                  className="fa fa-plus"></i> New Patient</Link>
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
                            Patient Id
                          </TableCell>
                          <TableCell align="left" style={{ minWidth: "150px", "fontWeight": "bold" }}>
                            Patient Name
                          </TableCell>
                          <TableCell align="left" style={{ minWidth: "150px", "fontWeight": "bold" }}>
                            Emergency contact
                          </TableCell>
                          <TableCell align="left" style={{ minWidth: "150px", "fontWeight": "bold" }}>
                            email
                          </TableCell>
                          <TableCell align="left" style={{ minWidth: "150px", "fontWeight": "bold" }}>
                            country
                          </TableCell>
                          <TableCell align="left" style={{ minWidth: "150px", "fontWeight": "bold" }}>
                            Patient Disease
                          </TableCell>
                          {/* <TableCell align="left" style={{ minWidth: "150px", "fontWeight": "bold" }}>
                            View
                          </TableCell> */}
                          {/* <TableCell align="left" style={{ minWidth: "100px", "fontWeight": "bold" }}>
                             Status
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
                        {patient
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
                                <TableCell>{info.patient_name}</TableCell>
                                <TableCell>{info.emergency_contact}</TableCell>
                                <TableCell>{info.email}</TableCell>
                                <TableCell>{info.country}</TableCell>
                                <TableCell>{info.patient_disease.map((item) => (
                                  item.disease_name

                                ))}</TableCell>
                                {/* <TableCell><RemoveRedEyeIcon/></TableCell> */}

                                {/* <TableCell align="left">
                                  <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                                    <InputLabel id={`demo-select-small-label-${i}`}>
                                      {seekerStatus[info.patientId] === "1"
                                        ? "Confirmed"
                                        : seekerStatus[info.patientId] === "2"
                                          ? "Denied"
                                          : seekerStatus[info.patientId] === "3"
                                            ? "Follow-up"
                                            : seekerStatus[info.patientId] === "4"
                                              ? "Completed"
                                              : info.patient_status || "Pending"}
                                    </InputLabel>
                                    <Select
                                      labelId={`demo-select-small-label-${i}`}
                                      id={`demo-select-small-${i}`}
                                      value={seekerStatus[info.patientId] || info.patient_status || ""}
                                      onChange={(event) => handleChange(event, info.patientId)}
                                    >
                                      <MenuItem value="1" onClick={(e) => handleClickOpen(e, info.patientId)}>Confirmed</MenuItem>
                                      <MenuItem value="2" onClick={(e) => handleClickOpen(e, info.patientId)}>Denied </MenuItem>
                                      <MenuItem value="3" onClick={(e) => handleClickOpen(e, info.patientId)}>Follow-up</MenuItem>
                                      <MenuItem value="4" onClick={(e) => handleClickOpen(e, info.patientId)}>Completed</MenuItem>
                                    </Select>
                                  </FormControl>
                                </TableCell> */}


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
                                      onClick={(e) => handledelet(e, info.patientId)}
                                    >
                                      <i className="fa fa-trash-o m-r-5"></i> Delete
                                    </a>
                                  </div></TableCell> */}

                              </TableRow>
                            );
                          })}
                      </TableBody>
                    </Table>
                    <TablePagination
                      component="div"
                      count={rows.length}
                      page={page}
                      onPageChange={handleChangePage}
                      rowsPerPage={rowsPerPage}
                      // onRowsPerPageChange={handleChangeRowsPerPage}
                      rowsPerPageOptions={[]} 
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
