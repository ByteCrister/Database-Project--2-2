const dataBase = require("../../../../models/DB");
const path = require("path");

exports.getAdvertiseImages = (request, response) => {
  dataBase.query(`select * from ads`, (error, Advertises) => {
    if (error) {
      console.log(error);
    } else {
      dataBase.query(
        `select TextValue from movingtext where ID	= 1`,
        (err, text) => {
          response.render(
            path.join(
              __dirname,
              "../../../../public/Home.Admin/Advertise_Text/Advertise.ejs"
            ),
            { Advertises, text: text[0].TextValue }
          );
        }
      );
    }
  });
};
exports.postAdvertiseImages = (request, response) => {
  if (!request.file || !request.file.buffer) {
    response.redirect("/Advertisements");
  }
  dataBase.query(
    "INSERT INTO ads (Hide, Image) VALUES (?, ?)",
    [0, request.file.buffer.toString("base64")],
    (err, data) => {
      if (err) {
        console.error("Error inserting image into database:", err);
        return response
          .status(500)
          .send("Error inserting image into database.");
      }
      response.redirect("/Advertisements");
    }
  );
};

exports.HideAdvertise = (request, response) => {
  dataBase.query(
    `update ads set Hide = 1 where ImageID = ${request.params.ID}`,
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Hide - " + request.params.ID);
        response.redirect("/Advertisements");
      }
    }
  );
};
exports.UnhideAdvertise = (request, response) => {
  dataBase.query(
    `update ads set Hide = 0 where ImageID = ${request.params.ID}`,
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Unhide - " + request.params.ID);
        response.redirect("/Advertisements");
      }
    }
  );
};
exports.deleteAdvertise = (request, response) => {
  dataBase.query(
    `delete from ads where ImageID = ${request.params.ID}`,
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        response.redirect("/Advertisements");
      }
    }
  );
};