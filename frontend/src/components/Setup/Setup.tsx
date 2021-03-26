import { MDBContainer, MDBBtn, MDBBadge } from "mdbreact"

import "@markup/components/Setup/Setup.css"
import React from "react"


function Setup() {
  return (
    <MDBContainer>
      <form className="setup-form">
        <p className="h4 text-center mb-4">Prepare your annotation session</p>
        <br/>

        <label htmlFor="defaultFormRegisterNameEx" className="grey-text">
          Quantity<MDBBadge color="danger" className="ml-2">R</MDBBadge>
        </label>
        <div>
          <select className="browser-default custom-select">
            <option value="1">Single document</option>
            <option value="2">Multiple documents</option>
          </select>
        </div>
        <br />

        <label htmlFor="defaultFormRegisterEmailEx" className="grey-text">
          Document to annotate<MDBBadge color="danger" className="ml-2">R</MDBBadge>
        </label>
        <input type="email" id="defaultFormRegisterEmailEx" className="form-control" />
        <br />

        <label htmlFor="defaultFormRegisterConfirmEx" className="grey-text">
          Configuration file<MDBBadge color="danger" className="ml-2">R</MDBBadge>
        </label>
        <input type="email" id="defaultFormRegisterConfirmEx" className="form-control" />
        <br />

        <label htmlFor="defaultFormRegisterPasswordEx" className="grey-text">
          Existing annotations<MDBBadge color="success" className="ml-2">O</MDBBadge>
        </label>
        <input type="password" id="defaultFormRegisterPasswordEx" className="form-control" />
        <br />

        <label htmlFor="defaultFormRegisterPasswordEx" className="grey-text">
          Ontology<MDBBadge color="success" className="ml-2">O</MDBBadge>
        </label>
        <input type="password" id="defaultFormRegisterPasswordEx" className="form-control" />

        {/* <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroupFileAddon01">
                Upload
              </span>
            </div>
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                id="inputGroupFile01"
                aria-describedby="inputGroupFileAddon01"
              />
              <label className="custom-file-label" htmlFor="inputGroupFile01">
                Choose file
              </label>
            </div>
          </div> */}

        <div className="text-center mt-4">
          <MDBBtn color="indigo" type="submit">
            Start Annotating!
          </MDBBtn>
        </div>
      </form>
    </MDBContainer>
  )
}

export default Setup
