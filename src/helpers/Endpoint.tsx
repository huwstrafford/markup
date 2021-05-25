enum Endpoint {
    Any = "*",
    Home = "/",
    Documentation = "/docs",
    Repository = "https://github.com/samueldobbie/markup",
    DataGenerator = "/data-generator",
    ConfigCreator = "/config-creator",
    SetupForm = "/setup",
    Annotate = "/annotate",
    Demo = "/demo",
    PageNotFound = "/404",
}

export function NewTab(props: any): JSX.Element {
  return (
    <a
      href={props.endpoint}
      rel="noreferrer"
      target="_blank"
    >
      {props.text}
    </a>
  )
}

export default Endpoint
