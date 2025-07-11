import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function LogIn() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // prevent page refresh
        try {
            const res = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
                credentials: 'include',
            });

            if (res.status === 200) {
                console.log("Login Successful");
                navigate('/home');
            } else {
                const data = await res.json();
                console.log("Login failed:", data.message);
            }
        } 
        catch (error) {
            console.log("Failed");
            console.error(error);
        }
        console.log('Username:', username);
        console.log('Password:', password);
    
      };


  return (
    <form onSubmit={handleSubmit}>
        <input
        type="text"
        value={username}
        placeholder="Username"
        onChange={(e)=>setUsername(e.target.value)}
        required
        />
        <input
        type="password"
        value={password}
        placeholder="Password"
        onChange={(e)=>setPassword(e.target.value)}
        required
        />
        <button type="submit">Log In</button>
    </form>
  );
};

export default LogIn;

