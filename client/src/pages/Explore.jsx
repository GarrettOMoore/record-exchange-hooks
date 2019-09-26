import React, { useState } from 'react'
import axios from 'axios'


const Explore = () => {
	const [query, setQuery] = useState('');
	const [message, setMessage] = useState('')
	const [apiData, setApiData] = useState({});

	const handleInputChange = (e) => {
		setQuery(e.target.value);
	};

	const handleQuerySubmit = (e) => {
    e.preventDefault();
		console.log("Query: ", query);
    axios.post('/explore/', {
			query: query
    }).then( res => {
        if (res.data.type === 'error') {
          setMessage(res.data.message);
        } else {
					setApiData(res.data);
        }
    })
	};

	let discogsData;
	
	if (apiData.data) {
		console.log(apiData.data.results)
		discogsData = apiData.data.results.map((item, i) => {
			return (
				<div className='results-box' key={i}>
					<img className='result-img' src={item.cover_image} alt={item.title}/>
				</div>
			)
		})
	}

	

	return (
		<div className="main">
		<h3>Search By Artist or Album Title:</h3>
			<input onChange={handleInputChange}type="text" placeholder="Search"></input>
			<button onClick={handleQuerySubmit}>Go</button>
			<div className='show-results'>
				{discogsData}
			</div>
		</div>
	)
}

export default Explore