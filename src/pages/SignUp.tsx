import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css'



function SignUp() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // prevent page refresh
        if (confirmPassword != password) {
            console.log("Please confirm password");
            return;
        } 
        try {
            const res = await fetch('http://localhost:5000/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (res.status === 201) {
                console.log("Signup Successful");
                navigate('/home');
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
        <input
        type="password"
        value={confirmPassword}
        placeholder="Confirm Password"
        onChange={(e)=>setConfirmPassword(e.target.value)}
        required
        />
        <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUp

