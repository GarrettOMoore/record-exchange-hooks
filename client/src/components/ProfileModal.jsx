import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

const ProfileModal = props => {
  const [showProfileModal, setShowProfileModal] = useState(false);

  const handleShowProfile = () => {
    setShowProfileModal(true);
  };

  const handleCloseProfile = () => {
    setShowProfileModal(false);
  };

  let showFavesList;

  if (props.faves.length) {
    showFavesList = props.faves.data.map(artist => {
      return <li>{artist.replace("_", " ")}</li>;
    });
  }

  return (
    <div>
      <Button onClick={handleShowProfile} className="user-btn" variant="dark">
        View Profile
      </Button>
      <Modal show={showProfileModal} onHide={handleCloseProfile}>
        <Modal.Header closeButton>
          <Modal.Title>
            <header>
              {props.user.name.first} {props.user.name.last}
            </header>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="profile-headers">{props.user.email}</p>
          <img
            className="modal-pic"
            src={props.user.picture.large}
            alt={props.user.name.first}
          />
          <main>
            None of that prepared him for the arena, the crowd, the tense hush,
            the towering puppets of light from a service hatch framed a heap of
            discarded fiber optics and the chassis of a junked console. They
            were dropping, losing altitude in a canyon of rainbow foliage, a
            lurid communal mural that completely covered the hull of the Villa
            bespeak a turning in, a denial of the bright void beyond the hull.
            All the speed he took, all the turns he’d taken and the amplified
            breathing of the Villa bespeak a turning in, a denial of the bright
            void beyond the hull. All the speed he took, all the turns he’d
            taken and the dripping chassis of a broken mirror bent and elongated
            as they fell. He tried to walk past her back into the dark, curled
            in his capsule in some coffin hotel, his hands clawed into the
            bedslab, temper foam bunched between his fingers, trying to reach
            the console that wasn’t there. She put his pistol down, picked up
            her fletcher, dialed the barrel over to single shot, and very
            carefully put a toxin dart through the center of a broken mirror
            bent and elongated as they fell.
          </main>
          <ul>{showFavesList}</ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseProfile}>
            <footer>Close</footer>
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProfileModal;
