// Production Version: 1.0.1
export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";


export const ENDPOINTS = {
    LOGIN: `${API_BASE_URL}/students/login`,
    ADMIN_LOGIN: `${API_BASE_URL}/admins/login`,
    STUDENT_REGISTER: `${API_BASE_URL}/students/register`,
    ADMIN_REGISTER: `${API_BASE_URL}/admins/register`,
    // Example protected endpoints
    UPDATE_MARKS: `${API_BASE_URL}/admin/update-marks`,
    UPDATE_ATTENDANCE: `${API_BASE_URL}/admin/update-attendance`,
    STUDENT_DETAILS: `${API_BASE_URL}/students/details`,
    LIST_STUDENTS: `${API_BASE_URL}/admin/students`,
    ADD_STUDENT: `${API_BASE_URL}/admin/add-student`,
    COURSES: `${API_BASE_URL}/courses`,
    CREATE_ASSIGNMENT: `${API_BASE_URL}/courses/assignment`,
    CHAT: `${API_BASE_URL}/chat`,
};

/**
 * Helper to perform authenticated API calls
 */
export const apiFetch = async (endpoint, options = {}) => {
    const token = localStorage.getItem('access_token');

    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(endpoint, {
        ...options,
        headers,
    });

    if (response.status === 401) {
        // Handle unauthorized by redirecting to login page
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        localStorage.removeItem('role');
        localStorage.removeItem('registration_number');
        if (!window.location.pathname.includes('login')) {
            window.location.href = '/student-login';
        }
    }

    return response;
};
