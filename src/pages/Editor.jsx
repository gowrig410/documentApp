import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import '../App.css'; // Import App.css here

function Editor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  // Load document for editing
  useEffect(() => {
    if (id !== undefined && id !== "new") {
      const savedDocs = JSON.parse(localStorage.getItem("documents"));
      const doc = savedDocs[id];
      if (doc) {
        setContent(doc.content);
        setTitle(doc.title);
      }
    }
  }, [id]);

  const handleSave = () => {
    const newDoc = { title, content };
    const savedDocs = JSON.parse(localStorage.getItem("documents")) || [];

    if (id !== undefined && id !== "new") {
      savedDocs[id] = newDoc; // Update existing document
    } else {
      savedDocs.push(newDoc); // Add new document
    }

    localStorage.setItem("documents", JSON.stringify(savedDocs));
    alert("Document saved!");
    navigate("/");
  };

  return (
    <div className="editor-container">
      <h1>{id && id !== "new" ? "Edit Document" : "New Document"}</h1>
      <input
        type="text"
        placeholder="Document Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className="quill-container">
        <ReactQuill className="quill" value={content} onChange={setContent} />
      </div>
      <div className="button-container">
        <button onClick={handleSave}>Save Document</button>
      </div>
    </div>
  );
}

export default Editor;
