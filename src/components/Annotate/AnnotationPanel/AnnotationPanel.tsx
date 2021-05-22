import { useEffect, useState } from "react"
import Scrollbars from "react-custom-scrollbars-2"
import randomstring from "randomstring"

import AnnotationPrediction from "./AnnotationPrediction/AnnotationPrediction"
import Annotation from "./Helper/Annotation"
import "./AnnotationPanel.css"


// TODO change to map entity: [annotations]
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
  }, [props, annotationText, annotations, rendered])

  return (
    <div className="panel">
      <Scrollbars autoHide>
        <div className="panel-content">
          <AnnotationPrediction/>
        
          {annotations.map((annotation: Annotation, index: number) => {
            const key = randomstring.generate()

            return <Annotation key={key}/>
          })}
        </div>
      </Scrollbars>
    </div>
  )
}

export default AnnotationPanel
