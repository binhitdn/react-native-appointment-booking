import axios from '../axios'

let handleBookingApi = (data) => {
    return axios.post('/api/patient-book-appointment', data)
}
let handleGetBookingApi = (status,doctorId) => {
    return axios.get('/api/get-all-booking?status='+status+'&doctorId='+doctorId);
}
let handleGetBookingForPatientApi = (patientId) => {
    return axios.get('/api/get-booking-for-patient?patientId='+patientId);
}
let handleGetCountBookingByDoctorApi = (doctorId,statusId) => {
    return axios.get('/api/get-booking-for-doctor?doctorId='+doctorId+'&statusId='+statusId);
}
let handleComfirmBookingApi = (id) => {
    return axios.get('/api/edit-booking-comfirm?id='+id);
}
let handleChangeStatusBookingApi = (id,statusId) => {
    return axios.get('/api/edit-status-booking?id='+id+'&statusId='+statusId);
}
let handleGetBookingByDoctorStatusAndDateApi = (doctorId,statusId,date) => {
    return axios.get('/api/get-booking-today?doctorId='+doctorId+'&statusId='+statusId+'&date='+date);
}
let handleCreateBookingFinishedApi = (data) => {
    return axios.post('/api/create-booking-finished', data)
}
let handleCreateBookingCancelledApi = (data) => {
    return axios.post('/api/create-booking-cancelled', data)
}
let handleGetBookingCancelledApi = (patientId) => {
    return axios.get("/api/get-booking-cancelled?bookingId="+patientId)
}

const handGetAllHandbookFinishedByPatient = (patientId) => {
    // return axios.get(`/api/get-all-booking-finished?patientId=${patientId}`)
    return axios.get(`/api/get-all-booking-finished?patientId=${patientId}`)
}
export { handleBookingApi ,handleGetBookingApi,handleGetBookingForPatientApi,handleGetCountBookingByDoctorApi,handleComfirmBookingApi,handleChangeStatusBookingApi,handleGetBookingByDoctorStatusAndDateApi,handleCreateBookingFinishedApi,handGetAllHandbookFinishedByPatient,handleCreateBookingCancelledApi,handleGetBookingCancelledApi}