import React, { useEffect, useState } from "react";
import TopNavBar from "../HomePage/TopNavBar";
import "./Report.css";
import koders_logo from "../../image/koders_logo.png";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import ReportDetails from "./ReportDetails";
import Summary from "./Summary";
const Report = (props) => {
  // const date = new Date()
  const [report, setReport] = useState("summary");
  const [reportList, setReportList] = useState([]);
  const emailId = props.email;
  useEffect(() => {
    if (emailId.length) {
      fetch("http://localhost:5000/getLoginTask", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ emailId }),
      })
        .then((res) => res.json())
        .then((data) => setReportList(data));
    }
  }, [emailId]);
  const [day, setDay] = useState([]);
  const getDate = new Date();
  const date = getDate.toLocaleDateString("ba-BD");
  const hendleDay = () => {
    fetch("http://localhost:5000/findDay", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ date }),
    })
      .then((res) => res.json())
      .then((data) => setDay(data));
  };
  const [ranking, setRanking] = useState([]);
  useEffect(()=>{
    fetch("http://localhost:5000/rankingTask")
    .then((res) => res.json())
    .then((data) => setRanking(data));
  },[])
  const time = ranking.map((item) => item.time);
  console.log(time);
  return (
    <div className='report'>
      <TopNavBar></TopNavBar>
      <div className="d-flex justify-content-center mt-4">
        <Link to="/">
          <img src={koders_logo} alt="" />
        </Link>
      </div>
      <div className="report_btn_box">
        <button onClick={() => setReport("summary")} className="btn report_btn">
          Summary
        </button>
        <button onClick={() => setReport("detail")} className="btn report_btn">
          Detail
        </button>
        <button onClick={() => setReport("ranking")} className="btn report_btn">
          Ranking
        </button>
      </div>
      {report === "summary" ? (
        <div>
          <div className="d-flex justify-content-between container">
            <div>
              <h6>Focus Hours</h6>
            </div>
            <div className="d-flex focus_hours">
              <button className="btn" onClick={hendleDay}>
                <h6>Day</h6>
              </button>
              <button className="btn">
                {" "}
                <h6>Week</h6>
              </button>
              <button className="btn">
                <h6>Year</h6>
              </button>
            </div>
          </div>
          {<Summary reportData={day}></Summary>}
        </div>
      ) : report === "detail" ? (
        <table className="table container">
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Project/Task</th>
              <th scope="col">Minutes</th>
            </tr>
          </thead>
          {reportList.length ? (
            reportList.map((tk) => <ReportDetails tk={tk}></ReportDetails>)
          ) : (
            <h1 className="report">
              * This report will be available when you are logged in
            </h1>
          )}
        </table>
      ) : report === "ranking" ? (
        <div>
          <h6 className="m-5">Max User Working {Math.max(...time)} Minutes</h6>
          <h6 className="m-5">Min User Working {Math.min(...time)} Minutes</h6>
        </div>
      ) : null}
    </div>
  );
};
function mapToStateProps(state) {
  return {
    time: state.settingUpdate,
    email: state.loginEmail,
  };
}

export default connect(mapToStateProps, null)(Report);
