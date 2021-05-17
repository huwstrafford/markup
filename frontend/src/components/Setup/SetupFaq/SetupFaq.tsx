import Title from "@markup/components/Setup/helpers/Title"

function SetupFaq(): JSX.Element {
  return (
    <>
      <Title message="FAQ"/>

      <QuestionAndAnswer
        question="Do you store my data?"
        answer={
          <>
            No - Markup uses your browsers' <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage" target="_blank" rel="noreferrer">local storage </a>
            to manage uploaded documents and annotations. Markup is open source and designed to be run locally, without an internet connection.
          </>
        }
      />

      <QuestionAndAnswer
        question="What is a configuration file?"
        answer={<>A configuration file defines the <a href="/">entities</a>, <a href="/">attributes</a>, and relationships that you plan to annotate.</>}
      />

      <QuestionAndAnswer
        question="What annotation formats do I need to use?"
        answer={<>Markup only works with <a href="https://brat.nlplab.org/standoff.html" target="_blank" rel="noreferrer">standoff format</a> at the moment.</>}
      />

      <QuestionAndAnswer
        question="Can you help me get setup?"
        answer={<>Contact me (<a href="mailto:samuel@getmarkup.com">sam@getmarkup.com</a>) and I'll try my best!</>}
      />
    </>
  )
}

function QuestionAndAnswer(props: any): JSX.Element {
  return (
    <>
      <h5>{props.question}</h5>
      <p>{props.answer}</p>
      <br/>
    </>
  )
}

export default SetupFaq
