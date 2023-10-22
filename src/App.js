import React from 'react';
import Home from './components/Content/Home/Home';
import About from './components/Content/About/About';
import Classifier from './components/Content/Classifier/Classifier';
import Contact from './components/Content/Contact/Contact';
import { HashRouter, Route, Routes } from 'react-router-dom';

function App() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/classifier" element={<Classifier/>}/>
                <Route path="/contact" element={<Contact/>}/>
            </Routes>
        </HashRouter>
    );
}

export default App;
