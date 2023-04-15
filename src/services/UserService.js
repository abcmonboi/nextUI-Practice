import axiosConfig from "./axios";
const fetchAllUsers = (page) => {
    return  axiosConfig.get(`/users?page=${page}`);
}

const postCreateUser = (name,job) => {
    return axiosConfig.post(`/users`, {name,job});
}
const putUpdateUser = (name,job) => {
    return axiosConfig.put(`/users/`,{name,job});
}
const deleteUser = (id) => {
    return axiosConfig.delete(`/users/${id}`);
}
const loginApi = (email,password) => {
    return axiosConfig.post(`/login`,{email,password});
}
export { fetchAllUsers , postCreateUser,putUpdateUser,deleteUser,loginApi}