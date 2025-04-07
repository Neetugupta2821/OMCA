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
import axios from "axios";
import { baseurl } from '../Basurl/Baseurl';

export default function Earning() {
  const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rows, setRows] = useState([]);
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
    const fetchJobTitles = () => {
      axios.get(`${baseurl}totalEarnings`,{
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.data.success) {
            console.log(response.data.earnings)
            setRows(response.data.earnings)
            // setJobTitles(response.data.details.map(job => job.jobTitle));
            // setLocation(countries);
          } else {
            console.error("Failed to fetch job titles:", response.data.message);
          }
        })
        .catch((error) => {
          console.error("Error fetching job titles:", error);
        });
    };
    useEffect(() => {
      fetchJobTitles();
  
    }, []);
  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="row">
            <div className="col-md-12">
              <h4 className="page-title">Earnings</h4>
            </div>
          </div>
           <div className="row d-flex">
                    
                 
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
                    <div className="col-sm-3 text-end">
                      {/* <button className="btn btn btn-primary" href="job-grid" onClick={getReportData}>
                        Report
                      </button> */}
                    </div>
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
                          Patient ID
                          </TableCell>
                          <TableCell align="left" style={{ minWidth: "150px", "fontWeight": "bold" }}>
                          Patient Name
                          </TableCell>
                          <TableCell align="left" style={{ minWidth: "150px", "fontWeight": "bold" }}>
                          Total Amount
                          </TableCell>
                          <TableCell align="left" style={{ minWidth: "150px", "fontWeight": "bold" }}>
                          Remaining Balance
                          </TableCell>
                          <TableCell align="left" style={{ minWidth: "150px", "fontWeight": "bold" }}>
                          Amount Paid
                          </TableCell>
                          <TableCell align="left" style={{ minWidth: "150px", "fontWeight": "bold" }}>
                          Disease Agreement
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
                                key={info.enquiryId}

                              >
                                 <TableCell align="left">{page * rowsPerPage + i + 1}</TableCell> {/* Corrected line */}
                                <TableCell>
                                  {info.patientId}</TableCell>
                                <TableCell>{info.patient_name}</TableCell>
                                <TableCell>{info.total_Amount}</TableCell>
                                <TableCell>{info.remaining_balance}</TableCell>
                                <TableCell>{info.amount_paid}</TableCell>
                                <TableCell>{info.Disease_agreement}</TableCell>
                                 {/* <TableCell>{info.patient_disease.map((item) => (
                                        item.disease_name
      
                                      ))}</TableCell>  */}

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

      
    </>
  )
}
