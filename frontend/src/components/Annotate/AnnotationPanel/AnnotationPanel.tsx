import Scrollbars from "react-custom-scrollbars-2"

import "./AnnotationPanel.css"

function AnnotationPanel(props: any): JSX.Element {
  const annotationText = localStorage.getItem("annotationText0")

  return (
    <div className="panel">
      <Scrollbars autoHide>
        <div className="panel-content">
          <p className="annotation">Currently she is taking sodium valproate 500 mg twice a day</p>
          <p className="annotation">Currently she is taking sodium valproate 500 mg twice a day</p>
          <p className="annotation">Currently she is taking sodium valproate 500 mg twice a day</p>
          <p className="annotation">Currently she is taking sodium valproate 500 mg twice a day</p>
          <p className="annotation">Currently she is taking sodium valproate 500 mg twice a day</p>
          <p className="annotation">Currently she is taking sodium valproate 500 mg twice a day</p>
          <p className="annotation">Currently she is taking sodium valproate 500 mg twice a day</p>
          <p className="annotation">Currently she is taking sodium valproate 500 mg twice a day</p>
          <p className="annotation">Currently she is taking sodium valproate 500 mg twice a day</p>
          <p className="annotation">Currently she is taking sodium valproate 500 mg twice a day</p>
          <p className="annotation">Currently she is taking sodium valproate 500 mg twice a day</p>
          <p className="annotation">Currently she is taking sodium valproate 500 mg twice a day</p>
        </div>
      </Scrollbars>
    </div>
  )
}

export default AnnotationPanel
