import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = (props) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, name, cpassword } = credentials;

    // Check if passwords match
    if (password !== cpassword) {
      props.showAlert("Passwords do not match", "error"); // Display error alert
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/createuser", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const json = await response.json();
      console.log(json);

      if (json.success) {
        localStorage.setItem('token', json.authtoken);
        navigate('/');
        props.showAlert("Account created successfully!", "success"); // Display success alert
      } else {
        props.showAlert("Failed to create account. Please try again.", "error"); // Display error alert
      }
    } catch (error) {
      console.error('Signup error:', error);
      props.showAlert('An error occurred during signup. Please try again.', 'error');
    }
  };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div className='mt-2'>
          <h2>Create an account</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" id="name" name="name" placeholder="Enter your name" onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" placeholder="Enter email" onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" name="password" minLength={5} placeholder="Password" onChange={onChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="cpassword">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name="cpassword" minLength={5} placeholder="Confirm Password" onChange={onChange}  required/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default SignUp;
