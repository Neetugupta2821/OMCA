import React from 'react'
import { useState, useEffect } from 'react'
import { EditEnquiryType } from '../../reducer/EnquirySlice'
import { useDispatch, useSelector } from 'react-redux';
import Swal from "sweetalert2";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { useLocation } from "react-router-dom";
import { GetAllEnquiry } from '../../reducer/EnquirySlice'
import { GetAllCountries } from '../../reducer/Countries'

import { NavLink, useNavigate } from "react-router-dom";
export default function EditEnquiry() {
    const dispatch = useDispatch()
    const location = useLocation();
    const { Enquiry, loading, error } = useSelector((state => state.Enquiry))
      const { Countries } = useSelector((state => state.Countries))
    const [editenquiry, setEnquiry] = useState('')
      useEffect(() => {
    
            dispatch(GetAllCountries())
            console.log(error, Countries)
        }, [dispatch])
  useEffect(() => {
  
      dispatch(GetAllEnquiry())
      console.log(error, Enquiry)
    }, [dispatch])
    useEffect(() => {
        if (location.state.enquiryId) {
            const selectedUser = Enquiry.filter((item) => item.enquiryId === location.state.enquiryId);
            setEnquiry(selectedUser[0])

        }

    })
    console.log(editenquiry)
    console.log(location.state.enquiryId)
    console.log(Enquiry)
    const passwordRules = /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/
        ;

    const navigate = useNavigate();


    const basicSchema = Yup.object().shape({
        name: Yup.string()
            .required('Name is required')
            .min(2, 'Name must be at least 2 characters')
            .max(50, 'Name cannot exceed 50 characters'),
        disease_name: Yup.string()
            .required('disease_name is required'),

        country: Yup.string().required("Country is required"),
        email: Yup.string()
            .matches(passwordRules, "Please enter a valid email")

            .required('Email is required'),
        age: Yup.string()
            // .matches(passwordRules, { message: "Please create a stronger password" })
            .required("age is Required"),
        emergency_contact_no: Yup.string()
            .matches(/^[0-9]{10,11}$/, 'Phone number must be 10-11 digits')
            .required('Phone number is required'),

        gender: Yup.string()
            .oneOf(['Male', 'Female', 'Others'], 'Invalid gender selection') // Predefined valid values
            .required('Gender is required'), // Make it mandatory

        // discussionNotes: Yup.string().required('Discussion Notes is required'),

    });


    // const handelSubmit = async (e) => {
    //   e.preventDefault();


    //   try {
    //     // Use unwrap to handle success or error directly
    //     const result = await dispatch(AddAllStaffuser(formData)).unwrap();

    //     Swal.fire({
    //       title: "Staff added successfully!",
    //       text: "You clicked the button!",
    //       icon: "success",
    //     });
    //     navigate("/Admin/Staff");
    //   } catch (err) {
    //     Swal.fire({
    //       title: "Error!",
    //       text: err?.message || "An error occurred",
    //       icon: "error",
    //     });
    //   }
    // };


    return (
        <>
            <div className="page-wrapper">
                <div className="content">
                    <div className="row">
                        <div className="col-md-12">
                            <h4 className="page-title">Edit Enquiry</h4>
                        </div>
                    </div>
                    <div className="main_content">
                        <div className="row">
                            <div className="col-lg-12">
                                <Formik
                                    enableReinitialize // Allow Formik to reinitialize when initialValues change
                                    initialValues={{
                                        name: editenquiry?.name || "",
                                        age: editenquiry?.age || "",
                                        email: editenquiry?.email || "",
                                        gender: editenquiry?.gender || "",
                                        emergency_contact_no: editenquiry?.emergency_contact || "",
                                        country: editenquiry?.country || "",
                                        disease_name: editenquiry?.disease_name || "",
                                        // discussionNotes: '',
                                    }}
                                    validationSchema={basicSchema}
                                    onSubmit={async (values, { setSubmitting }) => {
                                        try {
                                            const result = await dispatch(EditEnquiryType({ id: editenquiry.enquiryId, ...values })).unwrap();
                                            Swal.fire("Enquiry details updated successfully.!", "", "success");
                                            navigate("/Admin/Inquiry");
                                        } catch (err) {
                                            console.log(err)
                                            Swal.fire("Error!", err?.message || "An error occurred", "error");
                                        }
                                        setSubmitting(false);
                                    }}
                                >
                                    {({ isSubmitting, setFieldValue }) => (
                                        <Form>
                                            <div className="row">
                                                {/* Name */}
                                                <div className="col-sm-6">
                                                    <div className="form-group m-0">
                                                        <label>
                                                            Name<span className="text-danger">*</span>
                                                        </label>
                                                        <Field className="form-control" type="text" name="name" />
                                                        <ErrorMessage name="name" component="div" style={{ color: "red" }} />
                                                    </div>
                                                </div>

                                                {/* Email */}
                                                <div className="col-sm-6">
                                                    <div className="form-group">
                                                        <label>
                                                            Email<span className="text-danger">*</span>
                                                        </label>
                                                        <Field className="form-control" type="email" name="email" />
                                                        <ErrorMessage name="email" component="div" style={{ color: "red" }} />
                                                    </div>
                                                </div>

                                                {/* Password */}
                                                <div className="col-sm-6">
                                                    <div className="form-group">
                                                        <label>Age<span className="text-danger">*</span></label>
                                                        <Field className="form-control" type="number" name="age" />
                                                        <ErrorMessage name="age" component="div" style={{ color: "red" }} />
                                                    </div>
                                                </div>

                                                {/* Phone Number */}
                                                <div className="col-sm-6">
                                                    <div className="form-group">
                                                        <label>Phone No<span className="text-danger">*</span></label>
                                                        <Field className="form-control" type="text" name="emergency_contact_no" />
                                                        <ErrorMessage name="emergency_contact_no" component="div" style={{ color: "red" }} />
                                                    </div>
                                                </div>

                                                {/* Role */}
                                                <div className="col-sm-6">
                                                    <div className="form-group">
                                                        <label>Disease name<span className="text-danger">*</span></label>
                                                        <Field className="form-control" type="text" name="disease_name" />
                                                        <ErrorMessage name="disease_name" component="div" style={{ color: "red" }} />
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
                                                {/* Gender */}
                                                <div className="col-sm-6">
                                                    <div className="form-group gender-select">
                                                        <label className="gen-label">Gender<span className="text-danger">*</span></label>
                                                        <div className="form-check-inline">
                                                            <label className="form-check-label">
                                                                <Field type="radio" name="gender" value="Male" className="form-check-input" />
                                                                Male
                                                            </label>
                                                        </div>
                                                        <div className="form-check-inline">
                                                            <label className="form-check-label">
                                                                <Field type="radio" name="gender" value="Female" className="form-check-input" />
                                                                Female
                                                            </label>
                                                        </div>
                                                        <div className="form-check-inline">
                                                            <label className="form-check-label">
                                                                <Field type="radio" name="gender" value="Others" className="form-check-input" />
                                                                Others
                                                            </label>
                                                        </div>
                                                        <ErrorMessage name="gender" component="div" style={{ color: "red" }} />
                                                    </div>
                                                </div>


                                            </div>

                                            {/* Submit Button */}
                                            <div className="m-t-20 text-center">
                                                <button
                                                    className="btn btn-primary submit-btn"
                                                    type="submit"
                                                    disabled={isSubmitting || loading}
                                                >
                                                    {loading ? "Submitting..." : "Update"}
                                                </button>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
