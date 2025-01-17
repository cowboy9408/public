import React, { useEffect, useState, useCallback } from "react"; 
import { Table } from "./styles"; 
import SearchBar from "./SearchBar"; 
import TableHeader from "./TableHeader"; 
import TableBody from "./TableBody"; 
import axios from "axios"; 

let currentId = 0; // ID 값을 관리하기 위한 전역 변수

const Grid = () => {
  const [persons, setPersons] = useState([]); 
  const [filteredPersons, setFilteredPersons] = useState([]); 
  const [searchQuery, setSearchQuery] = useState(""); 
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" }); 
  const [selectedRows, setSelectedRows] = useState([]); 
  const [expandedRows, setExpandedRows] = useState([]); 
  const [page, setPage] = useState(1); 
  const [isLoading, setIsLoading] = useState(false); 

  // 초기 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5002/api/persons?count=10&page=1");
        currentId = 0;
        const fetchedData = response.data.map((person) => ({
          ...person,
          id: ++currentId,
        }));
        setPersons(fetchedData);
        setFilteredPersons(fetchedData);
      } catch (error) {
        console.error("데이터를 가져오는 중 오류 발생:", error);
      }
    };

    fetchData();
  }, []);

  // 검색어 변경 시 데이터 필터링
  useEffect(() => {
    if (!persons || persons.length === 0) return;
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = persons.filter((person) =>
      person.firstname.toLowerCase().includes(lowerCaseQuery) ||
      person.lastname.toLowerCase().includes(lowerCaseQuery) ||
      person.email.toLowerCase().includes(lowerCaseQuery) ||
      person.phone.includes(lowerCaseQuery)
    );
    setFilteredPersons(filtered);
  }, [searchQuery, persons]);

  // 추가 데이터 로드
  const loadMoreData = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const response = await axios.get(`http://localhost:5002/api/persons?count=10&page=${page + 1}`);
      const newData = response.data.map((person) => ({
        ...person,
        id: ++currentId,
      }));
      setPersons((prev) => [...prev, ...newData]);
      setFilteredPersons((prev) => [...prev, ...newData]);
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error("추가 데이터를 로드하는 중 오류 발생:", error);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, page]);

  // 스크롤 이벤트로 추가 데이터 로드
  useEffect(() => {
    const threshold = 100;
    let debounceTimer;

    const handleScroll = () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        if (
          window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - threshold
        ) {
          loadMoreData();
        }
      }, 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadMoreData]);

  // 데이터 정렬 처리
  const handleSort = (key) => {
    if (key === "id") return;

    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sortedData = [...filteredPersons].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredPersons(sortedData);
  };

  // 행 선택 처리
  const handleRowSelect = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  // 전체 선택 처리
  const handleSelectAll = () => {
    if (selectedRows.length === filteredPersons.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredPersons.map((person) => person.id));
    }
  };

  // 행 확장 처리
  const handleRowExpand = (id) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  return (
    <div style={{ height: "100vh", margin: 0, padding: 0, display: "flex", flexDirection: "column" }}>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Table>
        <TableHeader
          selectedRows={selectedRows}
          filteredPersons={filteredPersons}
          handleSelectAll={handleSelectAll}
          handleSort={handleSort}
        />
        <TableBody
          filteredPersons={filteredPersons}
          expandedRows={expandedRows}
          selectedRows={selectedRows}
          handleRowSelect={handleRowSelect}
          handleRowExpand={handleRowExpand}
        />
      </Table>
      {isLoading && <div>데이터 가져오는 중...</div>}
    </div>
  );
};

export default Grid;
