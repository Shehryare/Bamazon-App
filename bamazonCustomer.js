var mysql = require("mysql");
var inquirer = require("inquirer");
var consoleTable = require("console.table")

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
    products();
    start();
});
// run the start function after the connection is made to prompt the user


function start() {
    inquirer
        .prompt({
            name: "IDNumber",
            type: "number",
            message: "What is the ID number of the product you would like to buy?\n\n",
            choices: iDNumber()
        })
        .then(function (answer) {
            // based on their answer, either call the bid or the post functions
            if (answer.IDNumber === 1,2,3,4,5,6,7,8,9,10) {
                nextQuestion();
            }
            else if (answer.IDNumber === NaN) {
                console.log("Please Try Again")
            }
            else {
                connection.end();
            }
        });
}

function products() {
    connection.query("SELECT item_id, product_name FROM products", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
    });
}

function iDNumber(id){
    function id(){
        var idArr = [1,2,3,4,5,6,7,8,9,10]
        for(i=0; i < idArr; i++){
            idArr[i];
        }
    }
}

function nextQuestion() {
    inquirer
        .prompt({
            name: "Quantity",
            type: "number",
            message: "\nHow many units of the product would you like to buy?",
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
