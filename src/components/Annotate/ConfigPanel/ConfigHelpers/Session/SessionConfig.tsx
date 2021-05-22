import { MDBBtn } from "mdbreact"

function SessionConfig(props: any): JSX.Element {
  const addAnnotation = () => {
    alert(1)
  }

  return (
    <>
      <h4>Prefences</h4>
      <hr/>

      <div>
        <MDBBtn onClick={addAnnotation}>+ Annotation</MDBBtn>
        <MDBBtn>Export</MDBBtn>
      </div>
    </>
  )
}

export default SessionConfig
