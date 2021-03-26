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
        Rapid Annotation using Active Learning
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
            Try it out
          </MDBBtn>
        </div>
      </MDBCardBody>
    </MDBJumbotron>
  )
}

export default Landing
