const API_URL = process.env.NEXT_PUBLIC_API_URL

const getCategory = async () => await fetch(`${API_URL}/category`)

const getDoctorList = async () => await fetch(`${API_URL}/doctor`)

const getServiceByCategory = async (category_id) => await fetch(`${API_URL}/service?category_id=${category_id}`)

const getDoctorByEmail = async (email) => await fetch(`${API_URL}/doctor/${email}`)

const getServiceByEmail = async (email) => await fetch(`${API_URL}/service/${email}`)

const getBookedAppointments = async (email, date) => await fetch(`${API_URL}/appointment/booked/${email}?date=${date}`)

const getBookedServices = async (email, date) => await fetch(`${API_URL}/booking/booked/${email}?date=${date}`)

const bookAppointment = async (data) => await fetch(`${API_URL}/appointment`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data), credentials: 'include' })

const bookService = async (data) => await fetch(`${API_URL}/booking`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data), credentials: 'include' })

// const getUserAppointmentList
// getUserBookingList

// const getRecord // paginated
// const addRecord



export default {
    getCategory,
    getDoctorList,
    getDoctorByEmail,
    getServiceByEmail,
    getServiceByCategory,
    bookAppointment,
    bookService,
    getBookedAppointments,
    getBookedServices
}
