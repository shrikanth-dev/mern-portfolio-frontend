import React from "react";

const Loader: React.FC = () => {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "200px" }}>
      <div style={{
        width: "40px",
        height: "40px",
        border: "4px solid #007bff",
        borderTop: "4px solid transparent",
        borderRadius: "50%",
        animation: "spin 1s linear infinite"
      }} />
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default Loader;