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
        <MDBCardTitle className="h2 custom-home-title">
          {/* Rapid Annotation, Powered by Active Learning */}
          markup
        </MDBCardTitle>
        <br/>
        <MDBCardText className="custom-home-card">
          {/* Rapid Annotation, Powered by Active Learning */}
          Turn unstructed text documents into structured<br/> knowledge systems for ML and NLP
        </MDBCardText>
        <br/>
        <div className="pt-2">
          <MDBBtn href={Endpoint.Documentation} className="waves-effect font-weight-bold custom-home-button">
            Docs
          </MDBBtn>
          <MDBBtn href={Endpoint.SetupForm} className="waves-effect font-weight-bold custom-home-button custom-home-button-focus">
            Annotate
          </MDBBtn>
          <p>
            <a href={Endpoint.Demo} className="demo-link">...or try a demo</a>
          </p>
        </div>
      </MDBCardBody>
    </MDBJumbotron>
  )
}

export default Home
