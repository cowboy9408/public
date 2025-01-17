const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 5002;

// CORS 설정
app.use(cors());

// API 요청 시 최대 데이터 수를 100개 이상으로 설정
app.get("/api/persons", async (req, res) => {
    const { page = 1, count = 10 } = req.query;
    try {
      const response = await axios.get("https://fakerapi.it/api/v2/persons", {
        params: {
          _quantity: count * page, // 필요한 총 데이터 개수 요청
          _gender: "female",
          _birthday_start: "2005-01-01"
        },
      });
  
      const startIndex = (page - 1) * count;
      const endIndex = startIndex + Number(count);
      const data = response.data.data.slice(startIndex, endIndex);
  
      res.json(data);
    } catch (error) {
      console.error("외부 API 호출 실패:", error.message);
      res.status(500).json({ error: "외부 API 호출에 실패했습니다." });
    }
  });


// 서버 실행
app.listen(PORT, () => {
    console.log(`Express 서버가 http://localhost:${PORT}에서 실행 중입니다.`);
});
