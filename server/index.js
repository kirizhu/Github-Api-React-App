const express = require('express');
const app = express();
const axios = require('axios');

const port = 3001;

const mapData = ({
  name,
  login,
  followers,
  following,
  public_repos,
  avatar_url,
  created_at,
  bio,
}) => {
  return {
    name,
    login,
    followers,
    following,
    public_repos,
    avatar_url,
    created_at: created_at.slice(0, 4),
    bio,
  };
};

app.get('/api/user/:user', (req, res) => {
  (async function () {
    try {
      const response = await axios.get(
        `https://api.github.com/users/${req.params.user}`
      );
      let userObj = mapData(response.data);
      res.send(userObj);
    } catch (error) {
      throw error;
    }
  })().catch((e) => {
    res.send(e);
  });
});

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
