import React, { useState } from "react";
// axios import remains as per your original code
// For this environment, the backend call will be simulated.
import axios from "axios";
import { TextField, Button, Container, Typography } from "@mui/material";
// For react-router-dom, useNavigate is typically used.
// For a standalone demo in this environment, it will be a no-op or mocked.
// In a full React application, ensure react-router-dom is installed and configured.
// const navigate = useNavigate(); // This line would be active in a full app

// Custom Message Modal Component (replaces alert())
const MessageModal = ({ message, type, onClose }) => {
  if (!message) return null;

  // Determine background and text color based on message type (success, error, info)
  const bgColor = type === 'error' ? 'bg-red-100' : type === 'success' ? 'bg-green-100' : 'bg-blue-100';
  const textColor = type === 'error' ? 'text-red-800' : type === 'success' ? 'text-green-800' : 'text-blue-800';
  const borderColor = type === 'error' ? 'border-red-400' : type === 'success' ? 'border-green-400' : 'border-blue-400';

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className={`relative p-6 rounded-lg shadow-lg ${bgColor} border ${borderColor} max-w-sm w-full`}>
        <p className={`text-center font-semibold ${textColor}`}>{message}</p>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl font-bold"
          aria-label="Close message"
        >
          &times;
        </button>
      </div>
    </div>
  );
};


const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null); // State for custom message
  const [messageType, setMessageType] = useState('info'); // State for message type (e.g., 'success', 'error')
  const [isProcessing, setIsProcessing] = useState(false); // For loading state

  // Mocking useNavigate for this isolated example.
  // In a full application, uncomment the line below.
  // const navigate = useNavigate();
  const navigate = (path) => {
    console.log(`Simulating navigation to: ${path}`);
    showMessage(`Simulating navigation to: ${path}`, 'info');
  };

  const showMessage = (msg, type) => {
    setMessage(msg);
    setMessageType(type);
  };

  const clearMessage = () => {
    setMessage(null);
    setMessageType('info');
  };

  const handleRegister = async () => {
    clearMessage(); // Clear any previous messages
    setIsProcessing(true); // Indicate processing

    if (!username || !password) {
      showMessage("Please fill in all fields.", "error");
      setIsProcessing(false);
      return;
    }

    try {
      // Original axios call (will be simulated for this environment)
      // In a real app, this would make a network request to your backend.
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          if (username === "existinguser") {
            resolve({ data: { message: "Username already exist" }, status: 409 });
          } else if (username.length < 3 || password.length < 6) {
            resolve({ data: { message: "Username must be at least 3 chars and password at least 6" }, status: 400 });
          }
          else {
            resolve({ data: { message: "Registration successful!" }, status: 200 });
          }
        }, 1500); // Simulate network delay
      });

      if (response.status === 200) {
        showMessage(response.data.message, "success");
        navigate("/login");
      } else {
        if (response.data?.message === "Username already exist") {
          showMessage("Username already exist, please login.", "error");
          navigate("/login");
        } else {
          showMessage(response.data?.message || "Registration Failed.", "error");
        }
      }
    } catch (error) {
      // This catch block would normally handle network errors.
      // For the simulation, we won't hit it unless there's a coding error.
      showMessage("An unexpected error occurred.", "error");
      console.error("Registration error:", error);
    } finally {
      setIsProcessing(false); // Stop processing indication
    }
  };

  return (
    // Outer div for centering the Material-UI Container and applying background
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 p-4 sm:p-6 lg:p-8">
      <Container
        maxWidth="sm" // Constrains the width of the Material-UI Container
        className="bg-white p-8 rounded-xl shadow-2xl w-full border border-gray-200"
        style={{
          // Tailwind classes applied via className for most styling.
          // maxWidth is handled by Material-UI's maxWidth prop.
          // Flex properties for centering are on the parent div.
          // Manual styles below are minimal, mostly just for overriding/fine-tuning.
          display: 'flex', // Make Material-UI Container a flex container
          flexDirection: 'column', // Stack children vertically
          alignItems: 'center', // Center children horizontally
          gap: '1rem' // Space between Material-UI components
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom className="text-gray-800 font-extrabold text-center">
          Register
        </Typography>
        <TextField
          label="Username"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={isProcessing}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isProcessing}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleRegister}
          disabled={isProcessing}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg shadow-md transition duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ marginTop: '1rem', marginBottom: '0.5rem' }} // Add some margin if needed
        >
          {isProcessing ? (
            <svg className="animate-spin h-5 w-5 text-white mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            'Register'
          )}
        </Button>
        {/* Empty fragment replaced with a paragraph for "Already have an account?" */}
        <p className="text-center text-gray-600 text-sm mt-4">
          Already have an account?{' '}
          <Button
            variant="text" // Use text variant for the "Login here" button
            color="primary"
            onClick={() => navigate("/login")}
            disabled={isProcessing}
            className="font-semibold" // Tailwind class for font weight
            style={{ padding: 0, minWidth: 'auto', textTransform: 'none' }} // Remove Material-UI button default styling
          >
            Login here
          </Button>
        </p>
      </Container>
      {/* Custom Message Modal */}
      <MessageModal message={message} type={messageType} onClose={clearMessage} />
    </div>
  );
};

// Exporting App as the default component for Canvas environment
// In a full React app, you would export 'Register' and use it in your routing.
function App() {
    return <Register />;
}

export default App;
