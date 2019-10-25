import React, { useState, useEffect } from "react";
import ProfileModal from "../components/ProfileModal";
import axios from "axios";
import MessageModal from "../components/MessageModal";

const Community = props => {
  const [users, setUsers] = useState("");
  const [favoriteArtists, setFavoriteArtists] = useState([]);

  let showUsers;

  useEffect(() => {
    fetch(`https://randomuser.me/api/?results=5`)
      .then(res => {
        return res.json();
      })
      .then(users => {
        setUsers(users.results);
      })
      .then(() => {
        axios
          .get(`/explore/favorites`)
          .then(faves => {
            console.log(faves);
            setFavoriteArtists(faves);
          })
          .catch(err => {
            console.log("FUUUUCK: ", err);
          });
      });
  }, []);

  let showFavesList;

  // if (favoriteArtists.data) {
  //   showFavesList = favoriteArtists.data.map(artist => {
  //     return <li>{artist.replace("_", " ")}</li>;
  //   });
  // }

  if (users) {
    showUsers = users.map((user, i) => {
      return (
        <div className="user-box" key={i}>
          <h2>
            {user.name.first} {user.name.last}
          </h2>
          <h3>{`Collection: ${Math.floor(Math.random() * 3000)}`}</h3>
          <h5>
            {user.location.city}, {user.location.state}
          </h5>
          <h5>{user.location.country}</h5>
          <img
            className="user-pic"
            src={user.picture.medium}
            alt={user.login.username}
          />
          <ProfileModal user={user} faves={favoriteArtists} />
          <MessageModal user={user} />
        </div>
      );
    });
  }

  return (
    <div className="main">
      <h1> {`Hey, ${props.user.name}!`}</h1>
      <h3>Check out the Record Exchange User Community:</h3>
      {/* <ul>{showFavesList}</ul> */}
      <div className="show-users">{showUsers}</div>
    </div>
  );
};

export default Community;
