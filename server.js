const express = require('express');
const app = express(); // our app
const PORT = process.env.PORT || 5000;
const methodOverride = require('method-override');
require('dotenv').config()

// -------------- Data ---------------
// inside of fruits.js
const { fruits } = require('./models/fruits');
const { meats } = require('./models/meats');
const { veggies } = require('./models/veggies');

// -------------- MiddleWare ---------
app.use(methodOverride('_method'))
app.set('view engine', 'ejs'); // come back to this
app.use('/', express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// add middleware for PUT AND DELETE methods


// -------------- Routes -------------
// ********* About Route ********
app.get('/About', (req, res) => {
    res.render('about');
})

app.get('*', (req, res) => {
    res.send('404 page');
});

// ********* Contact Route ******
app.get('/contact', (req, res) => {
    res.render('contact', {});
});

// ********* Index Route ********
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/fruits', (req, res) => {
    // send index.ejs with array of fruits
    res.render('fruits/index', { allFruits: fruits });
});

app.get('/meats', (req, res) => {
    // render array as a response
    res.render('meats/index', { allMeats: meats });
});

app.get('/veggies', (req, res) => {
    // render array as a response
    res.render('veggies/index', { allVeggies: veggies });
});
// ******* NEW ROUTE **********
app.get('/fruits/new', (req, res) => {
    res.render('fruits/new.ejs', {});
})

app.get('/meats/new', (req, res) => {
    res.render('meats/new.ejs', {});
})

app.get('/veggies/new', (req, res) => {
    res.render('veggies/new.ejs', {});
})

// ********* GET - EDIT PAGE ************ 
app.get('/fruits/:id/edit', (req, res) => {
    const fruit = fruits[req.params.id];
    let id = parseInt(req.params.id);
    res.render('fruits/edit', { fruit, id })
})

app.get('/meats/:id/edit', (req, res) => {
    const meat = meats[req.params.id];
    let id = parseInt(req.params.id);
    res.render('meats/edit', { meat, id })
})

app.get('/veggies/:id/edit', (req, res) => {
    const veggie = veggies[req.params.id];
    let id = parseInt(req.params.id);
    res.render('veggies/edit', { veggie, id })
})

// ********* GET - DELETE PAGE *********
app.get('/fruits/:id/delete', (req, res) => {
    const fruit = fruits[req.params.id];
    let id = parseInt(req.params.id);
    res.render('fruits/delete', { fruit, id });
})

app.get('/meats/:id/delete', (req, res) => {
    const meat = meats[req.params.id];
    let id = parseInt(req.params.id);
    res.render('meats/delete', { meat, id });
})

app.get('/veggies/:id/delete', (req, res) => {
    const veggie = veggies[req.params.id];
    let id = parseInt(req.params.id);
    res.render('veggies/delete', { veggie, id });
})

// ********** POST NEW FRUIT **************
app.post('/fruits', (req, res) => {
    console.log('---------- FORM BODY --------------\n', req.body);
    // add more code here
    if (req.body.readyToEat === 'on') {
        req.body.readyToEat = true;
    } else { // req.body.readyToEat will be undefined (unchecked)
        req.body.readyToEat = false;
    }
    fruits.push(req.body);
    res.redirect('/fruits');
})

app.post('/meats', (req, res) => {
    console.log('---------- FORM BODY --------------\n', req.body);
    // add more code here
    if (req.body.readyToEat === 'on') {
        req.body.readyToEat = true;
    } else { // req.body.readyToEat will be undefined (unchecked)
        req.body.readyToEat = false;
    }
    meats.push(req.body);
    res.redirect('/meats');
})

app.post('/veggies', (req, res) => {
    console.log('---------- FORM BODY --------------\n', req.body);
    // add more code here
    if (req.body.readyToEat === 'on') {
        req.body.readyToEat = true;
    } else { // req.body.readyToEat will be undefined (unchecked)
        req.body.readyToEat = false;
    }
    veggies.push(req.body);
    res.redirect('/veggies');
})

// ******* SHOW ROUTE *********
app.get('/fruits/:indexOfFruitsArray', (req, res) => {
    let idx = parseInt(req.params.indexOfFruitsArray);
    if (idx >= fruits.length) {
        // res.send('There is no fruit at that index.'); // one solutuion
        // res.send(fruits)
        res.render('404', {});
    } else {
        // res.send(fruits[idx]);
        res.render('fruits/show', { fruit: fruits[idx], id: idx });
    }
}); 

app.get('/veggies/:indexOfveggiesArray', (req, res) => {
    let idx = parseInt(req.params.indexOfveggiesArray);
    if (idx >= veggies.length) {
        // res.send('There is no veggie at that index.'); // one solutuion
        // res.send(veggies)
        res.render('404', {});
    } else {
        // res.send(veggies[idx]);
        res.render('veggies/show', { veggie: veggies[idx], id: idx });
    }
});

app.get('/meats/:indexOfmeatsArray', (req, res) => {
    let idx = parseInt(req.params.indexOfmeatsArray);
    if (idx >= meats.length) {
        // res.send('There is no meat at that index.'); // one solutuion
        // res.send(meats)
        res.render('404', {});
    } else {
        // res.send(meats[idx]);
        res.render('meats/show', { meat: meats[idx], id: idx });
    }
});



// ************** PUT - UPDATE FRUIT ************
app.put('/fruits/:id', (req, res) => {
    console.log("----- UPDATE FRUIT ------------\n", req.body);
    if(req.body.readyToEat === 'on') {
        req.body.readyToEat = true;
    } else {
        req.body.readyToEat = false;
    }
    fruits[parseInt(req.params.id)] = req.body; //
    res.redirect('/fruits'); //
})

app.put('/meats/:id', (req, res) => {
    console.log("----- UPDATE FRUIT ------------\n", req.body);
    if(req.body.readyToEat === 'on') {
        req.body.readyToEat = true;
    } else {
        req.body.readyToEat = false;
    }
    meats[parseInt(req.params.id)] = req.body; //
    res.redirect('/meats'); //
})

app.put('/veggies/:id', (req, res) => {
    console.log("----- UPDATE FRUIT ------------\n", req.body);
    if(req.body.readyToEat === 'on') {
        req.body.readyToEat = true;
    } else {
        req.body.readyToEat = false;
    }
    veggies[parseInt(req.params.id)] = req.body; //
    res.redirect('/veggies'); //
})

// ************* DELETE - DELETE  FRUIT **********
app.delete('/fruits/:id', (req, res) => {

    fruits.splice(parseInt(req.params.id), 1)
    res.redirect('/fruits'); // redirect back to index page
})

app.delete('/meats/:id', (req, res) => {

    meats.splice(parseInt(req.params.id), 1)
    res.redirect('/meats'); // redirect back to index page
})

app.delete('/veggies/:id', (req, res) => {

    veggies.splice(parseInt(req.params.id), 1)
    res.redirect('/veggies'); // redirect back to index page
})

// --------------- Listen for Server -------
app.listen(PORT, () => {
    console.log('Server is running on PORT', PORT);
})