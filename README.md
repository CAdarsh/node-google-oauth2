<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/cadarsh/node-google-oauth2">
    <img src="images/authentication.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Node Google OAuth2🔐</h3>

  <p align="center">
    A simple authentication flow for Google OAuth2 
    <br />
    <a href="https://github.com/cadarsh/node-google-oauth2"><strong>Explore the docs »</strong></a>
    <br />
    <a href="https://github.com/cadarsh/node-google-oauth2/issues">Report Bug</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

This project was born out of frustration. I was under the assumption that you can plug in Passport.js, implement a strategy and things will work magically. Though there is some truth in the above statement, that's not the case when you have decoupled the client and the server i.e,
if the client and server are hosted independently. Passport.js seemlessly plugs in with templating engines, but if you're running your client on, say Next.js and use Vercel for hosting, it's not possible for you to integrate the two. <br>
This is where the <b> Node Google OAuth2 </b> package comes into picture. You can easily plug this module inside your Express code and easily implement with Google's OAuth2.

<!-- GETTING STARTED -->

## Getting Started

Refer to this article on <a href="https://cadarsh.medium.com/google-oauth2-with-nodejs-simplified-7211e084b987"> Medium. </a>

### Installation

This is an example of how to list things you need to use the software and how to install them.

```sh
npm install node-google-oauth2
```

<!-- USAGE EXAMPLES -->

## Usage

First, create a new instance of the GoogleAuth2 class. Before initializing, you must first
set up OAuth in your GCP account. <br>
<a href="https://support.google.com/cloud/answer/6158849?hl=en"> Click here for instructions. </a><br>
Make sure to note down the <b> clientId, clientSecret, redirectURL </b>, as they're required parameters
to initialize a connection with Google's OAuth servers.

```javascript
const GoogleOAuth2 = require("node-google-oauth2");
const Auth = new GoogleOAuth2({
  clientId: process.env.clientID, // e.g. asdfghjkljhgfdsghjk.apps.googleusercontent.com
  clientSecret: process.env.clientSecret, // e.g. _ASDFA%DFASDFASDFASD#FAD-
  redirect: process.env.redirect, // this must match your google api settings
});
```

Then, generate a Auth URL from Google on request. Return this link to the client and redirect the client to that url

```javascript
Router.get("/request", async (req, res) => {
  res.redirect(await GoogleOAuth2.urlGoogle()); // this method returns a link
});
```

After successful authentication, a code will be sent through a URL query to your redirect URL.

```javascript
Router.get("/redirectUrl", async (req, res) => {
  console.log(req.query.code);
  const payload = await GoogleOAuth2.getGoogleAccountFromCode(req.query.code);
  // create a user / approve the user
  user = payload;
  console.log(payload);
  //redirect after authentication
  res.redirect("/approve");
});
```

Google OAuth has never been easier😀

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->

## Contact

Adarsh C - [@cadarsh_335](https://twitter.com/cadarsh_335) - cadarsh335@gmail.com

Project Link: [https://github.com/cadarsh/node-google-oauth2](https://github.com/cadarsh/node-google-oauth2)

<!-- ACKNOWLEDGEMENTS -->

## Acknowledgements

- [Icons made by Flaticon](https://www.flaticon.com/authors/pixelmeetup)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/cadarsh/repo.svg?style=for-the-badge
[contributors-url]: https://github.com/cadarsh/repo/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/cadarsh/repo.svg?style=for-the-badge
[forks-url]: https://github.com/cadarsh/repo/network/members
[stars-shield]: https://img.shields.io/github/stars/cadarsh/repo.svg?style=for-the-badge
[stars-url]: https://api.github.com/repos/cadarsh/node-google-oauth2/stargazers
[issues-shield]: https://img.shields.io/github/issues/cadarsh/repo.svg?style=for-the-badge
[issues-url]: https://github.com/cadarsh/repo/issues
[license-shield]: https://img.shields.io/github/license/cadarsh/repo.svg?style=for-the-badge
[license-url]: https://github.com/cadarsh/repo/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/cadarsh
