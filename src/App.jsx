import "./App.css";
import { Routes, Route } from "react-router-dom"; // Asegúrate de que Routes se importe correctamente.
import Login from "./components/Login";
import Cuestionario from "./components/Cuestionario";

function App() {
  // return (
  //   <Routes>
  //     <Route path="/login" element={<Login />} />
  //     <Route path="/cuestionario" element={<Cuestionario />} />
  //   </Routes>
  // );

  return(
    <>
    <Login/>    
    </>
  )
}
export default App;
