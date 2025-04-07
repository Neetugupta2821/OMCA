import React from 'react'
import { Link } from 'react-router-dom'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react'
import { GetAllHositalData } from '../../reducer/HospitalSlice'
import { useSelector, useDispatch } from 'react-redux'
import { image } from '../../Basurl/Baseurl'
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { DeleteHospital } from '../../reducer/HospitalSlice'
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
export default function Hospitals() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const dispatch = useDispatch()
  const { hospital, loading, error } = useSelector((state) => state.hospital)
  const [filterValue, setFilterValue] = useState("");
  const [searchApiData, setSearchApiData] = useState([]);
  useEffect(() => {

    dispatch(GetAllHositalData())
    console.log(error, hospital)
  }, [dispatch])

  useEffect(() => {
    if (hospital) {
      setRows(hospital);
      setSearchApiData(hospital)
    }
  }, [hospital]);

  console.log(hospital)
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const EditButton = (e, id) => {
    navigate("/Admin/edit-hospitals", {
      state: {
        hospitalId: id,

      },
    })
  }

  const handledelet = (e, hospitalId) => {
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
        // text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          dispatch(DeleteHospital({ id: hospitalId }))
            .unwrap() // If using Redux Toolkit, unwrap to handle success/failure easily
            .then(() => {
              return dispatch(GetAllHositalData());
            })
            .then((newData) => {
              Swal.fire("Deleted!", "Hospital has been deleted.", "success");
              setRows(newData.payload); // Update rows with the latest data
            })
            .catch((err) => {
              Swal.fire("Error!", err?.message || "An error occurred", "error");
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            // text: "Hospital data is safe :)",
            icon: "error",
          });
        }
      });
  };

  const handleFilter = (event) => {
    const searchValue = event.target.value.toLowerCase();
  
    if (searchValue === "") {
      setRows(searchApiData);
    } else {
      const filterResult = searchApiData.filter((item) => {
        const enquiryId = item.enquiryId?.toLowerCase() || "";
        const hospitalName = item.hospitalName?.toLowerCase() || "";
        const patientName = item.patient_name?.toLowerCase() || "";
        const location = item.location?.toLowerCase() || "";
        const hospitalCode = item.hospitalCode?.toLowerCase() || "";
        const country = item.country?.toLowerCase() || "";
        const contact = item.contact?.toString() || "";
  
        return (
          enquiryId.includes(searchValue) ||
          hospitalName.includes(searchValue) ||
          patientName.includes(searchValue) ||
          location.includes(searchValue) ||
          country.includes(searchValue)||
          contact.includes(searchValue)||
          hospitalCode.includes(searchValue)
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
              <h4 className="page-title">Manage Hospitals</h4>
            </div>
          </div>
          <div className="main_content">
            <div className="row">
              <div className="col-sm-4 col-md-9 col-lg-3">
                <TextField
                  sx={{ width: "100%" }}
                  label="Search By Hospitals Name"
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
              <div className="col-sm-8  col-md-9 text-right m-b-20">
                <Link to="/Admin/add-hospitals" className="btn btn btn-primary btn-rounded float-right"><i
                  className="fa fa-plus"></i> New Hospital</Link>
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
                            Hospital Name
                          </TableCell>
                          <TableCell align="left" style={{ minWidth: "150px", "fontWeight": "bold" }}>
                          Location
                          </TableCell>
                          <TableCell align="left" style={{ minWidth: "150px", "fontWeight": "bold" }}>
                            Hospital Code
                          </TableCell>
                          <TableCell align="left" style={{ minWidth: "150px", "fontWeight": "bold" }}>
                            Contact
                          </TableCell>
                          <TableCell align="left" style={{ minWidth: "100px", "fontWeight": "bold" }}>
                            Status
                          </TableCell>
                          {/* <TableCell align="left" style={{ minWidth: "100px" }}>
                    candidateCounts
                  </TableCell> */}
                          <TableCell align="left" style={{ minWidth: "85px", "fontWeight": "bold" }}>
                            Action
                          </TableCell>
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
                                <TableCell><img width="28" height="28" src={`${image}${info.hospitalImage}`} className="rounded-circle m-r-5" alt="" />
                                  {info.hospitalName}</TableCell>
                                <TableCell>{info.location}</TableCell>
                                <TableCell>{info.hospitalCode}</TableCell>
                                <TableCell>{info.contact}</TableCell>

                                <TableCell align="left">
                                  {
                                    <BootstrapSwitchButton
                                      width={100}
                                      checked={Boolean(info.status)}
                                      onlabel="Active"
                                      offlabel="Inactive"
                                      onstyle="success"
                                    // onChange={() => {
                                    //   dataActiveInactive(info._id, info.status);
                                    // }}
                                    />
                                  }
                                </TableCell>

                                <TableCell><i className="fa fa-pencil m-r-5" onClick={(e) => EditButton(e, info.hospitalId)}></i><i className="fa fa-trash-o m-r-5"  onClick={(e) => handledelet(e, info.hospitalId)}></i></TableCell>
                                {/* <TableCell align="left" className="dropdown dropdown-action"> <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown"
                                  aria-expanded="false"><i className="fa fa-ellipsis-v"></i></a>
                                  <div className="dropdown-menu dropdown-menu-right">
                                    <a className="dropdown-item" onClick={(e) => EditButton(e, info.hospitalId)}><i className="fa fa-pencil m-r-5"></i>
                                      Edit</a>
                                    <a className="dropdown-item" data-toggle="modal" data-target="#delete_patient" onClick={(e) => handledelet(e, info.hospitalId)}><i
                                      className="fa fa-trash-o m-r-5"></i> Delete</a>
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

    </>
  )
}