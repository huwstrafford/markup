import { useState } from "react"
import { MDBCollapse } from "mdbreact"

import "./AnnotationPrediction.css"
import Annotation from "../Helper/Annotation"

function AnnotationPrediction(props: any): JSX.Element {
  const [collapsedType, setCollapsedType] = useState("")

  const toggleCollapse = () => {
    if (collapsedType === "") {
      setCollapsedType("basicCollapse")
    } else {
      setCollapsedType("")
    }
  }

  return (
    <div className="annotation-prediction" onClick={() => toggleCollapse()}>
      <span className="annotation-text">
        2 annotation suggestions
      </span>

      <MDBCollapse id="basicCollapse" isOpen={collapsedType}>
        <Annotation/>
        <Annotation/>
        <Annotation/>
      </MDBCollapse>
    </div>
  )
}

export default AnnotationPrediction
