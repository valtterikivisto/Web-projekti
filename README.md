# Website about my Steam profile

## Intro

The website displays general information from my Steam profile using the Steam API. The website has three pages. The first page is about my profile, the second is about my friends, and the third is about the games I own.

## How the website works
The website uses JavaScript, CSS and HTML. JavaScript is used to fetch information from a local server and to add some elements to the pages.

## How to use the website

The website needs an Express server to perform the API requests because it is not possible to perform Steam API requests directly from a client.

You need to clone this repository to your local computer, move into steam-server directory and execute following commands:

```
npm install express --save
npm install cors
```
If you don't have Node.js installed, you should install it first. Then add the API key to line 11 of the app.js file. After that, start your local server by entering the following command:

```
node app.js
```

After that you should be able to open html-documents and view the pages!
