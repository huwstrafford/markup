import { ENTITY_COLOUR } from "./EntityHelper"

function EntityConfig(props: any): JSX.Element {
  return (
    <div className="config-entities">
      <h4>Entities</h4>
      <hr/>

      {props.entities.map((entity: string, index: number) => {
        let configLabelClasses = "config-label"

        if (props.activeEntity !== entity) {
          configLabelClasses += " config-label-inactive"
        }

        return (
          <div>
            <input
              type="radio"
              id={entity}
              name="entities"
              value={entity}
            />
            <label
              className={configLabelClasses}
              onClick={() => props.setActiveEntity(entity)}
              style={{ backgroundColor: ENTITY_COLOUR[index] }}
              htmlFor={entity}
            >
              {entity}
            </label>
          </div>
        )
      })}
    </div>
  )
}

export default EntityConfig
