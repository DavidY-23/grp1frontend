import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './styles/CreateAccount.css'
import "@fontsource/comic-neue";
import { Navigate } from 'react-router';
import './styles/Overview.css'
import triangle from '../images/triangle.png'


class Overview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      weight: null,
      height: null,
      gender: '',
      age: null,
      email: 'dummyemail@gmail.com',
      about_user: null,
      edit_mode: false,
      redirect: false,
    }
    // this.handleChange = this.handleChange.bind(this);
  }
  //Event onChange handler
  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
    console.log(this.state);
  }
  change = () => {
    this.setState({
      edit_mode: true
    });
    console.log(this.state.edit_mode)
  }

  handleSubmit = () => {
    this.setState({
      redirect: true
    })
    console.log(this.state)
  }

  //This might be more of an edit form
  render() {
    // if (this.state.edit_mode === true) {
    if (this.state.redirect == true) {
      return (<Navigate to="/home/profile" />)
    }
    return (
      <div className='OverviewBody'>
        <form className='overview-form' onSubmit={(e) => this.handleSubmit(e)}>
          <div class='triangle-image'>
            <img src={triangle} alt='' align='right' ></img>
          </div>
          <div className='first_name' >Name
            <input className='first_name_container' name='name' value={this.state.name} onChange={this.onChange} />
          </div>
          <div className='age' >Age
            <input className='age_container' type='number' name='age' value={this.state.age} onChange={this.onChange} />
          </div>
          <div className='gender' >Gender
            <input className='gender_container' name='gender' value={this.state.gender} onChange={this.onChange} />
          </div>
          <div className='weight' >Weight
            <input className='weight_container' type='number' name='weight' value={this.state.weight} onChange={this.onChange} />
          </div>
          <div className='height' >Height
            <input className='height_container' type='text' name='height' value={this.state.height} onChange={this.onChange} />
          </div>
          <div className='about_me' >About Me
            <textarea className='about_container' size="100" name='about_user' value={this.state.about_user} onChange={this.onChange} />
          </div>
          {/* Editing Button */}
          <button className='edit_button' > Submit changes</button>
        </form>
      </div>
    )
  }
}
export default Overview;