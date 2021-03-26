import { MDBTooltip, MDBIcon } from "mdbreact"

import FileInput from "@markup/components/SetupForm/FileFormField/FileInput"


function FileFormField() {
    return (
      <>
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
      </>
    )
  }

export default FileFormField
