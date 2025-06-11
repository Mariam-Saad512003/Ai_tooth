import ApiService from './ApiService.js';

class PredictionService extends ApiService {
    constructor() {
        super();
        this.token = localStorage.getItem('token');
    }

    // Get available prediction models based on user role
    async getAvailableModels() {
        try {
            const response = await this.get('/prediction/available-models', {
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            });
            return response;
        } catch (error) {
            console.error('Failed to get available models:', error);
            throw error;
        }
    }

    // Predict teeth number
    async predictTeethNumber(imageData) {
        try {
            const response = await this.post('/prediction/teeth-number', {
                image: imageData
            }, {
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            });
            return response;
        } catch (error) {
            console.error('Teeth number prediction failed:', error);
            throw error;
        }
    }

    // Predict disease
    async predictDisease(imageData) {
        try {
            const response = await this.post('/prediction/disease', {
                image: imageData
            }, {
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            });
            return response;
        } catch (error) {
            console.error('Disease prediction failed:', error);
            throw error;
        }
    }

    // Predict gender
    async predictGender(imageData) {
        try {
            const response = await this.post('/prediction/gender', {
                image: imageData
            }, {
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            });
            return response;
        } catch (error) {
            console.error('Gender prediction failed:', error);
            throw error;
        }
    }

    // Predict age
    async predictAge(imageData) {
        try {
            const response = await this.post('/prediction/age', {
                image: imageData
            }, {
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            });
            return response;
        } catch (error) {
            console.error('Age prediction failed:', error);
            throw error;
        }
    }

    // Get prediction limits for current user
    async getPredictionLimits() {
        try {
            const response = await this.get('/prediction/limits', {
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            });
            return response;
        } catch (error) {
            console.error('Failed to get prediction limits:', error);
            throw error;
        }
    }
}

export default PredictionService; 