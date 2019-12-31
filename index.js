const express = require('express');
const next = require('next');
const http = require('http');
const fs = require('fs');

const port = parseInt(process.env.PORT, 10) || 3000;
const nextApp = next({ dev: process.env.NODE_ENV !== 'production' });
const nextRequestHandler = nextApp.getRequestHandler();

// I decided to use next for this one as it leverages some decision making on
// routing, styling and overall project foundation. Also it enables me to actually
// write an express backend without much complication. (pun intended)
nextApp
  .prepare()
  // Testing will be done adding a file to the data folder so the most practical way to serve
  // incident data should be actually importing and loading every incident in memory.
  // This is not necessarily bad as whilst source data is *little*, and it can fit in memory,
  // performance will be unmatched vs spinning up the a complete database + connection stack.
  .then(() => fs.promises.readdir(`${__dirname}/data`))
  .then(files => files.map(file => ({ id: file.split('.')[0], ...require(`./data/${file}`) })))
  .then(contents => contents.reduce((incidents, incident) => ({ ...incidents, [incident.id]: incident }), {}))
  .then((incidents) => {
    const app = express();
    const httpServer = http.Server(app);

    // Only two endpoints will be needed.
    app.get('/api/incidents', (req, res) => res.json(Object.values(incidents)));
    app.get('/api/incidents/:id', ({ params: { id } }, res) => {
      const incident = incidents[id];
      return incident
        ? res.json(incident)
        : res.status(404).send();
    });

    app.get('*', (req, res) => nextRequestHandler(req, res));

    httpServer.listen(port, '0.0.0.0', err => {
      if (err) { throw err }
      console.log(`> Ready on http://localhost:${port}`);
    });
  }).catch(console.error);
