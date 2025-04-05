import React from 'react'

export default function EditCountries() {
  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="row">
            <div className="col-md-12">
              <h4 className="page-title">Edit Countries</h4>
            </div>
          </div>
          <div className="main_content">
            <div className="col-lg-12">
              <form>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Country Name<span className="text-danger">*</span></label>
                      <input className="form-control" type="text" value="United States" />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Code</label>
                      <input className="form-control" type="text" value="US" />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Capital <span className="text-danger">*</span></label>
                      <input className="form-control" type="text" value="Washington, D.C." />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Currency <span className="text-danger">*</span></label>
                      <input className="form-control" type="email" value="USD" />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Icon</label>
                      <div className="profile-upload">
                        <div className="upload-img">
                          <img alt="" src="assets/img/user.jpg" />
                        </div>
                        <div className="upload-input">
                          <input type="file" className="form-control" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="m-t-20 text-center">
                  <button className="btn btn-primary submit-btn">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
