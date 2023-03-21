import { Routes, Route } from "react-router-dom";
import SearchPage from "./pages/search-page/SearchPage";
import ShowPage from "./pages/show-page/ShowPage";
import { CollectionProvider } from "./collection.context.jsx";
import "./App.css";

function App() {
  return (
    <CollectionProvider>
      <div className="App mt-4">
        <div className="container">
          <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="/show" element={<ShowPage />} />
          </Routes>
        </div>
      </div>
    </CollectionProvider>
  );
}

export default App;
