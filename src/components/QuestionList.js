import React from "react";
import QuestionItem from './QuestionItem'


function QuestionList({questions, onDeleteItem, onSelectionChange}) {

  return (
    <section>
      <h1>Quiz Questions</h1>
      {questions.map( question => <ul><QuestionItem question={question} key={question.id} onDeleteItem={onDeleteItem} onSelectionChange={onSelectionChange}/></ul>)}
    </section>
  );
}

export default QuestionList;