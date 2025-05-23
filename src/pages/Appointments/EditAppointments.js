import React from 'react'

export default function EditAppointments() {
  return (
    <>
      <div class="page-wrapper">
        <div class="content">
          <div class="row">
            <div class="col-md-12">
              <h4 class="page-title">Edit Appointments</h4>
            </div>
          </div>
          <div class="main_content">
            <div class="row">
              <div class="col-lg-12">
                <form>
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>Appointment ID</label>
                        <input class="form-control" type="text" value="APT-0001" readonly="" />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>Patient Name</label>
                        <select class="select">
                          <option>Select</option>
                          <option>Jennifer Robinson</option>
                          <option class="selected">Terry Baker</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>Department</label>
                        <select class="select">
                          <option>Select</option>
                          <option>Dentists</option>
                          <option>Neurology</option>
                          <option>Opthalmology</option>
                          <option>Orthopedics</option>
                          <option>Cancer Department</option>
                          <option>ENT Department</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>Doctor</label>
                        <select class="select">
                          <option>Select</option>
                          <option>Cristina Groves</option>
                          <option>Marie Wells</option>
                          <option selected>Henry Daniels</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>Date</label>
                        <div class="cal-icon">
                          <input type="text" class="form-control datetimepicker" />
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>Time</label>
                        <div class="time-icon">
                          <input type="text" class="form-control" id="datetimepicker3" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>Patient Email</label>
                        <input class="form-control" type="email" />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>Patient Phone Number</label>
                        <input class="form-control" type="text" />
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <label>Message</label>
                    <textarea cols="30" rows="4" class="form-control"></textarea>
                  </div>
                  <div class="form-group">
                    <label class="display-block">Appointment Status</label>
                    <div class="form-check form-check-inline">
                      <input class="form-check-input" type="radio" name="status" id="product_active"
                        value="option1" checked />
                      <label class="form-check-label" for="product_active">
                        Active
                      </label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input class="form-check-input" type="radio" name="status" id="product_inactive"
                        value="option2" />
                      <label class="form-check-label" for="product_inactive">
                        Inactive
                      </label>
                    </div>
                  </div>
                  <div class="m-t-20 text-center">
                    <button class="btn btn-primary submit-btn">Save</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}
