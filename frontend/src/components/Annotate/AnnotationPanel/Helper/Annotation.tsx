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
    <div className="annotation">
      <div className="annotation-text" onClick={() => toggleCollapse()}>
        Some message here
      </div>

      <MDBCollapse id="basicCollapse" isOpen={collapsedType}>
        Hello, World!
      </MDBCollapse>
    </div>
  )
}

export default Annotation
