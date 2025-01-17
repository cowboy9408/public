import React, { useEffect, useState, useCallback } from "react";
import { Table, Th, Td, SubRow, SearchBar } from "./styles"; 
import axios from "axios";



let currentId = 0; // 전역 ID 추적 변수


const Grid = () => {
  const [persons, setPersons] = useState([]); // 데이터 상태 초기값
  const [filteredPersons, setFilteredPersons] = useState([]); // 필터링된 데이터 상태
  const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" }); // 정렬 상태
  const [selectedRows, setSelectedRows] = useState([]); // 선택된 행
  const [expandedRows, setExpandedRows] = useState([]); // 확장된 행
  const [page, setPage] = useState(1); // 현재 페이지 번호
  const [isLoading, setIsLoading] = useState(false); // 데이터 로드 상태

  // 초기 데이터 로드
  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:5002/api/persons?count=10&page=1");
            
            // 전역 ID 초기화 및 초기 데이터에 고유 ID 부여
            currentId = 0;
            const fetchedData = response.data.map((person) => {
                currentId += 1; // 전역 ID 증가
                return {
                    ...person,
                    id: currentId, // 고유 ID 할당
                };
            });

            setPersons(fetchedData);
            setFilteredPersons(fetchedData);
        } catch (error) {
            console.error("데이터를 가져오는 중 오류 발생:", error);
        }
    };

    fetchData();
}, []);

  // 검색어 변경 시 필터링
  useEffect(() => {
    if (!persons || persons.length === 0) return; // 데이터가 없을 경우 처리 방지
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
    if (isLoading) return; // 중복 호출 방지
    setIsLoading(true);

    try {
        const response = await axios.get(`http://localhost:5002/api/persons?count=10&page=${page + 1}`);
        
        // 새로운 데이터 추가
        const newData = response.data.map((person) => {
            currentId += 1;
            return {
                ...person,
                id: currentId,
            };
        });

        setPersons((prevPersons) => [...prevPersons, ...newData]);
        setFilteredPersons((prevFiltered) => [...prevFiltered, ...newData]);
        setPage((prevPage) => prevPage + 1);
    } catch (error) {
        console.error("추가 데이터를 로드하는 중 오류 발생:", error);
    } finally {
        setIsLoading(false); // 로딩 상태 해제
    }
}, [isLoading, page]); // 의존성 배열에 필요한 상태 추가

useEffect(() => {
    const threshold = 100; // 페이지 끝에서 100px 남았을 때 추가 데이터 로드
    let debounceTimer; // 디바운싱 타이머

    const handleScroll = () => {
        clearTimeout(debounceTimer); // 기존 타이머 제거
        debounceTimer = setTimeout(() => {
            if (
                window.innerHeight + document.documentElement.scrollTop >=
                document.documentElement.offsetHeight - threshold
            ) {
                loadMoreData(); // 끝에 도달하면 데이터 로드
            }
        }, 200); // 200ms 디바운스
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
}, [loadMoreData]); // loadMoreData를 의존성 배열에 추가

  // 정렬 처리
  const handleSort = (key) => {
    if (key === "id") return; // ID 컬럼은 정렬 제외

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

  // 선택 및 확장 기능
  const handleRowSelect = (id) => {
    setSelectedRows((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((rowId) => rowId !== id)
        : [...prevSelected, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedRows.length === filteredPersons.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredPersons.map((person) => person.id));
    }
  };

  const handleRowExpand = (id) => {
    setExpandedRows((prevExpanded) =>
      prevExpanded.includes(id)
        ? prevExpanded.filter((rowId) => rowId !== id)
        : [...prevExpanded, id]
    );
  };

  return (
    <div style={{ height: "100vh", margin: 0, padding: 0, display: "flex", flexDirection: "column" }}>
      <SearchBar
        type="text"
        placeholder="검색어를 입력하세요 (이름, 이메일, 전화번호)"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Table>
        <thead>
          <tr>
            <Th>
              <input
                type="checkbox"
                checked={selectedRows.length === filteredPersons.length && filteredPersons.length > 0}
                onChange={handleSelectAll}
              />
            </Th>
            <Th>ID</Th>
            <Th sortable={true} onClick={() => handleSort("firstname")}>First Name</Th>
            <Th sortable={true} onClick={() => handleSort("lastname")}>Last Name</Th>
            <Th sortable={true} onClick={() => handleSort("email")}>Email</Th>
            <Th sortable={true} onClick={() => handleSort("phone")}>Phone</Th>
            <Th sortable={true} onClick={() => handleSort("birthday")}>Birthday</Th>
            <Th>Address</Th>
          </tr>
        </thead>
        <tbody>
          {filteredPersons && filteredPersons.length > 0 ? (
            filteredPersons.map((person) => (
                <React.Fragment key={person.id}>
                <tr onClick={() => handleRowExpand(person.id)}>
                  <Td>
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(person.id)}
                      onChange={() => handleRowSelect(person.id)}
                    />
                  </Td>
                  <Td>{person.id}</Td>
                  <Td>{person.firstname}</Td>
                  <Td>{person.lastname}</Td>
                  <Td>{person.email}</Td>
                  <Td>{person.phone}</Td>
                  <Td>{person.birthday}</Td>
                  <Td>{`${person.address.street}, ${person.address.city}`}</Td>
                </tr>
                {expandedRows.includes(person.id) && (
                  <SubRow>
                    <td colSpan="8">
                      <strong>Full Address:</strong> {`${person.address.street}, ${person.address.city}, ${person.address.zipcode}, ${person.address.country}`}
                      <br />
                      <strong>Country Code:</strong> {person.address.country_code}
                      <br />
                      <strong>Latitude:</strong> {person.address.latitude}, <strong>Longitude:</strong> {person.address.longitude}
                    </td>
                  </SubRow>
                )}
              </React.Fragment>
            ))
          ) : (
            <tr>
              <td colSpan="8">No data available</td>
            </tr>
          )}
        </tbody>
      </Table>
      {isLoading && <div style={{ textAlign: "center", padding: "10px" }}>Loading...</div>}
    </div>
  );
};

export default Grid;
