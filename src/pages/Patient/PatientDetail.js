import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import { useNavigate } from "react-router-dom";
import { GetPatientTreatments } from '../../reducer/PatientTreatmentSlice'
import { AddHospitalForPatient } from '../../reducer/PatientTreatmentSlice'
import { GetAllHositalData } from '../../reducer/HospitalSlice'
import TextField from '@mui/material/TextField';
import Swal from "sweetalert2";
import Autocomplete from '@mui/material/Autocomplete';
import { AppointmentForPatient } from '../../reducer/PatientTreatmentSlice'
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { baseurl, image } from '../../Basurl/Baseurl'
import { AddKysDetail } from '../../reducer/PatientTreatmentSlice'
import { GetAllServices } from '../../reducer/ServiceSlice'
import AddBoxIcon from '@mui/icons-material/AddBox';
import { ExtraServices } from '../../reducer/PatientTreatmentSlice'
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import moment from 'moment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import { AddNewTretmentPayment } from '../../reducer/PatientTreatmentSlice'

function PatientDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  // const { patient, loading, error } = useSelector((state) => state.patient);
  const { PatientTreatments, loading, error } = useSelector((state) => state.PatientTreatments);
  const { Service } = useSelector((state) => state.Service)
  // const [serviseprice, setServisPrice] = useState("")
  const [ispatient, setIspatient] = useState('');
  const [tretment, setTretment] = useState([])

  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  // const [open4, setOpen4] = React.useState(false);
  const [open5, setOpen5] = React.useState(false);
  const [note, setNote] = useState("")
  const [date, setDate] = useState()
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("sm");
  const [hospitalId, setHospitalId] = useState("")
  const [treatmentId, setTreatmentId] = useState("")
  const [hospitalcharge, sethospitalharge] = useState("")
  const [ishospitalArray, setIShospitalArray] = useState([])
  const [note2, setNote2] = useState("")
  const [date2, setDate2] = useState()
  const [appHospital, setAppHospital] = useState("")
  const [kys, setKyc] = useState([])
  const [notes, setNotes] = useState([])
  const [enqId, setEnqId] = useState("")
  const [payment_details, setPayment_details] = useState([])
  // const [serviceId, setServiceId] = useState("")
  const [selectedServices, setSelectedServices] = useState([]);
  // const [servicecurr, setServiceCurr] = useState("")
  const [chkservice, setChkservice] = useState([])
  const [data, setData] = useState({
    paid_amount: "",
    paymentMethod: "",
    payment_Date: "",

  });
  const AddpaymentOnchnage = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  // const [inputData, setInputData] = useState({
  //   price :serviseprice
  // });
  const { hospital } = useSelector((state) => state.hospital)
  useEffect(() => {

    dispatch(GetAllHositalData())
    console.log(error, hospital)
  }, [dispatch])
  useEffect(() => {
    dispatch(GetAllServices())

    console.log(error, Service)
  }, [dispatch])


  useEffect(() => {
    dispatch(GetPatientTreatments({ id: location.state.patientId }));
  }, [dispatch, location.state.patientId]);
  useEffect(() => {
    if (PatientTreatments) {
      setIspatient(PatientTreatments);
      setTretment(PatientTreatments.treatments || []); // Ensure treatments is always an array
      setKyc(PatientTreatments.Kyc_details)
      setNotes(PatientTreatments.discussionNotes)
      setPayment_details(PatientTreatments.payment_details)
      setChkservice(PatientTreatments.services)

    }
  }, [PatientTreatments]);
  console.log(chkservice)
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = (e, tretmentId) => {
    setOpen(true)
    setTreatmentId(tretmentId)
  }
  const handleClickOpen5 = (e, enq) => {
    setOpen5(true)
    setEnqId(enq)
    // setTreatmentId(tretmentId)
    // setIShospitalArray(listhospital)
  }
  const handleClose5 = () => {
    setOpen5(false);
  };
  const handleClickOpen1 = (e, tretmentId, listhospital) => {
    setOpen1(true)
    setTreatmentId(tretmentId)
    setIShospitalArray(listhospital)

  }
  const handleClickOpen2 = (e, tretmentId, listhospital) => {
    setOpen2(true)
    // setTreatmentId(tretmentId)
    // setIShospitalArray(listhospital)
  }
  const handleClickOpen3 = (e) => {
    // alert("hello")
    setOpen3(true)
    // setTreatmentId(tretmentId)
    // setIShospitalArray(listhospital)
  }


  const handleClose1 = () => {
    setOpen1(false);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };
  const handleClose3 = () => {
    setOpen3(false);
  };
  // const handleClose4 = () => {
  //   setOpen4(false);
  // };
  const PatientDetailButton = (e, id) => {
    navigate("/Admin/add-patient-treatment", {
      state: {
        patient: location.state.patientId,

      },
    })
  }


  // const handlesubmit = (e) => {
  //   e.preventDefault()
  //   dispatch(AddHospitalForPatient({ id: location.state.patientId, hospitalId: hospitalId, treatmentId: treatmentId, hospital_charge: hospitalcharge }))

  // }

  const handlesubmit = async (e) => {
    e.preventDefault()
    const result = await dispatch(AddHospitalForPatient({ id: location.state.patientId, hospitalId: hospitalId, treatmentId: treatmentId, hospital_charge: hospitalcharge })).unwrap();
    try {

      setOpen1(false)
      Swal.fire("Patient assigned to Hospital successfully!", "", "success");
      dispatch(GetPatientTreatments({ id: location.state.patientId }));
      setTreatmentId("")
      setNote("")
      setDate("")
      setHospitalId("")
    }
    catch (err) {
      setOpen1(false)
      Swal.fire("Error!", err?.message || "An error occurred", "error");
    }
  }
  const handlesubmitAppoint = async (e) => {
    e.preventDefault()
    const result = await dispatch(AppointmentForPatient({ patientId: location.state.patientId, hospitalId: appHospital, treatment_id: treatmentId, note: note, appointment_Date: date })).unwrap();
    try {

      setOpen1(false)
      Swal.fire("Patient assigned to Hospital successfully!", "", "success");
      dispatch(GetPatientTreatments({ id: location.state.patientId }));
      setTreatmentId("")
      sethospitalharge("")
      setHospitalId("")
    }
    catch (err) {
      Swal.fire("Error!", err?.message || "An error occurred", "error");
    }
  }
  const [filesData, setFilesData] = useState({});

  const onChangeFile = (e, fieldName) => {
    const file = e.target.files[0]; // Only the first file is considered
    if (file) {
      setFilesData((prevState) => ({
        ...prevState,
        [fieldName]: file, // Use the fieldName as the key
      }));
    }
  };

  const handleKysDetail = async (e) => {
    e.preventDefault();
    const result = await dispatch(AddKysDetail({ id: location.state.patientId, id_proof: filesData.id_proof, passport: filesData.passport, photo: filesData.photo })).unwrap();
    console.log(filesData)
    try {

      setOpen2(false)
      Swal.fire("Passport Details Added Successfully!", "", "success");
      dispatch(GetPatientTreatments({ id: location.state.patientId }));

    }
    catch (err) {
      Swal.fire("Error!", err?.message || "An error occurred", "error");
    }

  };


  const handleOnChangeCheckbox = (event, id) => {
    const selectedService = Service.find((info) => info.serviceId === id);

    if (selectedService) {
      if (event.target.checked) {
        // Add service to selectedServices if not already present
        if (!selectedServices.some((service) => service.serviceId === id)) {
          setSelectedServices((prev) => [
            ...prev,
            { serviceId: selectedService.serviceId, price: selectedService.price },
          ]);
        }

        // Update chkservice to reflect the new checked state
        setChkservice((prev) => [...prev, selectedService]);

      } else {
        // Remove service from selectedServices
        setSelectedServices((prev) =>
          prev.filter((service) => service.serviceId !== id)
        );

        // Remove service from chkservice
        setChkservice((prev) =>
          prev.filter((service) => service.serviceId !== id)
        );
      }
    }
  };



  const handleExtraService = async () => {
    const allServices = [...chkservice, ...selectedServices]; // Combine previous and new services
  
    try {
      const result = await dispatch(
        ExtraServices({ id: location.state.patientId, services: allServices })
      ).unwrap();
  
      Swal.fire("New Services Added!", "", "success");
  
      // Refresh the patient treatments (including services)
      dispatch(GetPatientTreatments({ id: location.state.patientId }));
    } catch (err) {
      Swal.fire("Error!", err?.message || "An error occurred", "error");
    }
  
    console.log("Selected Services:", selectedServices);
    console.log("Previous Services (chkservice):", chkservice);
    console.log("All Services Sent to API:", allServices);
  };
  

  const handleNotesdata = (e) => {
    e.preventDefault();  // Prevents the default form submission behavior

    axios.post(`${baseurl}add_notes/${location.state.enqId}`, {
      note: note2,
      date: date2
    })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setOpen5(false)
          Swal.fire("Success", "Notes added successfully!", "success");
          dispatch(GetPatientTreatments({ id: location.state.patientId }));
        }
        setNote2("")
        setDate2("")
      })
      .catch((error) => {
        setOpen5(false)
        console.log(error);
        Swal.fire("Error", `${error?.response?.data?.message}`, "error");
      });
  };
  const handleAddTritmentPayment = async (e) => {

    e.preventDefault();
    alert("hello ")
    const result = await dispatch(AddNewTretmentPayment({ id: location.state.patientId, paid_amount: data.paid_amount, paymentMethod: data.paymentMethod, payment_Date: data.payment_Date })).unwrap();
    console.log(filesData)
    try {

      setOpen3(false)
      Swal.fire("Passport Details Added Successfully!", "", "success");
      dispatch(GetPatientTreatments({ id: location.state.patientId }));

    }
    catch (err) {
      Swal.fire("Error!", err?.message || "An error occurred", "error");
    }
  };
  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="row">
            <div className="col-sm-7 col-6">
              <h4 className="page-title">My Profile</h4>
            </div>
            {/* <div className="col-sm-5 col-6 text-right m-b-30">
              <Link to="/EditProfile" className="btn btn-primary btn-rounded"><i className="fa fa-plus"></i> Edit
                Profile</Link>
            </div> */}
          </div>
          <div className="card-box profile-header">
            <div className="row">
              <div className="col-md-12">
                <div className="profile-view">
                  <div className="profile-img-wrap">
                    <div className="profile-img">
                      <a href="#"><img className="avatar" src="assets/img/doctor-03.jpg" alt="" /></a>
                    </div>
                  </div>
                  <div className="profile-basic">
                    <div className="row">
                      <div className="col-md-5">
                        <div className="profile-info-left">
                          <h3 className="user-name m-t-0 mb-0">{ispatient?.patient_name}</h3>
                          <small className="text-muted">
                            {ispatient?.country}
                          </small>
                          <div className="staff-id">Patient ID :  {ispatient?.patientId}</div>
                          {/* <div className="staff-msg"><a href="chat.html" className="btn btn-primary">Send
                            Message</a></div> */}
                        </div>
                      </div>
                      <div className="col-md-7">
                        <ul className="personal-info">
                          <li>
                            <span className="title">Phone:</span>
                            <span className="text"><a href=""> {ispatient?.emergency_contact_no}</a></span>
                          </li>
                          <li>
                            <span className="title">Email:</span>
                            <span className="text"><a href="">{ispatient?.email}</a></span>
                          </li>
                          <li>
                            <span className="title">Patient Status:</span>
                            <span className="text">{ispatient?.patient_status}</span>
                          </li>
                          <li>
                            <span className="title">Country:</span>
                            <span className="text">{ispatient?.country}</span>
                          </li>
                          <li>
                            <span className="title">Gender:</span>
                            <span className="text">{ispatient?.gender} </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="profile-tabs">
            <ul className="nav nav-tabs nav-tabs-bottom">
              <li className="nav-item"><a className="nav-link active" href="#about-cont" data-toggle="tab">Treatment </a>
              </li>
              <li className="nav-item"><a className="nav-link" href="#bottom-tab2" data-toggle="tab">Add Passport</a></li>
              <li className="nav-item"><a className="nav-link" href="#bottom-tab3" data-toggle="tab">Discussion Notes

              </a></li>
              <li className="nav-item"><a className="nav-link" href="#bottom-tab4" data-toggle="tab">Payment Details
              </a></li>
              <li className="nav-item"><a className="nav-link" href="#bottom-tab5" data-toggle="tab">Services</a></li>
            </ul>
            <div className="tab-content">
              <div className="tab-pane show active" id="about-cont">

                <div className="row">
                  <div className="col-md-12">
                    <button onClick={PatientDetailButton} className="btn btn btn-primary btn-rounded float-right mx-2"><i
                      className="fa fa-plus"></i>Add Treatment</button>
                    {tretment?.length === 0 ? "No Treatment  Added for this patients" : <>
                      {tretment?.map((info, index) => (
                        <div className="card-box">
                          <div className="text-right">
                            {index === 0 &&
                              <button onClick={PatientDetailButton} className="btn btn btn-primary btn-rounded float-right mx-2"><i
                                className="fa fa-plus"></i> Add Treatment</button>}

                            <button onClick={(e) => handleClickOpen(e, info.treatment_id)} className="btn btn btn-primary btn-rounded float-right"><i
                              className="fa fa-plus"></i> Add Hospital</button>
                            <button onClick={(e) => handleClickOpen1(e, info.treatment_id, info.Hospital_details)} className="btn btn btn-primary btn-rounded float-right mx-2"><i
                              className="fa fa-plus"></i> Add Appointment</button>
                          </div>
                          <h3 className="card-title">Treatment ID-{info.treatment_id} <span className='mx-5'>
                            <FormControl sx={{ minWidth: 180 }} size="small">
                              <InputLabel id={`demo-select-small-label-${index}`}>
                                {info.Enquiry_status === "Confirmed"
                                  ? "Confirmed"
                                  : info.Enquiry_status === "Hold"
                                    ? "Hold"
                                    : info.Enquiry_status === "Follow-Up"
                                      ? "Follow-up"
                                      : info.Enquiry_status === "Dead"
                                        ? "Dead"
                                        : "Treatment status"}

                              </InputLabel>

                              <Select
                                labelId={`demo-select-small-label-${index}`}
                                id={`demo-select-small-${index}`}
                              // value={seekerStatus[info.enquiryId] || ""} // Use state to set the current value
                              // // label="Seeker Status"
                              // onChange={(e) => handleChange(e, info.enquiryId)} // Handle change here
                              >
                                <MenuItem value="1">Schedule</MenuItem>
                                <MenuItem value="2">Follow-Up</MenuItem>
                                <MenuItem value="3">Complete</MenuItem>

                              </Select>
                            </FormControl>
                          </span></h3>

                          <div className="experience-box">

                            <ul className="experience-list">

                              <li>
                                <div className="experience-user">
                                  <div className="before-circle"></div>
                                </div>
                                <div className="experience-content">
                                  <div className="timeline-content">
                                    <a className="name">Treatment Name-{info.treatment_name}</a>
                                    <div>Total Charge-{info.treatment_total_charge}</div>
                                    <span className="time">treatment due payment-{info.treatment_due_payment}</span>
                                  </div>
                                  {info.Hospital_details.map((item) => (
                                    <div className="timeline-content">
                                      <a className="name">Hospital Name-{item.hospital_Name}</a>
                                      <div>Hospital charge-{item.hospital_charge}</div>

                                    </div>
                                  ))}
                                  {info.appointments_details.map((item) => (
                                    <div className="timeline-content">
                                      <a className="name">Appointment ID-{item.appointmentId}</a>
                                      <div>Appointment Date-{item.appointment_Date}</div>
                                    </div>
                                  ))}
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>

                      ))}
                    </>
                    }

                  </div>
                </div>
              </div>
              <div className="tab-pane" id="bottom-tab2">
                <div className="row">
                  <div className="col-md-12">
                    <button className="btn btn btn-primary btn-rounded float-right" onClick={(e) => handleClickOpen2(e)}><i
                      className="fa fa-plus"></i> Add passport</button>
                    {kys?.length === 0 ? "Add passport page" : <>
                      {kys?.map((info, index) => (
                        <div className="card-box">
                          <div className=" ">
                          </div>
                          <h3 className="card-title">Passport Details</h3>
                          <div className="experience-box">
                            <ul className="experience-list">
                              <li>
                                <div className="experience-user">
                                  <div className="before-circle"></div>
                                </div>
                                <div className="experience-content">
                                  <div className="timeline-content name">
                                    ID Proof-
                                    {info.id_proof ? (
                                      <a
                                        href={"http://192.168.1.59:5201/" + info.id_proof}
                                        target="Loading Pdf file"
                                        rel="noreferrer"
                                      >
                                        <PictureAsPdfIcon />
                                      </a>
                                    ) : (
                                      "_"
                                    )}
                                    <div> passport-
                                      {info.passport ? (
                                        <a
                                          href={"http://192.168.1.59:5201/" + info.passport}
                                          target="Loading Pdf file"
                                          rel="noreferrer"

                                        >
                                          <PictureAsPdfIcon />
                                        </a>
                                      ) : (
                                        "_"
                                      )}</div>
                                    <span className="time"> photo-
                                      <img width="28" height="28" src={`${image}${info.photo}`} className="rounded-circle m-r-5" alt="" />

                                    </span>
                                  </div>

                                </div>
                              </li>

                            </ul>
                          </div>
                        </div>

                      ))}
                    </>}

                  </div>
                </div>
              </div>
              <div className="tab-pane" id="bottom-tab3">
                <div className="row">
                  <div className="col-md-12">

                    {notes?.length === 0 ? "No notes for Patient" : <>
                      {notes?.map((info, index) => (
                        <div className="card-box">
                          <div className=" ">
                            {index === 0 && <button className="btn btn btn-primary btn-rounded float-right" onClick={(e) => handleClickOpen5(e, info.enquiryId)}><i
                              className="fa fa-plus"></i> Add Notes</button>}
                          </div>
                          <h3 className="card-title">Note-{index + 1}</h3>
                          <div className="experience-box">

                            <ul className="experience-list">

                              <li>
                                <div className="experience-user">
                                  <div className="before-circle"></div>
                                </div>
                                <div className="experience-content">
                                  <div className="timeline-content">
                                    <a href="#/" className="name">{info.note}</a>
                                    <div>date-{info.date}</div>
                                    {/* <span className="time">treatment due payment-{info.treatment_due_payment}</span> */}
                                  </div>

                                </div>
                              </li>


                            </ul>
                          </div>
                        </div>

                      ))}
                    </>}

                  </div>
                </div>
              </div>
              <div className="tab-pane" id="bottom-tab4">
                <div className="row">
                  <div className="col-md-12">
                    {payment_details?.length === 0 ? "No payment details for patients" : <> {payment_details?.map((info, index) => (
                      <div className="card-box">
                        <div className=" ">

                          {index == 0 && (
                            <button className="btn btn btn-primary btn-rounded float-right" onClick={(e) => handleClickOpen3(e)}><i
                              className="fa fa-plus" ></i> Add Amount</button>
                          )}


                        </div>
                        <h3 className="card-title">Payment Date-{moment(info.payment_Date).format('L')}</h3>
                        <div className="experience-box">

                          <ul className="experience-list">

                            <li>
                              <div className="experience-user">
                                <div className="before-circle"></div>
                              </div>
                              <div className="experience-content">
                                <div className="timeline-content">
                                  <a href=" " className="name">Payment Method-{info.paymentMethod}</a>
                                  <div>Paid amount-{info.paid_amount}</div>
                                  {/* <span className="time">payment_Date-{info.payment_Date}</span> */}
                                </div>


                              </div>
                            </li>


                          </ul>
                        </div>
                      </div>

                    ))}</>}
                  </div>
                </div>
              </div>
              <div className="tab-pane" id="bottom-tab5">
                <div className="new">
                  <form className=" ">
                    {Service.map((service, index) => (
                      <div key={index} className="form-group">
                        <input
                          type="checkbox"
                          id={service.serviceId}
                          value={service.serviceId}
                          onChange={(event) => handleOnChangeCheckbox(event, service.serviceId)}
                          checked={chkservice?.some((ser) => ser.serviceId === service.serviceId)}
                        />

                        <label htmlFor={service.serviceId}>{service.serviceName} </label>
                      </div>
                    ))}
                  </form>
                </div>
                <button className='btn btn-primary' onClick={handleExtraService}>extra service</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <React.Fragment>
        <Dialog
          fullWidth={fullWidth}
          maxWidth={maxWidth}
          open={open}
          onClose={handleClose}

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
                <form id="contact-form" className="contact-form" method="post" role="form">
                  <div className="form-group-Add my-2">
                    <Autocomplete
                      disablePortal
                      options={hospital?.map(job => job.hospitalName) || []} // Fallback to empty array
                      onChange={(e, value) => {
                        const selectedCourse = hospital?.find(job => job.hospitalName === value);
                        const courseId = selectedCourse ? selectedCourse.hospitalId : null;
                        setHospitalId(courseId)
                      }}
                      renderInput={(params) => <TextField {...params} label="hospital" />}
                      sx={{
                        width: 510,
                        '& .MuiOutlinedInput-root': {
                          padding: '0px',
                          '&:hover fieldset': {
                            borderColor: '#ced4da',
                          },
                        },
                      }}
                    />
                  </div>
                  <div className="form-group-Add">
                    <input
                      type="email"
                      placeholder="Treatment ID"
                      className="form-control"
                      name="treatmentId"
                      required=""
                      value={treatmentId}
                    />
                  </div>
                  <div className="form-group-Add">
                    <input
                      type="text"
                      placeholder="Hospital charge"
                      className="form-control"
                      name="hospitalcharge"
                      required=""
                      onChange={(e) => sethospitalharge(e.target.value)}
                      value={hospitalcharge}
                    />
                  </div>
                  <DialogActions>
                    <Button type="submit" onClick={(e) => handlesubmit(e)} variant="contained">
                      Submit
                    </Button>
                    <Button onClick={handleClose} color="primary">
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
      <React.Fragment>
        <Dialog
          fullWidth={fullWidth}
          maxWidth={maxWidth}
          open={open1}
          onClose={handleClose1}

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
                <form id="contact-form" className="contact-form" method="post" role="form">
                  <div className="form-group-Add my-2">
                    <label>Hospital<span className="text-danger">*</span></label><br></br>
                    <Autocomplete
                      disablePortal
                      options={ishospitalArray?.map(job => job.hospital_Name) || []} // Fallback to empty array
                      onChange={(e, value) => {
                        const selectedCourse = ishospitalArray?.find(job => job.hospital_Name === value);
                        const courseId = selectedCourse ? selectedCourse.hospital_id : null;
                        setAppHospital(courseId)
                      }}
                      renderInput={(params) => <TextField {...params} />}
                      sx={{
                        width: 510,
                        '& .MuiOutlinedInput-root': {
                          padding: '0px',
                          '&:hover fieldset': {
                            borderColor: '#ced4da',
                          },
                        },
                      }}
                    />
                  </div>
                  <div className="form-group-Add">
                    <label>Notes<span className="text-danger">*</span></label><br></br>
                    <textarea id="w3review" name="discussionNotes" rows="4" cols="50" className="form-control" component="textarea" placeholder="Note" onChange={(e) => setNote(e.target.value)} value={note} />

                  </div>
                  <div className="form-group-Add">
                    <label>Appointment Date<span className="text-danger">*</span></label><br></br>
                    <input type="date" id="birthday" name="date" placeholder="Appointment Date" className="form-control" onChange={(e) => setDate(e.target.value)} value={date} />

                  </div>
                  <DialogActions>
                    <Button type="submit" onClick={(e) => handlesubmitAppoint(e)} variant="contained">
                      Submit
                    </Button>
                    <Button onClick={handleClose1} color="primary">
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
                <form id="contact-form" className="contact-form">
                  <div className="form-group-Add">
                    <label>ID Proof<span className="text-danger">*</span></label><br />
                    <div className="upload-input">
                      <input
                        type="file"
                        className="form-control"
                        onChange={(e) => onChangeFile(e, "id_proof")}
                      />
                    </div>
                  </div>
                  <div className="form-group-Add">
                    <label>Passport<span className="text-danger">*</span></label><br />
                    <div className="upload-input">
                      <input
                        type="file"
                        className="form-control"
                        onChange={(e) => onChangeFile(e, "passport")}
                      />
                    </div>
                  </div>
                  <div className="form-group-Add">
                    <label>Photo<span className="text-danger">*</span></label><br />
                    <div className="upload-input">
                      <input
                        type="file"
                        className="form-control"
                        onChange={(e) => onChangeFile(e, "photo")}
                      />
                    </div>
                  </div>
                  <DialogActions>



                    <Button type="submit" onClick={(e) => handleKysDetail(e)} variant="contained">
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
                      type="text"
                      placeholder="paid amount"
                      className="form-control"
                      name="paid_amount"
                      required=""
                      onChange={AddpaymentOnchnage}
                      value={data.paid_amount}
                    />
                  </div>
                  <div className="form-group-Add">

                    <input
                      type="text"
                      placeholder="payment Method"
                      className="form-control"
                      name="paymentMethod"
                      required=""
                      onChange={AddpaymentOnchnage}
                      value={data.paymentMethod}
                    />
                  </div>
                  <div className="form-group-Add">

                    <div className="upload-input">
                      <input type="date" id="birthday" name="payment_Date" placeholder="Appointment Date" className="form-control" onChange={AddpaymentOnchnage} value={data.payment_Date} />
                    </div>
                  </div>
                  <DialogActions>



                    <Button type="submit" onClick={(e) => handleAddTritmentPayment(e)} variant="contained">
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
      {/* <React.Fragment>
        <Dialog
          fullWidth
          maxWidth="sm"
          open={open4}
          onClose={handleClose4}
        >
          <DialogContent>
            <Box
              component="form"
              sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}
            >
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Price"
                  className="form-control"
                  name="servicePrice"
                  required
                  onChange={(e) => setServiceCurr(e.target.value)}
                  value={servicecurr}
                />
              </div>
              <p>You can add a new service price; otherwise, the existing price will be used.</p>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button   color="primary">
              Save
            </Button>
            <Button onClick={handleClose4} color="secondary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment> */}
      <React.Fragment>
        <Dialog
          fullWidth={fullWidth}
          maxWidth={maxWidth}
          open={open5}
          onClose={handleClose5}

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
                      onChange={(e) => setNote2(e.target.value)} value={note2} />
                  </div>

                  <div className="form-group-Add">
                    <label>Appointment Date<span className="text-danger">*</span></label><br />
                    <input type="date" id="birthday" name="date" placeholder="Appointment Date"
                      className="form-control" onChange={(e) => setDate2(e.target.value)} value={date2} />
                  </div>

                  <DialogActions>
                    <Button type="submit" variant="contained" onClick={handleNotesdata}>
                      Submit
                    </Button>
                    <Button onClick={handleClose5} color="primary">
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

export default PatientDetail