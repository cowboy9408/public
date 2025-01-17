import React from "react"; 
import { Td } from "./styles"; 

// 행 클릭 시 확장
const TableRow = ({ person, selectedRows, handleRowSelect, handleRowExpand }) => (
  <tr onClick={() => handleRowExpand(person.id)}>
    <Td>
      <input
        type="checkbox"
        checked={selectedRows.includes(person.id)} // 선택 여부 확인
        onChange={() => handleRowSelect(person.id)} // 선택 상태 변경
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
);

export default TableRow; 
