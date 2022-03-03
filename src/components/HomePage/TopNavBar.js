import React, { useState } from "react";
import logo_icon from "../../image/icon-white.png";
import Popup from "reactjs-popup";
import { connect } from "react-redux";
import { addUserEmail, updateSetting } from "../StateManager/Action";
import { Link } from "react-router-dom";
import user from "../../image/user.png";


const TopNavBar = (props) => {
  
  const [setting, setSetting] = useState({
    promodoro: 25,
    shortBrack: 5,
    longBrack: 15,
    autoStartBrack: false,
    autoStartPromodoro: false,
    longBrackInterval: 4,
    alarmSound: "bell",
    repeat: 4,
    tackingSound: "none",
  });
  console.log(setting);
  const hendleBlur = (e) => {
    const newSetting = { ...setting };
    newSetting[e.target.name] = e.target.value;
    // newSetting[e.target.checked] = e.target.value;
    setSetting(newSetting);
  };
  const hendleSwitch = (e) => {
    const newSwitchValue = { ...setting };
    let isChacked = e.target.checked;
    newSwitchValue.autoStartBrack = isChacked;
    setSetting(newSwitchValue);
  };
  const hendleSwitchPromodoro = (e) => {
    const newSwitchValue = { ...setting };
    let isChacked = e.target.checked;
    newSwitchValue.autoStartPromodoro = isChacked;
    setSetting(newSwitchValue);
  };
  const hendleSetSetting = () => {
    props.settingInfo(setting);
  };
  const loginUserEmail = props.stateEmail;
  console.log("tobar", loginUserEmail);
 
  return (
    <div style={{backgroundColor: '#232625'}} className="d-flex justify-content-center top_navbar">
      {/* <div className="logo_container">
        <a href="">
          <img className="logo_icon" src={logo_icon} alt="" />
          Pomodoro
        </a>
      </div> */}
      <div className="d-flex">
        <div>
          <Link to='/report'><button id="change_btn_bg" className="btn btn_bg">
            {" "}
            <span>
              <img
                className="logo_icon"
                src="https://pomofocus.io/icons/graph-white.png"
                alt=""
              />
            </span>{" "}
            Report
          </button></Link>
        </div>
        <div>
          <Popup
            trigger={<button className="btn btn_bg">Setting</button>}
            position="bottom right"
          >
            {(close) => (
              <div className="setting_popup">
                <h4 className="p-2 light_gray">TIMER SETTING</h4>
                <div className="underline_two"></div>
                <h6 className="p-2">Time (minutes)</h6>
                <div className="d-flex justify-content-between">
                  <div>
                    <p className="light_gray">Pomodoro</p>
                    <input
                      name="promodoro"
                      onChange={hendleBlur}
                      defaultValue={setting.promodoro}
                      className="setting_input "
                      type="number"
                    />
                  </div>
                  <div>
                    <p className="light_gray">Short Brack</p>
                    <input
                      name="shortBrack"
                      onChange={hendleBlur}
                      defaultValue={setting.shortBrack}
                      className="setting_input"
                      type="number"
                    />
                  </div>
                  <div>
                    <p className="light_gray">Long Brack</p>
                    <input
                      name="longBrack"
                      onChange={hendleBlur}
                      defaultValue={setting.longBrack}
                      className="setting_input"
                      type="number"
                    />
                  </div>
                </div>
                <div className="underline_two mt-2"></div>
                <div class="d-flex justify-content-between pt-2">
                  <h6>Auto Start Breaks?</h6>
                  <label class="switch">
                    <input onChange={hendleSwitch} type="checkbox" />
                    <span class="slider round"></span>
                  </label>
                </div>
                <div className="underline_two mt-2"></div>
                <div class="d-flex justify-content-between pt-2">
                  <h6>Auto Start Pomodoros?</h6>
                  <label class="switch">
                    <input onChange={hendleSwitchPromodoro} type="checkbox" />
                    <span class="slider round"></span>
                  </label>
                </div>
                <div className="underline_two mt-2"></div>
                <div class="d-flex justify-content-between pt-2">
                  <h6>Long Break interval</h6>
                  <input
                    name="longBrackInterval"
                    onChange={hendleBlur}
                    className="setting_input"
                    type="number"
                  />
                </div>
                <div className="underline_two mt-2"></div>
                <div class="d-flex justify-content-between pt-2">
                  <h6>Alarm Sound</h6>
                  <div className="input-group mb-3 option_input">
                    <select
                      onChange={hendleBlur}
                      name="alarmSound"
                      className="form-select setting_input"
                      id="inputGroupSelect02"
                    >
                      <option selected value="bell">
                        Bell
                      </option>
                      <option value="bird">Bird</option>
                      <option value="digital">Digital</option>
                      <option value="kictchen">Kictchen</option>
                      <option value="wood">Wood</option>
                    </select>
                    <progress
                      id="progBar"
                      className="pt-2"
                      value="50"
                      max="100"
                    ></progress>
                    <div className="d-flex pt-3">
                      <p>Repeat</p>
                      <input
                        name="repeat"
                        onChange={hendleBlur}
                        className="setting_input"
                        type="number"
                      />
                    </div>
                  </div>
                </div>
                <div className="underline_two mt-2"></div>
                <div class="d-flex justify-content-between pt-2">
                  <h6>Ticking Sound</h6>
                  <div className="input-group mb-3 option_input">
                    <select
                      name="tackingSound"
                      onChange={hendleBlur}
                      class="form-select setting_input"
                      id="inputGroupSelect02"
                    >
                      <option value="None">None</option>
                      <option value="tickingFast">Ticking Fast</option>
                      <option value="tackingSlow">Ticking Slow</option>
                    </select>
                    <progress
                      id="progBar"
                      className="pt-2"
                      value="50"
                      max="100"
                    ></progress>
                  </div>
                </div>
                <div class="d-flex justify-content-center">
                <button onClick={hendleSetSetting} className="btn btn_save">
                  Save
                </button>
                </div>
                
                {/* <a className="close" onClick={close}>
                  &times;
                </a> */}
              </div>
            )}
          </Popup>
        </div>
        <div>
          {loginUserEmail.length ? (
            <Popup
              trigger={
                <button className='btn'>
                  <img className="logo_icon" src="https://pomofocus.io/icons/user-white.png" alt="" />
                </button>
              }
              position="bottom center"
            >
              <div>
                <h5 className='email_text'>{loginUserEmail}</h5>
              </div>
            </Popup>
          ) : (
            <Link to="/login">
              <button id="change_btn_bg" className="btn btn_bg">
                {" "}
                <span>
                  <img
                    className="logo_icon"
                    src="https://pomofocus.io/icons/user-white.png"
                    alt=""
                  />
                </span>{" "}
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
function mapToDispatch(dispatch) {
  return {
    settingInfo: (info) => {
      dispatch(updateSetting(info));
    },
    setLogOut: (logOut) =>{
      dispatch(addUserEmail(logOut))
    }
  };
}
function mapToStateProps(state) {
  return {
    stateEmail: state.loginEmail,
  };
}
export default connect(mapToStateProps, mapToDispatch)(TopNavBar);
