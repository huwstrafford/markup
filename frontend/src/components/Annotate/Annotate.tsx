import { MDBAlert, MDBCol, MDBContainer, MDBRow } from "mdbreact"

import AnnotationPanel from "@markup/components/Annotate/AnnotationPanel/AnnotationPanel"
import ConfigPanel from "@markup/components/Annotate/ConfigPanel/ConfigPanel"
import DocumentPanel from "@markup/components/Annotate/DocumentPanel/DocumentPanel"
import Endpoint from "@markup/helpers/Endpoint"
import "@markup/components/Annotate/Annotate.css"
import React, { useState } from "react"


function Annotate() {
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  if (localStorage.getItem('isSetup') !== "true") {
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
          <MDBCol md="2">
            <ConfigPanel
              setErrorMessage={setErrorMessage}
              setSuccessMessage={setSuccessMessage}
            />
          </MDBCol>
          <MDBCol md="6">
            <DocumentPanel />
          </MDBCol>
          <MDBCol md="4">
            <AnnotationPanel />          
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  )
}

export default Annotate
