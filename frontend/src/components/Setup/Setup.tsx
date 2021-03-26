import { MDBContainer, MDBBtn, MDBTooltip, MDBIcon } from "mdbreact"

import FileInput from "@markup/components/Setup/UserInput/FileInput"
import "@markup/components/Setup/Setup.css"


function Setup() {
  return (
    <MDBContainer>
      <form className="setup-form">
        <p className="h3 text-center mb-4 font-weight-bold">Setup session</p>
        <br/>

        <label htmlFor="defaultFormRegisterNameEx" className="grey-text">
          <span className="required-field">*</span>
          <span className="field-header">Quantity</span>
          <MDBTooltip domElement tag="span" placement="right">
            <span><MDBIcon far icon="question-circle"/></span>
            <span>The number of documents you intend to annotate.</span>
          </MDBTooltip>
        </label>
        <div>
          <select className="browser-default custom-select">
            <option value="1">Single document</option>
            <option value="2">Multiple documents</option>
          </select>
        </div>
        <br />

        <label htmlFor="defaultFormRegisterEmailEx" className="grey-text">
          <span className="required-field">*</span>
          <span className="field-header">Document to annotate</span>
          <MDBTooltip domElement tag="span" placement="right">
            <span><MDBIcon far icon="question-circle"/></span>
            <span>The document you intend to annotate (must be .txt file).</span>
          </MDBTooltip>
        </label>
        <FileInput />
        <br />

        <label htmlFor="defaultFormRegisterConfirmEx" className="grey-text">
          <span className="required-field">*</span>
          <span className="field-header">Configuration file</span>
          <MDBTooltip domElement tag="span" placement="right">
            <span><MDBIcon far icon="question-circle"/></span>
            <span>The configuration file that defines available entities and attributes (must be .conf file).</span>
          </MDBTooltip>
        </label>
        <FileInput />
        <br />

        <label htmlFor="defaultFormRegisterPasswordEx" className="grey-text">
          <span className="field-header">Existing annotations</span>
          <MDBTooltip domElement tag="span" placement="right">
            <span><MDBIcon far icon="question-circle"/></span>
            <span>The number of documents you intend to annotate.</span>
          </MDBTooltip>
        </label>
        <FileInput />
        <br />

        <label htmlFor="defaultFormRegisterPasswordEx" className="grey-text">
          <span className="field-header">Ontology</span>
          <MDBTooltip domElement tag="span" placement="right">
            <span><MDBIcon far icon="question-circle"/></span>
            <span>The number of documents you intend to annotate.</span>
          </MDBTooltip>
        </label>
        <FileInput />

        <div className="text-center mt-4">
          <MDBBtn className="primary-color submit-btn" type="submit">
            Start Annotating!
          </MDBBtn>
        </div>
      </form>
    </MDBContainer>
  )
}

export default Setup
