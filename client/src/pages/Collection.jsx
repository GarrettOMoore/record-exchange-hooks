import React, { useState, useEffect } from "react";
import axios from "axios";
import Trade from "../components/Trade";
import { Tab, Tabs } from "react-bootstrap/";
import UserCollection from "../components/UserCollection";

const Collection = props => {
  const [collection, setCollection] = useState([]);
  const [key, setKey] = useState("collection");

  useEffect(() => {
    fetchCollection();
  }, [props.user, collection]);

  const fetchCollection = () => {
    axios.get(`/collection/${props.user._id}`).then(res => {
      setCollection(res.data);
    });
  };

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
        fetchCollection();
        console.log(res);
      })
      .catch(err => console.log(err));
  };

  const removeFromTrade = id => {
    axios
      .post("/collection/trade/remove", {
        id: id
      })
      .then(res => {
        fetchCollection();
      })
      .catch(err => console.log(err));
  };

  return (
    <main>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={k => setKey(k)}
      >
        <Tab eventKey="home" title="Home">
          <UserCollection
            user={props.user}
            deleteAlbum={deleteAlbum}
            addToTrade={addToTrade}
            collection={collection}
          />
        </Tab>
        <Tab eventKey="trade" title="Trade">
          <Trade
            collection={collection}
            removeFromTrade={removeFromTrade}
            deleteAlbum={deleteAlbum}
            user={props.user}
          />
        </Tab>
      </Tabs>
    </main>
  );
};

export default Collection;
