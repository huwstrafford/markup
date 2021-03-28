import FileInput from "@markup/components/Annotate/SetupForm/FileFormField/FileInput"
import generateId from "@markup/components/Annotate/SetupForm/helpers/Misc"
import Tooltip from "@markup/components/Annotate/SetupForm/helpers/Tooltip"


function FileFormField() {
    return (
      <>
        <label htmlFor="defaultFormRegisterEmailEx" className="grey-text">
          <span className="required-field">*</span>
          <span className="field-header">Document to annotate</span>
          <Tooltip message="The document you intend to annotate (must be .txt file)."/>
        </label>
        <FileInput id={generateId()}/>
        <br/>

        <label htmlFor="defaultFormRegisterConfirmEx" className="grey-text">
          <span className="required-field">*</span>
          <span className="field-header">Configuration file</span>
          <Tooltip message="The configuration file that defines available entities and attributes (must be .conf file)."/>
        </label>
        <FileInput id={generateId()}/>
        <br/>

        <label htmlFor="defaultFormRegisterPasswordEx" className="grey-text">
          <span className="field-header">Existing annotations</span>
          <Tooltip message="The number of documents you intend to annotate."/>
        </label>
        <FileInput id={generateId()}/>
        <br/>

        <label htmlFor="defaultFormRegisterPasswordEx" className="grey-text">
          <span className="field-header">Ontology</span>
          <Tooltip message="The number of documents you intend to annotate."/>
        </label>
        <FileInput id={generateId()}/>
      </>
    )
  }

export default FileFormField