import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import loding from '../../image/loading.gif'

const Summary = (props) => {
  const report = props.reportData;
  console.log(report);
  const [obj, setObj] = useState([]);
  // console.log(obj);
  useEffect(() => {
    if (report.length) {
      setObj(report)
    }
  }, [report]);
  // console.log(obj.map(item => parseInt( item.time)));
  return (
    <div className="container">
      
   <Bar
        height={400}
        width={400}
        options={{
          maintainAspectRatio: false,
        }}
        data={{
          labels: obj.map(item => item.name),
          datasets: [
            {
              label: "Today data",
              data: obj.map(item => parseInt(item.time)),
              backgroundColor: [
                "#95DF84",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
              ],
            },
          ],
        }}
      />
     
    </div>
  );
};

export default Summary;
