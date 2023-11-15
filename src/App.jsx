import "./App.css";
import {Routes, Route, Navigate} from "react-router-dom"; // Asegúrate de que Routes se importe correctamente.
import Login from "./components/Login";
import Cuestionario from "./components/Cuestionario";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route
                path="/login"
                element={<Navigate to="/" replace/>}
            />
            <Route path="/cuestionario" element={<Cuestionario/>}/>
        </Routes>
    );
}

export default App;
