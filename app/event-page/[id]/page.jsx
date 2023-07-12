"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

const EventPage = () => {
  const router = useRouter();
  const params = useParams();

  const [content, setContent] = useState("");
  const [savedContent, setSavedContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (params.id) {
      const storedContent = localStorage.getItem(params.id);
      if (storedContent) {
        setSavedContent(storedContent);
      }
    }
  }, [params.id]);

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleSave = () => {
    const formattedContent = content.replace(/\n/g, "<br>");
    localStorage.setItem(params.id, formattedContent);
    setSavedContent(formattedContent);
    setIsEditing(false);
  };

  const handleDelete = () => {
    localStorage.removeItem(params.id);
    setContent("");
    setSavedContent("");
  };

  const handleEdit = () => {
    setContent(savedContent.replace(/<br>/g, "\n"));
    setIsEditing(true);
  };

  const isEventCreated = !!savedContent;

  return (
    <div>
      <h1>This is the event page</h1>
      <button onClick={() => router.back()}>Go Back</button>

      {isEventCreated && !isEditing ? (
        <div>
          <h2>Saved Content:</h2>
          <p dangerouslySetInnerHTML={{ __html: savedContent }}></p>
          <button onClick={handleDelete}>Delete</button>
          <button onClick={handleEdit}>Edit</button>
        </div>
      ) : (
        <div>
          <textarea
            style={{
              border: "1px solid #ccc",
              width: "100%",
              minHeight: "200px",
              padding: "10px",
            }}
            value={content}
            onChange={handleContentChange}
          ></textarea>
          <div>
            <button onClick={handleSave}>
              {isEditing ? "Update" : "Save"}
            </button>
            {isEditing && (
              <button onClick={() => setIsEditing(false)}>Cancel</button>
            )}
            {!isEditing && (
              <button disabled={!content} onClick={() => setContent("")}>
                Clear
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventPage;
