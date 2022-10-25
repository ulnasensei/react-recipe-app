import "./App.css";
import { Routes, Route } from "react-router-dom";
import NavigationBar from "./components/navbar/NavigationBar";
import Recipes from "./pages/Recipes";
import Recipe from "./pages/Recipe";

function App() {
    return (
        <>
            <NavigationBar />
            <Routes>
                <Route path="/" element={<Recipes />} />
                <Route path="recipe/:recipe" element={<Recipe />} />
            </Routes>
        </>
    );
}

export default App;
