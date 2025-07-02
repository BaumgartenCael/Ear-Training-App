import React, { useState } from 'react';


function SignUp() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        console.log("Handling submit...")
        e.preventDefault(); // prevent page refresh
        if (confirmPassword != password) {
            console.log("Please confirm password");
            return;
        } 
        try {
            console.log("Trying to fetch...");
            const res = await fetch('http://localhost:5000/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (res.status === 201) {
                console.log("Signup Successful");
            }
        } 
        catch (error) {
            console.log("Failed");
            console.error(error);
        }
        console.log('Username:', username);
        console.log('Password:', password);
    
        // Here you can send data to your backend for registration
      };


  return (
    <form onSubmit={handleSubmit}>
        <input
        type="username"
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

