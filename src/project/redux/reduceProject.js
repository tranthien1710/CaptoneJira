import { actionTypeProject } from "./type";

const { default: produce } = require("immer")

const initailState = {
    listProject: [],
    flagDraw: false,
    contentDraw: <p>co len</p>,
    titleDraw: null,
    detailProject: null,
    onSearch: [],
    projectDetail: [],
    TaskType: [],
    Priority: [],
    Status: [],
    TaskDetail: [],
}

const reduce = (state = initailState, { type, payload }) => {
    return produce(state, draft => {
        switch (type) {
            case actionTypeProject.SET_lIST_PROJECT:
                draft.listProject = payload;
                break;
            case actionTypeProject.SET_OPEN_DRAW:
                draft.flagDraw = true;
                break;
            case actionTypeProject.SET_CLOSE_DRAW:
                draft.flagDraw = false;
                break;
            case actionTypeProject.SET_EDIT_FORMPROJECT:
                draft.flagDraw = true;
                draft.contentDraw = payload.fromedit;
                draft.detailProject = payload.listproject;
                draft.titleDraw = payload.titleDraw
                break;
            case actionTypeProject.SET_USERS:
                draft.onSearch = payload;
                break;
            case actionTypeProject.SET_PROJECT_DETAIL:
                draft.projectDetail = payload;
                break;
            case actionTypeProject.SET_TASK_TYPE:
                draft.TaskType = payload;
                break;
            case actionTypeProject.SET_PRIORITY:
                draft.Priority = payload;
                break;
            case actionTypeProject.SET_STATUS:
                draft.Status = payload;
                break;
            case actionTypeProject.SET_TASK_DETAIL:
                draft.TaskDetail = payload;
                break;
            case actionTypeProject.SET_OPEN_CREATE_TASK:
                draft.flagDraw = true;
                draft.contentDraw = payload.content;

                draft.titleDraw = payload.titledraw
                break;
            default:
                break;
        }
    })
}

export default reduce;