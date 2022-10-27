import React, { Component, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles/CreateAccount.css'
import "@fontsource/comic-neue";
import { auth } from "./firebase.js"
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-auth.js"

function CreateAccount() {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [confirm_password, setconfirm_password] = useState('');

    const register = async () => {
        const user = await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log("user created")

                window.location.href = "FirstTimeLogin"

                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
                console.log(error.code + error.message)
            });
    }

    const handleSubmit = async event => {
        //Special character condition
        let special = /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/;
        event.preventDefault(); //prevent reload after pressing submit
        if (email === '' || email === null || password === '' || password === null || confirm_password === '' || confirm_password === null || !email.replace(/\s/g, '').length || !password.replace(/\s/g, '').length || !confirm_password.replace(/\s/g, '').length) {
            alert("All fields must be filled");
            return;
        }
        else if (password !== confirm_password) {
            alert('Your password and confirmation does not match, please try again');
            return;
        }
        else if (password.search(/[a-z]/i) < 0) {
            alert('Your password must contain at least one letter');
            return;
        }
        else if (password.search(/[0-9]/) < 0) {
            alert('Your password must contain one digit');
            return;
        } 
        else if (!special.test(password)) {
            alert('Your password must contain one special character');
            return;
        }
        console.log(email);
        console.log(password);
        console.log(confirm_password)
    }

    return (
        // Using this div tag to change background color of only this page
        <div className='CreateAccountBody'>
            <form className='login-form' onSubmit={(e) => handleSubmit(e)}>
                <div className='welcome'>WELCOME!</div>
                <div className='input-container'>
                    <input className='input-user' value={email} onChange={(e) => setemail(e.target.value)} placeholder="Email" type="text" name="uname" />
                </div>
                <div className="input-container">
                    <input className='input-password' value={password} onChange={(e) => setpassword(e.target.value)} type="password" placeholder="Password" name="pass" />
                </div>
                <div className="input-container">
                    <input className='input-confirm' value={confirm_password} onChange={(e) => setconfirm_password(e.target.value)} type="password" placeholder="Confirm Password" name="pass" />
                </div>
                <button className="button-container" onClick={register}> SIGN UP
                </button>
                <div className='password-checker'>Password must contain at least one letter, digit, and special character </div>
                <div className='account'>Have an account?</div>
                <Link to={'/LoginPage'}>
                    <div className='login-link'>Login</div>
                </Link>
            </form>
        </div >
    )
}

export default CreateAccount;