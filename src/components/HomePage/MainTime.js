import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import TaskList from "./TaskList";
import koders_logo from "../../image/koders_logo.png";
import pomodoro_logo from "../../image/POMODORO.png";
import bell from "../../Audio/bell.wav";
import bird from "../../Audio/bird.wav";
import kitchn_bell from "../../Audio/kitchn_bell.wav";
import watchSong from "../../Audio/watch.wav";
const MainTime = (props) => {
  const [pomodoroMinute, setPromodoroMinute] = useState(25);
  const [shortBrackMinute, setShortBrackMinute] = useState(5);
  const [longBrackMinute, setLongBrackMinute] = useState(15);
  const [promodoroSecound, setpromodoroSecound] = useState(60);
  const [shortBrackSecound, setShortBrackSecound] = useState(60);
  const [longBrackSecound, setLongBrackSecound] = useState(60);
  // pomodoro function section
  const getSetting = props.settingValue;
  const [start, setStart] = useState(false);
  
  useEffect(() => {
    const watch = new Audio(watchSong);
    getSetting.map((st) => {
      setPromodoroMinute(st.promodoro) ||
        setShortBrackMinute(st.shortBrack) ||
        setLongBrackMinute(st.longBrack);
      if (st.autoStartBrack === true && pomodoroMinute === 0) {
        setSchedule("shortbrack");
        setStart(false);
        hendleWorkReset()
      } else if (st.autoStartPromodoro === true && pomodoroMinute === 0) {
        setpromodoroSecound(60)
        setPromodoroMinute(st.promodoro);
        setSchedule("promodoro");
        setStart(true);
      } else if (st.alarmSound === "bell" && pomodoroMinute === 0) {
        const bellSong = new Audio(bell);
        bellSong.play();
        setStart(false);
        // setpromodoroSecound(0)
      } else if (st.alarmSound === "bird" && pomodoroMinute === 0) {
        const birdSong = new Audio(bird);
        birdSong.play();
        setStart(false);
      } else if (st.alarmSound === "kictchen" && pomodoroMinute === 0) {
        const kitchenSong = new Audio(kitchn_bell);
        kitchenSong.play();
        setStart(false);
      } else if (promodoroSecound === 1) {
        st.promodoro = parseInt(st.promodoro - 1);
      } else if (shortBrackSecound === 1) {
        st.shortBrack = parseInt(st.shortBrack - 1);
      } else if (st.promodoro == 0) {
        setStart(false);
      } else if (longBrackSecound === 1) {
        st.longBrack = parseInt(st.longBrack - 1);
      } else if (
        st.tackingSound == "tackingSlow" &&
        start == true &&
        !st.promodoro == 0
      ) {
        watch.play();
        // watch.play();
      }else if(start == false){
        watch.pause();
      }else if (st.promodoro === 0) {
        setStart(false);
      }
    });
  }, [
    getSetting,
    pomodoroMinute,
    promodoroSecound,
    longBrackSecound,
    shortBrackSecound,
    start,
    
  ]);

  let zero;
  // pomodoro function section

  useEffect(() => {
    if (start) {
      // setpromodoroSecound(59)
      function startTime() {
        if(promodoroSecound <= 60 && promodoroSecound > 1){
        setpromodoroSecound(promodoroSecound - 1);
        }else if (promodoroSecound == 1) {
          setpromodoroSecound(60);
          setPromodoroMinute(pomodoroMinute - 1);
        }else if (pomodoroMinute == 0) {
          setStart(false);
        }
      }
      setTimeout(() => {
        startTime();
      }, 1000);
    }
  }, [pomodoroMinute, promodoroSecound, start]);
  
  // work pomodoro reset function
  const hendleWorkReset = () => {
    setStart(false);
    setTimeout(() => {
      setPromodoroMinute(25);
      setpromodoroSecound(60);
    }, 1000);
  };

  // short brack function section
  const [shortBrackStart, setShortBrackStart] = useState(false);
  useEffect(() => {
    if (shortBrackStart) {
      function startTime() {
        if(shortBrackSecound <= 60 && shortBrackSecound > 1){
          setShortBrackSecound(shortBrackSecound - 1)
        }else if (shortBrackSecound == 1) {
          setShortBrackSecound(60);
          setShortBrackMinute(shortBrackMinute - 1);
          
        }
      }
      setTimeout(() => {
        startTime();
      }, 1000);
    }
  }, [shortBrackMinute, shortBrackSecound, shortBrackStart]);
  // short brack reset function
  const hendleShortReset = () => {
    setShortBrackStart(false);
    setTimeout(() => {
      setShortBrackMinute(12);
      setShortBrackSecound(60);
    }, 1000);
  };

  // long brack funconality
  const [longBrackStart, setLongBrackStart] = useState(false);
  useEffect(() => {
    if (longBrackStart) {
      function startTime() {
        if(longBrackSecound <= 60 && longBrackSecound >1){
          setLongBrackSecound(longBrackSecound - 1);
        }else if (longBrackSecound == 1) {
          setLongBrackSecound(60);
          setLongBrackMinute(longBrackMinute - 1);
          
        }
      }
      setTimeout(() => {
        startTime();
      }, 1000);
    }
  }, [longBrackMinute, longBrackSecound, longBrackStart]);
  // long brack reset function
  const hendleLongReset = () => {
    setLongBrackStart(false);
    setTimeout(() => {
      setLongBrackMinute(15);
      setLongBrackSecound(60);
    }, 1000);
  };

  const getTask = props.task;
  const [schedule, setSchedule] = useState("promodoro");
  // localStorage.setItem("schedule", schedule);
  const root = document.getElementById("root");
  const changeBgColor = document.getElementById("change_bg_color");
  const changeAddTaskBg = document.getElementById("change_add_task_bg");
  if (schedule === "promodoro" && root && changeBgColor) {
    root.style.background = "#1A1E1D";
    changeBgColor.style.background = "#232625";
    changeAddTaskBg.style.background = "#232625";
  } else if (
    schedule == "shortbrack" &&
    root &&
    changeBgColor
  ) {
    root.style.background = "#4C9195";
    changeBgColor.style.background = "#5E9CA0";
    changeAddTaskBg.style.background = "#468589";
  } else if (schedule == "longbrack") {
    root.style.background = "#457CA3";
    changeBgColor.style.background = "#5889AC";
    changeAddTaskBg.style.background = "#457CA3";
  }


  return (
    <div className="mt-5">
      <div style={{height: '10rem' }} className="d-flex justify-content-center mb-5">
        <img src={pomodoro_logo} alt="" />
      </div>

      <div className="d-flex justify-content-center">
        <div id="change_bg_color" className="time_box">
          <div className="d-flex justify-content-around mt-2 btn_box">
            <button onClick={() => setSchedule("promodoro")} className="btn">
              Work
            </button>
            <button onClick={() => setSchedule("shortbrack")} className="btn">
              Short Break
            </button>
            <button onClick={() => setSchedule("longbrack")} className="btn">
              Long Break
            </button>
          </div>
          <div className="time d-flex justify-content-center mt-4">
            {schedule == "promodoro" ? (
              <h1 className="h1">
                {pomodoroMinute}:{zero}
                {promodoroSecound === 60 ? "00" : promodoroSecound <=9? "0" + promodoroSecound: promodoroSecound}
              </h1>
            ) : schedule == "shortbrack" ? (
              <h1>
                {shortBrackMinute}:{shortBrackSecound === 60? "00": shortBrackSecound <= 9? "0" + shortBrackSecound: shortBrackSecound}
              </h1>
            ) : schedule == "longbrack" ? (
              <h1>
                {longBrackMinute}:{longBrackSecound === 60? "00": longBrackSecound <= 9? "0" + longBrackSecound: longBrackSecound}
              </h1>
            ) : null}
          </div>
          <div className="d-flex justify-content-center mt-3">
            {start === false && schedule === "promodoro" ? (
              <button onClick={() => setStart(true)} className="learge_btn">
                START
              </button>
            ) : start === true ? (
              <div>
                <button
                  onClick={() => setStart(false)}
                  className="learge_btn_close"
                >
                  Stop
                </button>
                <img
                  onClick={hendleWorkReset}
                  className="reset"
                  src="https://pomofocus.io/icons/next-white3.png"
                  alt=""
                />
              </div>
            ) : shortBrackStart === false && schedule === "shortbrack" ? (
              <button
                onClick={() => setShortBrackStart(true)}
                className="learge_btn"
              >
                START
              </button>
            ) : shortBrackStart === true ? (
              <div>
                <button
                  onClick={() => setShortBrackStart(false)}
                  className="learge_btn_close"
                >
                  Stop
                </button>
                <img
                  onClick={hendleShortReset}
                  className="reset"
                  src="https://pomofocus.io/icons/next-white3.png"
                  alt=""
                />
              </div>
            ) : longBrackStart === false && schedule === "longbrack" ? (
              <div>
                <button
                  onClick={() => setLongBrackStart(true)}
                  className="learge_btn"
                >
                  START
                </button>
              </div>
            ) : longBrackStart === true ? (
              <div>
                {" "}
                <button
                  onClick={() => setLongBrackStart(false)}
                  className="learge_btn_close"
                >
                  Stop
                </button>
                <img
                  onClick={hendleLongReset}
                  className="reset"
                  src="https://pomofocus.io/icons/next-white3.png"
                  alt=""
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <p>#1</p>
      </div>
      <div className="d-flex justify-content-center">
        {/* {getTask.map((item) =>
          item.id == localStorage.getItem("taskId") ? <p>{item.name}</p> : null
        )} */}
      </div>
      <div className="d-flex justify-content-center">
        <div className="task_head">
          <div className="d-flex justify-content-between">
            <h3 className="c_white">Task</h3>
            <button className="btn btn_bg">
              <img
                className="logo_icon"
                src="https://pomofocus.io/icons/threedots-white.png"
                alt=""
              />{" "}
            </button>
          </div>
        </div>
      </div>
      {getTask.map((item) => (
        <TaskList item={item}></TaskList>
      ))}
    </div>
  );
};
function mapToStateProps(state) {
  return {
    task: state.allTask,
    settingValue: state.settingUpdate,
  };
}
export default connect(mapToStateProps, null)(MainTime);
