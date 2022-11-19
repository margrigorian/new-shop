import React from 'react';
import style from './App.module.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from './components/navbar/NavBar';
import HomePage from './pages/home_page/HomePage';
import LimitedEditionPage from './pages/limited_edition_page/LimitedEditionPage';
import CollectionPage from './pages/collection_page/CollectionPage';
import SearchPage from './pages/search_page/SearchPage';
import Footer from './components/footer/Footer';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/collection" element={<CollectionPage />}></Route>
          <Route path="/limited-edition-page" element={<LimitedEditionPage />}></Route>
          <Route path="/search" element={<SearchPage />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
