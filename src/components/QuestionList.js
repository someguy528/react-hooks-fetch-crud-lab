import React, {useEffect, useState} from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {

  const [isQuestion, setQuestion] = useState([]);
  useEffect(()=>{
    fetch("http://localhost:4000/questions")
    .then(resp => resp.json())
    .then(data => {
      setQuestion(data);
      console.log(isQuestion)
    })
  }, [])

  //delete function 
  function handleDeleteQuestion(id){
    fetch(`http://localhost:4000/questions/${id}` ,{
      method: "DELETE",
    })
    .then(resp => resp.json())
    .then(() => {
      const updatedQuestions = isQuestion.filter((question) => question.id !== id);
      setQuestion(updatedQuestions);
    })
  }
  //

  //patch function for answer change
  function handleAnswerChange(id, correctIndex){
    fetch(`http://localhost:4000/questions/${id}` ,{
      method: "PATCH",
      headers: {
        "Content-Type" : "application/json" 
      },
      body: JSON.stringify({ correctIndex }),
    })
    .then(resp => resp.json())
    .then(selectQuestion => {
      const updatedQuestions = isQuestion.map((question) => {
        if(question.id === id){
          return selectQuestion
        }
        return question;
      });
      setQuestion(updatedQuestions);
    });
  }
  //

  const allQuestions = isQuestion.map((q) => {
    return (
      <QuestionItem question={q} key={q.id} onDeleteClick={handleDeleteQuestion} onAnswerChange={handleAnswerChange}/>
    )
  })

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{/* display QuestionItem components here after fetching */}
      {allQuestions}
      </ul>
    </section>
  );
}

export default QuestionList;
