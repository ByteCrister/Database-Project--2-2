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

    const signInSql = `SELECT email FROM users WHERE email = ?`;
    dataBase.query(signInSql, [email], (error, returnEmail) => {
      if (error) {
        console.log(error);
        response
          .status(500)
          .json({ success: false, message: "Internal Server Error" });
      } else {
        if (
          returnEmail.length === 0 &&
          firstName.length !== 0 &&
          lastName.length !== 0
        ) {
          const insertUserInfoSql =
            "INSERT INTO users (restricted, first_name, last_name, email, email_password, sign_In_time, sign_In_date) VALUES (?, ?, ?, ?, ?, CURRENT_TIME, CURRENT_DATE)";
          dataBase.query(
            insertUserInfoSql,
            [0, firstName, lastName, email, password],
            (error, data) => {
              if (error) {
                console.log(error);
                response
                  .status(500)
                  .json({ success: false, message: "Internal Server Error" });
              } else {
                request.session.isLogOut = false;
                request.session.isAdminLoggedIn = false;
                request.session.isLoggedIn = true;
                request.session.userId = data.insertId;

                console.log(
                  "New user entered successfully - User ID : " + data.insertId
                );
                response.json({ success: true });
              }
            }
          );
        } else {
          // console.log("Email already exists:", returnEmail[0].email);
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
