import { useState } from "react";
import Login from "./Login";
import Register from "./Register";

function Auth({ usersData }) {
  const [activeComponent, setActiveComponent] = useState(0);

  const handleComponentChange = (componentNumber) => {
    setActiveComponent(componentNumber);
  };

  return (
    <>
      <div className="main">
        <div className="auth">
          <button
            className={`btn ${
              activeComponent === 1 ? "btn-success active" : "btn btn-info"
            }`}
            onClick={() => handleComponentChange(1)}
          >
            Login
          </button>
          <button
            className={`btn ${
              activeComponent === 2 ? "btn-warning active" : "btn btn-info"
            }`}
            onClick={() => handleComponentChange(2)}
          >
            Register
          </button>

          <button
            className="btn btn-secondary"
            onClick={() => handleComponentChange(0)}
          >
            Back
          </button>
        </div>
        <div
          className="ActiveComponent"
          style={{ display: activeComponent === 0 ? "none" : "block" }}
        >
          {activeComponent === 1 && <Login usersData={usersData} />}
          {activeComponent === 2 && (
            <Register
              usersData={usersData}
              setActiveComponent={setActiveComponent}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default Auth;
