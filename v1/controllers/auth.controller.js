const sendEmail = require("../helpers/email");
const { createToken } = require("../helpers/token");
const authService = require("../services/auth.service");
const authCtrl = {
  handleLogin(req, res) {
    const { origin } = req.headers;
    authService
      ?.userLogin({ ...req?.body, origin })
      .then(({ accesstoken, refreshtoken, data }) => {
        // add token in response header
        res.set("x-accesstoken", accesstoken);
        res.set("x-refreshtoken", refreshtoken);
        res?.status(200).send({ message: "Login Sucessful", data });
      })
      .catch((err) => {
        console.error(err);
        res?.status(500).send({ message: err, error: null });
      });
  },
  handlePasswordReset(req, res) {
    const { email } = req.body;

    authService
      ?.passwordResetLink(email)
      .then((result) => {
        //generate a link
        // link=baseroute+token
        // http://localhost:3000+/change-password+token

        const { origin } = req.headers;
        const token = createToken(
          { email: result?.email, id: result?._id,role:result?.role,type:"access",origin },
          60 * 10
        );
        const link = `${origin}/reset-password/${token}`;
        //send email
        const to = email;
        const from = "priya.r.bhondwe@gmail.com";
        const subject = "Password reset link from Topper Hotel";
        const text = `Dear Customer, You Can reset the password by using below link. 
        The link is valid for 10 minutes only
        Copy the link and paste in the address bar of the web browser. ${link} `;
        const html = `
        <p>Dear Customer, </p>    
        <p>You Can reset the password by using below link.</p> 
        <p>The link is valid for 10 minutes only</p>
        <a href='${link}'>Reset link</a>
        `;
        console.log(link);
        sendEmail({ to, from, subject, text, html })
          .then((result) => {
            res.status(200).send({ message: "email sent", data: {} });
          })
          .catch((error) => {
            res.status(500).send({ message: "email not sent", error });
          });
      })
      .catch((error) => {
        console.error(error);
        res.status(404).send({ message: "User is Not available", error });
      });
  }, //handlePasswordReset
  async handleTokenValidation(req, res) {
    const { token } = req.body;
    const payload = await authService.validateToken(token).catch(console.error);
    console.log("ctrl payload:", payload);
    if (payload) {
      res
        .status(200)
        .send({ message: "Valid token", data: { id: payload?.id } });
    } else {
      res.status(401).send({ message: "Invalid token", error: null });
    }
  }, //token validation
  async handleRefreshToken(req, res) {
    const refreshT = req?.body?.token;
    const { origin: clientDomain } = req.headers;
    const tokens = await authService.refreshToken({ refreshT, clientDomain });
    if (!tokens) {
      // if invalid token
      res
        .status(403)
        .send({ message: "Session Expired! Login again", error: null });
    } else {
      res.status(200).send({ message: "Token refreshed", data: tokens });
    }
  },
};

module.exports = authCtrl;
