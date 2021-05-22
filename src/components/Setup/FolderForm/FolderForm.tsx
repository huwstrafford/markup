import Tooltip from "@markup/components/Setup/helpers/Tooltip"
import FolderInput from "./FolderInput"


function FolderForm(): JSX.Element {
  return (
    <>
      <label htmlFor="defaultFormRegisterEmailEx" className="grey-text">
        <span className="required-field">*</span>
        <span className="field-header">Folder to annotate</span>
        <Tooltip message="A folder containing the documents you intend to annotate (must be .txt files) and a configuration file (must be a .conf file). May also include existing annotations (must be .ann files) where the file name matches a text document e.g. clinic-letter-1.txt corresponds with clinic-letter-1.ann"/>
      </label>
      
      <FolderInput/>
      <br/>
    </>
  )
}

export default FolderForm
