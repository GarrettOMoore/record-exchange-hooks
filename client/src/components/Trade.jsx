import React, { useState } from "react";
import { Card, Button, Accordion } from "react-bootstrap";

const Trade = props => {
  const [accordionOpen, setAccordionOpen] = useState(false);
  let showTrades = props.collection.map((item, i) => {
    if (item.isTrade === true) {
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
                onClick={() => props.addToTrade(item._id)}
                variant="dark"
                className="delete-btn"
              >
                Add To Trade
              </Button>
              <Button
                onClick={() => props.deleteAlbum(item._id)}
                variant="dark"
                className="delete-btn"
              >
                Remove From Collection
              </Button>
            </Card>
          </Accordion>
        </div>
      );
    }
  });

  return (
    <div>
      <header>{`${props.user.name}'s Trades:`}</header>
      <span>{showTrades}</span>
    </div>
  );
};

export default Trade;
