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
        <div
          id="document-text"
          className="panel-content document-text"
          onMouseUp={(e) => markText()}
        >
          {documentText}
        </div>
      </Scrollbars>
    </div>
  )
}

function markText(): void {
  if (document.getElementsByTagName("mark").length > 0) {
    // TODO remove mark
    return
  }

  const selectionText = window.getSelection()!.toString().trim()
  const selectionRange = window.getSelection()!.getRangeAt(0)

  if (selectionText.length === 0) {
    return 
  }
  
  const newNode = document.createElement("mark");
  selectionRange.surroundContents(newNode)
}

export default DocumentPanel
