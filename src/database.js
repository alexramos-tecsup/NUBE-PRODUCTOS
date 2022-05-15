require("dotenv").config();
const moongose = require("mongoose");

const user = process.env.USER;
const password = process.env.PASSWORD;
const dbname = process.env.DBNAME;

const url = `mongodb+srv://${user}:${password}@Cluster0.ofr3o.mongodb.net/${dbname}?retryWrites=true&w=majority`;

module.exports = () => {
  const connect = () => {
    moongose.connect(url, (err) => {
      if (err) {
        console.log("Error en la conexion" + err);
      } else {
        console.log("Conectado");
      }
    });
  };
  connect();
};
