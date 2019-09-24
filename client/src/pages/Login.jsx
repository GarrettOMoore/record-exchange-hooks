import React, {useState} from 'react'
import axios from 'axios'

const Login = (props) => {

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [message, setMessage] = useState('');

	function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
		console.log("email: ", email);
		console.log("password", password);
      e.preventDefault();
      axios.post('/auth/login', {
          email: email,
          password: password
      }).then( res => {
          if (res.data.type === 'error') {
            setMessage(res.data.message);
          } else {
              localStorage.setItem('mernToken', res.data.token)
              props.liftToken(res.data)
              props.getItems()
              props.history.push('/mypantry')
          }
      }).catch( err => {
          setMessage(err)
      })
  }
	return (
		<div className='main'>
        <h3>Log into your account:</h3>
				<div className="sign-up-form">
					<form onSubmit={handleSubmit}>
						<input type="email" name="email" placeholder="Email" value={email} onChange={handleEmailChange}></input>
						<input type="password" name="password" placeholder="Password" value={password} onChange={handlePasswordChange}></input>
						<button>Send</button>
					</form>
			</div>
		</div>
	)
}

export default Login 