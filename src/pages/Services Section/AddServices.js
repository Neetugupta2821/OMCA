import React from 'react'
import { useState, } from 'react'

import { useDispatch, useSelector } from 'react-redux';
import Swal from "sweetalert2";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { AddMulServices } from '../../reducer/ServiceSlice';
import { NavLink, useNavigate } from "react-router-dom";
export default function AddStaAddServicesff() {
    const dispatch = useDispatch()

    const { Service, loading, error } = useSelector((state => state.staff))
    console.log(error)
    const navigate = useNavigate();


    const basicSchema = Yup.object().shape({
        serviceName: Yup.string()
            .required('Service Name is required'),

        description: Yup.string()
            .required('Description is required'),
        price: Yup.string()
            .required('Price  is required'),
        duration: Yup.string().required("Country is required"),


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
                            <h4 className="page-title">New Service</h4>
                        </div>
                    </div>
                    <div className="main_content">
                        <div className="row">
                            <div className="col-lg-12">
                                <Formik
                                    initialValues={{
                                        serviceName: "",
                                        description: "",
                                        price: "",
                                        duration: "",

                                    }}
                                    validationSchema={basicSchema}
                                    onSubmit={async (values, { setSubmitting }) => {
                                        try {
                                            const result = await dispatch(AddMulServices(values)).unwrap();
                                            Swal.fire("Services added successfully!", "", "success");
                                            navigate("/Admin/Services");
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
                                                            Service Name <span className="text-danger">*</span>
                                                        </label>
                                                        <Field className="form-control" type="text" name="serviceName" />
                                                        <ErrorMessage name="serviceName" component="div" style={{ color: "red" }} />
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="form-group m-0">
                                                        <label>
                                                            Description<span className="text-danger">*</span>
                                                        </label>
                                                        <Field className="form-control" type="text" name="description" />
                                                        <ErrorMessage name="description" component="div" style={{ color: "red" }} />
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="form-group">
                                                        <label>Duration <span className="text-danger">*</span></label>
                                                        <Field as="select" className="form-control" name="duration">
                                                            <option value="">Select duration</option>
                                                            <option value="One-Time">One-Time</option>
                                                            <option value="Day">Day</option>
                                                            <option value="Month">Month</option>
                                                        </Field>
                                                        <ErrorMessage name="duration" component="div" style={{ color: "red" }} />
                                                    </div>
                                                </div>

                                                <div className="col-sm-6">
                                                    <div className="form-group">
                                                        <label>Price <span className="text-danger">*</span></label>
                                                        <Field className="form-control" type="text" name="price" />
                                                        <ErrorMessage name="price" component="div" style={{ color: "red" }} />
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
                                                    {loading ? "Submitting..." : "Create Service"}
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
