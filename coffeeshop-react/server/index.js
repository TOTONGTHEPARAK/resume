const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "shop01"
})

app.listen('3001', () => {
    console.log('Server is running on port 3001');
})

app.get('/bill' , (req, res) => {
    db.query("SELECT MAX(bill_id) AS value FROM bill ", (err, value) => {
        if(err) {
            console.log(err);
        }else {
            res.send(value);
        }
    })
})

app.post("/createmenu", (req, res) => {
    const id = req.body.menu_id;
    const name = req.body.munu_name;
    const price = req.body.menu_price;
    const bill_id = req.body.bill_id;

    db.query(
        "INSERT INTO menu (menu_id, menu_name, menu_price, bill_id) VALUES(?,?,?,?)",
        [id,name,price,bill_id],
        (err, result) => {
            if(err) {
                console.log(err);
            }else {
                res.send("result");
            }
        }
    )
})

app.post("/addproduct", (req, res) => {
    const id = req.body.Product_Id;
    const name = req.body.Product_Name;
    const type = req.body.Product_Type;
    const amount = req.body.amount;
    const other = req.body.other;

    db.query(
        "INSERT INTO product (Product_Id, Product_Name, Product_Type, amount, other) VALUES(?,?,?,?,?)",
        [id,name,type,amount,other],
        (err, result) => {
            if(err) {
                console.log(err);
            }else {
                res.send("result");
            }
        }

    )

})

app.delete("/delete/:num",(req, res) => {
    const num = req.params.num;
    db.query("DELETE FROM product WHERE Product_Id = ?",num, (err,result) => {
        if(err) {
            console.log(err);
        }else {
            res.send(result);
        }
    })
})

app.put("/update", (req,res) => {
    const id = req.body.id;
    const amount = req.body.amount;
    db.query("UPDATE product SET amount = ? WHERE Product_Id = ?",[amount,id], (err,result) => {
        if(err) {
            console.log(err);
        }else {
            res.send(result);
        }
    })
})

app.post("/createbill", (req, res) => {
    const result = req.body.bill_result;

    db.query(
        "INSERT INTO bill (bill_result) VALUES(?)",
        [result],
        (err, result) => {
            if(err) {
                console.log(err);
            }else {
                res.send("result");
            }
        }
    )
})

app.get('/product' , (req, res) => {
    db.query("SELECT * FROM product", (err, value) => {
        if(err) {
            console.log(err);
        }else {
            res.send(value);
        }
    })
})

app.get('/chart', (req, res) => {
    db.query("SELECT menu_id,menu_name,COUNT(menu_id) AS count_word FROM menu GROUP BY menu_id  ASC;", (err, value) => {
        if(err) {
            console.log(err);
        }else {
            res.send(value);
        }
    })
})

app.get('/getproduct' , (req, res) => {
    db.query("SELECT MAX(Product_Id) AS value FROM product ", (err, value) => {
        if(err) {
            console.log(err);
        }else {
            res.send(value);
        }
    })
})

