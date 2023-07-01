"use client";
import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

const FolderPage = () => {
  const [text, setText] = useState("");
  const [textList, setTextList] = useState([]);
  const router = useRouter();
  const pathName = usePathname();

  const [isCreate, setIsCreate] = useState(false);

  useEffect(() => {
    const savedTextList = localStorage.getItem(pathName);
    if (savedTextList) {
      setTextList(JSON.parse(savedTextList));
    }
  }, []);

  const handleAddText = () => {
    const updatedTextList = [...textList, text];
    localStorage.setItem(pathName, JSON.stringify(updatedTextList));
    setTextList(updatedTextList);
    setText("");
  };

  const handleCreateClock = () => {
    setIsCreate(!isCreate);
  };

  return (
    <div>
      <h2>Welcome to Folder Page - {pathName}</h2>
      <p>
        In the example above, we import the useRouter() hook from the
        next/router module. We then call useRouter() to get the router object,
        which we can use to access the current route, query parameters, and
        navigate to another page using router.push(). Make sure you have the
        next/router package installed and import the useRouter() hook correctly
        in your component file.
      </p>

      {/* <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleAddText}>Add</button>

      <ul>
        {textList.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul> */}

      <button>Create New Clock</button>

      <button onClick={() => router.back()}>Go Back</button>
    </div>
  );
};

export default FolderPage;
