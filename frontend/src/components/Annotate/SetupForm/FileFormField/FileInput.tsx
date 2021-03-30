function FileInput(props: any) {
  function storeSingleFile() {
    const input = document.getElementById(props.id) as HTMLInputElement

    if (input != null && input.files != null) {
      const file = input.files[0]

      displayFileNameInField(file.name)
      storeFile(file, props.storageName)
    }
  }

  function displayFileNameInField(fileName: string) {
    const label = document.getElementById(props.id + "-label") as HTMLLabelElement
    label.innerText = fileName
  }

  function storeFile(file: Blob, storageName: string) {
    const reader = new FileReader()
    reader.onload = () => {
        const fileText = reader.result as string
        localStorage.setItem(storageName, fileText)
    }
    reader.readAsText(file)
  }

  return (
    <div className="input-group">
        <div className="custom-file">
            <input type="file" className="custom-file-input" id={props.id} accept={props.accept} onChange={storeSingleFile}/>
            <label className="custom-file-label" id={props.id + "-label"} htmlFor={props.id}>
                Choose file
            </label>
        </div>
    </div>
  )
}

export default FileInput
