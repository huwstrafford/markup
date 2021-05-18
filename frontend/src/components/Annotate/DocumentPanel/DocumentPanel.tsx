import Scrollbars from "react-custom-scrollbars-2"

import "./DocumentPanel.css"

function DocumentPanel(props: any): JSX.Element {
  const documentText = localStorage.getItem("documentText0")

  if (documentText == null || documentText.trim() === "") {
    props.setErrorMessage("You need to provide a valid document. Read the docs for more info.")
  }

  return (
    <div className="panel">
      <Scrollbars autoHide>
        <div className="panel-content document-text">
          {documentText}
        </div>
      </Scrollbars>
    </div>
  )
}

export default DocumentPanel
