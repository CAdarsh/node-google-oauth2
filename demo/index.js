const express = require("express");
const app = express();
const GoogleOAuth2Class = require("node-google-oauth2@1.0.0");
require("dotenv").config;

const GoogleOAuth2 = new GoogleOAuth2Class({
  clientId:
    "469316591329-c96eq65rk1kkqlq0tktt8cqlg98uujst.apps.googleusercontent.com", // e.g. asdfghjkljhgfdsghjk.apps.googleusercontent.com
  clientSecret: "ar7240jll_9gffOJTyDnUO0q", // e.g. _ASDFA%DFASDFASDFASD#FAD-
  redirect: "http://localhost:8080", // this must match your google api settings
});

app.get("/request", (req, res) => {
  res.send(GoogleOAuth2.urlGoogle());
});

let user = {};

app.get("/", async (req, res) => {
  console.log(req.query.code);
  const payload = await GoogleOAuth2.getGoogleAccountFromCode(req.query.code);
  // create a user/ approve the user
  user = payload;
  console.log(payload);
  //redirect after authentication
  res.redirect("/approve");
});
app.get("/approve", (req, res) => {
  res.send(user);
});

app.listen("8080");
