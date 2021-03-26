import {
  MDBBtn,
  MDBCardBody,
  MDBCardText,
  MDBCardTitle, MDBJumbotron
} from "mdbreact"

import Endpoint from "@markup/helpers/endpoint"
import "@markup/components/Landing/Landing.css"


function Landing() {
  return (    
    <MDBJumbotron className="text-center">
      <MDBCardBody>
        <MDBCardTitle className="h2">
          Rapid Annotation, Powered by Active Learning
        </MDBCardTitle>
        <br/>
        <MDBCardText>
          Turn unstructed text documents into structured knowledge systems for ML and NLP
        </MDBCardText>
        <br/>
        <div className="pt-2">
          <MDBBtn href={Endpoint.Setup} color="indigo" className="waves-effect">
            Annotate
          </MDBBtn>
          <MDBBtn href={Endpoint.Demo} color="indigo" className="waves-effect" outline>
            Try Demo
          </MDBBtn>
        </div>
      </MDBCardBody>
    </MDBJumbotron>
  )
}

export default Landing
