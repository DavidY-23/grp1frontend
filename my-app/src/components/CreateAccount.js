import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './styles/CreateAccount.css'

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

    // email_handler = (event) => {
    //     this.setState({
    //         email: event.target.value
    //     });
    // }

    // password_handler = (event) => {
    //     this.setState({
    //         password: event.target.value
    //     });
    // }

    // confirm_password_handler = (event) => {
    //     this.setState({
    //         confirm_password: event.target.value
    //     });
    // }

    // handleChange(event){
    //     this.setState({
    //         [event.target.name]: event.target.value
    //     });
    // }

    render() {
        return (
            // Using this div tag to change background color of only this page
            <div className='CreateAccountBody'> 
                <form className='login-form'>
                    <div className='welcome'>WELCOME!</div>
                    <div className='input-container'>
                        <input className='input-user' placeholder="Email" type="text" name="uname" required />
                    </div>
                    <div className="input-container">
                        <input className='input-password' type="password" placeholder="Password" name="pass" required />
                    </div>
                    <div className="input-container">
                        <input className='input-confirm' type="password" placeholder="Confirm Password" name="pass" required />
                    </div>
                    <button className="button-container"> SIGN UP
                    </button>
                    <div className='account'>Have an account?</div>
                    <div className='login-link'>Login</div>
                </form>
            </div>
        )
    }
}
export default CreateAccount;