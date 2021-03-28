function FileInput(props: any) {
  function storeSingleFile() {
    const file = document.getElementById(props.id) as HTMLInputElement

    if (file != null) {
      const f = file.files

      if (f != null) {
        storeFile(f[0], 'configText');
      }
    }
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
            <input type="file" className="custom-file-input" id={props.id} onChange={storeSingleFile}/>
            <label className="custom-file-label" htmlFor={props.id}>
                Choose file
            </label>
        </div>
    </div>
  )
}

export default FileInput
