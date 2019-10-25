const express = require("express");
const router = express.Router();
const axios = require("axios");

// Route for signup
router.post("/", (req, res) => {
  var search = req.body.query;
  var url =
    "https://api.discogs.com/database/search?q=" +
    encodeURI(search) +
    "&type=master&key=" +
    "iTRElvXmFbRQpLPRNyHY" +
    "&secret=" +
    "TQWdIVlQOVjgQLmMIBSxzvdXsyaPEaEP";
  axios
    .get(url)
    .then(result => {
      res.json({
        data: result.data
      });
    })
    .catch(error => {
      res.json({
        error: error
      });
    });
});

router.post("/artist", (req, res) => {
  var id = req.body.id;
  var url =
    "https://api.discogs.com/database/artists/?q=" +
    encodeURI(id) +
    "&type=master&key=" +
    "iTRElvXmFbRQpLPRNyHY" +
    "&secret=" +
    "TQWdIVlQOVjgQLmMIBSxzvdXsyaPEaEP";
  axios
    .get(url)
    .then(result => {
      res.json({
        data: result.data
      });
    })
    .catch(error => {
      res.json({
        error: error
      });
    });
});

router.get("/favorites", (req, res) => {
  let url = `http://names.drycodes.com/10?format=json`;
  axios.get(url).then(results => {
    console.log(results.data);
    res.send(results.data).catch(err => {
      res.send(err);
    });
  });
});

module.exports = router;
