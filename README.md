# QR Code Generation & Scanning System

A full-stack MERN application for generating, scanning, and managing QR codes with user authentication and sharing capabilities.

## Features

- 🔐 User Authentication (Signup/Login)
- 📱 QR Code Generation
- 📸 QR Code Scanning
- 📋 Copy QR Code URL
- 📥 Download QR Code as Image
- 📧 Share QR Code via Email
- 📊 View QR Code History
- 📅 Filter QR Codes by Date
- 📄 Paginated History View

## Tech Stack

- **Frontend:**
  - React (Vite)
  - Axios
  - react-qr-reader
  - styled-components
  - react-toastify

- **Backend:**
  - Node.js
  - Express
  - MongoDB
  - Mongoose
  - JWT Authentication
  - Nodemailer

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/qr-code-system.git
   cd qr-code-system
   ```

2. **Backend Setup**
   ```bash
   cd Backend
   npm install
   ```

3. **Create Environment File**
   - Copy `.env.example` to `.env`
   - Update the following variables:
     ```
     PORT=5000
     MONGODB_URI=mongodb://localhost:27017/qr-code-system
     JWT_SECRET=your_jwt_secret_key
     EMAIL_USER=your_email@gmail.com
     EMAIL_PASSWORD=your_email_app_password
     ```

4. **Frontend Setup**
   ```bash
   cd Frontend
   npm install
   ```

5. **Start the Application**

   Start the backend server:
   ```bash
   cd Backend
   npm run dev
   ```

   Start the frontend development server:
   ```bash
   cd Frontend
   npm run dev
   ```

6. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login

### QR Codes
- `POST /api/qrcodes` - Generate new QR code
- `GET /api/qrcodes` - Get all QR codes (with pagination & filters)
- `DELETE /api/qrcodes/:id` - Delete a QR code
- `POST /api/qrcodes/share` - Share QR code via email

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [qrcode](https://www.npmjs.com/package/qrcode) - QR code generation library
- [react-qr-reader](https://www.npmjs.com/package/react-qr-reader) - QR code scanning component
- [Nodemailer](https://nodemailer.com/) - Email sending library 