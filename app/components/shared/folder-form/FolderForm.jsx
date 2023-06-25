import React, { useState } from "react";

const FolderForm = ({ createFolder }) => {
  const [folderName, setFolderName] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState(1);

  // This function is for step management
  const handleNextStep = () => {
    setStep(step + 1);
  };

  // This function is for performing all tasks after from submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Pass an object with folderName and password properties
    createFolder({ folderName, password });

    // Store folder name and password in local storage
    localStorage.setItem(folderName, password);

    // Clear form inputs
    setFolderName("");
    setPassword("");
    setStep(1);
  };

  return (
    <div>
      {step === 1 && (
        <div>
          <h2>Enter Folder Name</h2>
          <input
            type="text"
            placeholder="Folder Name"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
          />
          <button onClick={handleNextStep}>Next</button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2>Enter Password</h2>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleSubmit}>Create Folder</button>
          <button onClick={() => setStep(step - 1)}>Previous</button>
        </div>
      )}
    </div>
  );
};

export default FolderForm;
