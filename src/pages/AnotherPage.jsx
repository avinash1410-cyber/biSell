// SomeOtherPage.js
import React, { useContext } from "react";
import AuthContext from "../context/AuthContext"; // Adjust the path

function AnotherPage() {
  const { user } = useContext(AuthContext);
  console.log("User object:", user);

  return (
    <div>
    {user ? (
      <p>User value from context: YES</p>
    ) : (
      <p>User value from context: NOT</p>
    )}
  </div>
  );
}

export default AnotherPage;