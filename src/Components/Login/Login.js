import React, { useState, useContext, useEffect } from 'react';
import {FirebaseContext, AuthContext} from '../../store/Context'
import { useHistory, Link } from 'react-router-dom';

import Logo from '../../olx-logo.png';
import './Login.css';

function Login() {

  const [email,setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passError, setPassError] = useState('');
  const {firebase} = useContext(FirebaseContext);
  const {user} = useContext(AuthContext)
  const history = useHistory()

  useEffect(()=> {
    console.log(user);
    if(user) {
      history.push('/');
    }
  },[])

  const handleLogin = (e)=> {
    e.preventDefault()

    let valid = true;

    setEmailError('')
    setPassError('')

    if(password.trim()== "") {
      setPassError('Enter Password')
      valid = false
    } else if(password.length < 6 ) {
      setPassError('Password must be 6 character');
      valid = false
    }

    if (email.trim() === '') {
      setEmailError('Please enter email');
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Email format is invalid');
      valid = false;
    }

    if(!valid) return 

    firebase.auth().signInWithEmailAndPassword(email, password).then(()=> {
      history.push('/');
    }).catch((error)=> {
      console.log(error)
    })


  }

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            onChange={(e)=> setEmail(e.target.value)}
          />
          <p className= 'text-danger'>{emailError}</p>
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            onChange={(e)=>setPassword(e.target.value)}
          />
          <p className='text-danger'>{passError}</p>
          <br />
          <br />
          <button>Login</button>
        </form>
        <Link to='/signup' style={{ textDecoration: 'none', color: 'inherit' }}>Signup</Link>
      </div>
    </div>
  );
}

export default Login;
