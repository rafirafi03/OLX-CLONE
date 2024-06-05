import React, { useState,useContext } from 'react';

import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../store/Context';
import { useHistory,Link } from 'react-router-dom';

export default function Signup() {

  const history = useHistory()
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passError, setPassError] = useState('');
  const {firebase} = useContext(FirebaseContext)

  const handleSubmit = (e) => {

    e.preventDefault();

    let valid = true;

    setNameError('')
    setEmailError('')
    setPhoneError('')
    setPassError('')

    const validateEmail = (email) => {
      const emailRegex = /^\S+@\S+\.\S+$/;
      return emailRegex.test(email);
    };

    if (!validateEmail(email)) {
      setEmailError('Email format is invalid');
      valid = false;
    }

    if(email.trim()=='') {
      setEmailError('Please Enter Email')
      valid = false
    }

    if(password.trim()== "") {
      setPassError('Enter Password')
      valid = false
    } else if(password.length < 6 ) {
      setPassError('Password must be 6 character');
      valid = false
    }

    if(username.trim()== "") {
      setNameError('Enter Name')
      valid = false
    }

    if (phone.trim()==='') {
      setPhoneError('Enter mobile number')
      valid = false
    } else if(phone.length < 10 || phone.length > 10) {
      setPhoneError('Invalid Mobile number');
      valid = false;
    }

    if( ! valid) return false


    firebase.auth().createUserWithEmailAndPassword(email, password).then((result)=> {
      result.user.updateProfile({displayName: username}).then(()=> {
        firebase.firestore().collection('users').add({
          id:result.user.uid,
          username:username,
          phone:phone
        }).then(()=>{
          history.push('/login')
        })

      })
    })
    .catch((error)=> {
      console.log('errorrrr',error)
    })
  }


  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            id="username"
            name="name"
          />
          <p className='text-danger'>{nameError}</p>
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="text"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            id="email"
            name="email"
          />
          <p className='text-danger'>{emailError}</p>
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
            id="phone"
            name="phone"
          />
          <p className='text-danger'>{phoneError}</p>
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            id="password"
            name="password"
          />
          <p className='text-danger'>{passError}</p>
          <br />
          <br />
          <button>Signup</button>
        </form>
        <Link to='/login' style={{ textDecoration: 'none', color: 'inherit' }}>Login</Link>
      </div>
    </div>
  );
}
