import React from "react"; 
import TableRow from "./TableRow"; 
import ExpandedRow from "./ExpandedRow"; 

const TableBody = ({
  filteredPersons, // 필터링된 데이터
  expandedRows, // 확장된 행 ID
  selectedRows, // 선택된 행 ID
  handleRowSelect, // 행 선택 처리
  handleRowExpand, // 행 확장 처리
}) => (
  <tbody>
    {filteredPersons.length > 0 ? ( // 데이터가 있을 경우
      filteredPersons.map((person) => (
        <React.Fragment key={person.id}>
          <TableRow
            person={person} // 개인 데이터 전달
            selectedRows={selectedRows} // 선택된 행 전달
            handleRowSelect={handleRowSelect} // 선택 처리 함수 전달
            handleRowExpand={handleRowExpand} // 확장 처리 함수 전달
          />
          {expandedRows.includes(person.id) && <ExpandedRow person={person} />}
          {/* 행이 확장된 경우 확장된 내용 표시 */}
        </React.Fragment>
      ))
    ) : (
      <tr>
        <td colSpan="8">사용할 수 있는 데이터가 없습니다.</td> {/* 데이터가 없을 경우 메시지 표시 */}
      </tr>
    )}
  </tbody>
);

export default TableBody; 
