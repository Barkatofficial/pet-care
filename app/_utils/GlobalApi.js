const { default: axios } = require("axios");

const API_KEY = process.env.NEXT_PUBLIC_STAPI_API_KEY;

export const axiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
});

const getCategory = () => axiosClient.get('/category'); 

const getDoctorList = () => axiosClient.get('/doctors?fields[0]=Name&fields[1]=Address&fields[2]=Experience_Year&populate[image][fields][0]=url&populate[category][fields][0]=Name');

const getDoctorById = (id, date) => axiosClient.get(`/doctors/${id}?filters[appointments][Date][$gte]=${date}&populate=*`);
const getServiceById = (id, date) => axiosClient.get(`/services/${id}?filters[bookings][Date][$gte]=${date}&populate=*`);

const getServiceByName = (name) => axiosClient.get(`/services?filters[category][Name][$eq]=${name}&fields[0]=Provider_name&fields[1]=Address&fields[2]=Open_time&populate[category][fields][0]=Name&populate[image][fields][0]=url`);

const bookAppointment = (data) => axiosClient.post('/appointments?populate=doctor', data);
const bookService = (data) => axiosClient.post('/bookings?populate=service', data);

const getUserAppointmentList = (userEmail) => axiosClient.get(`/bookings?filters[email][$eq]=${userEmail}&populate[service][populate][image][populate][0]=url&populate=*`);
const getUserBookingList = (userEmail) => axiosClient.get(`/appointments?filters[email][$eq]=${userEmail}&populate[doctor][populate][image][populate][0]=url&populate=*`);

const deleteBooking = (id) => axiosClient.delete('/appointments/' + id);
const deleteBook = (id) => axiosClient.delete('/bookings/' + id);

const getRecord = (userEmail, page = 1, pageSize = 10) => 
    axiosClient.get(`/records?filters[email][$eq]=${userEmail}&pagination[page]=${page}&pagination[pageSize]=${pageSize}&populate=petDocuments`);
const addRecord = (data) => axiosClient.post(`/records`,data);



export default {
    getCategory,          
    getDoctorList,     
    getDoctorById,
    getServiceById,
    getServiceByName,
    bookAppointment,
    bookService,
    getUserBookingList,
    getUserAppointmentList,
    deleteBooking,
    addRecord,
    getRecord,
    deleteBook
    
};
