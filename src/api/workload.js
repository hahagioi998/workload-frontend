import request from '../utils/request';
const BaseUrl = "http://localhost:8999/api";

export const getAllProject = (pageIndex, pageSize) => {
    console.log(pageIndex)
    return request({
        url: BaseUrl + "/all/project/lists?pageIndex=" + pageIndex + "&pageSize=" + pageSize,
        method: "GET"
    })
}