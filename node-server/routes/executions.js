const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

router.post('/', (req, res) => {
    fetch(
        'http://localhost:5000/executions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(req.body)
        }
      )
      .then(res => res.json())
      .then(json => {res.send(json); console.log(json);})
      .catch(err => console.log(err))
});

module.exports = router;