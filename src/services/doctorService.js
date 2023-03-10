import axios from "../axios";

let handleSaveInforDoctorsApi = (doctor) => {
    return axios.post('/api/save-infor-doctors', doctor)
}
let handleGetDoctorByIdApi = (id) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${id}`)
}
let handleGetTopDoctorApi = () => {
    return axios.get('/api/top-docter-home')
}
let handleGetDoctorByIdDoctorApi = (id) => {
    return axios.get(`/api/get-detail-doctor-by-id-doctor?id=${id}`)
}
let handleGetDoctorBySpecialtyApi = (id) => {
    return axios.get(`/api/get-detail-doctor-by-specialty?id=${id}`)
}
let handleGetIdDoctorByIdUserApi = (id) => {
    return axios.get(`/api/get-id-doctor-by-id?id=${id}`)
}
let bulkCreateScheduleApi = (data) => {
    return axios.post('/api/bulk-create-schedule', data)
}
let handleGetScheduleByDateApi = (id,date) => {
    return axios.get('/api/get-schedule-doctor-by-date?doctorId='+id+'&date='+date)
}
let handleCreateNewReviewApi = (data) => {
    return axios.post('/api/create-new-reviewer-booking', data)
}
let handleEditReviewApi = (data) => {
    return axios.put('/api/edit-reviewer-booking', data)
}
let handleGetReviewByDoctorIdApi = (id) => {
    return axios.get('/api/get-reviews-booking?doctorId='+id)
}
let countViewDoctorApi = (id) => {
    return axios.post('/api/view-doctor?doctorId='+id)
}
let handleGetIncomeDoctorApi = (id) => {
 
    return axios.get('/api/get-caclulate-income-doctor?doctorId='+id+'&month='+(new Date().getMonth() +1));
}
let handleGetIncomeAllDoctorApi = (month) => {
    return axios.get('/api/get-all-income-doctor?month='+month);
}
export { handleSaveInforDoctorsApi , handleGetDoctorByIdApi ,handleGetTopDoctorApi,handleGetDoctorByIdDoctorApi,handleGetDoctorBySpecialtyApi,handleGetIdDoctorByIdUserApi,bulkCreateScheduleApi,handleGetScheduleByDateApi,handleCreateNewReviewApi,handleGetReviewByDoctorIdApi,countViewDoctorApi,handleGetIncomeDoctorApi,handleGetIncomeAllDoctorApi,handleEditReviewApi}