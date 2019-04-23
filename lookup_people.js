const { Client } = require('pg');
const settings = require("./settings");
const client = new Client({
  user     : settings.user,
  password : settings.password,
  database : 'test_db',
  host     : settings.hostname,
  port     : 5432,
  ssl      : settings.ssl
});


client.connect((err) => {
  console.log("Searching...");
  const param = process.argv[2];

  function getFamousByName(name, cb){
    client.query("SELECT id, first_name, last_name, birthdate FROM famous_people WHERE first_name = $1::text ", [param], cb);
  }

  function processDBResponse(err, res){
    if (err) {
      console.log(err.stack);
      } else {
        console.log("Found " + res.rows.length + " person(s) by the name " + param +":");
        for (i = 0; i < res.rows.length; i++){
          console.log( i + ": " + res.rows[i].first_name + " "+res.rows[i].last_name + ", " + " born " + "'" + res.rows[i].birthdate.toDateString() + "'");
        }
      }
    client.end();
  };
  getFamousByName(param, processDBResponse);
});
