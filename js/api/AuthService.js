import ApiService from './ApiService.js';

class AuthService {
    constructor() {
        this.apiService = new ApiService();
        this.baseUrl = 'http://aidentify-gradutionff.runasp.net/api';
    }

    async register(userData) {
        try {
            // Determine the correct registration endpoint based on role
            let endpoint;
            switch (userData.role.toLowerCase()) {
                case 'student':
                    endpoint = '/Account/Register_Student';
                    break;
                case 'doctor':
                    endpoint = '/Account/Register_Doctor';
                    break;
                case 'admin':
                    endpoint = '/Account/Register_Admin';
                    break;
                default:
                    throw new Error('Invalid role specified');
            }

            console.log('Sending registration request to:', `${this.baseUrl}${endpoint}`);
            console.log('Registration data:', userData);

            const response = await fetch(`${this.baseUrl}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    fullName: userData.fullName,
                    email: userData.email,
                    password: userData.password,
                    confirmPassword: userData.confirmPassword
                })
            });

            console.log('Response status:', response.status);
            console.log('Response headers:', Object.fromEntries(response.headers.entries()));

            // Check if response is empty
            const text = await response.text();
            console.log('Response text:', text);

            if (!response.ok) {
                let errorMessage = 'Registration failed';
                try {
                    if (text) {
                        const errorData = JSON.parse(text);
                        errorMessage = errorData.message || errorMessage;
                    }
                } catch (e) {
                    console.error('Error parsing error response:', e);
                }
                throw new Error(errorMessage);
            }

            // Parse response only if there's content
            const data = text ? JSON.parse(text) : { success: true };
            return {
                success: true,
                data: data
            };
        } catch (error) {
            console.error('Registration error:', error);
            throw new Error(error.message || 'Registration failed. Please try again.');
        }
    }

    async login(credentials) {
        try {
            const response = await fetch(`${this.baseUrl}/Auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    email: credentials.email,
                    password: credentials.password
                })
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Login failed');
            }

            const data = await response.json();

            // Store the token and user data
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            return {
                success: true,
                data: data
            };
        } catch (error) {
            console.error('Login error:', error);
            throw new Error(error.message || 'Login failed. Please try again.');
        }
    }

    async logout() {
        try {
            const token = this.getToken();
            if (!token) return;

            const response = await fetch(`${this.baseUrl}/Auth/logout`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });

            // Clear local storage regardless of response
            localStorage.removeItem('token');
            localStorage.removeItem('user');

            return {
                success: true
            };
        } catch (error) {
            console.error('Logout error:', error);
            // Still clear local storage even if the API call fails
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            throw error;
        }
    }

    isAuthenticated() {
        return !!this.getToken();
    }

    getToken() {
        return localStorage.getItem('token');
    }

    getUser() {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }
}

export default AuthService;