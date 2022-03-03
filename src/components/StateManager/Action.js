export const ADD_TASK = 'ADD_TASK';
export const REMOVE_TASK = 'REMOVE_TASK';
export const UPDATE_SETTING = 'UPDATE_SETTING';
export const ADD_USER_EMAIL = 'ADD_USER_EMAIL';
export const addTask = (taskInfo) =>{
    return {type: ADD_TASK, taskInfo}
} 
export const removeTask = (id) =>{
    return {type: REMOVE_TASK, id}
}
export const updateSetting = (updateInfo) =>{
    return {type: UPDATE_SETTING, updateInfo}
}
export const addUserEmail = (email) =>{
    return{type: ADD_USER_EMAIL, email}
}
