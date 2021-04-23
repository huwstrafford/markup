import "./AnnotationPanel.css"

function AnnotationPanel(props: any) {
  const annotationText = localStorage.getItem("annotationText0")

  // if (annotationText == null || annotationText.trim() === "") {
  //   props.setErrorMessage("You need to provide valid annotations. Read the docs for more info.")
  // }

  return (
    <div>
      {annotationText}
    </div>
  )
}

export default AnnotationPanel
