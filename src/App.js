import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Profile from './components/Auth/Profile';
import MainPage from './components/MainPage';
import PartDetailPage from './components/Parts/PartDetailPage';  // 수정된 부분
import CartPage from './components/CartPage';


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/parts/detail/:partName" element={<PartDetailPage />} /> 
                <Route path="/cart" element={<CartPage />} />
            </Routes>
        </Router>
    );
}

export default App;
