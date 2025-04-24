// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Attendance from "./pages/Attendance";
import Leaves from "./pages/Leaves";
import Profile from "./pages/Profile";
import Salary from "./pages/Salary";
import PrivateRoute from "./PrivateRoute";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/attendance" element={ <PrivateRoute><Attendance /></PrivateRoute> } />
        <Route path="/leaves" element={ <PrivateRoute><Leaves /></PrivateRoute> } />
        <Route path="/profile" element={ <PrivateRoute><Profile /></PrivateRoute> } />
        <Route path="/salary" element={ <PrivateRoute><Salary /></PrivateRoute> } />

      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
