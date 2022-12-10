import React, { Component, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles/CreateAccount.css'
import "@fontsource/comic-neue";
import { auth } from "./firebase.js"
import db from './firebase.js';
import { collection, doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function CreateAccount(props) {
    // The reference to the collection of Users
    const colRef = collection(db, "Users");

    // The reference to the Collection of JounralEntries
    const journalRef=collection(db, "JournalEntry");

    // The states for the user infor (email, password, confirm password)
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [confirm_password, setconfirm_password] = useState('');
    const navigate = useNavigate();

    // Create an account for a brand new user 
    async function createAccount() {
        try {
            const user = await createUserWithEmailAndPassword(auth, email, password);
            const newDocument = await setDoc(doc(db, 'Users', user.user.uid), {
                uniqueId: user.user.uid,
                userEmail: email,
            });

            // For Jounral Entry 
            const newDocForJorunalEntry = await setDoc(doc(db, 'JournalEntry', user.user.uid), {
                id: user.user.uid,
                userEmail: email,
                entries: [{title: "Enter Title", entry: "Entry Here"},]
            });
            
            navigate('/FirstTimeLogin');
            setCookie("userid", user.uid, 1);
            props.setUserID(user.user.uid);
        } catch (error) {
            console.log(error.code + error.message);
            alert(error.message);
        }
    }

    const register = (event) => {
        //Special character condition
        let special = /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/;

        //prevent reload after pressing submit
        event.preventDefault();
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
        else {
            // Now we add the user after the username and password is correct in terms of regex
            createAccount();
            console.log("Created Account");
            return;
        }
    };

    return (
        // Using this div tag to change background color of only this page
        <div className='CreateAccountBody'>
            <form className='login-form'>
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
