import React from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import axios from "axios";
import { baseurl } from "../Basurl/Baseurl";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

export default function ChangePassword() {
  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string().required("Old Password is required"),
    newPassword: Yup.string()
      .required("New Password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="row">
          <div className="col-md-12">
            <h4 className="page-title">Change Password</h4>
          </div>
        </div>

        <div className="container" style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "10px" }}>
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-8">
              <Formik
                initialValues={{
                  oldPassword: "",
                  newPassword: "",
                  confirmPassword: "",
                }}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                  try {
                    const response = await axios.post(
                      `${baseurl}change_user_password/${localStorage.getItem("_id")}`,
                      values,
                      {
                        headers: {
                          Authorization: `Bearer ${localStorage.getItem("token")}`,
                          "Content-Type": "application/json",
                        },
                      }
                    );
                    if (response.status === 200) {
                      Swal.fire("Success", "Password updated successfully!", "success");
                      resetForm();
                    }
                  } catch (error) {
                    Swal.fire("Error", error?.response?.data?.message || "Something went wrong", "error");
                  }
                  setSubmitting(false);
                }}
              >
                {() => (
                  <Form className="">
                    <div className="form-group">
                      <label>Old Password <span className="text-danger">*</span></label>
                      <Field className="form-control" type="password" name="oldPassword" />
                      <ErrorMessage name="oldPassword" component="div" className="text-danger" />
                    </div>

                    <div className="form-group">
                      <label>New Password <span className="text-danger">*</span></label>
                      <Field className="form-control" type="password" name="newPassword" />
                      <ErrorMessage name="newPassword" component="div" className="text-danger" />
                    </div>

                    <div className="form-group">
                      <label>Confirm Password <span className="text-danger">*</span></label>
                      <Field className="form-control" type="password" name="confirmPassword" />
                      <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
                    </div>

                    <div className="form-group text-center">
                      <button type="submit" className="btn btn-primary btn-rounded">
                        Submit 
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
  );
}
