// Example: PreviewPage.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';

const PreviewPage = () => {
  const { state } = useLocation();
  const userData = state?.userData;
  
  if (!userData) {
    return <div>No data available</div>;
  }
  
  return (
    <div>
      <h1>Preview User Data</h1>
      <pre>{JSON.stringify(userData, null, 2)}</pre>
      {/* Or render the data in a formatted way */}
      <div>
        <p>Name: {userData.fullName}</p>
        <p>Email: {userData.personalInfo.email}</p>
        {/* ... etc */}
      </div>
    </div>
  );
};

export default PreviewPage;