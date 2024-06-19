const path = require("path");
const bcrypt = require("bcrypt");
const dataBase = require("../../models/DB");
const nodemailer = require("nodemailer");
require("dotenv").config();

exports.getSignIn = (request, response) => {
  response.sendFile(path.join(__dirname + "/../../views/signIn.html"));
};

exports.postSignIn = async (request, response) => {
  try {
    const firstName = request.body.firstName.trim();
    const lastName = request.body.lastName.trim();
    const email = request.body.email.trim();
    const password = await bcrypt.hash(request.body.password.trim(), 10);

    const signInSql = "SELECT email FROM users WHERE email=?";
    dataBase.query(signInSql, [email], (error, returnEmail) => {
      if (error) {
        console.log(error);
        response
          .status(500)
          .json({ success: false, message: "Internal Server Error" });
      } else {
        if (returnEmail.length === 0) {
          // ---------------------------------
          // // Configure nodemailer
          // const transporter = nodemailer.createTransport({
          //   service: "gmail",
          //   auth: {
          //     user: process.env.EMAIL,
          //     pass: process.env.EMAIL_PASSWORD,
          //   },
          // });

          // // Generate email confirmation link
          // const confirmationLink = `/confirm?email=${email}&firstName=${firstName}&lastName=${lastName}&password=${password}`;

          // // Send email
          // const mailOptions = {
          //   from: process.env.EMAIL,
          //   to: email,
          //   subject: "Email Confirmation",
          //   text: `Please confirm your email by clicking on the following link: ${confirmationLink}`,
          // };

          // transporter.sendMail(mailOptions, (error, info) => {
          //   if (error) {
          //     console.log("Error sending email "+ error);
          //   } else {
          //     console.log("Confirmation email sent - "+info);
          //     response.json({ success: true });
          //   }
          // });

          //----------------------------------

            const insertUserInfoSql =
              "INSERT INTO users (first_name, last_name, email, email_password, sign_In_time, sign_In_date) VALUES (?, ?, ?, ?, CURRENT_TIME, CURRENT_DATE)";
            dataBase.query(
              insertUserInfoSql,
              [firstName, lastName, email, password],
              (error, data) => {
                if (error) {
                  console.log(error);
                  response
                    .status(500)
                    .json({ success: false, message: "Internal Server Error" });
                }

                  request.session.isLogOut = false;
                  request.session.isAdminLoggedIn = false;
                  request.session.isLoggedIn = true;
                  request.session.userId = data.insertId;

                  console.log(
                    "New user entered successfully - User ID : " + data.insertId
                  );
                  response.json({ success: true });
              }
            );
        } else {
          console.log("Email already exists:", returnEmail[0].email);
          response.json({ success: false, message: "Email already exists" });
        }
      }
    });
  } catch (error) {
    console.error(error);
    response
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
