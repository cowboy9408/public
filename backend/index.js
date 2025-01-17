const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 5002;

// CORS 설정
app.use(cors());

// '/api/persons' 경로 처리
app.get("/api/persons", async (req, res) => {
  const { page = 1, count = 10 } = req.query; // 페이지와 데이터 개수 설정

  try {
      // 외부 API 호출
      const response = await axios.get("https://fakerapi.it/api/v2/persons", {
          params: {
              _quantity: count * page, // 요청 데이터 개수
              _gender: "female", // 필터: 여성
              _birthday_start: "2005-01-01", // 필터: 생일 시작
          },
      });

      // 필요한 데이터 슬라이싱
      const startIndex = (page - 1) * count;
      const endIndex = startIndex + Number(count);
      const data = response.data.data.slice(startIndex, endIndex);

      res.json(data); // 클라이언트에 데이터 전송
  } catch (error) {
      console.error("API 호출 실패:", error.message);
      res.status(500).json({ error: "API 호출 실패" });
  }
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`서버 실행 중: http://localhost:${PORT}`);
});