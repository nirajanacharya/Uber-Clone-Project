import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';
import logo from '../assets/img/logo.png';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CaptainSignup = () => {
  const navigate = useNavigate();

  // State variables
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [vehiclecolor, setVehicleColor] = useState('');
  const [vehicletype, setVehicleType] = useState('');
  const [vehiclecapacity, setVehicleCapacity] = useState('');
  const [vehicleplate, setVehiclePlate] = useState('');

  const [errors, setErrors] = useState({});
  const { captain, setCaptain } = useContext(CaptainDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();

    // Reset errors
    setErrors({});

    const captainData = {
      fullname: {
        firstname,
        lastname,
      },
      email,
      password,
      vehicle: {
        color: vehiclecolor,
        plate: vehicleplate,
        capacity: vehiclecapacity,
        vehicleType: vehicletype,
      },
    };

    try {
      // Make the API request
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData);
      console.log('Response:', response);

      if (response.status === 201) {
        const data = response.data;
        console.log('Registration Successful, Response Data:', data);

        // Store token in localStorage
        localStorage.setItem('token', data.token);

        // Set captain data in context
        setCaptain(data.captain);

        // Show success toast
        toast.success('Registration successful! Redirecting to home...');

        // Navigate to captain home after a short delay
        setTimeout(() => {
          navigate('/captain-home');
        }, 1000);

        // Reset form fields
        setFirstname('');
        setLastname('');
        setEmail('');
        setPassword('');
        setVehicleColor('');
        setVehicleType('');
        setVehicleCapacity('');
        setVehiclePlate('');
      }
    } catch (error) {
      console.error('Error during registration:', error.response?.data || error.message);
      setErrors(error.response?.data?.message || {});
      toast.error('Registration failed. Please check your details.');
    }
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <ToastContainer />
      <div className="mb-5">
        <div>
          <img className="w-20 mb-5" src={logo} alt="Gantabya logo" />
        </div>
        <form onSubmit={submitHandler}>
          <h3 className="text-lg font-semibold mb-3">What's your Name?</h3>
          <div className="flex gap-3 mb-3 font-base">
            <input
              className="bg-[#eeeeee] mb-3 rounded px-4 h-10 w-full text-base placeholder:text-sm"
              type="text"
              placeholder="Firstname"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
            <input
              className="bg-[#eeeeee] mb-3 rounded px-4 h-10 w-full text-base placeholder:text-sm"
              type="text"
              placeholder="Lastname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>
          <h3 className="text-lg font-medium mb-2">What's your email?</h3>
          <input
            className="bg-[#eeeeee] mb-3 text-base rounded px-4 h-10 w-full placeholder:text-sm"
            type="email"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

          <h3 className="text-lg font-medium mb-2">Enter password?</h3>
          <input
            className="bg-[#eeeeee] mb-3 rounded px-4 text-base h-10 w-full placeholder:text-sm"
            type="password"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

          <div className="mb-7">
            <h3 className="text-lg font-medium mb-2">Vehicle Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <input
                className="bg-[#eeeeee] mb-3 rounded px-4 w-full h-10 text-base placeholder:text-sm"
                type="text"
                placeholder="Vehicle Color"
                value={vehiclecolor}
                onChange={(e) => setVehicleColor(e.target.value)}
              />
              <input
                className="bg-[#eeeeee] mb-3 rounded px-4 w-full h-10 text-base placeholder:text-sm"
                type="text"
                placeholder="Vehicle Plate Number"
                value={vehicleplate}
                onChange={(e) => setVehiclePlate(e.target.value)}
              />
              <input
                className="bg-[#eeeeee] mb-3 rounded px-4 w-full h-10 text-base placeholder:text-sm"
                type="number"
                min="1"
                placeholder="Vehicle Capacity"
                value={vehiclecapacity}
                onChange={(e) => setVehicleCapacity(e.target.value)}
              />
              <select
                className="bg-[#eeeeee] mb-3 rounded px-4 w-full text-base"
                value={vehicletype}
                onChange={(e) => setVehicleType(e.target.value)}
              >
                <option value="">Select Vehicle Type</option>
                <option value="car">Car</option>
                <option value="motorcycle">Motorcycle</option>
                <option value="auto">Auto</option>
              </select>
            </div>
          </div>
          <button
            className="bg-[#111] text-white font-semibold mb-2 rounded px-4 border w-full text-lg placeholder:text-sm"
            type="submit"
          >
            Create Captain Account
          </button>
          <p>
            Already have an account?{' '}
            <Link to="/captain-login" className="text-blue-400">
              Captain Login
            </Link>
          </p>
        </form>
      </div>
      <div>
        <p className="text-[10px] leading-2">
          This site is protected by reCAPTCHA and the{' '}
          <span className="underline">Google Policy</span> and{' '}
          <span className="underline">Terms of Service apply Privacy</span>.
        </p>
      </div>
    </div>
  );
};

export default CaptainSignup;