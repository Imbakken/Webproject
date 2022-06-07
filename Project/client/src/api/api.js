import axios from 'axios';
//creating routes for public, employees and admins to the back end with axios
const all = axios.create({
    baseURL:  'http://localhost:5000/all',
});
const employee = axios.create({
    baseURL: 'http://localhost:5000/employee',
});
const admin = axios.create({
    baseURL: 'http://localhost:5000/admin',
});

//sending request to back end with payload, headers for the protected routes, and id where needed
export const insertUser = payload => all.post(`/user`, payload);
export const login = payload => all.post(`/login`, payload);
export const forgotPassword = payload => all.post(`/forgotpassword`,payload);
export const resetPassword = payload => all.get(`/reset`, payload);
export const updatePasswordViaEmail = payload => all.patch(`/updatePasswordViaEmail`, payload);
export const getUserById = (headers, id) => all.get(`/user/${id}`, headers);

export const getAllJobs = () => employee.get(`/jobs`);
export const getJobById = id => employee.get(`/job/${id}`);
export const updateJobById = (id, payload) => employee.patch(`/job/${id}`, payload);
export const updateUserById = (headers, id, payload) => employee.patch(`/user/${id}`, payload, headers);
export const deleteJobById = (headers, id) => employee.delete(`/job/${id}`, headers);
export const insertJob = (headers, payload) => employee.post(`/job`, payload, headers);

export const getAllUsers = headers => admin.get(`/users`, headers);
export const deleteUserById = (headers, id) => admin.delete(`/user/${id}`, headers);


const apis = {
    insertUser,
    insertJob,
    getAllUsers,
    getAllJobs,
    updateUserById,
    updateJobById,
    deleteUserById,
    deleteJobById,
    getUserById,
    getJobById,
    login,
    forgotPassword,
    resetPassword,
    updatePasswordViaEmail,
};

export default apis;