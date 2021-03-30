function ConfigPanel(props: any) {
  const configText = localStorage.getItem("configText")

  if (configText == null || configText.trim() === "") {
    props.setErrorMessage("You need to provide a valid config file. Read the docs for more info.")
  }

  return (
    <>
      <p className="config-value-row">
        <input type="radio" id="SeizureType-radio" name="entities" value="SeizureType-radio" />
        <label className="config-label xyz" htmlFor="SeizureType-radio">SeizureType</label>
      </p>
    </>
  )
}

export default ConfigPanel
