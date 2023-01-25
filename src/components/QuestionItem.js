import React from "react";

function QuestionItem({ question , onDeleteItem, onSelectionChange}) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));
  
  function handleDeleteClick(){
    onDeleteItem(question)
  }

  function handleOnChange(e){
    onSelectionChange(question, e.target.value)
  }

  return (
    <li key={id}>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleOnChange}>{options}</select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;