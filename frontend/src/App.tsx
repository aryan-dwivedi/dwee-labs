import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListScreen from "./components/ListScreen";
import AddScreen from "./components/AddScreen";
import { AppProvider } from "./context/AppContext";

const App: React.FC = () => (
  <AppProvider>
    <Router>
      <Routes>
        <Route path="/" element={<ListScreen />} />
        <Route path="/add" element={<AddScreen />} />
      </Routes>
    </Router>
  </AppProvider>
);

export default App;