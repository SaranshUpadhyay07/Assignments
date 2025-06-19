import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {

  const [notes,setNotes] = React.useState([]);
  const [added,setAdded] = React.useState([]);

  function adding(note) {
  setAdded(prevAdded => [...prevAdded, note]);
  console.log(note);
}


  return (
    <div>
      <Header />
      <CreateArea  addItem={adding}/>
      {added.map((notes, index) => (
            <Note
              key={index}
              id={index}
              title={notes.title}
              content={notes.content}
            />
          ))}
      <Footer />
    </div>
  );
}

export default App;
