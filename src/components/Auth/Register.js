// /components/auth/register.js
import React, { useState } from 'react';
import axios from 'axios';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5500/api/auth/register', {
                name,
                email,
                password,
            });

            alert(response.data.message);
        } catch (error) {
            alert(error.response?.data?.error || '회원가입 실패');
        }
    };

    return (
        <div>
            <h3>회원가입</h3>
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="이름"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
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
                <button type="submit">회원가입</button>
            </form>
        </div>
    );
}

export default Register;
