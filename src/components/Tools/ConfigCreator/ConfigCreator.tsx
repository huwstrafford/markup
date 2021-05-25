import { MDBBtn, MDBCol, MDBRow } from "mdbreact"

import "./ConfigCreator.css"

function ConfigCreator(): JSX.Element {
  return (
    <div className="config-creator-container">
      <MDBRow>
        <MDBCol md="12">
          <div className="config-creator-panel">
            <h3 className="config-creator-header">Entites (i)</h3>
            <input className="config-creator-input" placeholder="Name (e.g. doseUnit)"/>
            <MDBBtn className="config-creator-button">Add Variable</MDBBtn>
          </div>
        </MDBCol>

        <MDBCol md="12">
          <div className="config-creator-panel">
            <h3 className="config-creator-header">Attributes (i)</h3>
            <input className="config-creator-input" placeholder="Input sequence (e.g. She is taking $drugDose $doseUnit of $drugName.)"/>
            <input className="config-creator-input" placeholder="Target sequence (e.g. dose: $drugDose; unit: $doseUnit; name: $drugName;)"/>
            <MDBBtn className="config-creator-button">Add Template</MDBBtn>
          </div>
        </MDBCol>
      </MDBRow>

      <MDBRow>
        <MDBCol>
          <div className="config-creator-panel config-creator-panel-small">
            <MDBBtn>Export Configs</MDBBtn>
          </div>
        </MDBCol>
      </MDBRow>
    </div>
  )
}

export default ConfigCreator
