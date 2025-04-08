import React from 'react'
import { useLocation } from "react-router-dom";
import { useState, useEffect } from 'react'
import axios from 'axios';
import { baseurl } from '../../Basurl/Baseurl';


export default function EnquiryDetail() {
    const location = useLocation();
    const [row, setRows] = useState("")
    console.log(location.state.enquiryId)
    const fetchJobTitles = () => {
        axios.get(`${baseurl}get_Enq/${location.state.enquiryId}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (response.data.success) {
                    console.log(response)
                    setRows(response.data.detail)
                    // setJobTitles(response.data.details.map(job => job.jobTitle));
                    // setLocation(countries);
                } else {
                    console.error("Failed to fetch job titles:", response.data.message);
                }
            })
            .catch((error) => {
                console.error("Error fetching job titles:", error);
            });
    };
    useEffect(() => {
        fetchJobTitles();

    }, []);
    return (
        <>
            <div>
                <div class="page-wrapper">
                    <div class="content">
                        <div class="row">
                            <div class="col-md-12">
                                <h4 class="page-title">View Enquiry</h4>
                            </div>
                        </div>
                        <div class="main_content view_page">
                            <form>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div className='row'>
                                            <div className='col-md-3'>
                                                <label>Enquiry Id</label>
                                            </div>
                                            <div className='col-md-9'>
                                                <input class="form-control" type="text" value={row.enquiryId} readonly="" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div className='row'>
                                            <div className='col-md-3'>
                                                <label>Patient Name</label>
                                            </div>
                                            <div className='col-md-9'>
                                                <input class="form-control" type="text" value={row.name} readonly="" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div className='row'>
                                            <div className='col-md-3'>
                                                <label>Enq status</label>
                                            </div>
                                            <div className='col-md-9'>
                                                <input class="form-control" type="text" value={row.enq_status}  readonly="" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div className='row'>
                                            <div className='col-md-3'>
                                                <label>Emergency contact no</label>
                                            </div>
                                            <div className='col-md-9'>
                                                <input class="form-control" type="text" value={row.emergency_contact_no} readonly="" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div className='row'>
                                            <div className='col-md-3'>
                                                <label>Email</label>
                                            </div>
                                            <div className='col-md-9'>
                                                <input class="form-control" type="text" value={row.email} readonly="" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div className='row'>
                                            <div className='col-md-3'>
                                                <label>Disease Name</label>
                                            </div>
                                            <div className='col-md-9'>
                                                <input class="form-control" type="text" value={row.disease_name} readonly="" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div className='row'>
                                            <div className='col-md-3'>
                                                <label>Country</label>
                                            </div>
                                            <div className='col-md-9'>
                                                <input class="form-control" type="email" value={row.country} readonly="" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div className='row'>
                                            <div className='col-md-3'>
                                                <label>Gender</label>
                                            </div>
                                            <div className='col-md-9'>
                                                <input class="form-control" type="text" value={row.gender} readonly="" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div className='row'>
                                            <div className='col-md-3'>
                                                <label>Discussion Notes</label>
                                            </div>
                                            <div className="tab-pane" id="bottom-tab3">
                                                <div className="row">
<<<<<<< HEAD
                                                    <div className="col-md-12">
=======
                                                    <div className="col-md-12 ms-3">
>>>>>>> 2f95a2f3b30ce17ceab65b577c54c52c1541bd86
                                                        {row.discussionNotes?.length === 0 ? "No notes for paisent" : <>
                                                            {row.discussionNotes?.map((info, index) => (
                                                                <div className="card-box">
                                                                    <div className=" ">




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
                                        </div>
                                    </div>
                                    {/* <div class="col-md-12">
                                        <div className='row'>
                                            <div className='col-md-3'>
                                                <label>Appointment Status</label>
                                            </div>
                                            <div className='col-md-9'>
                                                <input class="form-control text-success" type="text" value="Active" readonly="" />
                                            </div>
                                        </div>
                                    </div> */}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
