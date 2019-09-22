import React, { useState } from 'react'
import SignUpForm from '../components/SignUpForm';

const SignUp = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [city, setCity] = useState('');
	const [state, setUserState] = useState('');

	function handleNameChange(e) {
		console.log(e.target.value)
		setName(e.target.value)
	};

	function handleEmailChange(e) {
		setEmail("TEST")
	};

	function handlePasswordChange(e) {
		setPassword("TEST")
	};

	function handleCityChange(e) {
		setCity("TEST")
	};

	function handleStateChange(e) {
		setUserState("TEST")
	}

	function handleSubmit() {
		console.log("name: ", name)
	}

	return (
		<div>
		<h3>SIGN UP</h3>
			<input type="text" name="name" value={name} onChange={handleNameChange}></input>
			{/* <SignUpForm 
				handleName={handleNameChange} 
				handleEmail={handleEmailChange} 
				handlePassword={handlePasswordChange} 
				handleCity={handleCityChange} 
				handleState={handleStateChange}
				name={name}
			/> */}
			<button onClick={handleSubmit}>TEST SUYBMIT</button>
		</div>
	)
}

export default SignUp