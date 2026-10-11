# ❤️ HealthCheck AI — AI-Based Disease Prediction & Health Monitoring System

HealthCheck AI is an AI-powered web application designed to provide preliminary health insights based on user-entered health parameters and symptoms. It combines a React frontend, a Node.js backend, MongoDB, and a Python machine learning service.

## 🌐 Live Demo

- **Frontend:** https://health-diagnosis-system-five.vercel.app
- **Node.js Backend:** https://health-diagnosis-backend-qshc.onrender.com
- **AI Model Health Check:** https://health-diagnosis-system-pmt4.onrender.com/health

## 📌 Project Overview

HealthCheck AI allows users to enter basic health information, select current symptoms, and request an AI-generated preliminary prediction. The application connects the frontend to a backend API, which communicates with a Python-based machine learning service.

The project demonstrates full-stack web development, REST API integration, authentication, database management, and machine learning deployment.

## ✨ Features

- **AI-Based Disease Prediction:** Generates preliminary predictions using a trained machine learning model.
- **Health Monitoring:** Accepts health parameters such as oxygen saturation and blood pressure.
- **Symptom Analysis:** Supports symptom selection, including body ache, cough, fatigue, fever, headache, runny nose, shortness of breath, and sore throat.
- **User Authentication:** Supports email/password authentication and Google sign-in.
- **Database Integration:** Uses MongoDB to store application data.
- **REST API Integration:** Connects the React frontend, Node.js backend, and Python AI service.
- **Responsive Interface:** Provides a user-friendly web interface.
- **Cloud Deployment:** Frontend and backend services are deployed separately.

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React.js, Vite, JavaScript, CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Authentication | JWT, bcryptjs, Google OAuth |
| Machine Learning | Python, scikit-learn, Random Forest |
| Model Storage | Pickle (`.pkl`) model and label encoder files |
| Deployment | Vercel, Render |
| Version Control | Git, GitHub |

## 🏗️ System Architecture

```text
User
  |
  v
React + Vite Frontend
  |
  v
Node.js + Express Backend
  |
  +------> MongoDB
  |
  v
Python ML Prediction Service
  |
  v
Disease Prediction Response
  |
  v
Frontend Results
```

## 📂 Project Structure

```text
health-diagnosis-system/
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
│
├── backend/
│   ├── routes/
│   │   ├── auth.js
│   │   ├── google.js
│   │   ├── predict.js
│   │   ├── doctors.js
│   │   └── history.js
│   ├── models/
│   ├── disease_model/
│   ├── server.js
│   └── package.json
│
└── README.md
```

## ⚙️ Installation and Setup

### Prerequisites

Install the following tools before running the project locally:

- Node.js and npm
- Python 3
- MongoDB Atlas account or a local MongoDB instance
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/SandhyaDhakad123/health-diagnosis-system.git
cd health-diagnosis-system
```

### 2. Set Up the Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` directory:

```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_strong_random_secret
GOOGLE_CLIENT_ID=your_google_web_client_id
AI_SERVICE_URL=https://health-diagnosis-system-pmt4.onrender.com/predict
```

Replace the example values with your own configuration. Never commit the `.env` file or expose credentials in the repository.

Start the backend:

```bash
npm start
```

The local API will normally be available at:

`http://localhost:4000`

### 3. Set Up the Frontend

Open another terminal:

```bash
cd frontend
npm install
```

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:4000/api
VITE_GOOGLE_CLIENT_ID=your_google_web_client_id
```

Start the frontend:

```bash
npm run dev
```

Open the local URL displayed by Vite, usually `http://localhost:5173`.

### 4. Python AI Service

The Python prediction service must be running and have its required dependencies and trained model artifacts available.

For the deployed service, the health endpoint is:

`https://health-diagnosis-system-pmt4.onrender.com/health`

A healthy response should indicate that the model and label encoder are loaded.

For local setup, use the Python dependency file and startup command provided in the AI service's own directory.

## 🔐 Environment Variables

| Variable | Purpose |
|---|---|
| `PORT` | Port used by the Node.js server |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret used to sign authentication tokens |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID used by the backend |
| `AI_SERVICE_URL` | Python prediction endpoint |
| `VITE_API_URL` | Backend API base URL used by the frontend |
| `VITE_GOOGLE_CLIENT_ID` | Google OAuth client ID used by the frontend |

**Security:** Keep secrets in environment variables on your deployment platforms. Do not commit passwords, MongoDB credentials, JWT secrets, or private keys to GitHub.

## 🔌 API Endpoints

Base URL:

`https://health-diagnosis-backend-qshc.onrender.com`

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/` | Check whether the backend is running |
| GET | `/health` | Check backend and database status |
| POST | `/api/auth/signup` | Register a user |
| POST | `/api/auth/login` | Log in using email and password |
| POST | `/api/auth/google` | Authenticate using Google |
| POST | `/api/predict` | Request an AI prediction |
| GET | `/api/predict/health` | Check prediction service connectivity |
| GET | `/api/doctors` | Access doctor-related functionality |
| `/api/history` | See backend history routes for supported methods and operations |

## 🚀 Deployment

### Frontend — Vercel

1. Import the GitHub repository into Vercel.
2. Set the project root directory to `frontend`.
3. Configure the required `VITE_API_URL` and `VITE_GOOGLE_CLIENT_ID` environment variables.
4. Build command: `npm run build`.
5. Deploy the project.

### Node.js Backend — Render

1. Create a Node.js Web Service linked to the GitHub repository.
2. Set the root directory to `backend`.
3. Build command: `npm install`.
4. Start command: `npm start`.
5. Configure `MONGO_URI`, `JWT_SECRET`, `GOOGLE_CLIENT_ID`, and `AI_SERVICE_URL`.
6. Deploy the service.

### Python AI Service — Render

Deploy the Python service separately with the required Python dependencies, startup command, environment configuration, and model artifacts.

Configure the Node.js backend's `AI_SERVICE_URL` to point to the deployed Python prediction endpoint.

## 🧪 Testing

Verify each component independently:

1. Open the frontend and check that the page loads.
2. Open the Node.js backend root URL and confirm the success response.
3. Check `/health` to verify backend status and database connectivity.
4. Check the Python service `/health` endpoint.
5. Check `/api/predict/health` to verify that the Node.js backend can reach the Python service.
6. Test signup, login, and Google sign-in.
7. Submit valid health parameters and symptoms to test the prediction workflow.

## 🔮 Future Enhancements

- Improve model validation using reliable, representative datasets.
- Add prediction history and health trend visualizations.
- Add stronger input validation and error handling.
- Improve automated testing and API monitoring.
- Enhance accessibility and mobile responsiveness.
- Add secure account recovery and password management.

## ⚠️ Disclaimer

HealthCheck AI is an educational project intended for preliminary informational purposes only. Its predictions are not medically validated diagnoses and must not replace professional medical advice, examination, or treatment. Always consult a qualified healthcare professional for medical concerns.

## 👩‍💻 Author

**Sandhya Dhakad**

- GitHub: https://github.com/SandhyaDhakad123

---

If you find this project useful, consider giving the repository a ⭐ on GitHub.