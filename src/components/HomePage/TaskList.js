import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { addTask, removeTask } from "../StateManager/Action";

const TaskList = (props) => {
  const { name, number, note, id } = props.item;
  const [edit, setEdit] = useState(false);
  const getid = (id) => {
    localStorage.setItem("taskId", id);
  };

  const [addTote, setAddNote] = useState(false);
  const [addTaskInfo, setAddTaskInfo] = useState({
    id: "",
    name: "",
    number: parseInt(number),
    note: "",
  });
  console.log(addTaskInfo);
  const hendleBlur = (e) => {
    const newTask = { ...addTaskInfo };
    if (e.target.name === "name") {
      newTask.id = Math.floor(Math.random() * 10000);
      setAddTaskInfo(newTask)
    }
    newTask[e.target.name] = e.target.value;
    setAddTaskInfo(newTask);
  };
  const hendleUpdate = () => {
    if (!addTaskInfo.name == "" && !addTaskInfo.number == "") {
      props.taskRemove(id);
      props.addTask(addTaskInfo);
      setEdit(false);
    }
  };
  const hendleIncrement = () => {
    setAddTaskInfo(privious=>{return {
      ...privious, number: privious.number + 1
    }})
  };
  const hendleDrcrement = () => {
    setAddTaskInfo(privious=>{return {
      ...privious, number: privious.number - 1
    }})
  };

useEffect(()=>{
  const task = document.querySelectorAll(".add_task_list");
  task.forEach(element => {
    element.addEventListener('click', ()=>{
      const current = document.getElementsByClassName('task_head_active')
      if(current !== undefined || current !== null){
        current[0].className = current[0].className.replace("task_head_active", " ")
      }
      element.classList.add("task_head_active")
      
    })
  })

},[])
 
  
  return (
    <div onClick={() => getid(id)} className="d-flex justify-content-center">
      {edit === false ? (
        <div
          id="task"
          className="task_head "
        >
          <div className="underline mt-2"></div>
          <div className="add_task_list task_head_active mt-2 d-flex justify-content-between">
            <h5 className="p-3">
              {name}
            </h5>
            <div className="d-flex">
              <p>{number}</p>
              <button
                onClick={() => setEdit(true)}
                className="btn btn_light_bg m-2"
              >
                
                <img
                  className="logo_icon"
                  src="https://pomofocus.io/icons/threedots-white.png"
                  alt=""
                />{" "}
              </button>
            </div>
          </div>
          <div></div>
        </div>
      ) : (
        <div className="add_task_form">
          <input
            onBlur={hendleBlur}
            className="add_task_input"
            name="name"
            type="text"
            defaultValue={name}
          />
          <p className="add_task_input">Est Pomodoros</p>
          <div className="d-flex mt-3 increment_field justify-content-start">
            <input
              onChange={hendleBlur}
              name="number"
              className="setting_input"
              type="number"
              value={addTaskInfo.number}
            />
            <button onClick={hendleIncrement} className="btn">+</button>
            <button onClick={hendleDrcrement} className="btn">-</button>
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
                  defaultValue={note}
                ></textarea>
              </div>
            ) : null}
          </div>
          <div className="submit_field d-flex justify-content-end">
            <button
              onClick={() => props.taskRemove(id)}
              className="btn btn-danger"
            >
              Delete
            </button>
            <button onClick={() => setEdit(false)} className="btn">
              Cencel
            </button>
            <button onClick={hendleUpdate} className="btn btn-dark">
              Save
            </button>
          </div>
        </div>
      )}
 
    </div>
  );
};
function mapToStateDispatch(dispatch) {
  return {
    taskRemove: (id) => {
      dispatch(removeTask(id));
    },
    addTask: (info) => {
      dispatch(addTask(info));
    },
  };
}

export default connect(null, mapToStateDispatch)(TaskList);
