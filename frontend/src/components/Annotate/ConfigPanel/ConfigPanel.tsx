import Endpoint from "@markup/helpers/Endpoint"
import { Redirect } from "react-router"

function ConfigPanel(props: any) {
  const configText = localStorage.getItem("configText")

  if (configText == null || configText.trim() === "") {
    props.setErrorMessage("You need to provide a valid config file. Read the docs for more info.")
    return <Redirect to={Endpoint.SetupForm}/>
  }

  parseConfigs(configText)

  return (
    <p className="config-value-row">
      <input type="radio" id="SeizureType-radio" name="entities" value="SeizureType-radio" />
      <label className="config-label xyz" htmlFor="SeizureType-radio">SeizureType</label>
    </p>
  )
}

function parseConfigs(configText: string) {
  const entities = parseEntities(configText)
  console.log(entities)
}

function parseEntities(configText: string) {
  const configSents = configText.split("\n")
  const entities: string[] = []
  const attributeSentences = []
  let isEntity = false

  for (let i = 0; i < configSents.length; i++) {
    const sent = configSents[i];
    const sentSize = sent.length;

    if (sent === '') continue;

    // Add to relevant config list
    if (isEntity && sent[0] !== '[' && !entities.includes(sent)) {
        entities.push(sent);
    } else if (sent[0] !== '[') {
        attributeSentences.push(sent);
    }

    // Check for category (e.g. [entities])
    if (sentSize >= 3 && sent[0] === '[' && sent[sentSize - 1] === ']') {
        // Check for entity category
        if (sent.slice(1, sentSize - 1).toLowerCase() === 'entities') {
            isEntity = true;
        } else if (isEntity) {
            isEntity = false;
        }
    }
  }
  return [entities, attributeSentences]
}

export default ConfigPanel
