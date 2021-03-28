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
        <FileInput id={generateId()} storageName="documentText0" accept=".txt"/>
        <br/>

        <label htmlFor="defaultFormRegisterConfirmEx" className="grey-text">
          <span className="required-field">*</span>
          <span className="field-header">Configuration file</span>
          <Tooltip message="The configuration file that defines available entities and attributes (must be .conf file)."/>
        </label>
        <FileInput id={generateId()} storageName="configText" accept=".conf"/>
        <br/>

        <label htmlFor="defaultFormRegisterPasswordEx" className="grey-text">
          <span className="field-header">Existing annotations</span>
          <Tooltip message="Optional: The file containing existing annotations for the document you intend to annotate (must be .ann file)."/>
        </label>
        <FileInput id={generateId()} storageName="annotationText0" accept=".ann"/>
        <br/>

        <label htmlFor="defaultFormRegisterPasswordEx" className="grey-text">
          <span className="field-header">Ontology</span>
          <Tooltip message="Optional: An existing or custom ontology to access during the annotation session. See documentation for custom format details (must be .txt file)."/>
        </label>
        <FileInput id={generateId()} storageName="ontologyText" accept=".txt"/>
      </>
    )
  }

export default FileFormField
