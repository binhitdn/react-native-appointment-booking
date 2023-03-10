import axios from "../axios";

const handleGetAllCode = (typeInput) => {
    return axios.get(`/api/allcode?type=${typeInput}`)
}
const handleGetCountUser = () => {
    return axios.get('/api/count-user')
}
const handleGetCountDoctor = () => {
    return axios.get('/api/count-doctor')
}
const handleGetCountPatient = () => {
    return axios.get('/api/count-patient')
}
const handleGetCountBooking = () => {
    return axios.get('/api/count-booking')
}
export { handleGetAllCode, handleGetCountUser, handleGetCountDoctor, handleGetCountPatient, handleGetCountBooking }