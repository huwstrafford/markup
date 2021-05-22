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
  clearPreviousMark()
  
  const selection = window.getSelection()!
  const startIndex = Math.min(selection.anchorOffset, selection.focusOffset)
  const endIndex = Math.max(selection.anchorOffset, selection.focusOffset)

  if (endIndex - startIndex > 0) {
    const mark = document.createElement("mark")

    mark.setAttribute("id", "highlightedText")
    mark.setAttribute("startIndex", startIndex.toString())
    mark.setAttribute("endIndex", endIndex.toString())

    selection.getRangeAt(0).surroundContents(mark)
  }
}

function clearPreviousMark(): void {
  const mark = document.getElementsByTagName("mark")

  while (mark.length) {
      const parent = mark[0].parentNode

      while (mark[0].firstChild) {
        parent?.insertBefore(mark[0].firstChild, mark[0] )
      }

      parent?.removeChild(mark[0])
  }
}

export default DocumentPanel
