const google = require("googleapis").google;
const { OAuth2Client } = require("google-auth-library");

class GoogleOAuth2 {
  /**
   * Google Config Settings
   * @constructor
   * @param {object} googleConfig - google config object
   * @param {string} googleConfig.clientId - clientID can be retrived from google apis
   * @param {string} googleConfig.clientSecret - clientSecret can be retrived from google apis
   * @param {string} googleConfig.redirect - redirect URL after auth, should match with redirect in Google APIs
   */
  constructor(options) {
    this.googleConfig = options;
    this.defaultScope = ["profile", "email"];
  }

  createConnection() {
    return new google.auth.OAuth2(
      this.googleConfig.clientId,
      this.googleConfig.clientSecret,
      this.googleConfig.redirect
    );
  }

  getConnectionUrl(auth) {
    return auth.generateAuthUrl({
      access_type: "offline",
      prompt: "consent",
      scope: this.defaultScope,
    });
  }

  urlGoogle() {
    const auth = this.createConnection();
    const url = this.getConnectionUrl(auth);
    return url;
  }
  /**
   * Gets details from Google's Server post Authentication
   * @param {string} code - Code returned after successful auth as a query in url
   */
  async getGoogleAccountFromCode(code) {
    const auth = this.createConnection();
    const client = new OAuth2Client(this.googleConfig.clientID);
    const data = await auth.getToken(code);
    const { id_token } = data.tokens;
    // auth.setCredentials(tokens);
    const ticket = await client.verifyIdToken({
      idToken: id_token,
      audience: this.googleConfig.clientID,
    });
    const payload = ticket.getPayload();
    return payload;
  }
}
module.exports = GoogleOAuth2;
