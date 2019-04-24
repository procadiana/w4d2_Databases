const { Client } = require('pg');
const settings = require("./settings");

var knex = require('knex')({
  client: 'pg',
  connection: {
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
  }
});

const param = process.argv;
 knex.insert([
    { first_name: param[2],
    last_name: param[3],
    birthdate: param[4]}
  ])
      .into('famous_people')
      .then( function (err, res) {
          if (err){
            console.log(err);
          }else {
            console.log(res);
          }
       })
      .then(() => knex.destroy());


