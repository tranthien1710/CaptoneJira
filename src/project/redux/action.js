import { notification } from "antd"
import notifiComponent from "project/component/notifiComponent"
import { actionTypeProject } from "./type"

const { default: requestAPI } = require("app/CallApi")
const { PATH_API } = require("app/PathAPi")

//tao project
export const fetchCreateProjectAction = (data) => {
    return async (next) => {
        try {
            const res = await requestAPI({
                method: "POST",
                url: PATH_API.LINK_CREATE_PROJECT,
                data: data
            })

        } catch (error) {
            throw (error)
        }
    }
}
//lay all project
export const fetchGetAllProjectAction = async (next) => {
    try {
        const res = await requestAPI({
            method: 'GET',
            url: PATH_API.LINK_GET_ALL_PROJECT,
        })
        next({
            type: actionTypeProject.SET_lIST_PROJECT,
            payload: res.data.content
        })
    } catch (error) {
        console.log(error)
    }
}
//action edit project
export const fetchEditProjectAction = (id, value) => {
    return async (next) => {
        try {
            const res = await requestAPI({
                method: 'PUT',
                url: PATH_API.LINK_EDIT_PROJECT,
                params: {
                    projectId: id
                },
                data: value
            })
            notifiComponent('success', 'Edit success !');
        } catch (error) {
            console.log(error)
        }
    }
}
//aciton chi tiet project
export const fetchDetailAction = (ma) => {
    return async (next) => {
        try {
            const res = await requestAPI({
                method: 'get',
                url: '/api/Project/getProjectDetail',
                params: {
                    id: ma
                }
            })
            next({
                type: actionTypeProject.SET_PROJECT_DETAIL,
                payload: res.data.content
            })
        } catch (error) {
            console.log(error)
        }
    }
}

// delete project
export const fetchDeleteProjectAction = (id) => {
    return async (next) => {
        try {
            const res = await requestAPI({
                method: "DELETE",
                url: PATH_API.LINK_DELETE_PROJECT,
                params: {
                    projectId: id
                }
            })
            notifiComponent('success', 'Delete project success !');
        } catch (error) {
            console.log(error)
        }
    }
}
//action lay users
export const fetchGetUsersAction = (id) => {
    return async (next) => {
        try {
            const res = await requestAPI({
                method: 'get',
                url: PATH_API.LINK_GET_USERS,
                params: {
                    keyword: id
                }
            })
            next({
                type: actionTypeProject.SET_USERS,
                payload: res.data.content
            })

        } catch (error) {
            console.log(error)
        }
    }
}
//add user vao project
export const fetchAddUserProject = (dataa) => {
    return async (next) => {
        try {
            const res = await requestAPI({
                method: 'POST',
                url: PATH_API.LINK_ADD_USER_PROJECT,
                data: dataa
            })
            notifiComponent('success', 'Add user success !');
        } catch (error) {
            alert(error.response.data.message)
        }
    }
}
//action xoa user tu project
export const fetchDeleteUserFromProjectAction = (data) => {
    return async (next) => {
        try {
            const res = await requestAPI({
                method: 'POST',
                url: PATH_API.LINK_REMOVE_USER_FROM_PROJECT,
                data: data
            })
            notifiComponent('success', 'Delete user success !');
        } catch (error) {
            alert(error.response.data.message)
        }
    }
}
//test token 
export const fetchTestTokenActtion = async (next) => {
    try {
        const res = await requestAPI({
            url: PATH_API.LINK_TEST_TOKEN,
            method: "POST"
        })
        console.log(res.data)
    } catch (error) {
        console.log(error)
    }
}
//get all task type action
export const fetchGetAllTaskTypeAction = async (next) => {
    try {
        const res = await requestAPI({
            method: "Get",
            url: PATH_API.LINK_TASK_TYPE
        })
        next({
            type: actionTypeProject.SET_TASK_TYPE,
            payload: res.data.content
        })
    } catch (error) {
        console.log(error)
    }
}

//GET PRIORYTY
export const fetchGetPriorityAction = async (next) => {
    try {
        const res = await requestAPI({
            method: 'GET',
            url: PATH_API.LINK_GET_PRIORITY
        })
        next({
            type: actionTypeProject.SET_PRIORITY,
            payload: res.data.content
        })
    } catch (error) {
        console.log(error)
    }
}
//create task
export const fetchCreateTaskAction = (value) => {
    return async (next) => {
        try {
            const res = await requestAPI({
                method: 'post',
                url: PATH_API.LINK_CREATE_TASK,
                data: value
            })
            notifiComponent('success', 'Create task success !');
        } catch (error) {
            notifiComponent('error', 'Create task Error !');
            console.log(error)

        }
    }
}

//lấy dnash sách status
export const fetchGetStatusAction = async (next) => {
    try {
        const res = await requestAPI({
            method: 'GET',
            url: PATH_API.LINK_GET_STATUS
        })
        next({
            type: actionTypeProject.SET_STATUS,
            payload: res.data.content
        })
    } catch (error) {
        console.log(error)
    }
}
//action lấy user theo project id
export const fetchProjectIdAction = (value) => {
    return async (next) => {
        try {
            const res = await requestAPI({
                method: "GET",
                url: PATH_API.LINK_GET_PROJECT_ID,
                params: {
                    idProject: value
                }
            })
            next({
                type: actionTypeProject.SET_USERS,
                payload: res.data.content
            })
        } catch (error) {
            console.log(error)
        }
    }
}

//lây tast chi tiết \

export const fetchTaskDetailAction = (value) => {
    return async (next) => {
        try {
            const res = await requestAPI({
                method: "GET",
                url: PATH_API.LINK_TASK_DETAIL,
                params: {
                    taskId: value
                }
            })
            next({
                type: actionTypeProject.SET_TASK_DETAIL,
                payload: res.data.content
            })
        } catch (error) {
            console.log(error)
        }
    }
}

//action update task
export const fetchUpdateTaskAction = (value) => {
    return async (next) => {
        try {
            const res = await requestAPI({
                method: "post",
                url: PATH_API.LINK_UPDATE_TASK,
                data: value
            })
            notifiComponent('success', 'Update task success !');
        } catch (error) {
            console.log(error)
        }
    }
}

//action update description
export const fetchUpdateDesCripAction = (value) => {
    return async (next) => {
        try {
            const res = await requestAPI({
                method: 'PUT',
                url: '/api/Project/updateDescription',
                data: value
            })
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }
}
// xoá user khõi task
export const fetchRemoUserTaskAction = (value) => {
    return async (next) => {
        try {
            const res = await requestAPI({
                method: 'POST',
                url: '/api/Project/removeUserFromTask',
                data: value
            })
            notifiComponent('success', 'Update task success !');
        } catch (error) {
            console.log(error)
        }
    }
}
//update project status

export const fetchUpdateProjectStatusAction = (value) => {
    return async (next) => {
        try {
            const res = await requestAPI({
                method: 'PUT',
                url: PATH_API.LINK_UPDATE_STATUS,
                data: value
            })
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }
}