// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage/HomePage';
import InsightPage from './components/InsightPage';
import DemoPage from './components/DemoPage/DemoPage';
import CanvasAnimation from './components/CanvasAnimation';

const App: React.FC = () => {
    return (
        <Router>
            <div className="relative min-h-screen"> {/* Correct: relative positioning here */}
                <CanvasAnimation />
                <Header />
                <div> {/* Removed relative and z-10 */}
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/insights/:id" element={<InsightPage />} />
                        <Route path="/demo" element={<DemoPage />} />
                    </Routes>
                </div>
                <Footer />
            </div>
        </Router>
    );
};

export default App;