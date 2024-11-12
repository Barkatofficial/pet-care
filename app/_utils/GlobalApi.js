const API_URL = process.env.NEXT_PUBLIC_API_URL

const getCategory = async () => await fetch(`${API_URL}/category`, { cache: 'force-cache' })

const getDoctorList = async () => await fetch(`${API_URL}/doctor`)

const getServiceByCategory = async (category_id) => await fetch(`${API_URL}/service?category_id=${category_id}`)

const getDoctorByEmail = async (email) => await fetch(`${API_URL}/doctor/${email}`)
const getServiceByEmail = async (email) => await fetch(`${API_URL}/service/${email}`)

const bookAppointment = (data) => axiosClient.post('/appointments?populate=doctor', data);
const bookService = (data) => axiosClient.post('/bookings?populate=service', data);

const getUserAppointmentList = (userEmail) => axiosClient.get(`/bookings?filters[email][$eq]=${userEmail}&populate[service][populate][image][populate][0]=url&populate=*`);
const getUserBookingList = (userEmail) => axiosClient.get(`/appointments?filters[email][$eq]=${userEmail}&populate[doctor][populate][image][populate][0]=url&populate=*`);

const deleteBooking = (id) => axiosClient.delete('/appointments/' + id);
const deleteBook = (id) => axiosClient.delete('/bookings/' + id);

const getRecord = (userEmail, page = 1, pageSize = 10) =>
    axiosClient.get(`/records?filters[email][$eq]=${userEmail}&pagination[page]=${page}&pagination[pageSize]=${pageSize}&populate=petDocuments`);
const addRecord = (data) => axiosClient.post(`/records`, data);



export default {
    getCategory,
    getDoctorList,
    getDoctorByEmail,
    getServiceByEmail,
    getServiceByCategory,
    bookAppointment,
    bookService,
    getUserBookingList,
    getUserAppointmentList,
    deleteBooking,
    addRecord,
    getRecord,
    deleteBook
}
