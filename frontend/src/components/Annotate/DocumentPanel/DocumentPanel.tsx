import "./DocumentPanel.css"

function DocumentPanel(props: any) {
  const documentText = localStorage.getItem("documentText0")

  if (documentText == null || documentText.trim() === "") {
    props.setErrorMessage("You need to provide a valid document. Read the docs for more info.")
  }

  return (
    <div className="document-text">
      {documentText}
    </div>
  )
}

export default DocumentPanel
