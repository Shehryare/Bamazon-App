var mysql = require("mysql");
var inquirer = require("inquirer");
var consoleTable = require("cli-table")

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
});

function products() {
    connection.query("SELECT * FROM products", function (err, result) {
        if (err) throw err;
        var displayTable = new Table({
            head: ['item_id', 'product_name', 'department_name', 'price', 'stock_quantity'],
            colWidths: [10, 25, 25, 10, 14]
        });
        for (var i = 0; i < res.length; i++) {
            displayTable.push([result[i].item_id, result[i].product_name, result[i].department_name, result[i].price, result[i].stock_quantity])
            console.log(displayTable.toString());
            start();
        }
    })
};

// run the start function after the connection is made to prompt the user
function start() {
    inquirer
        .prompt([{
            name: "IDNumber",
            type: "input",
            message: "What is the ID number of the product you would like to buy?\n\n",
            filter: Number
        },
        {
            name: "Quantity",
            type: "input",
            message: "How many items do you wish to purchase?",
            filter: Number
        },
        ])
        .then(function (answer) {
            // based on their answer, either call the bid or the post functions
            var quantityNeeded = answers.Quantity;
            var IDrequested = answers.ID;
            order(IDrequested, quantityNeeded);
        });
};



function products() {
    connection.query("SELECT * FROM products", function (err, result) {
        if (err) throw err;
        var displayTable = new Table({
            head: ['item_id', 'product_name', 'department_name', 'price', 'stock_quantity'],
            colWidths: [10, 25, 25, 10, 14]
        });
        for (var i = 0; i < res.length; i++) {
            displayTable.push([result[i].item_id, result[i].product_name, result[i].department_name, result[i].price, result[i].stock_quantity])
            console.log(displayTable.toString());
            start();
        }
    })
};


// function nextQuestion() {
//     inquirer
//         .prompt({
//             name: "Quantity",
//             type: "number",
//             message: "\nHow many units of the product would you like to buy?",
//             choices: Number
//         })
//         .then(function (answer) {
//             if (answer.Quantity === Number) {
//                 placeOrder()
//             } else {
//                 console.log(`Insufficient quantity!`);
//             }
//         })
// };
