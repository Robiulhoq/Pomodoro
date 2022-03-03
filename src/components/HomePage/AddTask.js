import React, { useState } from "react";
import Popup from "reactjs-popup";
import "./HomePage.css";
import { connect } from "react-redux";
import { addTask } from "../StateManager/Action";
import up_arrow from "../../image/up_arrow.png";
import down_arrow from "../../image/down_arrow.png";

const AddTask = (props) => {
  const [addTote, setAddNote] = useState(false);
  const date = new Date();
  const formatingDate = date.toLocaleDateString("ba-BD");
  const [addTaskInfo, setAddTaskInfo] = useState({
    id: "",
    name: "",
    number: 1,
    note: "",
    time: "25",
    date: formatingDate,
  });
  console.log(addTaskInfo);
  const hendleBlur = (e) => {
    const newTask = { ...addTaskInfo };
    if (e.target.name === "name") {
      console.log("i am in");
      newTask.id = Math.floor(Math.random() * 10000 );
      setAddTaskInfo(newTask)
    } else if (props.time.length) {
      for (let i = 0; i < props.time.length; i++) {
        const element = props.time[i];
        newTask.time = element.promodoro;
      }
    }
    newTask[e.target.name] = e.target.value;
    setAddTaskInfo(newTask);
  };
  const hendleIncrement = () => {
    setAddTaskInfo(privious=>{return {
      ...privious, number: privious.number + 1
    }})
    // hendleBlur()
  };

  const hendleDrcrement = () => {
    setAddTaskInfo(privious=>{return {
      ...privious, number: privious.number - 1
    }})
  };

  const loginEmail = props.email;
  const task = { ...addTaskInfo, loginEmail };

  const hendleSave = () => {
    props.addTask(addTaskInfo);
    if (loginEmail.length) {
      fetch("http://localhost:5000/addTask", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(task),
      });
    }
  };
  return (
    <div className="d-flex justify-content-center task_head add_tasK_button_container">
      <Popup
        trigger={
          <button id="change_add_task_bg" className="add_task_btn mt-2">
            Add Task
          </button>
        }
        position="center center"
      >
        <div className="add_task_form">
          <input
            onBlur={hendleBlur}
            className="add_task_input"
            name="name"
            type="text"
            placeholder="What are you working on?"
          />
          <p className="add_task_input">Est Pomodoros</p>
          <div className="d-flex mt-3 increment_field justify-content-start">
            <input
              name="number"
              onChange={hendleBlur}
              value={addTaskInfo.number}
              className="setting_input"
              type="text"
            />
            <button
              onClick={hendleIncrement}
              className="btn increment_btn"
            >
              <span>
                <img className="arrow_icon" src={up_arrow} alt="" />
              </span>
            </button>
            <button onClick={hendleDrcrement} className="btn increment_btn">
              <span>
                <img className="arrow_icon" src={down_arrow} alt="" />
              </span>
            </button>
          </div>
          <div>
            <button onClick={() => setAddNote(true)} className="btn">
              + Add Note
            </button>
            {addTote === true ? (
              <div className="form-group m-2">
                <textarea
                  name="note"
                  onBlur={hendleBlur}
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="2"
                ></textarea>
              </div>
            ) : null}
          </div>
          <div className="submit_field d-flex justify-content-end">
            <button className="btn">Cencel</button>
            <button onClick={hendleSave} className="btn btn-dark">
              Save
            </button>
          </div>
        </div>
      </Popup>

      {/* <div className="add_task_list mt-2 d-flex justify-content-around mb-5">
            <h5 className="p-3">Est</h5>
            <h5 className="p-3">Act</h5>
            <h5 className="p-3">Finish at</h5>
          </div> */}
    </div>
  );
};
function mapToStateDispatch(dispatch) {
  return {
    addTask: (info) => {
      dispatch(addTask(info));
    },
  };
}
function mapToStateProps(state) {
  return {
    time: state.settingUpdate,
    email: state.loginEmail,
  };
}

export default connect(mapToStateProps, mapToStateDispatch)(AddTask);
