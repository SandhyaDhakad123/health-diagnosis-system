## 🚀 Live Demo

[🔗 Try HealthCheck AI] (https://healthcheck-ai-ten.vercel.app)

# HealthCheck AI - Disease Prediction System

A full-stack web application that uses AI/ML to predict diseases based on symptoms and vital signs.

## 🚀 Features

- **AI-Powered Diagnosis**: Machine learning model for disease prediction
- **Comprehensive Health Assessment**: Vital signs and symptom analysis
- **User Authentication**: Email/password and Google OAuth
- **Doctor Consultation**: Integrated doctor finding system
- **Responsive Design**: Mobile-friendly interface
- **Real-time Health Monitoring**: Service status indicators

## 🛠️ Tech Stack

### Frontend
- React 19 with Vite
- Tailwind CSS for styling
- React Router for navigation
- Axios for API calls
- Google OAuth integration

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT authentication
- CORS enabled
- Environment-based configuration

### AI/ML Service
- Python Flask server
- Scikit-learn for ML models
- Pandas for data processing
- NumPy for numerical computations

## 📦 Project Structure

```
├── frontend/           # React frontend application
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # Page components
│   │   ├── api/        # API service functions
│   │   └── styles/     # CSS styles
│   ├── public/         # Static assets
│   └── package.json
├── backend/            # Express.js backend
│   ├── routes/         # API route handlers
│   ├── models/         # MongoDB schemas
│   ├── middleware/     # Custom middleware
│   ├── disease_model/  # ML model service
│   └── server.js       # Main server file
└── README.md
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- Python (v3.8 or higher)
- MongoDB database
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YuvrajD02/minor.git
   cd minor
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   
   # Copy environment template and fill in your values
   cp .env.example .env
   # Edit .env with your MongoDB URI, JWT secret, etc.
   ```

3. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   ```

4. **Setup Python ML Service**
   ```bash
   cd backend/disease_model
   pip install -r requirements.txt
   ```

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd backend
   npm start
   # Server runs on http://localhost:4000
   ```

2. **Start the AI Model Service**
   ```bash
   cd backend/disease_model
   python mock_model_server.py
   # Service runs on http://localhost:5000
   ```

3. **Start the Frontend**
   ```bash
   cd frontend
   npm run dev
   # Application runs on http://localhost:5173
   ```

## 🔧 Environment Variables

Create a `.env` file in the backend directory:

```env
MONGO_URI=your_mongodb_connection_string
PORT=4000
JWT_SECRET=your_jwt_secret_key
GOOGLE_CLIENT_ID=your_google_oauth_client_id
AI_SERVICE_URL=http://localhost:5000/predict
```

## 🧪 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/google` - Google OAuth login

### Prediction
- `POST /api/predict` - Disease prediction
- `GET /api/predict/health` - Service health check

### Other
- `GET /api/doctors` - Get doctors list
- `GET /api/history` - User's diagnosis history

## 🤖 ML Model

The system uses a trained machine learning model that analyzes:
- **Vital Signs**: Age, heart rate, temperature, blood pressure, oxygen saturation
- **Symptoms**: Fever, cough, headache, fatigue, and more
- **Demographics**: Age and gender factors

## 🚀 Deployment

### Option 1: Vercel + Railway
1. Deploy frontend to Vercel
2. Deploy backend to Railway
3. Deploy ML service to Railway or Heroku

### Option 2: Heroku
1. Create three Heroku apps (frontend, backend, ML service)
2. Configure environment variables
3. Deploy using Git

See `DEPLOYMENT.md` for detailed deployment instructions.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

This application is for educational and informational purposes only. It should not be used as a substitute for professional medical advice, diagnosis, or treatment. Always consult with qualified healthcare providers for medical concerns.

## 👥 Team


## 🙏 Acknowledgments

- Machine learning models and algorithms
- Healthcare data providers
- Open source community
