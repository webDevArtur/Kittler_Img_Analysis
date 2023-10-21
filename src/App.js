import React from 'react';
import Home from './components/Content/Home/Home'; // Import your components for each route
import About from './components/Content/About/About';
import Classifier from './components/Content/Classifier/Classifier';
import Contact from './components/Content/Contact/Contact';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<Home/>} />
                <Route path="/about" element={<About/>} />
                <Route path="/classifier" element={<Classifier/>} />
                <Route path="/contact" element={<Contact/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
