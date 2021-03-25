import "./Footer.css"

function Footer() {
  return (
    <footer className="text-center text-white">
      <div className="container pt-4">
        <section className="mb-4">
          <a
            className="btn btn-link btn-floating btn-lg text-dark m-1"
            href="#!"
            role="button"
            data-mdb-ripple-color="dark"
          ><i className="fab fa-github"/></a>

          <a
            className="btn btn-link btn-floating btn-lg text-dark m-1"
            href="#!"
            role="button"
            data-mdb-ripple-color="dark"
          ><i className="fas fa-envelope"/></a>
        </section>
      </div>
    </footer>
  )
}

export default Footer
