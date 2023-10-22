import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Classifier from './components/Content/Classifier/Classifier';
import './App.css';

function App() {
    return (
        <BrowserRouter basename={window.location.pathname || ''}>
            <Routes>
                <Route path="/" element={<Classifier />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
