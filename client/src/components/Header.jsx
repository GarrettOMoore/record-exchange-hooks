import React from 'react'
import Logo from '../whitelogo.png'
import Nav from './Nav'

const Header = (props) => {
	return (
		<div className="header">
			<img src={Logo} alt="Record Exchange Logo" width={'225rem'} height={'200rem'} />
			<Nav logout={props.logout}/>
		</div>
	)
}

export default Header