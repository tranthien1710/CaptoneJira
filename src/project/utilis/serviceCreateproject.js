const { default: requestAPI } = require("app/CallApi")
const { PATH_API } = require("app/PathAPi")


export const GetProjectCategory = async () => {
    try {
        const res = await requestAPI({
            method: "GET",
            url: PATH_API.LINK_CATEGORY_PROJECT,
        })
        return res
    } catch (error) {
        console.log(error)
    }
}