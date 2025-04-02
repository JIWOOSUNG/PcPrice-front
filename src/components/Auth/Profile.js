import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const [user, setUser] = useState(null);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }
        // 프로필 정보 가져오기
        const fetchUserProfile = async () => {
            try {
                const response = await fetch('http://localhost:5500/api/auth/me', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('프로필 정보를 가져오는 데 실패했습니다.');
                }
                const data = await response.json();
                setUser(data);
                setName(data.name);
            } catch (error) {
                setError(error.message);
            }
        };
        fetchUserProfile();
    }, [token, navigate]);

    // 회원 정보 수정
    const handleUpdate = async () => {
        try {
            const response = await fetch('http://localhost:5500/api/auth/update', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, password }),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || '회원 정보 수정 실패');
            }
            alert('회원 정보가 수정되었습니다!');
        } catch (error) {
            setError(error.message);
        }
    };

    // 회원 탈퇴
    const handleDelete = async () => {
        if (window.confirm('정말로 탈퇴하시겠습니까?')) {
            try {
                const response = await fetch('http://localhost:5500/api/auth/delete', {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.error || '회원 탈퇴 실패');
                }
                alert('회원 탈퇴가 완료되었습니다.');
                localStorage.removeItem('token');
                navigate('/login');
            } catch (error) {
                setError(error.message);
            }
        }
    };

    // 로그아웃
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div>
            <h1>프로필 페이지</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {user ? (
                <div>
                    <p><strong>이름:</strong> {user.name}</p>
                    <p><strong>이메일:</strong> {user.email}</p>
                    <div>
                        <label>
                            이름:
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            새 비밀번호:
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </label>
                    </div>
                    <button onClick={handleUpdate}>회원 정보 수정</button>
                    <button onClick={handleDelete} style={{ marginLeft: '10px' }}>
                        회원 탈퇴
                    </button>
                    <button onClick={handleLogout} style={{ marginLeft: '10px' }}>
                        로그아웃
                    </button>
                </div>
            ) : (
                <p>프로필 정보를 불러오는 중...</p>
            )}
        </div>
    );
}

export default Profile;
