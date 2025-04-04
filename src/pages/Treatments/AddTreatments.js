import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { AddTeatment } from '../../reducer/TreatmentSlice';

export default function AddTreatments() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);

  // Validation Schema
  const basicSchema = Yup.object().shape({
    course_name: Yup.string()
      .required('Course name is required')
      .min(2, 'Course name must be at least 2 characters')
      .max(50, 'Course name cannot exceed 50 characters'),
    course_price: Yup.number()
      .typeError("Price must be a number") // Ensures only numbers
      .required("Course price is required")
      .min(0, "Cannot be a negative number")
      .max(100000000, "Too big"),


    categories: Yup.array()
      .of(
        Yup.object().shape({
          category_name: Yup.string().required("Category name is required"),
        })
      )
      .min(1, "At least one category is required"), // Ensures at least one category is added
  });

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="row">
          <div className="col-md-12">
            <h4 className="page-title">New Course Treatments</h4>
          </div>
        </div>
        <div className="main_content">
          <div className="row">
            <div className="col-lg-12">
              <Formik
                initialValues={{
                  course_name: "",
                  course_price: "",
                  categories: [], // Initialize categories as an empty array
                }}
                validationSchema={basicSchema}
                onSubmit={async (values, { setSubmitting }) => {
                  try {
                    // Log categories before submitting
                    console.log("Categories:", values.categories);

                    // Format the categories before dispatch
                    const formattedData = {
                      ...values, // Spread other values
                      categories: values.categories.map((category) => category.category_name), // Extract category names
                    };
                    console.log("Formatted Data:", formattedData); // Log the formatted data

                    // Dispatch the action
                    const result = await dispatch(AddTeatment(formattedData)).unwrap();
                    Swal.fire("Treatments added successfully!", "", "success");
                    navigate("/Admin/Treatments");
                  } catch (err) {
                    console.log(err);

                    Swal.fire("Error!", err?.message || "An error occurred", "error");
                  }
                  setSubmitting(false);
                }}
              >
                {({ values, isSubmitting, setFieldValue }) => (
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
                          <Field
                            className="form-control"
                            type="number"  // Ensures only numeric input
                            name="course_price"
                            onKeyDown={(e) => {
                              if (e.key === "e" || e.key === "E" || e.key === "+" || e.key === "-") {
                                e.preventDefault(); // Prevents invalid characters like 'e', '+', '-'
                              }
                            }}
                          />

                          <ErrorMessage name="course_price" component="div" style={{ color: 'red' }} />
                        </div>
                      </div>

                      <div className="col-sm-12">
                        <div className="form-group">
                          <h5>Categories<span className="text-danger">*</span></h5>
                          {values.categories.map((category, index) => (
                            <div key={index} style={{ display: 'flex', marginBottom: '10px', alignItems: 'center' }}>
                              <Field
                                type="text"
                                className="form-control"
                                name={`categories.${index}.category_name`} // Dot notation for nested fields
                                placeholder="Enter Category Name"
                              />
                              <ErrorMessage
                                name={`categories.${index}.category_name`}
                                component="div"
                                style={{ color: 'red', marginLeft: '10px' }}
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  const updatedCategories = values.categories.filter((_, i) => i !== index);
                                  setFieldValue('categories', updatedCategories);
                                }}
                                style={{ color: 'red', marginLeft: '10px' }}
                              >
                                Remove
                              </button>
                            </div>
                          ))}


                          <button
                            type="button"
                            onClick={() =>
                              setFieldValue('categories', [
                                ...values.categories,
                                { category_name: '' },
                              ])
                            }
                            className="btn btn-primary submit-btn"
                          >
                            Add Category
                          </button>

                          {/* Custom ErrorMessage for categories */}
                          {/* <ErrorMessage name="categories">
                            {(msg) => {
                              const errorText = Array.isArray(msg)
                                ? msg.join(', ')
                                : typeof msg === 'object'
                                  ? JSON.stringify(msg)
                                  : msg;
                              return <div style={{ color: 'red', marginTop: '10px' }}>{errorText}</div>;
                            }}
                          </ErrorMessage> */}
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
  );
}
