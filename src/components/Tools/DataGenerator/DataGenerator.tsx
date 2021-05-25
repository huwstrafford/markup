import { MDBBtn, MDBCol, MDBRow } from "mdbreact"

import "./DataGenerator.css"

function DataGenerator(): JSX.Element {
  return (
    <div className="data-generator-container">
      <MDBRow>
        <MDBCol>
          <div className="data-generator-panel">
            <h3>Variables (i)</h3>

            <p>
              <select>
                <option value="1">Text values</option>
                <option value="2">Numerical range</option>
              </select>
            </p>

            <p>
              <input className="data-generator-input" placeholder="Name (e.g. doseUnit)"/>
            </p>

            <p>
              <input className="data-generator-input" placeholder="Comma-seperate values (e.g. grams, milligrams)"/>
            </p>

            <MDBBtn className="data-generator-button">+ Variable</MDBBtn>
          </div>
        </MDBCol>

        <MDBCol>
          <div className="data-generator-panel">
            <h3>Sequence Templates (i)</h3>

            <p>
              <input className="data-generator-input" placeholder="Input sequence (e.g. She is taking $drugDose $doseUnit of $drugName.)"/>
            </p>

            <p>
              <input className="data-generator-input" placeholder="Target sequence (e.g. dose: $drugDose; unit: $doseUnit; name: $drugName;)"/>
            </p>

            <MDBBtn className="data-generator-button">+ Template</MDBBtn>
          </div>
        </MDBCol>
      </MDBRow>

      <MDBRow>
        <MDBCol>
          <div className="data-generator-panel data-generator-panel-small">
            Hello
            
            <MDBBtn>Generate Data</MDBBtn>
          </div>
        </MDBCol>
      </MDBRow>
    </div>
  )
}

export default DataGenerator
