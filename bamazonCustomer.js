var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Applejuice670",
    database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function (err, data) {
    if (err) throw err;
    connection.query("SELECT item_id, product_name FROM products", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        // console.log(fields);

    });
    // run the start function after the connection is made to prompt the user
    // start();
});

function start() {
    inquirer
        .prompt({
            name: "IDNumber",
            type: "number",
            message: "What is the ID number of the product you would like to buy?",
            choices: Number
        })
        .then(function (answer) {
            // based on their answer, either call the bid or the post functions
            if (answer.IDNumber === Number) {
                nextQuestion();
            }
            else if (answer.IDNumber === null) {
                tryagain()
            } else {
                connection.end();
            }
        });
}

function nextQuestion() {
    inquirer
        .prompt({
            name: "Quantity",
            type: "number",
            message: "How many units of the product would you like to buy?",
            choices: Number
        })
        .then(function (answer) {
            if (answer.Quantity === Number) {
                placeOrder()
            } else {
                console.log(`Insufficient quantity!`);
            }
        })
}


function tryagain() {
    console.log("Please Try Again")
}