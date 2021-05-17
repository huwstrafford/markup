import { MDBLink } from "mdbreact"

import Endpoint from "@markup/helpers/Endpoint"
import "./PageNotFound.css"

function PageNotFound(): JSX.Element {
  return (
  	<div className="container-fluid">
  		<div className="col-md-6 offset-md-3 text-center mt-5 pt-5">
  			<div className="text-center">
          <h1 className="display-1 align-items-center message-font">404</h1>
          <h3 className="md-0">You took a wrong turn...</h3>
          <MDBLink to={Endpoint.Home} color="indigo">Take me home</MDBLink>
        </div>
  	 </div>
  	</div>
  )
}

export default PageNotFound
