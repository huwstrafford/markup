import { MDBBtn, MDBCol, MDBContainer, MDBRow } from "mdbreact"
import { SyntheticEvent, useState } from "react"

import FileFormField from "@markup/components/Annotate/SetupForm/FileFormField/FileFormField"
import FolderFormField from "@markup/components/Annotate/SetupForm/FolderFormField/FolderFormField"
import Tooltip from "@markup/components/Annotate/SetupForm/helpers/Tooltip"
import SetupFaq from "@markup/components/Annotate/SetupForm/SetupFaq/SetupFaq"
import Endpoint from "@markup/helpers/Endpoint"
import "@markup/components/Annotate/SetupForm/SetupForm.css"

enum DocumentQuantity {
  Single = "single",
  Multiple = "multiple"
}

function SetupForm(this: any) {
  const [quantity, setQuantity] = useState<String>(DocumentQuantity.Single)

  const startSession = (event: SyntheticEvent) => {
    event.preventDefault()
    localStorage.setItem("isSetup", "true")
    window.location.href = Endpoint.Annotate
  }

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
              <Tooltip message="The number of documents you intend to annotate."/>
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
              <MDBBtn className="submit-btn" type="submit" onClick={(event: SyntheticEvent) => {startSession(event)}}>
                Start Session
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
