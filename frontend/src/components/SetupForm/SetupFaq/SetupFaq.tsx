function SetupFaq(this: any) {
    return (
      <>
        <h4>FAQ</h4>
        <hr></hr>

        <h5>Do you store my data?</h5>
        <p>
          No - Markup uses your browsers' <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage" target="_blank" rel="noreferrer">local storage </a>
          to manage uploaded documents and annotations. Markup is open source and designed to be run locally, without an internet connection.
        </p>
        <br/>

        <h5>What is a configuration file?</h5>
        <p>
          A configuration file defines the <a href="/">entities</a>, <a href="/">attributes</a>, and relationships that you plan to annotate.
        </p>
        <br/>

        <h5>What annotation formats do I need to use?</h5>
        <p>
          Markup only works with <a href="https://brat.nlplab.org/standoff.html">standoff format</a> at the moment.
        </p>
      </>
    )
  }
  
  export default SetupFaq
  