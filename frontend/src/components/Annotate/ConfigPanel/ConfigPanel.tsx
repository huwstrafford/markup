function ConfigPanel() {
  const configText = localStorage.getItem("configText")

  console.log(configText)

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
