import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Swal from "sweetalert2";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { AddCountry } from '../../reducer/Countries'
import { useNavigate } from "react-router-dom";
export default function AddCountries() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const basicSchema = Yup.object().shape({
    countryName: Yup.string()
      .required('Country Name is Required'),

    countryCapital: Yup.string()
      .required("Country Capital is Required"),
    countryCode: Yup.string()
      // .matches(passwordRules, { message: "Please create a stronger password" })
      .required("Country Code is  Required"),
    countryCurrency: Yup.string()
      .required("Country Currency is Required"),





  });
  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="row">
            <div className="col-md-12">
              <h4 className="page-title">New Countries</h4>
            </div>
          </div>
          <div className="main_content">
            <div className="row">
              <div className="col-lg-12">
                <Formik
                  initialValues={{
                    countryName: "",
                    countryCapital: "",
                    countryCode: "",
                    countryCurrency: "",

                  }}
                  validationSchema={basicSchema}
                  onSubmit={async (values, { setSubmitting }) => {
                    try {
                      const result = await dispatch(AddCountry(values)).unwrap();
                      Swal.fire("Country Data added successfully!", "", "success");
                      navigate("/Admin/countries");
                    } catch (err) {
                      console.log(err)
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
                            <label>Country Name<span className="text-danger">*</span></label>
                            <Field className="form-control" type="text" name="countryName" />
                            <ErrorMessage name="countryName" component="div" style={{ color: "red" }} />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label>Code<span className="text-danger">*</span></label>
                            <Field className="form-control" type="text" name="countryCode"/>
                            <ErrorMessage name="countryCode" component="div" style={{ color: "red" }} />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label>Capital <span className="text-danger">*</span></label>
                            <Field className="form-control" type="text" name="countryCapital"/>
                            <ErrorMessage name="countryCapital" component="div" style={{ color: "red" }} />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label>Currency <span className="text-danger">*</span></label>
                            <Field className="form-control" type="text"  name="countryCurrency" />
                            <ErrorMessage name="countryCurrency" component="div" style={{ color: "red" }} />
                          </div>
                        </div>

                      </div>
                      <div className="m-t-20 text-center">
                        <button className="btn btn-primary submit-btn">Create Countries</button>
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
