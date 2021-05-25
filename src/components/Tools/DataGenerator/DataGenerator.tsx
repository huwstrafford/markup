import { MDBBtn, MDBCol, MDBRow } from "mdbreact"

import "./DataGenerator.css"

function DataGenerator(): JSX.Element {
  return (
    <div className="data-generator-container">
      <MDBRow>
        <MDBCol md="12">
          <div className="data-generator-panel">
            <h3 className="data-generator-header">Variables (i)</h3>
            <input className="data-generator-input" placeholder="Name (e.g. doseUnit)"/>
            <MDBBtn className="data-generator-button">Add Variable</MDBBtn>
          </div>
        </MDBCol>

        <MDBCol md="12">
          <div className="data-generator-panel">
            <h3 className="data-generator-header">Sequence Templates (i)</h3>
            <input className="data-generator-input" placeholder="Input sequence (e.g. She is taking $drugDose $doseUnit of $drugName.)"/>
            <input className="data-generator-input" placeholder="Target sequence (e.g. dose: $drugDose; unit: $doseUnit; name: $drugName;)"/>
            <MDBBtn className="data-generator-button">Add Template</MDBBtn>
          </div>
        </MDBCol>
      </MDBRow>

      <MDBRow>
        <MDBCol>
          <div className="data-generator-panel data-generator-panel-small">
            <div className="data-generator-quantity-container">
              <p className="data-generator-quantity-text">25,000 sequences</p>
              <input
                className="data-generator-quantity-range"
                type="range"
                min="0"
                max="50000"
                step="100"
                value="25000"
              />
            </div>
            
            <div className="data-generator-output-container">
              <MDBBtn className="data-generator-output-button">Generate Data</MDBBtn>
            </div>
          </div>
        </MDBCol>
      </MDBRow>
    </div>
  )
}

export default DataGenerator
