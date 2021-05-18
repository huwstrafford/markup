import { useEffect, useState } from "react"
import {
  ATTRIBUTE_CATEGORY,
  DEFAULT_ATTRIBUTE,
  DEFAULT_ENTITY,
  ENTITY_CATEGORY,
  parseAttributeValues,
  parseCategories
} from "./ConfigHelpers"
import AttributeConfig from "./ConfigHelpers/Attribute/AttributeConfig"
import EntityConfig from "./ConfigHelpers/Entity/EntityConfig"
import OntologyConfig from "./ConfigHelpers/Ontology/OntologyConfig"
import SessionConfig from "./ConfigHelpers/Session/SessionConfig"
import "./ConfigPanel.css"


function ConfigPanel(props: any): JSX.Element {
  const configText = localStorage.getItem("configText")
  const categories = parseCategories(configText)
  
  const [entities, setEntities] = useState(DEFAULT_ENTITY)
  const [attributes, setAttributes] = useState(DEFAULT_ATTRIBUTE)
  const [rendered, setRendered] = useState(false)
  const [activeEntity, setActiveEntity] = useState("")

  useEffect(() => {
    const entities = categories[ENTITY_CATEGORY]
    const attributes = categories[ATTRIBUTE_CATEGORY]

    if (rendered) {
      return
    } else if (entities && attributes) {
      setRendered(true)
      setEntities(entities)
      setAttributes(parseAttributeValues(attributes))
    } else {
      props.setErrorMessage("You need to provide a valid config file. Read the docs for more info.")
    }
  }, [props, categories, rendered])

  return (
    <div className="config-panel">
      <EntityConfig
        entities={entities}
        activeEntity={activeEntity}
        setActiveEntity={setActiveEntity}
      />
      <br/>

      <AttributeConfig
        attributes={attributes}
        activeEntity={activeEntity}
      />
      <br/>

      <OntologyConfig/>
      <br/>

      <SessionConfig/>
    </div>
  )
}

export default ConfigPanel
