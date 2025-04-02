import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../styles/PartDetail.css"; // ✅ 스타일 적용

function PartDetail() {
    const { partName } = useParams();
    const [part, setPart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:5500/api/parts/detail?name=${encodeURIComponent(partName)}`)
            .then((res) => setPart(res.data))
            .catch(() => setError("부품 정보를 불러오는 중 오류 발생"))
            .finally(() => setLoading(false));
    }, [partName]);

    if (loading) return <p>로딩 중...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="part-detail-container">
            <h1>{part.name}</h1>
            <img src={part.imageUrl} alt={part.name} />
            <p><strong>제조사:</strong> {part.manufacturer}</p>
            <p><strong>가격:</strong> {part.price} 원</p>
            <p><strong>스펙:</strong> {part.specList}</p>
            <a href={part.productUrl} target="_blank" rel="noopener noreferrer">🔗 상품 페이지</a>
        </div>
    );
}

export default PartDetail;
