import { MDBContainer, MDBRow, MDBCol } from "mdbreact"

import "@markup/components/Annotate/Annotate.css"
import ConfigPanel from "@markup/components/Annotate/ConfigPanel/ConfigPanel"
import DocumentPanel from "@markup/components/Annotate/DocumentPanel/DocumentPanel"
import AnnotationPanel from "@markup/components/Annotate/AnnotationPanel/AnnotationPanel"


function Annotate() {
  // if (localStorage.getItem('isSetup') != null) {
  //   return <h1>Annotate</h1>
  // } else {
  //   return <Redirect to={Endpoint.SetupForm}></Redirect>
  // }

  return (
    <MDBContainer className="annotation-container">
      <MDBRow>
        <MDBCol md="2">
          <ConfigPanel />
        </MDBCol>
        <MDBCol md="6">
          <DocumentPanel />
        </MDBCol>
        <MDBCol md="4">
          <AnnotationPanel />          
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  )
}

export default Annotate
