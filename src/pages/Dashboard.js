import React, { useState,useEffect } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import dashboard from '../img/dashboard-doc.png'
import { baseurl } from '../Basurl/Baseurl'
 import {image} from '../Basurl/Baseurl'
 import { GetUserData } from '../reducer/userSlice'
 import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios';
export default function Dashboard() {
  const dispatch = useDispatch()
  const { getuser, loading, error } = useSelector((state) => state.getuser)
  useEffect(() => {
    dispatch(GetUserData())
    console.log(error, getuser)
  }, [dispatch])
const [count,setCount] = useState("")


const GetDashboard = () => {
  axios.get(`${baseurl}Dashboard_count`,{
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      console.log(response.data)
      if (response.data) {
        setCount(response.data)
      } else {
        console.error("Failed to fetch job titles:", response.data.message);
      }
    })
    .catch((error) => {
      console.error("Error fetching job titles:", error);
    });
};

useEffect(() => {
  GetDashboard();
}, []);
  return (
    <>
    <Navbar/>
    <Sidebar/>
      <div className="page-wrapper">
        <div className="content">
        <div className="row">
            <div className="col-md-12">
              <div className="overview">
                <div className="row  align-items-center">
                  <div className="col-md-4 d-flex justify-content-center">
                    <img src={dashboard}  alt="" />
                  </div>
                  <div className="col-md-8">
                    <h3>Welcome {getuser.name}</h3>
                    <p className="mb-0">Have a nice day at work</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
              <div className="dash-widget">
                <span className="dash-widget-bg dash-widget-bg1"><i className="fa fa-users"
                  aria-hidden="true"></i></span>
                <div className="dash-widget-info text-right">
                  <h3>{count.totalStaff}</h3>
                  <span className="widget-title">Total Staff</span>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
              <div className="dash-widget">
                <span className="dash-widget-bg dash-widget-bg2"><i className="fa fa-user-md"></i></span>
                <div className="dash-widget-info text-right">
                  <h3>{count.all_Enquiry}</h3>
                  <span className="widget-title">Total Enquiry</span>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
              <div className="dash-widget">
                <span className="dash-widget-bg dash-widget-bg3"><i className="fa fa-calendar-check-o"
                  aria-hidden="true"></i></span>
                <div className="dash-widget-info text-right">
                  <h3>{count.totalAppointment}</h3>
                  <span className="widget-title">Total Appointments</span>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
              <div className="dash-widget">
                <span className="dash-widget-bg dash-widget-bg4"><i className="fa fa-heartbeat"
                  aria-hidden="true"></i></span>
                <div className="dash-widget-info text-right">
                  <h3>{count.Patients}</h3>
                  <span className="widget-title">Total Patients</span>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
              <div className="dash-widget">
                <span className="dash-widget-bg dash-widget-bg5"><i className="fa fa-clipboard"
                  aria-hidden="true"></i></span>
                <div className="dash-widget-info text-right">
                  <h3>{count.OMCA_total_Earning}</h3>
                  <span className="widget-title">Total Fees Paid Patients</span>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
              <div className="dash-widget">
                <span className="dash-widget-bg dash-widget-bg6"><i className="fa fa-exclamation-triangle"></i></span>
                <div className="dash-widget-info text-right">
                  <h3>{count.totalHospital}</h3>
                  <span className="widget-title">Total Hospital</span>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
              <div className="dash-widget">
                <span className="dash-widget-bg dash-widget-bg7"><i className="fa-solid fa-cash-register"
                  aria-hidden="true"></i></span>
                <div className="dash-widget-info text-right">
                  <h3>{count.duePaymentAll}</h3>
                  <span className="widget-title">Due Payments</span>
                </div>
              </div>
            </div>
            {/* <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
              <div className="dash-widget">
                <span className="dash-widget-bg dash-widget-bg8"><i class="fa-solid fa-x-ray"></i></span>
                <div className="dash-widget-info text-right">
                  <h3>618</h3>
                  <span className="widget-title">Total X-Ray Patients</span>
                </div>
              </div>
            </div> */}
            {/* <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
              <div className="dash-widget">
                <span className="dash-widget-bg dash-widget-bg8"><i class="fa-solid fa-cash-register"></i></span>
                <div className="dash-widget-info text-right">
                  <h3>618</h3>
                  <span className="widget-title">due payments</span>
                </div>
              </div>
            </div> */}
            <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
              <div className="dash-widget">
                <span className="dash-widget-bg dash-widget-bg8"><i class="fa-solid fa-server"></i></span>
                <div className="dash-widget-info text-right">
                  <h3>{count.services}</h3>
                  <span className="widget-title">Services</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>)
}
