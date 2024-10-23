// src/pages/Home.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [documents, setDocuments] = useState([]);
  const navigate = useNavigate();

  // Load saved documents from local storage
  useEffect(() => {
    const savedDocs = JSON.parse(localStorage.getItem("documents"));
    if (savedDocs) {
      setDocuments(savedDocs);
    }
  }, []);

  const handleAddDocument = () => {
    navigate("/editor");
  };

  const handleEditDocument = (id) => {
    navigate(`/editor/${id}`);
  };

  const handleDeleteDocument = (id) => {
    const updatedDocs = documents.filter((_, index) => index !== id); // Remove the document
    setDocuments(updatedDocs);
    localStorage.setItem("documents", JSON.stringify(updatedDocs)); // Update local storage
  };

  return (
    <div className="home-container">
      <h1>Doc App</h1>
      <button className="add-button" onClick={handleAddDocument}>
        Add Document
      </button>
      <h2>Saved Documents</h2>
      <div className="document-list">
        {documents.length === 0 ? (
          <p>Nothing to display. You can add a document!</p>
        ) : (
          documents.map((doc, index) => (
            <div key={index} className="document-item">
              <h3>{doc.title || "Untitled Document"}</h3>
              <div dangerouslySetInnerHTML={{ __html: doc.content }} />
              <button className="edit-button" onClick={() => handleEditDocument(index)}>
                Edit
              </button>
              <button className="delete-button" onClick={() => handleDeleteDocument(index)}>
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
