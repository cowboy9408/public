import styled from "styled-components";

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
`;

const Th = styled.th.withConfig({
  shouldForwardProp: (prop) => prop !== "sortable",
})`
  border: 1px solid #ddd;
  padding: 8px;
  background-color: #f4f4f4;
  text-align: center;
  cursor: ${({ sortable }) => (sortable ? "pointer" : "default")};
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SubRow = styled.tr`
  background-color: #f9f9f9;
  td {
    text-align: left;
    padding: 10px;
    font-size: 14px;
    color: #555;
  }
`;

const SearchBar = styled.input`
  margin: 0;
  padding: 8px;
  width: calc(100% - 16px);
  border: 1px solid #ddd;
  font-size: 16px;
  box-sizing: border-box;
`;

export { Table, Th, Td, SubRow, SearchBar };
