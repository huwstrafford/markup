import {
  MDBBtn,
  MDBCardBody,
  MDBCardText,
  MDBCardTitle, MDBJumbotron
} from "mdbreact"

import Endpoint from "@markup/helpers/Endpoint"
import "@markup/components/Landing/Landing.css"


function Landing() {
  return (    
    <MDBJumbotron className="text-center">
      <MDBCardBody>
        <MDBCardTitle className="h2">
          Rapid <span className="annotation primary-color">Annotation</span> using <span className="annotation primary-color">Active Learning</span>
        </MDBCardTitle>
        <br/>
        <MDBCardText>
          Turn unstructed text documents into structured<br/> knowledge systems for ML and NLP
        </MDBCardText>
        <br/>
        <div className="pt-2">
          <MDBBtn href={Endpoint.Setup} className="waves-effect font-weight-bold primary-color">
            Annotate
          </MDBBtn>
          <MDBBtn href={Endpoint.Demo} className="waves-effect font-weight-bold primary-color-border" outline>
            Try Demo
          </MDBBtn>
        </div>
      </MDBCardBody>
    </MDBJumbotron>
  )
}

export default Landing
