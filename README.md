# 911 Incident Viewer

This project contains a small webapp that will display 911 incident data served from its own API which reads such incident data from disk-stored JSON files.

This project was made using a full stack javascript approach comprised of:
* [Next.js](http://nextjs.org/)
* [Material UI](https://material-ui.com/)
* [Leaflet](https://leafletjs.com/)
* [Moment.js](https://momentjs.com/)
* [Express](https://expressjs.com/)

# Requisites
Any computer capable of running the latest stable [Node.js](https://nodejs.org/es/) release and any modern web browser will be enough. Please consult your favorite OS package manager for install instructions.

Specifically for OSX, [installing Homebrew](https://brew.sh/) and running `brew install node` will get you an appropriate version. This is preferred over the nodejs website installer as it can be cleanly upgraded/uninstalled.

In an ideal scenario, you might want to install [nvm](https://github.com/nvm-sh/nvm) over the former recommendation, as it will give you complete control over any node version you may want to use now or in the future. This tool setup however is not trivial and is not really mandatory for running this project.

# Installation
Once the latest Node.js version is installed in you machine, place yourself into this project root folder using your favorite terminal and run:

```
npm install
```

It will automatically download and install all of this project dependencies. Nothing else is required to install.

# Running
If the dependencies install step didn't throw any problems (it shouldn't), run this project just by executing:

```
npm start
```

Once you see the following message you will be able to see the project by navigating to [the url the project informs its listening in](http://localhost:3000):

```
[ ready ] compiled successfully
> Ready on http://localhost:3000
```

# Usage
UI should be pretty straightforward to use, select any row on the table or click on any popup once a marker has been clicked to make it appear. You'll be taken to the second, detail screen.

If you want to modify the data the API serves, just add/delete/modify the contents of the `data` folder. Every file in this folder will be treated as JSON and will be served in two endpoints: `/api/incidents` (list all documents) and `/api/incidents/:id` (individual incident detail)

# Development Notes
I started this in the evening as my commit history will describe, and took some time to stretch my legs and attend some stuff; so I guess it should have taken 3-4 hours of pure work. I wish I could have started this earlier to give it the love it deserves.

By having double the time I could have added all of the requested additions (historical weather forecast and parcel information) and even could have time left for some goodies like a heatmap for having a better visual feedback of the incidents relating to their location.
