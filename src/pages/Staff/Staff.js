import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { GetAllStaffUser } from '../../reducer/StaffSlice'
import { image } from '../../Basurl/Baseurl'
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
import { ActiveStaffUser } from '../../reducer/StaffSlice'
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";
import {DeleteStaff} from '../../reducer/StaffSlice'
export default function Staff() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const dispatch = useDispatch()
  const { staff, loading, error } = useSelector((state) => state.staff)

  useEffect(() => {

    dispatch(GetAllStaffUser())
    console.log(error, staff)
  }, [dispatch])

  useEffect(() => {
    if (staff) {
      setRows(staff);
    }
  }, [staff]);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;


  const EditButton = (e, id) => {
    navigate("/Admin/edit-staff", {
      state: {
        staffID: id,

      },
    })
  }

  const dataActiveInactive = async (id, currentState) => {
    try {
      const newState = currentState === 1 ? 0 : 1; // Invert status
      const result = await dispatch(ActiveStaffUser({ id: id })).unwrap();
      dispatch(GetAllStaffUser()); // Refetch data after API call
      Swal.fire(
        "Status!",
        newState === 1 ? "Activate." : "DeActivate.",
        "success"
      );
    } catch (err) {
      console.error("Error object:", err);
      const errorMessage =
        typeof err === "string"
          ? err
          : typeof err?.message === "string"
            ? err.message
            : typeof err?.message?.message === "string"
              ? err.message.message
              : JSON.stringify(err);
      Swal.fire({
        title: "Error!",
        text: errorMessage,
        icon: "error",
      });
    }
  };

const handledelet = (e, staffID) => {
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
          dispatch(DeleteStaff({ id: staffID }))
            .unwrap() // If using Redux Toolkit, unwrap to handle success/failure easily
            .then(() => {
              return dispatch(GetAllStaffUser());
            })
            .then((newData) => {
              Swal.fire("Deleted!", "Staff has been deleted.", "success");
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
  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="row">
            <div className="col-md-12">
              <h4 className="page-title">Manage staff</h4>
            </div>
          </div>
          <div className="main_content">
            <div className="row">
              <div className="col-sm-4 col-md-9 col-lg-3">
                <TextField
                  sx={{ width: "100%" }}
                  label="Search By Staff Name..."
                  id="outlined-size-small"
                  size="small"
                // value={filterValue}
                // onChange={(e) => handleFilter(e)}
                // InputProps={{
                //   endAdornment: (
                //     <InputAdornment position="end">
                //       {filterValue && (
                //         <IconButton onClick={handleClearFilter} edge="end">
                //           <ClearIcon />
                //         </IconButton>
                //       )}
                //     </InputAdornment>
                //   ),
                // }}
                />
              </div>
              <div className="col-sm-8 col-9 text-right m-b-20">
                <Link to="/Admin/add-staff" className="btn btn btn-primary btn-rounded float-right"><i className="fa fa-plus"></i> New Staff</Link>
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
                            Name
                          </TableCell>
                          <TableCell align="left" style={{ minWidth: "150px", "fontWeight": "bold" }}>
                            Role
                          </TableCell>
                          <TableCell align="left" style={{ minWidth: "150px", "fontWeight": "bold" }}>
                            Email
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
                        {staff
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
                                <TableCell><img width="28" height="28" src={`${image}${info.profileImage}`} className="rounded-circle m-r-5" alt="" />
                                  {info.name}</TableCell>
                                <TableCell>{info.role}</TableCell>
                                <TableCell>{info.email}</TableCell>

                                <TableCell align="left">
                                  {
                                    <BootstrapSwitchButton
                                      width={100}
                                      checked={Boolean(info.status)}
                                      onlabel="Active"
                                      offlabel="Inactive"
                                      onstyle="success"
                                      onChange={() => {
                                        dataActiveInactive(info._id, info.status);
                                      }}
                                    />
                                  }
                                </TableCell>
                                <TableCell> <i className="fa fa-pencil m-r-5" onClick={(e) => EditButton(e, info._id)}></i>
                                 <i className="fa fa-trash-o m-r-5"  onClick={(e) => handledelet(e, info._id)}></i></TableCell>
                                {/* <TableCell align="left" className="dropdown dropdown-action"> <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown"
                                  aria-expanded="false"><i className="fa fa-ellipsis-v"></i></a>
                                  <div className="dropdown-menu dropdown-menu-right">
                                    <a className="dropdown-item" onClick={(e) => EditButton(e, info._id)}><i className="fa fa-pencil m-r-5"></i>
                                      Edit</a>
                                    <a className="dropdown-item" href="#" data-toggle="modal" data-target="#delete_patient"><i
                                      className="fa fa-trash-o m-r-5"></i> Delete</a></div></TableCell> */}

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
      </div >
      <div id="delete_patient" className="modal fade delete-modal" role="dialog">
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

      </div>
    </>
  )
}


































