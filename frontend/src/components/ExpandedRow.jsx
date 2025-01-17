import React from "react"; 
import { SubRow } from "./styles"; 

const ExpandedRow = ({ person }) => (
  <SubRow>
    <td colSpan="8">
      {/* 확장된 행에 추가 정보를 표시 */}
      <strong>Full Address:</strong> {`${person.address.street}, ${person.address.city}, ${person.address.zipcode}, ${person.address.country}`}
      <br />
      <strong>Country Code:</strong> {person.address.country_code}
      <br />
      <strong>Latitude:</strong> {person.address.latitude}, <strong>Longitude:</strong> {person.address.longitude}
    </td>
  </SubRow>
);

export default ExpandedRow; 
