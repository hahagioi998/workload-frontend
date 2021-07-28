import request from '../utils/request';

export const BASE_URL = "http://localhost:8999/api";

/**
 * 分页获取所有项目
 * @param pageIndex
 * @param pageSize
 * @returns {AxiosPromise}
 */
export const getProjects = () => {
    return request({
        url: BASE_URL + "/project/list"
    });
};


export const getEarlyData = (startDate, endDate, userid) => {
    return request({
        url: BASE_URL + "/early-data?startDate=" + startDate + "&endDate=" + endDate + "&userid=" + userid
    })
}
