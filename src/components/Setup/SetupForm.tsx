import { MDBBtn, MDBCol, MDBContainer, MDBRow } from "mdbreact"
import { SyntheticEvent, useState } from "react"

import Endpoint from "@markup/helpers/Endpoint"
import FileForm from "@markup/components/Setup/FileForm/FileForm"
import FolderForm from "@markup/components/Setup/FolderForm/FolderForm"
import Title from "@markup/components/Setup/helpers/Title"
import Tooltip from "@markup/components/Setup/helpers/Tooltip"
import SetupFaq from "@markup/components/Setup/SetupFaq/SetupFaq"
import "./SetupForm.css"

enum DocumentQuantity {
  Single = "single",
  Multiple = "multiple"
}

function SetupForm(): JSX.Element {
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
            <Title message="Setup"/>

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

            {quantity === DocumentQuantity.Single && <FileForm/>}
            {quantity === DocumentQuantity.Multiple && <FolderForm/>}

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
