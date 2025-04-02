import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PartList from './Parts/PartList'; // PartList 컴포넌트 임포트
import '../styles/MainPage.css';

function MainPage() {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [query, setQuery] = useState('');
    const [parts, setParts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        console.log("✅ 현재 저장된 토큰:", token);
        if (!token) {
            console.warn("❌ 토큰이 없습니다! 로그인 페이지로 이동");
            navigate('/login');
        }
    }, [token, navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken(null);
        console.log("✅ 로그아웃 완료, 로그인 페이지로 이동");
        navigate('/login');
    };

    const handleSearch = async () => {
        if (!query) return;

        setLoading(true);
        setError('');
        try {
            const response = await axios.get(`http://localhost:5500/api/parts/search?query=${query}`);
            setParts(response.data);
        } catch (err) {
            setError('부품 검색 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    const handlePartDetail = (name) => {
        const encodedName = encodeURIComponent(name);
        navigate(`/parts/detail/${encodedName}`);
    };

    // ✅ 장바구니 추가 기능
    const handleAddToCart = async (partId) => {
        try {
            await axios.post(
                'http://localhost:5500/api/cart/add',
                { part_id: partId },
                { headers: { Authorization: `Bearer ${token}` } } // JWT 토큰 포함
            );
            alert('🛒 장바구니에 추가되었습니다!');
        } catch (err) {
            alert('❌ 장바구니 추가 실패!');
        }
    };

    return (
        <div className="main-container">
            <h1>🛠️ 컴퓨터 부품 검색</h1>
            {token ? (
                <>
                    <div className="button-container">
                        <button className="btn" onClick={() => navigate('/profile')}>👤 프로필</button>
                        <button className="btn logout" onClick={handleLogout}>🚪 로그아웃</button>
                        <button className="btn cart" onClick={() => navigate('/cart')}>🛒 장바구니</button>
                    </div>

                    <div className="search-container">
                        <h2>🔍 부품 검색</h2>
                        <div className="search-box">
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="부품 이름을 입력하세요"
                            />
                            <button className="search-btn" onClick={handleSearch}>검색</button>
                        </div>
                    </div>

                    {loading && <p className="loading">⏳ 로딩 중...</p>}
                    {error && <p className="error">{error}</p>}

                    <PartList parts={parts} onPartClick={handlePartDetail} onAddToCart={handleAddToCart} />
                </>
            ) : (
                <p className="error">❌ 로그인 후 이용 가능합니다.</p>
            )}
        </div>
    );
}

export default MainPage;