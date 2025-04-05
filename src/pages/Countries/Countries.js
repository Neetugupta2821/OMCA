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
import { useSelector, useDispatch } from 'react-redux'
import axios from "axios";
import { baseurl } from '../../Basurl/Baseurl';
import { useNavigate } from "react-router-dom";
import { GetAllCountries } from '../../reducer/Countries'
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
export default function Countries() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const dispatch = useDispatch()
  const { Countries, loading, error } = useSelector((state) => state.Countries)
  const [seekerStatus, setSeekerStatus] = React.useState({});
  const [searchApiData, setSearchApiData] = useState([]);

  useEffect(() => {

    dispatch(GetAllCountries())
    console.log(error, Countries)
  }, [dispatch])

  useEffect(() => {
    if (Countries) {
      setRows(Countries);
      setSearchApiData(Countries)

    }
  }, [Countries]);
  console.log(Countries)

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
  const handleFilter = (event) => {
    if (event.target.value === "") {
      setRows(searchApiData);
    } else {
      const filterResult = searchApiData.filter((item) => {
        const enquiryId = item.countryName?.toLowerCase() || "";
        // const emailMatches = item.job_Desciption.toLowerCase();
        const country = item.countryCapital?.toLowerCase() || "";
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
              <h4 className="page-title">Manage Countries</h4>
            </div>
          </div>
          <div className="main_content">
            <div className="row">
              <div className="col-sm-4 col-md-9 col-lg-3">
                <TextField
                  sx={{ width: "100%" }}
                  label="search by countries"
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
                <Link to="/Admin/add-countries" className="btn btn btn-primary btn-rounded float-right"><i
                  className="fa fa-plus"></i> New Countries</Link>
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
                            Country Name
                          </TableCell>
                          <TableCell align="left" style={{ minWidth: "150px", "fontWeight": "bold" }}>
                            Country Code
                          </TableCell>
                          <TableCell align="left" style={{ minWidth: "150px", "fontWeight": "bold" }}>
                            countryCapital
                          </TableCell>
                          <TableCell align="left" style={{ minWidth: "150px", "fontWeight": "bold" }}>
                            countryCurrency
                          </TableCell>
                          {/* 
                          <TableCell align="left" style={{ minWidth: "150px", "fontWeight": "bold" }}>
                            Status
                          </TableCell> */}

                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows
                          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map((info, i) => (
                            <TableRow hover role="checkbox" tabIndex={-1} key={info.code || i}>
                               <TableCell align="left">{page * rowsPerPage + i + 1}</TableCell> {/* Corrected line */}
                              <TableCell>{info.countryName}</TableCell>
                              <TableCell>{info.countryCode}</TableCell>
                              <TableCell>{info.countryCapital}</TableCell>
                              <TableCell>{info.countryCurrency}</TableCell>



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

    </>
  )
}
