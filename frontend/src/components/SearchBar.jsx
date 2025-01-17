import React from "react"; 

const SearchBar = ({ searchQuery, setSearchQuery }) => (
  <input
    type="text" // 텍스트 입력 필드
    placeholder="검색어를 입력하세요 (이름, 이메일, 전화번호)" // 입력 필드에 표시될 안내 텍스트
    value={searchQuery} // 현재 검색어 값
    onChange={(e) => setSearchQuery(e.target.value)} // 검색어가 변경되면 상태 업데이트
  />
);

export default SearchBar; 
