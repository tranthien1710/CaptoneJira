import { produce } from 'immer';
import { actionLogin } from './type';
const initailState = {
    profile: null,
}

const reduce = (state = initailState, { type, payload }) => {
    return produce(state, draft => {
        switch (type) {
            case actionLogin.SET_PROFILE:
                draft.profile = payload;
                break
            default:
                break;
        }
    })
}

export default reduce;