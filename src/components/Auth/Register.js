import { useState } from "react";
import api from "../../services/api";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/register", form);
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.error || "회원가입 실패");
    }
  };

  return (
    <div>
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="이름" onChange={handleChange} required />
        <input name="email" placeholder="이메일" onChange={handleChange} required />
        <input name="password" type="password" placeholder="비밀번호" onChange={handleChange} required />
        <button type="submit">가입하기</button>
      </form>
    </div>
  );
};

export default Register;
