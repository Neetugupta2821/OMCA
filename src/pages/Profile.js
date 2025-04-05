import React from 'react'
import { Link } from 'react-router-dom'
import { GetUserData } from '../reducer/userSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import {image} from '../Basurl/Baseurl'
import { Formik, Field, ErrorMessage, Form } from "formik";
export default function Profile() {
  const dispatch = useDispatch()
  const { getuser, loading, error } = useSelector((state) => state.getuser)
  useEffect(() => {
    dispatch(GetUserData())
    console.log(error, getuser)
  }, [dispatch])
  console.log(getuser)
  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="row">
            <div className="col-sm-7 col-6">
              <h4 className="page-title">My Profile</h4>
            </div>
            <div className="col-sm-5 col-6 text-right m-b-30">
              <Link to="/Admin/edit-profile" className="btn btn-primary btn-rounded"><i className="fa fa-plus"></i> Edit
                Profile</Link>
            </div>
          </div>
          <div className="card-box profile-header">
            <div className="row">
              <div className="col-md-12">
                <div className="profile-view">
                  <div className="profile-img-wrap">
                    <div className="profile-img">
                      <a href="#"><img className="avatar" src={`${image}${getuser.profileImage}`} alt="" /></a>
                    </div>
                  </div>
                  <div className="profile-basic">
                    <div className="row">
                      <div className="col-md-5">
                        <div className="profile-info-left">
                          <h3 className="user-name m-t-0 mb-0">{getuser.name}</h3>
                          <small className="text-muted">{getuser.role}</small>
                          {/* <div className="staff-id">Employee ID : DR-0001</div> */}
                          {/* <div className="staff-msg"><a href="chat.html" className="btn btn-primary">Send
                            Message</a></div> */}
                        </div>
                      </div>
                      <div className="col-md-7">
                        <ul className="personal-info">
                          <li>
                            <span className="title">Phone:</span>
                            <span className="text"><a href="#">{getuser.phone_no}</a></span>
                          </li>
                          <li>
                            <span className="title">Email:</span>
                            <span className="text"><a href="#">{getuser.email}</a></span>
                          </li>
                          <li>
                            <span className="title">Role:</span>
                            <span className="text">{getuser.role} </span>
                          </li>
                          <li>
                            <span className="title">Address:</span>
                            <span className="text">714 Burwell Heights Road, Bridge City, TX,
                              77611</span>
                          </li>
                          <li>
                            <span className="title">Gender:</span>
                            <span className="text">{getuser.gender}</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="profile-tabs">
            <ul className="nav nav-tabs nav-tabs-bottom">
              <li className="nav-item"><a className="nav-link active" href="#about-cont" data-toggle="tab">About</a>
              </li>
              <li className="nav-item"><a className="nav-link" href="#bottom-tab2" data-toggle="tab">Profile</a></li>
              <li className="nav-item"><a className="nav-link" href="#bottom-tab3" data-toggle="tab">Messages</a></li>
            </ul>
            <div className="tab-content">
              <div className="tab-pane show active" id="about-cont">
                <div className="row">
                  <div className="col-md-12">
                    <div className="card-box">
                      <h3 className="card-title">Education Informations</h3>
                      <div className="experience-box">
                        <ul className="experience-list">
                          <li>
                            <div className="experience-user">
                              <div className="before-circle"></div>
                            </div>
                            <div className="experience-content">
                              <div className="timeline-content">
                                <a href="#/" className="name">International College of Medical
                                  Science (UG)</a>
                                <div>MBBS</div>
                                <span className="time">2001 - 2003</span>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="experience-user">
                              <div className="before-circle"></div>
                            </div>
                            <div className="experience-content">
                              <div className="timeline-content">
                                <a href="#/" className="name">International College of Medical
                                  Science (PG)</a>
                                <div>MD - Obstetrics & Gynaecology</div>
                                <span className="time">1997 - 2001</span>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="card-box mb-0">
                      <h3 className="card-title">Experience</h3>
                      <div className="experience-box">
                        <ul className="experience-list">
                          <li>
                            <div className="experience-user">
                              <div className="before-circle"></div>
                            </div>
                            <div className="experience-content">
                              <div className="timeline-content">
                                <a href="#/" className="name">Consultant Gynecologist</a>
                                <span className="time">Jan 2014 - Present (4 years 8
                                  months)</span>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="experience-user">
                              <div className="before-circle"></div>
                            </div>
                            <div className="experience-content">
                              <div className="timeline-content">
                                <a href="#/" className="name">Consultant Gynecologist</a>
                                <span className="time">Jan 2009 - Present (6 years 1
                                  month)</span>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="experience-user">
                              <div className="before-circle"></div>
                            </div>
                            <div className="experience-content">
                              <div className="timeline-content">
                                <a href="#/" className="name">Consultant Gynecologist</a>
                                <span className="time">Jan 2004 - Present (5 years 2
                                  months)</span>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tab-pane" id="bottom-tab2">
                Tab content 2
              </div>
              <div className="tab-pane" id="bottom-tab3">
                Tab content 3
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  )
}