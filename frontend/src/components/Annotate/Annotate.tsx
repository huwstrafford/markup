import { useState } from "react"
import { MDBAlert, MDBCol, MDBContainer, MDBRow } from "mdbreact"

import AnnotationPanel from "@markup/components/Annotate/AnnotationPanel/AnnotationPanel"
import ConfigPanel from "@markup/components/Annotate/ConfigPanel/ConfigPanel"
import DocumentPanel from "@markup/components/Annotate/DocumentPanel/DocumentPanel"
import Endpoint from "@markup/helpers/Endpoint"
import "./Annotate.css"


function Annotate() {
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  if (localStorage.getItem("isSetup") !== "true") {
    window.location.href = Endpoint.SetupForm
  }

  return (
    <>
      {successMessage !== "" &&
        <MDBAlert color="success" >
          {successMessage}
        </MDBAlert>
      }

      {errorMessage !== "" &&
        <MDBAlert color="danger" >
          {errorMessage}
        </MDBAlert>
      }
      
      <MDBContainer className="annotation-container">
        <MDBRow>
          <MDBCol md="3">
            <ConfigPanel
              setErrorMessage={setErrorMessage}
              setSuccessMessage={setSuccessMessage}
            />
          </MDBCol>

          <MDBCol md="6">
            <DocumentPanel
              setErrorMessage={setErrorMessage}
              setSuccessMessage={setSuccessMessage}
            />
          </MDBCol>

          <MDBCol md="3">
            <AnnotationPanel
              setErrorMessage={setErrorMessage}
              setSuccessMessage={setSuccessMessage}
            />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  )
}

export default Annotate
