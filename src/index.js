import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getDatabase, ref, set, child, get } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

const firebase = initializeApp({
    apiKey: "AIzaSyDC5fCP-dzy8j3ZCu81gw430_x5W7fEFFM",
    authDomain: "metropolis-madness-658ab.firebaseapp.com",
    databaseURL: "https://metropolis-madness-658ab-default-rtdb.firebaseio.com",
    projectId: "metropolis-madness-658ab",
    storageBucket: "metropolis-madness-658ab.appspot.com",
    messagingSenderId: "837974759915",
    appId: "1:837974759915:web:2020a55f88df1fb11261ae",
    measurementId: "G-W7JFW4ZDV8"
})

var teamLogged

function writeUserTable(team, bits, sparks, pop, carbons) {
    const db = getDatabase();
    set(ref(db, 'teams/' + team), {
        team: team,
        budget: bits,
        energy: sparks,
        population: pop,
        carbons: carbons
    });
}

function getUserTable(team) {
    const db = ref(getDatabase());
    const fields = ["team", "budget", "energy", "population", "carbons"];
    const ids = ["teamNum", "bits", "sparks", "pop", "carbon"];
    for (let i = 0; i < ids.length; i++) {
        get(child(db, 'teams/'+team+"/"+fields[i])).then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val());
                document.getElementById(ids[i]).innerHTML = snapshot.val();
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.log(error);
        })
    }
}

/*writeUserTable("team1", 5000, 50, 100, 50);
writeUserTable("team2", 5000, 50, 100, 50);
writeUserTable("team3", 5000, 50, 100, 50);
writeUserTable("team4", 5000, 50, 100, 50);*/

function readUserData(teamname, catagory) {
    const db = ref(getDatabase());
    get(child(db, 'teams/'+teamname+'/'+catagory)).then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val());
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.log(error);
    })
}

function writeCost(teamname, value) {
    const db = getDatabase();
    console.log("THE VALUE IS HERE")
    console.log(value)
    set(ref(db, 'teams/' + teamname), {
      budget: value
    });
}

const database = getDatabase();
const form = document.getElementById('myForm');
form.addEventListener('submit', function(e) {
  e.preventDefault();
  const selection = document.getElementById('dropdown').value;
  const amount = document.getElementById('number').value;
  console.log(selection, amount);
  console.log(teamLogged)
  var bits = readUserData(teamLogged, "budget");
  
  var sparks = 0;
  var pop = 0;
  var carbons = 0;

    

  if(selection == "House"){
    writeCost(teamLogged, (bits - (amount * 400)))
  }
  //writeUserTable(teamLogged, bits, sparks, pop, carbons);
});

const loginForm = document.getElementById('login');
loginForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  if (username != 'team'){
      document.getElementById('error').innerHTML = "Incorrect username";
  } else if (password == "team1" || password == "team2" || password == "team3" || password == "team4"){
      getUserTable(password);
      document.getElementById('error').innerHTML = "Welcome!";
      teamLogged = password;
      console.log(teamLogged+" i am here gggg")
  } else {
    document.getElementById('error').innerHTML = "Incorrect password";
  }
  console.log(username, password);
});