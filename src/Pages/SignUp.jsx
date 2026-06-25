import React, { useState } from 'react'
import {useNavigate, Link} from 'react-router-dom'

function SignUp() {
    cosnt[email,setEmail] = useState('');
    const[password, setPassword] = useState('');

    const handleSubmit = async(e) =>{
        e.preventDefault();
    }

    const response = await fetch('/api/auth/signup',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({email,password}),
    });

    if(response.ok){
        navigate('/login');
    }

  return (
    <form onSubmit={handleSubmit}>
        <input type='email' value={email} onChange={(e)=> setEmail(e.target.value)}/>
    </form>
  )
}

export default SignUp