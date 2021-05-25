import Endpoint, { NewTab } from "@markup/helpers/Endpoint"
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
            Try out Markup while annotating a set of synthetically-generated
            documents, <NewTab endpoint={Endpoint.Demo} text="here"/>.
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
        header="Yarn"
        body={
          <>
            <p>Run the following:</p>

            <pre className="docs-code">
              <code>
                git clone https://www.github.com/samueldobbie/markup
                <br/>
                cd markup
                <br/>
                ./setup.sh
                <br/>
              </code>
            </pre>

            <p>
              Then visit <a href="https://localhost:1234">https://localhost:1234</a>
            </p>
          </>
        }
      />

      <SubSection
        reference="installation-docker"
        header="Docker"
        body={
          <>
            <p>Run the following:</p>

            <pre className="docs-code">
              <code>
                docker run -d -p 80:8000 samueldobbie/markup
              </code>
            </pre>

            <p>
              Then visit <a href="https://localhost:1234">https://localhost:1234</a>
            </p>
          </>
        }
      />

      <Section
        reference="setup"
        header="Getting Started"
        body={
          <span>
            To start using Markup for document annotation,
            visit the <NewTab endpoint={Endpoint.SetupForm} text="setup"/> page 
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
              description="The document you intend to annotate (must be .txt file)."
              required={true}
            />

            <Field
              name="Configuration file"
              description={
                <>
                  The file defining all entities and attributes that will be
                  available during the annotation session (must be .conf file).
                  Markup offers an in-built configuration file creator, <NewTab endpoint={Endpoint.ConfigCreator} text="here"/>.
                </>
              }
              required={true}
            />

            <Field
              name="Existing annotations"
              description="
                A file containing existing annotations for the document you intend
                to annotate. The annotation file must have the .ann file extension
                and be in standoff format.
              "
              required={false}
            />

            <Field
              name="Ontology"
              description="
                A dictionary of terms, codes, and related data to be
                accessed during annotation.
              "
              required={false}
            />

            <ul>
              <li>
                <Field
                  name="Pre-loaded"
                  description="
                    Markup offers pre-loaded ontologies that can be used. Certain pre-loaded
                    ontologies require external permissions (e.g. the Unified Medical Language
                    System).
                  "
                  required={false}
                />
              </li>

              <li>
                <Field
                  name="Custom"
                  description="
                    You can provide a custom ontology by providing a text document, where each line
                    is of the form [TERM][TAB][CODE], as shown below.
                  "
                  required={false}
                />
              </li>
            </ul>
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
    <div className="abxsds">
      <p className="docs-field-name">
        {props.name} {props.required && <span>(required)</span>}  
      </p>
      <p className="docs-field-description">{props.description}</p>
    </div>
  )
}

export default Docs
