import { useEffect, useState } from "react"

import { Attribute } from "./AttributeHelper"

const INITIAL_ATTRIBUTE_LIST = [] as Attribute[]

function AttributeConfig(props: {attributes: Attribute[], activeEntity: string}): JSX.Element {
  const [previousEntity, setPreviousEntity] = useState(props.activeEntity)
  const [shownAttributes, setShownAttributes] = useState(INITIAL_ATTRIBUTE_LIST)

  useEffect(() => {
    if (previousEntity === props.activeEntity) {
      return
    }

    const attributesToShow = [] as Attribute[]

    props.attributes.forEach((attribute: Attribute) => {
      const isActive = attribute.targetEntity === props.activeEntity
  
      if (isActive) {
        attributesToShow.push(attribute)
      }
    })

    clearInputFields()
    setPreviousEntity(props.activeEntity)
    setShownAttributes(attributesToShow)
  }, [props, shownAttributes, previousEntity])

  return (
    <div className="config-attributes">
      <h4>Attributes</h4>
      <hr/>

      {shownAttributes.map((attribute: Attribute, index: number) => {
        return (
          <p>
            <input
              list={attribute.name + index}
              placeholder={attribute.name}
              className="attribute-input"
            />

            <datalist id={attribute.name + index}>
              {attribute.values.map((value: string) => {
                return <option value={value}>{value}</option>
              })}
            </datalist>
          </p>
        )
      })}

      {shownAttributes.length === 0 &&
        <p className="attribute-empty">None</p>
      }
    </div>
  )
}

function clearInputFields(): void {
  const fields = document.getElementsByClassName("attribute-input") as HTMLCollectionOf<HTMLInputElement>

  for (let i = 0; i < fields.length; i++) {
    fields[i].value = ""
  }
}

export default AttributeConfig
