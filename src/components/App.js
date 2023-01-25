import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch('http://localhost:4000/questions')
    .then(r => r.json())
    .then( questions => setQuestions(questions))
  },[])

  function handleAddQuestion(newQuestion){

    fetch('http://localhost:4000/questions', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newQuestion)
    })
    setQuestions([...questions, newQuestion])
   
  }

  function handleDeleteItem(deletedItem){
    fetch(`http://localhost:4000/questions/${deletedItem.id}`,{
    method: "DELETE"})
    .then(r => r.json())
    .then(() => setQuestions(questions.filter( q => q.id !== deletedItem.id)))
  }

  function handleSelectionChange(updatedQuestion, optionIndex){
      fetch(`http://localhost:4000/questions/${updatedQuestion.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          correctIndex: optionIndex
        })
      })
      .then(r => r.json())
      .then( q => questions.map( question => {
        if(question.id === q.id){
          return q
        }else{
          return question
        }
      }))   
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm onAddQuestion={handleAddQuestion}/> : <QuestionList onSelectionChange={handleSelectionChange} onDeleteItem={handleDeleteItem} questions={questions}/>}
    </main>
  );
}

export default App;