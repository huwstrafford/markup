function FolderInput(): JSX.Element {
  return (
    <div className="input-group">
      <div className="custom-file">
        <input type="file" className="custom-file-input" id="folderInput"/>
        <label className="custom-file-label" htmlFor="folderInput">
          Choose folder
        </label>
      </div>
    </div>
  )
}
  
export default FolderInput
