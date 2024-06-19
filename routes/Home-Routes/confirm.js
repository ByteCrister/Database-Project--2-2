// Route to register a new user
const confirmRouter = require("express").Router();
const dataBase = require("../../models/DB");

confirmRouter.get("/confirm", (req, res) => {
  const { email, firstName, lastName, password } = req.query;

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
      }else{

        request.session.isLogOut = false;
        request.session.isAdminLoggedIn = false;
        request.session.isLoggedIn = true;
        request.session.userId = data.insertId;
  
        console.log("New user entered successfully - User ID : " + data.insertId);
        // response.json({ success: true });
        response.redirect('/');
      }

    }
  );
});

module.exports = confirmRouter;