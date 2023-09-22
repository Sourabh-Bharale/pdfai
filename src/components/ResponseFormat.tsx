type Props ={
    responseText:string
}
function OpenAIResponse({ responseText }) {
    return (
      <div>
        <pre>
          <code>
            {```
            ${responseText}
            ```}
          </code>
        </pre>
      </div>
    );
  }

  export default OpenAIResponse;