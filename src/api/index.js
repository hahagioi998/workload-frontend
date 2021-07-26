import request from '../utils/request';

export const fetchData = query => {
    return request({
        url: './table.json',
        method: 'get',
        params: query
    });
};

// 前台页面的接口

/**
 * 分页查询文章列表
 * @param pageIndex
 * @param pageSize
 * @returns {AxiosPromise}
 */
// export const getArticles = (pageIndex, pageSize) => {
//     return request({
//         url: "http://localhost:8090/api/admin/article/get/articles?pageIndex=" + pageIndex + "&pageSize=" + pageSize,
//         method: "GET"
//     });
// };

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
        url: "http://localhost:8999/api/project/list"
    });
};

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