import React, { useState } from "react"
import { MDBContainer, MDBTooltip, MDBIcon, MDBBtn, MDBCol, MDBRow } from "mdbreact"

import "@markup/components/SetupForm/SetupForm.css"
import FileFormField from "@markup/components/SetupForm/FileFormField/FileFormField"
import FolderFormField from "@markup/components/SetupForm/FolderFormField/FolderFormField"
import SetupFaq from "@markup/components/SetupForm/SetupFaq/SetupFaq"


enum DocumentQuantity {
  Single = "single",
  Multiple = "multiple"
}

function SetupForm(this: any) {
  const [quantity, setQuantity] = useState<String>(DocumentQuantity.Single)

  return (
    <MDBContainer>
      <MDBRow className="setup-row">
        <MDBCol md="6" className="setup-column">
          <form >
            <h4>Setup</h4>
            <hr></hr>

            <label htmlFor="defaultFormRegisterNameEx" className="grey-text">
              <span className="required-field">*</span>
              <span className="field-header">Quantity</span>
              <MDBTooltip domElement tag="span" placement="right">
                <span><MDBIcon far icon="question-circle"/></span>
                <span>The number of documents you intend to annotate.</span>
              </MDBTooltip>
            </label>
            <div>
              <select className="browser-default custom-select" onChange={event => setQuantity(event.target.value)}>
                <option value={DocumentQuantity.Single}>Single document</option>
                <option value={DocumentQuantity.Multiple}>Multiple documents</option>
              </select>
            </div>
            <br />

            {quantity === DocumentQuantity.Single && <FileFormField/>}
            {quantity === DocumentQuantity.Multiple && <FolderFormField/>}

            <div className="text-center mt-4">
              <MDBBtn className="primary-color submit-btn" type="submit">
                Start Annotation Session
              </MDBBtn>
            </div>
          </form>
        </MDBCol>
        
        <MDBCol md="5" className="setup-column">
          <SetupFaq/>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  )
}

export default SetupForm
