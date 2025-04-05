import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { GetAllEnquiry } from '../../src/reducer/EnquirySlice'
// import { image } from '../../Basurl/Baseurl'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from "react-router-dom";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { EnquiryStatus } from '../../src/reducer/EnquirySlice'
import MenuItem from '@mui/material/MenuItem';
import { EnquirySample } from '../../src/reducer/EnquirySlice'
import { ImportEnquirys } from '../../src/reducer/EnquirySlice'
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import NotesIcon from '@mui/icons-material/Notes';
import FormHelperText from '@mui/material/FormHelperText';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from 'axios'
import { baseurl } from '../Basurl/Baseurl'




export default function Inquiry() {
  const navigate = useNavigate();
  const [note, setNote] = useState("")
  const [date, setDate] = useState()
  const [open2, setOpen2] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("sm");
  const [open3, setOpen3] = React.useState(false);
  const [filterValue, setFilterValue] = useState("");
  const [page, setPage] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const [searchApiData, setSearchApiData] = useState([]);
  const dispatch = useDispatch()
  const { Enquiry, loading, error } = useSelector((state) => state.Enquiry)
  const [seekerStatus, setSeekerStatus] = React.useState({});
  console.log(Enquiry)
  const [enqId, setEnqId] = useState("")
  const handleClose3 = () => {
    setOpen3(false);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };
  const handleClickOpen2 = (e, enq) => {
    setOpen2(true)
    setEnqId(enq)
    // setTreatmentId(tretmentId)
    // setIShospitalArray(listhospital)
  }
  const handleClickOpen3 = (e) => {
    // alert("hello")
    setOpen3(true)
    // setTreatmentId(tretmentId)
    // setIShospitalArray(listhospital)
  }

  useEffect(() => {

    dispatch(GetAllEnquiry())
    console.log(error, Enquiry)
  }, [dispatch])

  useEffect(() => {
    if (Enquiry) {
      setRows(Enquiry);
      setSearchApiData(Enquiry)
    }
  }, [Enquiry]);
  console.log(searchApiData)
  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(+event.target.value);
  //   setPage(0);
  // };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const EditButton = (e, id) => {
    navigate("/Admin/edit-Enquiry", {
      state: {
        enquiryId: id,

      },
    })
  }
  const ViewDetail = (e, id) => {
    navigate("/Admin/Enquiry-Detail", {
      state: {
        enquiryId: id,

      },
    })
  }





  // // Update state when a new status is selected
  // const handleChange = async (event, id) => {
  //   const { value } = event.target;

  //   // Update seekerStatus in state
  //   setSeekerStatus((prev) => ({
  //     ...prev,
  //     [id]: value,
  //   }));

  //   // Trigger API call immediately after setting the status
  //   try {
  //     const result = await dispatch(
  //       EnquiryStatus({ id, status: Number(value) })
  //     ).unwrap();

  //     // Show success alert
  //     Swal.fire("Success!", "Enquiry status updated successfully.", "success");

  //     // Refresh the enquiries
  //     dispatch(GetAllEnquiry());
  //     // Update seekerStatus in state
  //   setSeekerStatus((prev) => ({
  //     ...prev,
  //     [id]: value,
  //   }));
  //   } catch (err) {
  //     // Handle errors and show an error alert
  //     Swal.fire("Error!", err?.message || "An error occurred", "error");
  //   }
  // };
  const handleChange = async (event, id) => {
    const { value } = event.target;

    // Update local state first
    setSeekerStatus((prev) => ({
      ...prev,
      [id]: value,
    }));

    try {
      const result = await dispatch(
        EnquiryStatus({ id, status: Number(value) })
      ).unwrap();

      Swal.fire("Success!", "Status updated successfully!", "success");

      // Wait for backend update before fetching new data
      setTimeout(async () => {
        await dispatch(GetAllEnquiry()).unwrap();
      }, 500);
    } catch (err) {
      Swal.fire("Error!", err?.message || "An error occurred", "error");
    }
  };


  const handleSampleFile = () => {
    dispatch(EnquirySample());
  };

  // console.log(selectedImage)

  const handleImportFile = async (e) => {
    e.preventDefault();

    if (!selectedImage) {
      Swal.fire("Error!", "Please select a file before uploading.", "error");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedImage);

    // Debug FormData
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }

    try {
      // Dispatch your action or make the API call
      const result = await dispatch(ImportEnquirys(formData)).unwrap();
      setOpen3(false)
      dispatch(GetAllEnquiry())
      Swal.fire("Success!", `${result.message}`, "success");
    } catch (err) {
      setOpen3(false)
      Swal.fire("Error!", err?.message || "An error occurred", "error");
    }
  };


  const handleFilter = (event) => {
    if (event.target.value === "") {
      setRows(searchApiData);
    } else {
      const filterResult = searchApiData.filter((item) => {
        const enquiryId = item.enquiryId?.toLowerCase() || "";
        // const emailMatches = item.job_Desciption.toLowerCase();
        const name = item.name?.toLowerCase() || "";
        const country = item.country?.toLowerCase() || "";
        const searchValue = event.target.value.toLowerCase();

        // Check if the full name, last name, or email includes the search value
        return (
          enquiryId.includes(searchValue) ||
          country.includes(searchValue) || name.includes(searchValue)
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
  const [age, setAge] = React.useState('');

  const handleChange3 = (event) => {
    setAge(event.target.value);
  };
  const handleNotesdata = (e) => {
    e.preventDefault();  // Prevents the default form submission behavior

    axios.post(`${baseurl}add_notes/${enqId}`, {
      note: note,
      date: date
    })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setOpen2(false)
          Swal.fire("Success", "Notes added successfully!", "success");
        }
        setNote("")
        setDate("")
      })
      .catch((error) => {
        setOpen2(false)
        console.log(error);
        Swal.fire("Error", `${error?.response?.data?.message}`, "error");
      });
  };

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="row">
            <div className="col-md-12">
              <h4 className="page-title">Enquires</h4>
            </div>
          </div>
          <div className="main_content">
            <div className="row">
              <div className="col-sm-4 col-md-9 col-lg-3">
                <TextField
                  sx={{ width: "100%" }}
                  label="Search By Enquiry ID or Country"
                  id="outlined-size-small"
                  size="small"
                  value={filterValue}
                  onChange={handleFilter} // Pass event directly
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
              <div className="col-sm-8  col-md-3 col-lg-9 text-right m-b-20">
                <Link to="/Admin/add-Enquiry" className="btn btn btn-primary btn-rounded float-right"><i className="fa fa-plus"></i> New Enquiry</Link>
                <button onClick={handleSampleFile} className="btn btn btn-primary btn-rounded float-right mx-2"><i className="fa fa-file mx-2"></i>Sample file</button>
                <button className="btn btn btn-primary btn-rounded float-right" onClick={(e) => handleClickOpen3(e)}><i className="fa fa-file-excel-o mx-2"></i>Import Excel File</button>
              </div>

            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="table-responsive">


                  <TableContainer component={Paper} style={{ overflowX: 'auto' }}>
                    <Table stickyHeader aria-label="sticky table">
                      <TableHead>
                        <TableRow style={{ "white-space": "nowrap" }}>
                          <TableCell align="left" style={{ minWidth: "80px", "fontWeight": "bold" }}>
                            S. No.
                          </TableCell>
                          <TableCell align="left" style={{ minWidth: "60px", "fontWeight": "bold" }}>
                            Enquiry IDs
                          </TableCell>
                          <TableCell align="left" style={{ minWidth: "150px", "fontWeight": "bold" }}>
                            Name
                          </TableCell>
                          <TableCell align="left" style={{ minWidth: "150px", "fontWeight": "bold" }}>
                            Email
                          </TableCell>
                          <TableCell align="left" style={{ minWidth: "100px", "fontWeight": "bold" }}>
                            Country
                          </TableCell>
                          <TableCell align="left" style={{ minWidth: "100px", "fontWeight": "bold" }}>
                            Contact
                          </TableCell>
                          <TableCell align="left" style={{ minWidth: "100px", "fontWeight": "bold" }}>
                            Disease name
                          </TableCell>
                          <TableCell align="left" style={{ minWidth: "100px", "fontWeight": "bold" }}>
                            Status
                          </TableCell>

                          <TableCell align="left" style={{ minWidth: "85px", "fontWeight": "bold", "whiteSpace": "nowrap" }}>
                            Action
                          </TableCell>
                          <TableCell align="left" style={{ minWidth: "85px", "fontWeight": "bold" }}>
                            Notes
                          </TableCell>
                          {/* <TableCell align="left" style={{ minWidth: "85px", "fontWeight": "bold" }}>
                            View
                          </TableCell> */}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows
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
                                  {info.enquiryId}</TableCell>
                                <TableCell>{info.name}</TableCell>
                                <TableCell>{info.email}</TableCell>
                                <TableCell>{info.country}</TableCell>
                                <TableCell>{info.emergency_contact}</TableCell>
                                <TableCell>{info.disease_name}</TableCell>
                                {/* <TableCell> {info.Enquiry_status === "Confirmed"
                                  ? "Confirmed"
                                  : info.Enquiry_status === "Hold"
                                    ? "Hold"
                                    : info.Enquiry_status === "Follow-Up"
                                      ? "Follow-up"
                                      : info.Enquiry_status === "Dead"
                                        ? "closed"
                                        : "no status"}</TableCell> */}
                                <TableCell>
                                  <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                                    <Select
                                      value={
                                        seekerStatus[info.enquiryId]
                                          ? seekerStatus[info.enquiryId]
                                          : info.Enquiry_status === "Confirmed" ? "1"
                                            : info.Enquiry_status === "Hold" ? "2"
                                              : info.Enquiry_status === "Follow-Up" ? "3"
                                                : info.Enquiry_status === "Dead" ? "4"
                                                  : ""
                                      }
                                      onChange={(e) => handleChange(e, info.enquiryId)}
                                      displayEmpty
                                      inputProps={{ 'aria-label': 'Without label' }}
                                    >
                                      <MenuItem value="1">Confirmed</MenuItem>
                                      <MenuItem value="2">Hold</MenuItem>
                                      <MenuItem value="3">Follow-up</MenuItem>
                                      <MenuItem value="4">Closed</MenuItem>
                                    </Select>
                                  </FormControl>
                                  {/* <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                                    <InputLabel id={`demo-select-small-label-${i}`}>
                                      {info.Enquiry_status === "Confirmed"
                                        ? "Confirmed"
                                        : info.Enquiry_status === "Hold"
                                          ? "Hold"
                                          : info.Enquiry_status === "Follow-Up"
                                            ? "Follow-up"
                                            : info.Enquiry_status === "Dead"
                                              ? "closed"
                                              : "no status"}

                                    </InputLabel>

                                    <Select
                                      labelId={`demo-select-small-label-${i}`}
                                      id={`demo-select-small-${i}`}
                                      value={seekerStatus[info.enquiryId] || ""} // Use state to set the current value
                                      // label="Seeker Status"
                                      onChange={(e) => handleChange(e, info.enquiryId)} // Handle change here
                                    >
                                      <MenuItem value="1">Confirmed</MenuItem>
                                      <MenuItem value="2">Hold</MenuItem>
                                      <MenuItem value="3">Follow-up</MenuItem>
                                      <MenuItem value="4">Closed</MenuItem>
                                    </Select>
                                  </FormControl> */}
                                </TableCell>

                                <TableCell style={{ "white-space": "nowrap" }}><i className="fa fa-pencil m-r-5" onClick={(e) => EditButton(e, info.enquiryId)}></i><i className="fa fa-trash-o m-r-5"></i><span><VisibilityIcon style={{ "fontSize": "18px" }} onClick={(e) => ViewDetail(e, info.enquiryId)} /></span> </TableCell>
                                <TableCell><NotesIcon onClick={(e) => handleClickOpen2(e, info.enquiryId)} /></TableCell>
                                {/* <TableCell> </TableCell> */}



                                {/* <TableCell align="left" className="dropdown dropdown-action"> <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown"
                                  aria-expanded="false"><i className="fa fa-ellipsis-v"></i></a>
                                  <div className="dropdown-menu dropdown-menu-right">
                                    <a className="dropdown-item" onClick={(e) => EditButton(e, info.enquiryId)}><i className="fa fa-pencil m-r-5"></i>
                                      Edit</a>
                                    <a className="dropdown-item" href="#" data-toggle="modal" data-target="#delete_patient"><i
                                      className="fa fa-trash-o m-r-5"></i> Delete</a></div></TableCell> */}

                              </TableRow>
                            );
                          })}
                      </TableBody>
                    </Table>
                    <TablePagination
                      className='text-left mt-2'
                      component="div"
                      count={rows.length}
                      page={page}
                      onPageChange={handleChangePage}
                      rowsPerPage={rowsPerPage}
                      rowsPerPageOptions={[]} // Add this line to remove the "Rows per page" dropdown
                    // onRowsPerPageChange={handleChangeRowsPerPage} // You can remove this line as well
                    />
                    {/* ... (rest of your component JSX) */}

                  </TableContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
      <React.Fragment>
        <Dialog
          fullWidth={fullWidth}
          maxWidth={maxWidth}
          open={open3}
          onClose={handleClose3}

        >

          <DialogContent   >

            <Box
              noValidate
              component="form"

              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: 'fit-content',

              }}
            >
              <Box>
                <form id="contact-form" className="contact-form">
                  <div className="form-group-Add">

                    <input
                      type="file"
                      id="fileSelect"
                      accept=".xlsx, .xls, .csv"
                      onChange={(event) => {
                        const file = event.target.files[0];
                        console.log("Selected file:", file);
                        setSelectedImage(file);
                      }}
                    />
                  </div>


                  <DialogActions>



                    <Button type="submit" variant="contained" onClick={(e) => handleImportFile(e)}>
                      Submit
                    </Button>
                    <Button onClick={handleClose3} color="primary">
                      Cancel
                    </Button>
                  </DialogActions>
                </form>

              </Box>

            </Box>
          </DialogContent>
          <DialogActions>

          </DialogActions>
        </Dialog>
      </React.Fragment>
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
      <React.Fragment>
        <Dialog
          fullWidth={fullWidth}
          maxWidth={maxWidth}
          open={open2}
          onClose={handleClose2}

        >

          <DialogContent   >

            <Box
              noValidate
              component="form"

              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: 'fit-content',

              }}
            >
              <Box>
                <form id="contact-form" className="contact-form"  >
                  <div className="form-group-Add">
                    <label>Notes<span className="text-danger">*</span></label><br />
                    <textarea id="w3review" name="discussionNotes" rows="4" cols="50"
                      className="form-control" placeholder="Note"
                      onChange={(e) => setNote(e.target.value)} value={note} />
                  </div>

                  <div className="form-group-Add">
                    <label>Appointment Date<span className="text-danger">*</span></label><br />
                    <input type="date" id="birthday" name="date" placeholder="Appointment Date"
                      className="form-control" onChange={(e) => setDate(e.target.value)} value={date} />
                  </div>

                  <DialogActions>
                    <Button type="submit" variant="contained" onClick={handleNotesdata}>
                      Submit
                    </Button>
                    <Button onClick={handleClose2} color="primary">
                      Cancel
                    </Button>
                  </DialogActions>
                </form>


              </Box>

            </Box>
          </DialogContent>
          <DialogActions>

          </DialogActions>
        </Dialog>
      </React.Fragment>
    </>
  )
}
