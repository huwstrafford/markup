function FileInput(props: any): JSX.Element {
  const storeSingleFile = () => {
    const input = document.getElementById(props.id) as HTMLInputElement

    if (input != null && input.files != null) {
      const file = input.files[0]

      storeFile(file, props.storageName)
      displayFileNameInField(file.name)
    }
  }

  const storeFile = (file: Blob, storageName: string) => {
    const reader = new FileReader()
    reader.onload = () => {
      const fileText = reader.result as string
      localStorage.setItem(storageName, fileText)
    }
    reader.readAsText(file)
  }
  
  const displayFileNameInField = (fileName: string) => {
    const label = document.getElementById(props.id + "-label") as HTMLLabelElement
    label.innerText = fileName
  }
  
  return (
    <div className="input-group">
        <div className="custom-file">
            <input
              id={props.id}
              type="file"
              className="custom-file-input"
              accept={props.accept}
              onChange={storeSingleFile}
            />
            <label className="custom-file-label" id={props.id + "-label"} htmlFor={props.id}>
              Choose file
            </label>
        </div>
    </div>
  )
}

export default FileInput
