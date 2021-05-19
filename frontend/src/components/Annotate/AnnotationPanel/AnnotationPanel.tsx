import { useState, useEffect } from "react"
import Scrollbars from "react-custom-scrollbars-2"

import "./AnnotationPanel.css"

interface Annotation {
  entity: string,
  message: string,
  attributes: string[],
}

const DEFAULT_ANNOTATION = [] as Annotation[]

function AnnotationPanel(props: any): JSX.Element {
  const annotationText = localStorage.getItem("annotationText0")
  
  const [annotations, setAnnotations] = useState(DEFAULT_ANNOTATION)
  const [rendered, setRendered] = useState(false)

  useEffect(() => {
    if (rendered) {
      return
    }

    const annotation = {entity: "test", message: "hello, world!", attributes: []}
    setAnnotations([annotation])
    setRendered(true)

    // props.setErrorMessage("You need to provide a valid config file. Read the docs for more info.")
  }, [props, annotationText, annotations, rendered])

  return (
    <div className="panel">
      <Scrollbars autoHide>
        <div className="panel-content">
          {annotations.map((annotation: Annotation, index: number) => {
            return <p className="annotation">{annotation.message}</p>
          })}
        </div>
      </Scrollbars>
    </div>
  )
}

export default AnnotationPanel
