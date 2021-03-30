function DocumentPanel(props: any) {
  const documentText = localStorage.getItem("documentText0")

  if (documentText == null || documentText.trim() === "") {
    props.setErrorMessage("You need to provide a valid document. Read the docs for more info.")
  }

  return (
    <div>
      {documentText}
    </div>
  )
}

export default DocumentPanel
