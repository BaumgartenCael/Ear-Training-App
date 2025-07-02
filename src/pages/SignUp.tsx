import React, { useState } from 'react';


function SignUp() {
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
            const res = await fetch('http://localhost:5173/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (res.status === 201) {
                console.log("Signup Successful");
            }
        } 
        catch (error) {
            console.error(error);
        }
        console.log('Username:', username);
        console.log('Password:', password);
    
        // Here you can send data to your backend for registration
      };


  return (
    <form onSubmit={handleSubmit}>
        <input>Username</input>
        <input>Password</input>
        <input>Confirm Password</input>
    </form>
  )
}

export default SignUp

