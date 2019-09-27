import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Collection = (props) => {
	const [collection, setCollection] = useState([]);

	useEffect(() => {
		console.log(props.user._id)
			axios.get(`/collection/${props.user._id}`).then( res => {
				console.log(res.data)
			})
	}, [props.user]);

	return (
		<div className='main'>
			{console.log(collection)}
			<h1>{`${props.user.name}'s Collection:`}</h1>
		</div>
	)
}

export default Collection