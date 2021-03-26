import { MDBIcon, MDBTooltip } from "mdbreact"

import FolderInput from "@markup/components/SetupForm/FolderFormField/FolderInput"


function FolderFormField() {
    return (
      <>
        <label htmlFor="defaultFormRegisterEmailEx" className="grey-text">
          <span className="required-field">*</span>
          <span className="field-header">Folder to annotate</span>
          <MDBTooltip domElement tag="span" placement="right">
            <span><MDBIcon far icon="question-circle"/></span>
            <span>The document you intend to annotate (must be .txt file).</span>
          </MDBTooltip>
        </label>
        <FolderInput />
        <br />
      </>
    )
  }

export default FolderFormField
