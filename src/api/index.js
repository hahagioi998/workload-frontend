import request from '../utils/request';

export const fetchData = query => {
    return request({
        url: './table.json',
        method: 'get',
        params: query
    });
};

export const BASE_URL = "http://localhost:8999/api";

/**
 * 查询所有用户
 * @returns {AxiosPromise}
 */
export const getAllUser = () => {
    return request({
        url: "http://localhost:8999/api/admin/user/all",
        method: "GET"
    })
};


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

export const getRoles = () => {
    return request({
        url: "http://localhost:8999/api/admin/user/role",
        method: "GET"
    })
}


export const insertWorkRole = (roleName) => {
    return request({
        url: "http://localhost:8999/api/admin/user/work-role?name=" + roleName,
        method: "POST"
    })
}