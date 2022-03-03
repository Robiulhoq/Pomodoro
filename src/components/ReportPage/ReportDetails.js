import React from "react";

const ReportDetails = (props) => {
    const { date, name, time} = props.tk;
   
    
  return (
    <tbody>
    <tr>
      <td>{date}</td>
      <td>{name}</td>
      <td>{time}</td>
    </tr>
  </tbody>
  );
};


export default ReportDetails;
