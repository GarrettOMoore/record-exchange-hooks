import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, Accordion } from "react-bootstrap";
import Trade from "../components/Trade";

const Collection = props => {
  const [collection, setCollection] = useState([]);
  const [accordionOpen, setAccordionOpen] = useState(false);

  useEffect(() => {
    axios.get(`/collection/${props.user._id}`).then(res => {
      setCollection(res.data);
    });
  }, [props.user]);

  const deleteAlbum = id => {
    axios.get(`/collection/delete/${id}`).then(res => {
      axios.get(`/collection/${props.user._id}`).then(res => {
        setCollection(res.data);
      });
    });
  };

  const addToTrade = id => {
    console.log("trading: ", id);
    axios
      .post("/collection/trade", {
        id: id
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
  };

  let showCollection = collection.map((item, i) => {
    return (
      <div key={i}>
        <Accordion>
          <Card className="release-card" style={{ width: "18rem" }}>
            <Card.Img variant="top" src={item.image} alt={item.title} />
            <Card.Body>
              <Card.Title>{item.title}</Card.Title>
              <Accordion.Toggle as={Button} variant="beige" eventKey="0">
                {accordionOpen === false
                  ? "More Information"
                  : "Less Information"}
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Text>
                  <span>{item.year}</span> <br />
                  <span>{item.genre}</span> <br />
                </Card.Text>
              </Accordion.Collapse>
            </Card.Body>
            <Button
              onClick={() => addToTrade(item._id)}
              variant="dark"
              className="delete-btn"
            >
              Add To Trade
            </Button>
            <Button
              onClick={() => deleteAlbum(item._id)}
              variant="dark"
              className="delete-btn"
            >
              Remove From Collection
            </Button>
          </Card>
        </Accordion>
      </div>
    );
  });

  return (
    <main>
      <Trade />
      <header>{`${props.user.name}'s Collection:`}</header>
      <main className="show-results">{showCollection}</main>
    </main>
  );
};

export default Collection;
