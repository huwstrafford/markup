import { Attribute } from "./AttributeHelper"

function AttributeConfig(props: any): JSX.Element {
  return (
    <div className="config-attributes">
      {props.attributes.map((attribute: Attribute, index: number) => {
        const isInactive = attribute.targetEntity !== props.activeEntity
        const attributeClasses = isInactive ? "inactive-attribute" : ""

        return (
          <p className={attributeClasses}>
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
    </div>
  )
}

export default AttributeConfig
