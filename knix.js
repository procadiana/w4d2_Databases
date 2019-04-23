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

const param = process.argv[2];
knex.from('famous_people')
    .select('id', 'first_name', 'last_name', 'birthdate')
    .where('first_name', '=',param)
    .asCallback(processDBResponse)
    .then(() => knex.destroy());


function processDBResponse(err, res){
    if (err) {
      console.log(err.stack);
      } else {
        console.log("Found " + res.length + " person(s) by the name " + param +":");
        for (i = 0; i < res.length; i++){
          console.log( i + ": " + res[i].first_name + " "+res[i].last_name + ", " + " born " + "'" + res[i].birthdate.toDateString() + "'");
        }
      }
  };
