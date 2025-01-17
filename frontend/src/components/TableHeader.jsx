import React from "react"; 
import { Th } from "./styles"; 

const TableHeader = ({ selectedRows, filteredPersons, handleSelectAll, handleSort }) => (
  <thead>
    <tr>
      <Th>
        <input
          type="checkbox"
          checked={selectedRows.length === filteredPersons.length && filteredPersons.length > 0} 
          // 모두 선택 여부 확인
          onChange={handleSelectAll} // 전체 선택/해제
        />
        {/* 컬럼 정렬 */}
      </Th>
      <Th>ID</Th> 
      <Th sortable onClick={() => handleSort("firstname")}>First Name</Th> 
      <Th sortable onClick={() => handleSort("lastname")}>Last Name</Th> 
      <Th sortable onClick={() => handleSort("email")}>Email</Th> 
      <Th sortable onClick={() => handleSort("phone")}>Phone</Th> 
      <Th sortable onClick={() => handleSort("birthday")}>Birthday</Th>
      <Th>Address</Th> 
    </tr>
  </thead>
);

export default TableHeader; 
