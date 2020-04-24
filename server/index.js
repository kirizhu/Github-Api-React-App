const express = require('express');
const app = express();
const axios = require('axios');

const url = ``;

const port = 8080

app.get('/api/user/:user', async (req, res) => {
    const fetchUsers = async (user) => {
        const res = await fetch(`https://api.github.com/users/${user}`);
        const data = await res.json();
        mapData(data);
      };
    res.send('Hello World!'))
}

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))