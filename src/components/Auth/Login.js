import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            console.log("✅ 이미 로그인됨, 메인 페이지로 이동");
            navigate('/');
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post('http://localhost:5500/api/auth/login', { email, password });
    
            console.log("✅ 서버 응답 데이터:", response.data);
            console.log("✅ 받은 토큰:", response.data.token);
    
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                console.log("✅ localStorage 저장됨:", localStorage.getItem('token'));

                // 로그인 성공 시 메인 페이지로 이동
                navigate('/');
            } else {
                setErrorMessage("토큰이 반환되지 않았습니다.");
            }
        } catch (error) {
            if (error.response) {
                console.error("❌ 로그인 실패:", error.response.data.error);
                setErrorMessage(error.response.data.error || '로그인 실패');
            } else {
                console.error("❌ 네트워크 오류");
                setErrorMessage('네트워크 오류');
            }
        }
    };

    return (
        <div>
            <h2>로그인</h2>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="이메일"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">로그인</button>
            </form>
        </div>
    );
}

export default Login;
