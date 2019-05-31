const mongoose = require("mongoose");

const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");

// Middlewares
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");

// Mongoose Model
const Survey = mongoose.model("surveys");

module.exports = app => {
  // Create Survey
  app.post("/api/surveys", requireLogin, requireCredits, (req, res) => {
    const { title, subject, body, recipients } = req.body;

    // Instance of a survey
    const survey = new Survey({
      title,
      subject,
      body,
      // Convert the comma separated string to an array of objects with the email as a property
      recipients: recipients.split(",").map(email => {
        return { email: email.trim() };
      }),
      // Link current user to survey
      _user: req.user.id,
      dateSent: Date.now()
    });

    // Send email with our survey data
    const mailer = new Mailer(survey, surveyTemplate(survey));
    mailer.send();
  });
};
