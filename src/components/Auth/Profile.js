import { useState, useEffect } from "react";
import api from "../../services/api";

const Profile = () => {
  const [user, setUser] = useState({ id: "", name: "", password: "" });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await api.get("/me");
        setUser({ id: res.data.id, name: res.data.name });
      } catch (err) {
        console.error("사용자 정보를 불러올 수 없습니다.");
      }
    };
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/update/${user.id}`, { name: user.name, password: user.password });
      alert("정보 수정 완료!");
    } catch (err) {
      alert("수정 실패");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("정말로 탈퇴하시겠습니까?")) return;
    try {
      await api.delete(`/delete/${user.id}`);
      alert("탈퇴 완료!");
      localStorage.removeItem("token");
      window.location.href = "/register";
    } catch (err) {
      alert("탈퇴 실패");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("로그아웃 되었습니다.");
    window.location.href = "/login";
  };

  return (
    <div>
      <h2>프로필</h2>
      <form onSubmit={handleUpdate}>
        <input name="name" placeholder="이름" value={user.name} onChange={handleChange} required />
        <input name="password" type="password" placeholder="새 비밀번호" onChange={handleChange} />
        <button type="submit">수정하기</button>
      </form>
      <button onClick={handleLogout}>로그아웃</button>
      <button onClick={handleDelete} style={{ color: "red" }}>회원 탈퇴</button>
    </div>
  );
};

export default Profile;
