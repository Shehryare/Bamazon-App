var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table")

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
    allProducts();
});

function allProducts() {
    connection.query("SELECT item_id, product_name, department_name, price, stock_quantity FROM products", function (err, response) {
        if (err) throw err;
        console.table(response);
        shopProducts();
    });
}

function shopProducts() {
    inquirer.prompt([
        {
            name: "item_id",
            type: "input",
            message: "Enter the item_id for the product you would like to purchase ?"
        },
        {
            name: "quantity",
            type: "input",
            message: "How many would you like to purchase ?"
        }]).then(function (response) {
            var item_id = parseInt(response.item_id);
            var quantity = parseInt(response.quantity);
            var total;
            var updateQuantity;

            connection.query("SELECT * FROM products WHERE ?", { item_id: item_id }, function (err, response) {
                if (err) throw err;
                if (quantity > response[0].stock_quantity) {
                    console.log("\nInsufficient Quantity!")
                } else {
                    total = quantity * response[0].price;
                    updateQuantity = response[0].stock_quantity - quantity;
                    console.log("\nYou purchased " + quantity + " " + response[0].product_name + "\n\nYour total is: $" + total);
                    connection.query("UPDATE products SET ? WHERE ?", [{ stock_quantity: updateQuantity }, { item_id: item_id }], function (err, response) {
                        if (err) throw err;
                        console.log("\nInventory Updated")
                    })
                }
                connection.end();
            })
        })
}