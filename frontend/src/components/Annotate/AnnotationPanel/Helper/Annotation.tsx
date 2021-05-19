import { useState } from "react"
import { MDBCollapse } from "mdbreact"

import "./Annotation.css"

function Annotation(): JSX.Element {
  const [collapsedType, setCollapsedType] = useState("")

  const toggleCollapse = () => {
    if (collapsedType === "") {
      setCollapsedType("basicCollapse")
    } else {
      setCollapsedType("")
    }
  }

  return (
    <div className="annotation" onClick={() => toggleCollapse()}>
      <span className="annotation-text">
        Some message here
      </span>

      <MDBCollapse id="basicCollapse" isOpen={collapsedType}>
        <div className="attribute">Some attribute here</div>
      </MDBCollapse>
    </div>
  )
}

export default Annotation
