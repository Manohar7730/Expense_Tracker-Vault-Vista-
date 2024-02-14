import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../styles/App.css";
import Navbar from "./Navbar";
import Home from "./Auth/Home";
import Auth from "./Auth/Auth";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../Firebase";

function App() {
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    const fetchData = onSnapshot(collection(db, "users"), (snapShot) => {
      const data = snapShot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsersData(data);
    });
    return () => {
      fetchData();
    };
  }, []);
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/home/:userId" element={<Home />} />
          <Route path="/" element={<Auth usersData={usersData} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
