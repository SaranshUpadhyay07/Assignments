import React,{useState} from "react";

function Note(props) {

  const [isDone, setIsDone] = useState(false);
  
function deleting(){
  setIsDone(true);
}
  return (
    <div className="note" style={{display: isDone ? "none" : "block"}}>
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button  onClick={deleting}>DELETE</button>
    </div>
  );
}

export default Note;
