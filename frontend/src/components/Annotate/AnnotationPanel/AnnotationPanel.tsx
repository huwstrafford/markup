import "./AnnotationPanel.css"

function AnnotationPanel(props: any) {
  const annotationText = localStorage.getItem("annotationText0")

  return (
    <>
      <div className="annotation-panel">
        <p className="annotation">Currently she is taking sodium valproate 500 mg twice a day</p>
      </div>
    </>
  )
}

export default AnnotationPanel
