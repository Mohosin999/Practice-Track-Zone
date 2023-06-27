"use client";
import React from "react";
import { useRouter } from "next/router";

const FolderPage = () => {
  const router = useRouter();
  const slug = router.query.slug;
  console.log(slug);

  return (
    <div>
      <h2>Welcome to Folder Page - {slug}</h2>
      <p>
        In the example above, we import the useRouter() hook from the
        next/router module. We then call useRouter() to get the router object,
        which we can use to access the current route, query parameters, and
        navigate to another page using router.push(). Make sure you have the
        next/router package installed and import the useRouter() hook correctly
        in your component file.
      </p>

      <button onClick={() => router.back()}>Go Back</button>
    </div>
  );
};

export default FolderPage;
