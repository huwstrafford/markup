import { useEffect, useState } from "react"

import "./ConfigPanel.css"

function ConfigPanel(props: any) {
  const configText = localStorage.getItem("configText")
  const [entities, setEntities] = useState([""])
  const [attributes, setAttributes] = useState([""])
  const [rendered, setRendered] = useState(false)
  const [activeLabel, setActiveLabel] = useState(-1)
  const categories = parseCategories(configText)

  useEffect(() => {
    if (rendered) {
      return
    } else if (categories[ENTITY_CATEGORY] && categories[ATTRIBUTE_CATEGORY]) {
      setRendered(true)
      setEntities(categories[ENTITY_CATEGORY])

      const parsedAttributes = parseAttributeValues(categories[ATTRIBUTE_CATEGORY])
      console.log(parsedAttributes)
      setAttributes(categories[ATTRIBUTE_CATEGORY])
    } else {
      props.setErrorMessage("You need to provide a valid config file. Read the docs for more info.")
    }
  }, [props, categories, rendered])

  return (
    <div className="config-panel">
      {entities.map((entity: string, index: number) => {
        let configLabelClasses = "config-label"

        if (activeLabel !== index) {
          configLabelClasses += " config-label-inactive"
        }

        return (
          <p className="config-value-row">
            <input
              type="radio"
              id={entity}
              name="entities"
              value={entity}
            />
            <label
              className={configLabelClasses}
              onClick={() => setActiveLabel(index)}
              style={{ backgroundColor: ENTITY_COLOUR[index] }}
              htmlFor={entity}
            >
              {entity}
            </label>
          </p>
        )
      })}
    </div>
  )
}

type Category = { [category: string]: string[] }

const ATTRIBUTE_CATEGORY = "attributes"
const ENTITY_CATEGORY = "entities"
const ENTITY_COLOUR = ["#e6194b", "#3cb44b", "#ffe119", "#4363d8", "#f58231", "#911eb4", "#46f0f0", "#f032e6", "#bcf60c", "#fabebe", "#008080", "#e6beff", "#9a6324", "#fffac8", "#800000", "#aaffc3", "#808000", "#ffd8b1", "#000075", "#808080", "#ffffff", "#000000"]

function parseCategories(configText: string | null): Category {
  let categoryType = ""
  const categories: Category = {}
  const lines = configText?.split("\n")

  lines?.forEach((line: string) => {
    if (isCategoryType(line)) {
      categoryType = getCategoryType(line)
      categories[categoryType] = []
    } else if (line.trim() !== "") {
      categories[categoryType].push(line)
    }
  })

  return categories
}

function isCategoryType(line: string): boolean {
  if (line.length > 0) {
    return line[0] === "[" && line[line.length - 1] === "]"
  }
  return false
}

function getCategoryType(line: string): string {
  return line.slice(1, line.length - 1)
}

function parseAttributeValues(attributeSentences: string[]): string[][] {
    const attributes = [];
    const globalAttributes = [];

    for (let i = 0; i < attributeSentences.length; i++) {
        // Parse data within attribute sentence
        const sent = attributeSentences[i];
        const name = sent.split('Arg:')[0].trim();
        const entity = sent.split('Arg:')[1].split(',')[0].trim();
        const values = sent.split('Value:')[1].trim().split('|');

        // Produce array of global attributes
        if (entity.toLowerCase() == '<entity>' ) {
            globalAttributes.push([name, values]);
            continue;
        }
        // Add new attribute
        attributes.push([name, entity].concat(values));

        // TODO re-introduce checkbox attribute parsing
    }
    // Add global attributes
    // return attributes.concat(parseGlobalAttributes(globalAttributes));
    return attributes
}

// function parseGlobalAttributes(globalAttributes: string[]) {
//     // Add global attributes to each entity
//     const result = [];

//     for (let i = 0; i < entities.length; i++) {
//         for (let j = 0; j < globalAttributes.length; j++) {
//             const name = globalAttributes[j][0];
//             const entity = entities[i];
//             const values = globalAttributes[j][1];
//             result.push([name, entity].concat(values));
//         }
//     }
//     return result;
// }

export default ConfigPanel
