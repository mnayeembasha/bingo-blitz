import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login"; // Assuming you have a Login component
import Root from "./Root";

export default function App() {
  return (
    <RecoilRoot>
      <ToastContainer position="top-center" autoClose={3000} />
      <Router>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>
      </Router>
    </RecoilRoot>
  );
}
export function Dashboard (){
  return <div>Dashboard</div>
}
