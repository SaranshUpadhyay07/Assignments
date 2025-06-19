import React, { useState } from "react";

function CreateArea(props) {
  const [content, setContent] = useState({
    title: "",
    content: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setContent(prevContent => ({
      ...prevContent,
      [name]: value
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (content.title === "" && content.content === "") {
      alert("Please enter a title or content for your note.");
      return;
    }else{
    props.addItem(content); 
    setContent({
      title: "",
      content: ""
    });}
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Title"
          value={content.title}
          onChange={handleChange}
        />
        <textarea
          name="content"
          placeholder="Take a note..."
          rows="3"
          value={content.content}
          onChange={handleChange}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
