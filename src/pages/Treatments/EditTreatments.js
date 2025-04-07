import React from 'react'
import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';
import { useState, useEffect } from 'react'
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { EditTreatmentssection } from '../../reducer/TreatmentSlice'
import { useNavigate } from "react-router-dom";
import { GetAllTreatment } from '../../reducer/TreatmentSlice'
export default function EditTreatments() {
  // Validation Schema
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { Treatment, loading, error } = useSelector((state) => state.Treatment);
  const [editTreatment, setEditTreatment] = useState('')
  useEffect(() => {

    dispatch(GetAllTreatment())

  }, [dispatch])
  useEffect(() => {
    if (location.state.course_id) {
      const selectedUser = Treatment.filter((item) => item.course_id === location.state.course_id);
      setEditTreatment(selectedUser[0])

    }

  })
  console.log(editTreatment)
  const basicSchema = Yup.object().shape({
    course_name: Yup.string()
      .required('Course name is required')
      .min(2, 'Course name must be at least 2 characters')
      .max(50, 'Course name cannot exceed 50 characters'),
    course_price: Yup.string()
      .required('Course price is required')
      .min(2, 'Course price must be at least 2 characters')
      .max(50, 'Course price cannot exceed 50 characters'),
    // categories: Yup.array()

    //   .required("At least one category is required"),

  });
  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="row">
            <div className="col-md-12">
              <h4 className="page-title">Edit Treatments</h4>
            </div>
          </div>
          <div className="main_content">
            <div className="row">
              <div className="col-lg-12">
                <Formik
                  enableReinitialize // Add this prop to reinitialize initialValues on changes
                  initialValues={{
                    course_name: editTreatment?.course_name || '', // Use optional chaining and fallback
                    course_price: editTreatment?.course_price || '',
                  }}
                  validationSchema={basicSchema}
                  onSubmit={async (values, { setSubmitting }) => {
                    try {
                      const result = await dispatch(
                        EditTreatmentssection({ id: editTreatment.course_id, ...values })
                      ).unwrap();

<<<<<<< HEAD
                      Swal.fire("Success!", "Treatment details updated successfully.", "success");
=======
                      Swal.fire("Success!", "Staff details updated successfully.", "success");
>>>>>>> 844da55774cce00f599fe234b5003a19ab128f03
                      navigate('/Admin/Treatments');
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
                            <h5>Treatment Course Name<span className="text-danger">*</span></h5>
                            <Field className="form-control" type="text" name="course_name" />
                            <ErrorMessage name="course_name" component="div" style={{ color: 'red' }} />
                          </div>
                        </div>

                        <div className="col-sm-6">
                          <div className="form-group">
                            <h5>Treatments Course Price<span className="text-danger">*</span></h5>
                            <Field className="form-control" type="text" name="course_price" />
                            <ErrorMessage name="course_price" component="div" style={{ color: 'red' }} />
                          </div>
                        </div>
                      </div>

                      <div className="m-t-20 text-center">
                        <button type="submit" className="btn btn-primary submit-btn" disabled={isSubmitting}>
                          Create Treatments
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
