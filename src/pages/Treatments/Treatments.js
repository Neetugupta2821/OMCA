import React from 'react'
import { Link } from 'react-router-dom'

import TableContainer from '@mui/material/TableContainer';

import TablePagination from '@mui/material/TablePagination';
import Swal from "sweetalert2";
import Paper from '@mui/material/Paper';
import { useSelector, useDispatch } from 'react-redux'
import { image } from '../../Basurl/Baseurl'
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { GetAllTreatment } from '../../reducer/TreatmentSlice'
import { useState, useEffect } from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import TableCell from '@mui/material/TableCell';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { DeleteTreatment } from '../../reducer/TreatmentSlice'

export default function Treatments() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const dispatch = useDispatch()
  const { Treatment, loading, error } = useSelector((state) => state.Treatment)

  useEffect(() => {

    dispatch(GetAllTreatment())

  }, [dispatch])

  useEffect(() => {
    if (Treatment) {
      setRows(Treatment);
    }
  }, [Treatment]);

  console.log(error, Treatment)
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const EditButton = (e, id) => {
    navigate("/Admin/edit-treatments", {
      state: {
        course_id: id,

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
          dispatch(DeleteTreatment({ id: hospitalId }))
            .unwrap() // If using Redux Toolkit, unwrap to handle success/failure easily
            .then(() => {
              return dispatch(GetAllTreatment());
            })
            .then((newData) => {
              Swal.fire("Deleted!", "Treatment Course has been deleted.", "success");
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
              <h4 className="page-title">Manage Treatments</h4>
            </div>
          </div>
          <div className="main_content">
            <div className="row">
              <div className="col-sm-4 col-3">
                <h4>All Treatments course</h4>
              </div>
              <div className="col-sm-8 col-9 text-right m-b-20">
                <Link to="/Admin/add-treatments" className="btn btn btn-primary btn-rounded float-right"><i
                  className="fa fa-plus"></i> New Treatments</Link>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="table-responsive">
                  <TableContainer component={Paper} style={{ overflowX: 'auto' }}>
                    {Treatment.map((item) => (
                      <Accordion>
                        <AccordionSummary
                          expandIcon={<ArrowDownwardIcon />}
                          aria-controls="panel1-content"
                          id="panel1-header"
                        >
                          <Typography className='fw-bold'> {item.course_name} </Typography><span className='px-5'>Price-{item.course_price}</span>
                          <Typography> <a className="dropdown-item" onClick={(e) => EditButton(e, item.course_id)}><i className="fa fa-pencil m-r-5"></i>
                            </a></Typography>
                          <Typography>   <a className="dropdown-item" href="#" data-toggle="modal" data-target="#delete_patient" onClick={(e) => handledelet(e, item.course_id)}><i
                            className="fa fa-trash-o m-r-5"></i> </a></Typography>
                          {/* <Typography sx={{ color: 'text.secondary' }}><div align="left" className="dropdown dropdown-action"> <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown"
                            aria-expanded="false"><i className="fa fa-ellipsis-v"></i></a>
                            <div className="dropdown-menu dropdown-menu-right">
                              
                              <a className="dropdown-item" href="#" data-toggle="modal" data-target="#delete_patient"  onClick={(e) => handledelet(e, item.course_id)}><i
                                className="fa fa-trash-o m-r-5"></i> Delete</a></div></div></Typography> */}

                        </AccordionSummary>


                        <AccordionDetails>
                          <Typography>
                            <table className="table table-hover text-right thead-light">
                              <thead>
                                <tr className="text-capitalize">
                                  {/* <th className="text-center w-5 common_style">S. No.</th> */}
                                  <th className="text-left common_style">categories</th>

                                </tr>
                              </thead>
                              <tbody>
                                {item.categories.length > 0 ? (
                                  item.categories.map((row, i) => (
                                    <tr key={i}>
                                      {/* <td className="text-center common_style">{i + 1}</td> */}
                                      <td className="text-left common_style">{i + 1}{" "}.{row.category_name
                                      } </td>


                                    </tr>
                                  ))
                                ) : (
                                  <tr>
                                    <td colSpan="6"><h3>No Jobs Apply</h3></td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    ))}
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