import {
  MDBBtn,
  MDBCardBody,
  MDBCardText,
  MDBCardTitle, MDBJumbotron
} from "mdbreact"

import Endpoint from "@markup/helpers/Endpoint"
import "./Home.css"


function Home() {
  return (    
    <MDBJumbotron className="text-center">
      <MDBCardBody>
        <MDBCardTitle className="h2">
        Rapid Annotation, Powered by Active Learning
        </MDBCardTitle>
        <br/>
        <MDBCardText>
          Turn unstructed text documents into structured<br/> knowledge systems for ML and NLP
        </MDBCardText>
        <br/>
        <div className="pt-2">
          <MDBBtn href={Endpoint.Documentation} className="waves-effect font-weight-bold primary-color-border custom-home-button" outline>
            Docs
          </MDBBtn>
          <MDBBtn href={Endpoint.SetupForm} className="waves-effect font-weight-bold primary-color custom-home-button">
            Annotate
          </MDBBtn>
          <p>
            <a href={Endpoint.Demo}>...or try a demo</a>
          </p>
        </div>
      </MDBCardBody>
    </MDBJumbotron>
  )
}

export default Home
