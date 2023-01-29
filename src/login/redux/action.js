import { actionLogin } from "./type"

const { default: requestAPI } = require("app/CallApi")
const { PATH_API } = require("app/PathAPi")


//sign action
export const fetchSignAction = (data) => {
    return async (next) => {
        try {
            const res = await requestAPI({
                method: 'POST',
                url: PATH_API.LINK_SIGN,
                data: data
            })
            alert(res.data.message)
        } catch (error) {
            throw (error)
        }
    }
}
//action login
export const fetchLoginAction = (data) => {
    return async (next) => {
        try {
            const res = await requestAPI({
                url: PATH_API.LINK_LOGIN,
                method: 'POST',
                data: data
            })
            next({
                type: actionLogin.SET_PROFILE,
                payload: res.data.content
            })
            localStorage.setItem('token', res.data.content.accessToken);
            localStorage.setItem('user', JSON.stringify(res.data.content))
        } catch (error) {
            throw (error)

        }
    }
}
