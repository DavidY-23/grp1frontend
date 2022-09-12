import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './styles/CreateAccount.css'
import "@fontsource/comic-neue";

class CreateAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            confirm_password: ''
        }
        // this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
        // this.email_handler = this.email_handler.bind(this);
        // this.confirm_password_handler = this.confirm_password_handler.bind(this);
        // this.password_handler = this.password_handler.bind(this);
    }
    //
    email_handler = (event) => {
        this.setState({
            email: event.target.value
        });
    }

    password_handler = (event) => {
        this.setState({
            password: event.target.value
        });
    }

    confirm_password_handler = (event) => {
        this.setState({
            confirm_password: event.target.value
        });
    }

    handleSubmit = async event => {
        //Special character condition
        let special = /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/;
        event.preventDefault(); //prevent reload after pressing submit
        if (this.state.email === '' || this.state.email === null || this.state.password === '' || this.state.password === null || this.state.confirm_password === '' || this.state.confirm_password === null || !this.state.email.replace(/\s/g, '').length || !this.state.password.replace(/\s/g, '').length || !this.state.confirm_password.replace(/\s/g, '').length) {
            alert("All fields must be filled");
            return;
        }
        else if (this.state.password !== this.state.confirm_password) {
            alert('Your password and confirmation does not match, please try again');
            return;
        }
        else if (this.state.password.search(/[a-z]/i) < 0) {
            alert('Your password must contain at least one letter');
            return;
        }
        else if (this.state.password.search(/[0-9]/) < 0) {
            alert('Your password must contain one digit');
            return;
        }
        else if (!special.test(this.state.password)) {
            alert('Your password must contain one special character');
            return;
        }
        console.log(this.state);
    }

    render() {
        return (
            // Using this div tag to change background color of only this page
            <div className='CreateAccountBody'>
                <form className='login-form' onSubmit={(e) => this.handleSubmit(e)}>
                    <div className='welcome'>WELCOME!</div>
                    <div className='input-container'>
                        <input className='input-user' value={this.state.email} onChange={this.email_handler} placeholder="Email" type="text" name="uname" />
                    </div>
                    <div className="input-container">
                        <input className='input-password' value={this.state.password} onChange={this.password_handler} type="password" placeholder="Password" name="pass" />
                    </div>
                    <div className="input-container">
                        <input className='input-confirm' value={this.state.confirm_password} onChange={this.confirm_password_handler} type="password" placeholder="Confirm Password" name="pass" />
                    </div>
                    <button className="button-container"> SIGN UP
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
}
export default CreateAccount;