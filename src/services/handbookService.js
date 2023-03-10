import axios from "../axios";

const handCreateHandbook = (data) => {
    return axios.post('/api/add-new-handbook', data)
}
const handleEditHandbook = (data) => {
    return axios.post('/api/edit-handbook', data)
}
const handGetAllHandbook = () => {
    return axios.get('/api/get-all-handbook')
}
const handGetHandbookById = (id) => {
    return axios.get(`/api/get-handbook-by-id/?id=${id}`)
}
const handUpdateViewHandbook = (id) => {
    return axios.get(`/api/update-view?id=${id}`)
}
const handleAddCommentHandbook = (data) => {
    return axios.post('/api/addcommentinhandbook', data)
}
const handGetAllCommentHandbook = (id) => {
    return axios.get(`/api/get-all-comment-in-handbook?id=${id}`)
}
const handGetAllReplyCommentHandbook = (id) => {

    return axios.get(`/api/get-all-reply-comment-in-handbook-by-id-comment?id=${id}`)
}
const handleAddReplyCommentHandbook = (data) => {
    return axios.post('/api/add-reply-comment-in-handbook', data)
}

export { handCreateHandbook, handGetAllHandbook,handGetHandbookById ,handUpdateViewHandbook,handleAddCommentHandbook,handGetAllCommentHandbook,handGetAllReplyCommentHandbook,handleAddReplyCommentHandbook,handleEditHandbook}