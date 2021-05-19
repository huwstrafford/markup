import { useState } from "react"
import { MDBAlert, MDBCol, MDBContainer, MDBRow } from "mdbreact"

import AnnotationPanel from "@markup/components/Annotate/AnnotationPanel/AnnotationPanel"
import ConfigPanel from "@markup/components/Annotate/ConfigPanel/ConfigPanel"
import DocumentPanel from "@markup/components/Annotate/DocumentPanel/DocumentPanel"
import Endpoint from "@markup/helpers/Endpoint"
import SessionPanel from "./SessionPanel/SessionPanel"
import "./Annotate.css"

function Annotate(): JSX.Element {
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

          <MDBCol md="5">
            <DocumentPanel
              setErrorMessage={setErrorMessage}
              setSuccessMessage={setSuccessMessage}
            />
          </MDBCol>

          <MDBCol md="4">
            <AnnotationPanel
              setErrorMessage={setErrorMessage}
              setSuccessMessage={setSuccessMessage}
            />
          </MDBCol>
          
          <MDBCol md="12">
            <SessionPanel
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
