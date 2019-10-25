import React, { useState } from "react";
import axios from "axios";
import { Card, Button, Accordion } from "react-bootstrap";
// import { Button } from 'react-bootstrap/Button'

const Explore = props => {
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");
  const [apiData, setApiData] = useState({});
  const [isInCollection, setIsInCollection] = useState(false);

  const handleInputChange = e => {
    setQuery(e.target.value);
  };

  const handleQuerySubmit = e => {
    e.preventDefault();
    axios
      .post("/explore/", {
        query: query
      })
      .then(res => {
        if (res.data.type === "error") {
          setMessage(res.data.message);
        } else {
          setApiData(res.data);
        }
      });
  };

  const addToCollection = album => {
    axios.post("/collection", {
      id: props.user._id,
      title: album.title,
      artist: album.artist,
      image: album.cover_image,
      year: album.year,
      label: album.label[0],
      genre: album.genre[0]
    });
    console.log(`Adding ${album.title} to the collection`);
  };

  const addToWantList = album => {
    console.log(`Adding ${album.title} to the Want List`);
  };

  let discogsData;

  if (apiData.data) {
    discogsData = apiData.data.results.map((item, i) => {
      return (
        <Accordion key={i}>
          <Card className="release-card" style={{ width: "18rem" }}>
            <Card.Img variant="top" src={item.cover_image} alt={item.title} />
            <Card.Body>
              <Card.Title>{item.title}</Card.Title>
              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                More Information
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Text>
                  <span>{item.year}</span> <br />
                  <span>{item.label[0]}</span> <br />
                  <span>{item.genre[0]}</span> <br />
                  Tags: <br />
                  {item.style.map((style, i) => {
                    return <span key={i}>{style}, </span>;
                  })}{" "}
                  <br />
                  <span>{`${item.community.have} users have this record.`}</span>{" "}
                  <br />
                  <span>{`${item.community.want} users want this record.`}</span>
                </Card.Text>
              </Accordion.Collapse>
            </Card.Body>
            <Button
              id={i}
              onClick={() => addToCollection(item, i)}
              variant="dark"
              className="add-btn"
            >
              Add To Collection
            </Button>
            <Button
              onClick={() => addToWantList(item)}
              variant="dark"
              className="add-btn"
            >
              Add To Want List
            </Button>
          </Card>
        </Accordion>
      );
    });
  } else {
    discogsData = message;
  }

  return (
    <main>
      <header>Search By Artist or Album Title:</header>
      <div className="query-input">
        <input
          onChange={handleInputChange}
          type="text"
          placeholder="Search"
        ></input>
        <button onClick={handleQuerySubmit}>Go</button>
      </div>
      <div className="show-results">{discogsData}</div>
    </main>
  );
};

export default Explore;
