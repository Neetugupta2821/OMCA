import React, { useEffect } from 'react'
import { Formik, Field, ErrorMessage, Form } from "formik";
import { useLocation } from "react-router-dom";
import { useState, } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from "yup";
import Swal from "sweetalert2";
import { image } from '../../Basurl/Baseurl'
import { EditStaffUser } from '../../reducer/StaffSlice'
import { useNavigate } from "react-router-dom";
import { GetAllStaffUser } from '../../reducer/StaffSlice'
export default function EditStaff() {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const location = useLocation();
  const dispatch = useDispatch();
  const { staff, loading, error } = useSelector((state) => state.staff);
  const [editStaff, setEditStaff] = useState('')
  // Get the staff data by 
  useEffect(() => {

    dispatch(GetAllStaffUser())
    console.log(error, staff)
  }, [dispatch])
  useEffect(() => {
    if (location.state.staffID) {
      const selectedUser = staff.filter((item) => item._id === location.state.staffID);
      setEditStaff(selectedUser[0])

    }

  })
  console.log(editStaff)


  // Validation schema
  const basicSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name cannot exceed 50 characters"),
    role: Yup.string()
      .required("Role is required")
      .min(2, "Role must be at least 2 characters")
      .max(50, "Role cannot exceed 50 characters"),
    phone_no: Yup.string()
      .matches(/^[0-9]{10,11}$/, "Phone number must be 10-11 digits")
      .required("Phone number is required"),
    gender: Yup.string()
      .oneOf(["Male", "Female", "Others"], "Invalid gender selection")
      .required("Gender is required"),
    profileImage: Yup.mixed()
      .required("Gender is required"),
    // .test("fileSize", "File size is too large (Max: 2MB)", (value) =>
    //   value ? value.size <= 2 * 1024 * 1024 : true
    // )
    // .test("fileType", "Unsupported file format", (value) =>
    //   value ? ["image/jpeg", "image/png","image/jpg"].includes(value.type) : true
    // ),
  });

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="row">
          <div className="col-md-12">
            <h4 className="page-title">Edit Staff</h4>
          </div>
        </div>
        <div className="main_content">
          <div className="col-lg-12">

            <Formik
              enableReinitialize // Allow Formik to reinitialize when initialValues change
              initialValues={{
                email: editStaff?.email || "",
                role: editStaff?.role || "",
                gender: editStaff?.gender || "",
                phone_no: editStaff?.phone_no || "",
                name: editStaff?.name || "",
                profileImage: editStaff?.profileImage || null, // File uploads are handled separately
              }}
              validationSchema={basicSchema}
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  console.log(editStaff._id); // Check editStaff._id here
                  const result = await dispatch(
                    EditStaffUser({ id: editStaff._id, ...values })
                  ).unwrap();
                  console.log(editStaff._id); // Check editStaff._id here too
                  Swal.fire("Success!", "Staff details updated successfully.", "success");
                  navigate('/Admin/staff')
                } catch (err) {
                  Swal.fire("Error!", err?.message || "An error occurred", "error");
                }
                setSubmitting(false);
              }}
            >
              {({ isSubmitting, setFieldValue, values }) => (
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
                        <Field
                          className="form-control"
                          type="email"
                          name="email"
                          disabled
                        />
                        <ErrorMessage name="email" component="div" style={{ color: "red" }} />
                      </div>
                    </div>

                    {/* Phone Number */}
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Phone No</label>
                        <Field className="form-control" type="text" name="phone_no" />
                        <ErrorMessage
                          name="phone_no"
                          component="div"
                          style={{ color: "red" }}
                        />
                      </div>
                    </div>

                    {/* Role */}
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Role</label>
                        <Field className="form-control" type="text" name="role" />
                        <ErrorMessage name="role" component="div" style={{ color: "red" }} />
                      </div>
                    </div>

                    {/* Gender */}
                    <div className="col-sm-6">
                      <div className="form-group gender-select">
                        <label className="gen-label">Gender:</label>
                        <div className="form-check-inline">
                          <label className="form-check-label">
                            <Field
                              type="radio"
                              name="gender"
                              value="Male"
                              className="form-check-input"
                            />
                            Male
                          </label>
                        </div>
                        <div className="form-check-inline">
                          <label className="form-check-label">
                            <Field
                              type="radio"
                              name="gender"
                              value="Female"
                              className="form-check-input"
                            />
                            Female
                          </label>
                        </div>
                        <div className="form-check-inline">
                          <label className="form-check-label">
                            <Field
                              type="radio"
                              name="gender"
                              value="Others"
                              className="form-check-input"
                            />
                            Others
                          </label>
                        </div>
                        <ErrorMessage
                          name="gender"
                          component="div"
                          style={{ color: "red" }}
                        />
                      </div>
                    </div>

                    {/* Avatar */}
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Profile Image</label>
                        <div className="profile-upload">
                          <div className="upload-img">
                            {selectedImage ? (
                              <img
                                alt="preview"
                                src={URL.createObjectURL(selectedImage)}
                                style={{ width: "100px", height: "100px", objectFit: "cover" }}
                              />
                            ) : editStaff?.profileImage ? (
                              <img
                                alt="current avatar"
                                src={`${image}${editStaff?.profileImage}`}
                                style={{ width: "100px", height: "100px", objectFit: "cover" }}
                              />
                            ) : (
                              <img
                                alt="default avatar"
                                src="assets/img/user.jpg"
                                style={{ width: "100px", height: "100px", objectFit: "cover" }}
                              />
                            )}
                          </div>
                          <div className="upload-input">
                            <input
                              type="file"
                              className="form-control"
                              onChange={(event) => {
                                setFieldValue("profileImage", event.target.files[0]);
                                setSelectedImage(event.target.files[0]);
                              }}
                            />
                          </div>
                        </div>
                        <ErrorMessage
                          name="profileImage"
                          component="div"
                          style={{ color: "red" }}
                        />
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
                      {loading ? "Updating..." : "Update Staff"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>


          </div>
        </div>
      </div>
    </div>
  );
}
