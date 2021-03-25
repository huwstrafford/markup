import Endpoint from "@markup/helpers/endpoint"
import "./Nav.css"

function Nav() {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top navbar-custom">
        <div className="container">
          <a className="navbar-brand" href={Endpoint.Home}>Markup</a>

          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#basicExampleNav"
                  aria-controls="basicExampleNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="basicExampleNav">

            <ul className="navbar-nav mr-auto"></ul>

            <ul className="navbar-nav">
              <li className="nav-item nav-item-custom">
                <a className="nav-link" href={Endpoint.Documentation}>Docs</a>
              </li>
              <li className="nav-item nav-item-custom">
                <a className="nav-link" href={Endpoint.Repository} target="_blank" rel="noreferrer">GitHub</a>
              </li>
              <li className="nav-item nav-item-custom">
                <a className="nav-link" href={Endpoint.DataGenerator}>Generator</a>
              </li>
              <li className="nav-item nav-item-custom">
                <a className="nav-link" href={Endpoint.Annotate}>Annotate</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Nav
