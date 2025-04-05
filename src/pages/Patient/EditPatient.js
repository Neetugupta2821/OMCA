import React from 'react'
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { EditPatientType } from '../../reducer/PatientsSlice'
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from 'react'
import { GetAllPatients } from '../../reducer/PatientsSlice'
import { GetAllCountries } from '../../reducer/Countries'
export default function EditPatient() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { patient, loading, error } = useSelector((state) => state.patient);
  const [ispatient, setIspatient] = useState(null);
  const { Countries } = useSelector((state => state.Countries))
  useEffect(() => {

    dispatch(GetAllCountries())
    console.log(error, Countries)
  }, [dispatch])
  useEffect(() => {

    dispatch(GetAllPatients())
    console.log(error, patient)
  }, [dispatch])
  useEffect(() => {
    console.log("Patient data:", patient); // Debug
    if (location.state?.patientId) {
      const selectedUser = patient.find(
        (item) => item.patientId === location.state.patientId
      );
      setIspatient(selectedUser || null);
    }
  }, [location.state?.patientId, patient]);

  const basicSchema = Yup.object().shape({
    patient_name: Yup.string().required('Patient name is required'),
    age: Yup.number()
      .required('Age is required')
      .min(0, 'Age cannot be less than 0')
      .max(120, 'Age cannot exceed 120'),
    gender: Yup.string().required('Gender is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    emergency_contact_no: Yup.string()
      .required('Emergency contact is required')
      .matches(/^(\+91\s)?[6-9]\d{9}$/, 'Phone number is not valid'),
    country: Yup.string().required('Country is required'),
    // discussionNotes: Yup.string().required('Discussion Notes is required'),
  });

  if (!ispatient) return <div>Loading...</div>;

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="row">
            <div className="col-md-12">
              <h4 className="page-title">Edit Patients</h4>
            </div>
          </div>
          <div className="main_content">
            <div className="col-lg-12">
              <Formik
                enableReinitialize
                initialValues={{
                  patient_name: ispatient?.patient_name || '',
                  age: ispatient?.age || '',
                  gender: ispatient?.gender || '',
                  email: ispatient?.email || '',
                  emergency_contact_no: ispatient?.emergency_contact || '',
                  country: ispatient?.country || '',
                  // discussionNotes: '',
                }}
                validationSchema={basicSchema}
                onSubmit={async (values, { setSubmitting }) => {
                  console.log("Submitting values:", values);
                  try {
                    const result = await dispatch(
                      EditPatientType({ id: ispatient.patientId, ...values })
                    ).unwrap();
                    Swal.fire("Success!", "Patient details updated successfully.", "success");
                    navigate('/Admin/patients');
                  } catch (err) {
                    Swal.fire("Error!", err?.message || "An error occurred", "error");
                  }
                  setSubmitting(false);
                }}

              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>Patient Name <span className="text-danger">*</span></label>
                          <Field className="form-control" type="text" name="patient_name" />
                          <ErrorMessage name="patient_name" component="div" className="text-danger" />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>Age <span className="text-danger">*</span></label>
                          <Field className="form-control" type="number" name="age" />
                          <ErrorMessage name="age" component="div" className="text-danger" />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>Email <span className="text-danger">*</span></label>
                          <Field className="form-control" type="email" name="email" />
                          <ErrorMessage name="email" component="div" className="text-danger" />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>Emergency Contact <span className="text-danger">*</span></label>
                          <Field className="form-control" type="text" name="emergency_contact_no" />
                          <ErrorMessage name="emergency_contact_no" component="div" className="text-danger" />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>Country <span className="text-danger">*</span></label>
                          <Field as="select" className="form-control" name="country">
                            {Countries.map((con, index) => (
                              <option key={index} value={con.countryName}>{con.countryName}</option>
                            ))}
                          </Field>
                          <ErrorMessage name="country" component="div" className="text-danger" />
                        </div>
                      </div>

                      {/* <div className="col-sm-6">
                        <div className="form-group">
                          <label>Discussion Notes<span className="text-danger">*</span></label><br></br>
                          <Field id="w3review" name="discussionNotes" rows="6" cols="70" className="form-control" component="textarea"></Field>
                          <ErrorMessage name="discussionNotes" component="div" className="text-danger" />
                        </div>
                      </div> */}
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label>Gender <span className="text-danger">*</span></label>
                          <div>
                            <label>
                              <Field type="radio" name="gender" value="Male" /> Male
                            </label>
                            <label className="ml-3">
                              <Field type="radio" name="gender" value="Female" /> Female
                            </label>
                            <label className="ml-3">
                              <Field type="radio" name="gender" value="Others" />
                              Others
                            </label>
                          </div>
                          <ErrorMessage name="gender" component="div" className="text-danger" />
                        </div>
                      </div>



                    </div>

                    <div className="m-t-20 text-center">
                      <button type="submit" className="btn btn-primary submit-btn" disabled={isSubmitting}>Save</button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
