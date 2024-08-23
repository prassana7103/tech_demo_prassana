"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import '../styles/login-register.css';
import * as jwt_decode from 'jwt-decode';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://192.168.105.6:30001/api/auth/login/', {
        username,
        password
      });

      if (res.status === 200) {
        const data = res.data;
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);        
        try {
          // Decode the token
          const decoded = jwt_decode(data.access);
        
          // Access token data
          console.log(decoded);
        } catch (error) {
          console.error('Invalid token', error);
        }
                router.push('/daily');
      } else {
        console.error('Login failed:', res.statusText);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleRegisterRedirect = () => {
    router.push('/register');
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
      <button className="register-button" onClick={handleRegisterRedirect}>Register</button>
    </div>
  );
};

export default Login;
