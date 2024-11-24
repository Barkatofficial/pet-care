const API_URL = process.env.NEXT_PUBLIC_API_URL

const getCategory = async () => await fetch(`${API_URL}/category`, { cache: 'force-cache' })

const getDoctorList = async () => await fetch(`${API_URL}/doctor`)

const getServiceByCategory = async (category_id) => await fetch(`${API_URL}/service?category_id=${category_id}`)

const getDoctorByEmail = async (email) => await fetch(`${API_URL}/doctor/${email}`)

const getServiceByEmail = async (email) => await fetch(`${API_URL}/service/${email}`)

const getBookedAppointments = async (email, date) => await fetch(`${API_URL}/appointment/booked/${email}?date=${date}`)

const getBookedServices = async (email, date) => await fetch(`${API_URL}/booking/booked/${email}?date=${date}`)

const getOTP = async (email) => await fetch(`${API_URL}/auth/get-otp?email=${email}`)

const verifyOTP = async (email, otp) => await fetch(`${API_URL}/auth/verify-otp?email=${email}&otp=${otp}`)

const customerSignup = async (data) => await fetch(`${API_URL}/customer`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })

const customerLogin = async (data) => await fetch(`${API_URL}/customer/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data), credentials: 'include' })

const customerLogout = async () => await fetch(`${API_URL}/customer/logout`)

const bookAppointment = async (data) => await fetch(`${API_URL}/appointment`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data), credentials: 'include' })

const bookService = async (data) => await fetch(`${API_URL}/booking`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data), credentials: 'include' })

const userAppointmentList = async () => await fetch(`${API_URL}/customer/appointments`, { credentials: 'include' })

const userBookingList = async () => await fetch(`${API_URL}/customer/bookings`, { credentials: 'include' })

const addRecord = async (formData) => await fetch(`${API_URL}/record`, { method: 'POST', body: formData, credentials: 'include' })

const getRecords = async (page) => await fetch(`${API_URL}/record`, { credentials: 'include' })


export default {
    getCategory,
    getDoctorList,
    getServiceByCategory,
    getDoctorByEmail,
    getServiceByEmail,
    getBookedAppointments,
    getBookedServices,
    getOTP,
    verifyOTP,
    customerSignup,
    customerLogin,
    customerLogout,
    bookAppointment,
    bookService,
    userAppointmentList,
    userBookingList,
    addRecord,
    getRecords
}
