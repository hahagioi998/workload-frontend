import request from '../utils/request';

export const fetchData = query => {
    return request({
        url: './table.json',
        method: 'get',
        params: query
    });
};

/**
 * 分页查询文章列表
 * @param pageIndex
 * @param pageSize
 * @returns {AxiosPromise}
 */
export const getArticles = (pageIndex, pageSize) => {
    return request({
        url: "http://localhost:8090/api/admin/article/get/articles?pageIndex=" + pageIndex + "&pageSize=" + pageSize,
        method: "GET"
    });
};

/**
 * 通过id获取文章详情
 * @param id
 * @returns {AxiosPromise}
 */
export const getArticeById = (id) => {
    return request({
        url: "http://localhost:8090/api/admin/article/get?id=" + id,
        method: "GET"
    })
};

/**
 * 根据id删除文章
 * @param id
 * @returns {AxiosPromise}
 */
export const deleteArticleById = (id) => {
    return request({
        url: "http://localhost:8090/api/admin/article/delete?id=" + id,
        method: "POST"
    })
};

export const getCategories = (pageIndex, pageSize) => {
    return request({
        url: "http://localhost:8090/api/admin/category/get/categories?pageIndex=" + pageIndex + "&pageSize=" + pageSize,
    })
};
