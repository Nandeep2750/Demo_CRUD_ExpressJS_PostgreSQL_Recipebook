var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cons = require('consolidate'),
    dust = require('dustjs-helpers');
    // const { join } = require('path');
    pg = require('pg'),
    app = express();

// DB connection string
var connectionString = 'postgresql://root:123@localhost/recipebook'

// Assign Dust Engine to .dust fontVariantLigatures: 
app.engine('dust',cons.dust);

// Set default Ext .dust
app.set('view engine','dust');
app.set('views',__dirname + '/views');

// See public folder
app.use(express.static(path.join(__dirname,'public')));

// Body parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false})); 

const config = {
    user: 'root',
    database: 'recipebook',
    password: '123',
    port: 5432    //Default port, change it if needed
};

// Route
app.get('/',function(req,res) {
    // connection using created pool
    var pool = new pg.Pool(config);
    pool.connect(function(err, client, done) {
        if (err){
            console.log("error feahcing client from pool", err)
        }
        client.query('SELECT * FROM recipe',function (err, result) {
            if(err){
                console.log("error running query", err)
            }
            
            res.render('index',{recipies: result.rows});
            done();
        })
    })
})

// Add Recipie
app.post('/add',function(req,res) {
    // connection using created pool
    var pool = new pg.Pool(config);
    pool.connect(function(err, client, done) {
        if (err){
            console.log("error feahcing client from pool", err)
        }
        client.query('INSERT INTO recipe(name,ingredients,directions) VALUES($1,$2,$3)', [req.body.name,req.body.ingredients,req.body.directions]);
        done();
        res.redirect('/');
    })
})

// Delete Recipie
app.delete('/delete/:id',function(req,res) {
    var pool = new pg.Pool(config);
    pool.connect(function(err, client, done) {
        if (err){
            console.log("error feahcing client from pool", err)
        }
        client.query('DELETE FROM recipe WHERE id = $1', [req.params.id]);
        done();
        res.send(200);
    })
})

// Add Recipie
app.post('/edit',function(req,res) {
    // connection using created pool
    var pool = new pg.Pool(config);
    pool.connect(function(err, client, done) {
        if (err){
            console.log("error feahcing client from pool", err)
        }
        client.query('UPDATE recipe SET name = $1, ingredients = $2, directions = $3 WHERE id = $4', [req.body.name,req.body.ingredients,req.body.directions,req.body.id]);
        done();
        res.redirect('/');
    })
})


// Server
app.listen(3000,function() {
    console.log('server started on port 3000');
})






