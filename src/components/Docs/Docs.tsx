import "./Docs.css"

function Docs(): JSX.Element {
  return (
    <div className="docs">
      <Section
        reference="overview"
        header="What is Markup?"
        body="
          Markup is an online annotation tool that can be used to transform
          unstructured documents into structured standoff format for NLP and
          ML tasks, such as named-entity recognition. Markup learns as you
          annotate in order to predict and suggest complex annotations. Markup
          also provides integrated access to existing and custom ontologies, enabling
          the prediction and suggestion of ontology mappings based on the text you're
          annotating. Features include ...
        "
      />

      <Section
        reference="demo"
        header="Demo"
        body={
          <span>
            Try out Markup using synthetically-generated
            documents, <a href="/demo" target="_blank">here</a>.
          </span>
        }
      />

      <Section
        reference="installation"
        header="Installation"
        body="
          Markup can be used both as an online and local tool. Whilst Markup
          doesn't store any data about you or the documents you annotate, it
          is highly recommended that you use the local version when annotating
          documents that you consider to be sensitive or private.
        "
      />

      <SubSection
        reference="installation-github"
        header="Github"
        body="Clone it from GitHub"
      />

      <SubSection
        reference="installation-docker"
        header="Docker"
        body="Pull it from DockerHub"
      />

      <Section
        reference="setup"
        header="Getting Started"
        body={
          <span>
            To start using Markup for document annotation,
            visit the <a href="/setup" target="_blank">setup</a> page 
            and select the quantity of documents you want to annotate
            and populate the remaining fields as described below.
          </span>
        }
      />

      <SubSection
        reference="setup-sigle"
        header="Single"
        body={
          <div>
            <Field
              name="Document to annotate"
              description="The document you intend to annotate (must have .txt file extension)."
              required={true}
            />

            <Field
              name="Configuration file"
              description="
                Defines all entities and attributes available during annotation. Select an existing
                configuration file (that has the .conf file extension and is formatted as shown here),
                or create a new one using the in-built config creator.
              "
              required={true}
            />

            <Field
              name="Existing annotations"
              description="
                A file containing existing annotations for the document you intend to annotate.
                The annotation file must have the .ann file extension and be in standoff format.
              "
              required={false}
            />

            <Field
              name="Ontology"
              description="A dictionary of terms, codes, and related data to be accessed during annotation."
              required={false}
            />
          </div>
        }
      />

    <SubSection
        reference="setup-multiple"
        header="Multiple"
        body="Pull it from DockerHub"
      />
    </div>
  )
}

function Section(props: any): JSX.Element {
  return (
    <div className="docs-section">
      <h2 className="docs-section-header">
        <a href={"#" + props.reference} className="docs-section-header-reference">#</a>
        {props.header}
      </h2>
      <div className="docs-section-body">{props.body}</div>
    </div>
  )
}

function SubSection(props: any): JSX.Element {
  return (
    <div className="docs-section docs-subsection">
      <h2 className="docs-section-header">
        <a href={"#" + props.reference} className="docs-section-header-reference">#</a>
        {props.header}
      </h2>
      <div className="docs-section-body">{props.body}</div>
    </div>
  )
}

function Field(props: any): JSX.Element {
  return (
    <p>
      <span className="docs-field-name">{props.name}</span>
      <span className="docs-field-divider">-</span>
      <span className="docs-field-description">{props.description}</span>
    </p>
  )
}

export default Docs
