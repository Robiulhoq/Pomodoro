import { ADD_TASK, ADD_USER_EMAIL, REMOVE_TASK, UPDATE_SETTING } from "./Action"

const initialState = {
    allTask: [],
    settingUpdate: [],
    loginEmail:[]
}

// console.log(initialState.allTask);
export const reducer = (state= initialState, action) =>{
    switch(action.type){
        case ADD_TASK:
            const newTask  = action.taskInfo;
            const setNewTask = [...state.allTask, newTask];
            return {
                ...state,
                allTask: setNewTask
            }
        case REMOVE_TASK:
            const removeTaskId = action.id;
            const removeTask = state.allTask.filter(item => item.id !== removeTaskId);
            return{
                ...state,
                allTask: removeTask
            }    
        case UPDATE_SETTING:
            const newSetting = action.updateInfo;
            const setNewSetting = [...state.settingUpdate, newSetting];
            return {
                ...state,
                settingUpdate: setNewSetting
            }   
        case ADD_USER_EMAIL:
            const newEmail = action.email;
            console.log(newEmail);
            return{
                ...state,
                loginEmail: newEmail
            }     

            default: return state;
    }



}