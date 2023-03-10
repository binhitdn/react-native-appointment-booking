import axios from '../axios'
let handleLoginApi = (userEmail, userPassword) => {
    return axios.post('api/login', { email: userEmail, password: userPassword})

}
let handleCreateUserApi = (user) => {
    return axios.post('/api/create-new-user', user)
}
let getUserByIdApi = (id) => {
    return axios.get(`/api/get-all-users?id=${id}`)
}
let getPatientIdByUserIdApi = (id) => {
    return axios.get(`/api/get-id-patient-by-id-user?id=${id}`)
}
let editUserApi = (user) => {
    return axios.put(`/api/edit-user`, user)

}
let changePasswordApi = (user) => {
    return axios.put(`/api/change-password`, user)
}

export { handleLoginApi,handleCreateUserApi,getUserByIdApi,getPatientIdByUserIdApi,editUserApi,changePasswordApi }