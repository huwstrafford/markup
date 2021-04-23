import "./ConfigCreator.css"

function ConfigCreator() {
  return (
    <div className="container">
      <div className="config-panel">
        <div className="option-container">
            <p className="option-headline option-item">
                Entities
                <span className="config-tooltip" title="The entity category that you want to select (e.g. Seizure).">
                    <i className="far fa-question-circle"></i>
                </span>
            </p>
            <div className="option-item">
                <input id="entity-name" className="option-input-field" type="text" placeholder="Entity name (e.g. Seizure)"/>
            </div>
            <div className="option-item">
                <label id="add-entity" className="option-button option-button-small">+ Entity</label>
            </div>
        </div>

        <div className="option-container">
            <p className="option-headline option-item">
                Attributes
                <span className="config-tooltip" title="The attributes you want an entity to have (e.g. SeizureFrequency).">
                    <i className="far fa-question-circle"></i>
                </span>
            </p>
            <div className="option-item">
                <input id="attribute-name" className="option-input-field" type="text" placeholder="Attribute name (e.g. SeizureFrequency)"/>
            </div>
            <div className="option-item">
                <input id="attribute-relation" className="option-input-field" type="text" placeholder="Related entity (e.g. Seizure)"/>
            </div>
            <div className="option-item">
                <input id="attribute-dropdown" className="option-input-field" type="text" placeholder="Dropdown values (e.g. Daily, Weekly, Monthly)"/>
            </div>
            <div className="option-item">
                <label id="add-attribute" className="option-button option-button-small">+ Attribute</label>
            </div>
        </div>

        <div className="option-container">
            <p className="option-headline option-item">
                Output
                <span className="config-tooltip" title="The entities and attributes that will be included in the exported configuration file.">
                    <i className="far fa-question-circle"></i>
                </span>
            </p>
            <span id="empty-container-message">Nothing added yet.</span>
            <div id="output-list-container">
                <div id="entity-list" className="option-column"><span>Added Entities</span></div>
                <div id="attribute-list" className="option-column"><span>Added Attributes</span></div>
            </div>
        </div>

        <div className="completed-option-container">
            <a href="/" id="save-configuration-file" className="option-button">Export Config File</a>
        </div>
      </div>
    </div>
  )
}

export default ConfigCreator
