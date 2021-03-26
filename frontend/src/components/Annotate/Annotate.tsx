import { Redirect } from "react-router"

import "@markup/components/Annotate/Annotate.css"
import Endpoint from "@markup/helpers/endpoint"

function Annotate() {
  if (localStorage.getItem('isSetup') != null) {
    return <h1>Annotate</h1>
  } else {
    return <Redirect to={Endpoint.Setup}></Redirect>
  }
}

export default Annotate
