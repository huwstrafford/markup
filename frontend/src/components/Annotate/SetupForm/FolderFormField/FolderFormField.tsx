import FolderInput from "@markup/components/Annotate/SetupForm/FolderFormField/FolderInput"
import Tooltip from "@markup/components/Annotate/SetupForm/helpers/Tooltip"


function FolderFormField() {
    return (
      <>
        <label htmlFor="defaultFormRegisterEmailEx" className="grey-text">
          <span className="required-field">*</span>
          <span className="field-header">Folder to annotate</span>
          <Tooltip message="The document you intend to annotate (must be .txt file)."/>
        </label>
        <FolderInput/>
        <br/>
      </>
    )
  }

export default FolderFormField
