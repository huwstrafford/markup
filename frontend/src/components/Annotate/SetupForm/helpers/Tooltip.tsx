import { MDBIcon, MDBTooltip } from "mdbreact"

function Tooltip(props: any): JSX.Element {
    return (
      <MDBTooltip domElement tag="span" placement="right">
        <span><MDBIcon far icon="question-circle"/></span>
        <span>{props.message}</span>
      </MDBTooltip>
    )
}

export default Tooltip
