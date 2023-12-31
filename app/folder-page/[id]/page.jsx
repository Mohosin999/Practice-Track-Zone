"use client";
import React, { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import ClockLists from "@/app/components/clock-list";
import ClockActions from "@/app/components/shared/clock-actions/ClockActions";
import { useStoreActions, useStoreState } from "easy-peasy";

const FolderPage = () => {
  const router = useRouter();
  const params = useParams();

  const clocks = useStoreState((state) => state.clockModel.clocks);
  const setClocks = useStoreActions((actions) => actions.clockModel.setClocks);

  useEffect(() => {
    const storedData = localStorage.getItem(params.id);
    if (storedData) {
      const savedClocks = JSON.parse(storedData);
      setClocks(savedClocks);
    }
  }, [setClocks]);

  useEffect(() => {
    localStorage.setItem(params.id, JSON.stringify(clocks));
  }, [params.id, clocks]);

  return (
    <div>
      <h2>Welcome to Folder Page</h2>
      <p>
        In the example above, we import the useRouter() hook from the
        next/router module. We then call useRouter() to get the router object,
        which we can use to access the current route, query parameters, and
        navigate to another page using router.push(). Make sure you have the
        next/router package installed and import the useRouter() hook correctly
        in your component file.
      </p>

      <ClockActions folderButtons={true} />
      <ClockLists clocks={clocks} />

      <button onClick={() => router.back()}>Go Back</button>
    </div>
  );
};

export default FolderPage;

// "use client";
// import React, { useState, useEffect } from "react";
// import { useRouter, usePathname } from "next/navigation";
// import ClockLists from "@/app/components/clock-list";
// import ClockActions from "@/app/components/shared/clock-actions/ClockActions";

// // import ClockForm from "@/app/components/shared/clock-form/ClockForm";

// const FolderPage = () => {
//   // const router = useRouter();
//   // const pathName = usePathname();

//   const [text, setText] = useState("");
//   const [textList, setTextList] = useState([]);
//   const router = useRouter();
//   const pathName = usePathname();

//   const [isCreate, setIsCreate] = useState(false);

//   useEffect(() => {
//     const savedTextList = localStorage.getItem(pathName);
//     if (savedTextList) {
//       setTextList(JSON.parse(savedTextList));
//     }
//   }, []);

//   const handleAddText = () => {
//     const updatedTextList = [...textList, text];
//     localStorage.setItem(pathName, JSON.stringify(updatedTextList));
//     setTextList(updatedTextList);
//     setText("");
//   };

//   const handleCreateClock = () => {
//     setIsCreate(!isCreate);
//   };

//   return (
//     <div>
//       <h2>Welcome to Folder Page - {pathName} </h2>
//       <p>
//         In the example above, we import the useRouter() hook from the
//         next/router module. We then call useRouter() to get the router object,
//         which we can use to access the current route, query parameters, and
//         navigate to another page using router.push(). Make sure you have the
//         next/router package installed and import the useRouter() hook correctly
//         in your component file.
//       </p>

//       {/* {isCreate && <ClockLists />} */}

//       <ClockActions folderButtons={true} />
//       <ClockLists />

//       <button onClick={() => router.back()}>Go Back</button>
//     </div>
//   );
// };

// export default FolderPage;

// // const [text, setText] = useState("");
// // const [textList, setTextList] = useState([]);
// // const router = useRouter();
// // const pathName = usePathname();

// // const [isCreate, setIsCreate] = useState(false);

// // useEffect(() => {
// //   const savedTextList = localStorage.getItem(pathName);
// //   if (savedTextList) {
// //     setTextList(JSON.parse(savedTextList));
// //   }
// // }, []);

// // const handleAddText = () => {
// //   const updatedTextList = [...textList, text];
// //   localStorage.setItem(pathName, JSON.stringify(updatedTextList));
// //   setTextList(updatedTextList);
// //   setText("");
// // };

// // const handleCreateClock = () => {
// //   setIsCreate(!isCreate);
// // };
