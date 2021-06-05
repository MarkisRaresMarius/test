var api = require('./src/api.js').app;
const fs = require('fs');
const trotsFilepath = './src/trots.json';

api.get('/', function (request, response) {
    response.json('NodeJS REST API');
});

api.get('/trots', function (request, response) {
    response.json(getTrots());
});

api.get('/trots/:id', function (request, response) {
    let trot = getTrotById(request.params.id);
    if (trot) response.json(trot);
    response.json('not found');
});

api.put('/trots', function (request, response) {
    response.json(request.body);
    saveTrot(request.body);

});

api.post('/trots', function (request, response) {

    let trots = [];
    try {
        trots = JSON.parse(fs.readFileSync(trotsFilepath, 'utf8'));
    } catch (err) {
        console.error(err);
        return false;
    }
    var seltrot = getTrotById(request.body.id)
    if (seltrot != null) {
        var pos = 0;
        for (var i = 0; i < trots.length; i++) {
            if (trots[i].id == request.body.id) pos = i;
        }
        trots[pos] = request.body;

    }
    var seltrot = getTrotById(request.body.id);
    if (seltrot != null) { trots[request.body.id - 1] = request.body };
    try {
        fs.writeFileSync(trotsFilepath, JSON.stringify(trots));// salvare json array in fisier
    } catch (err) {
        console.error(err)
    }




    // cautam daca exista indexul de pe request.body
    // daca exista actualizam parametrii acestui produs/item
    // salvam in fisier produsele actualizate
    response.json('Trot was saved succesfully');
});

api.delete('/trots/:index', function (request, response) {
    let trots = [];
    try {
        trots = JSON.parse(fs.readFileSync(trotsFilepath, 'utf8'));
    } catch (err) {
        console.error(err);
        return false;
    }
    var oof = 0;
    for (var i = 0; i < trots.length; i++) {
        if (trots[i].id == request.params.index) oof = i;
    }
    trots.splice(oof, 1);
    if (trots == null) console.log();
    else {
        try {
            fs.writeFileSync(trotsFilepath, JSON.stringify(trots));// salvare json array in fisier
        } catch (err) {
            console.error(err)
        }
    }
    response.json('User with index ' + request.params.index + ' was deleted');
});

api.listen(3000, function () {
    console.log('Server running @ localhost:3000');
});

function getTrots() {
    let trots = [];
    try {
        trots = JSON.parse(fs.readFileSync(trotsFilepath, 'utf8'));
    } catch (err) {
        console.error(err);
        return false;
    }
    return trots;
}

function saveTrot(trot) {
    let trots = getTrots();// citire json din fisier
    let maxId = getMaxId(trots);
    trot.id = maxId + 1;// generare id unic
    trots.push(trot);// adaugare masina noua in array
    try {
        fs.writeFileSync(trotsFilepath, JSON.stringify(trots));// salvare json array in fisier
    } catch (err) {
        console.error(err)
    }
}

function getMaxId(trots) {
    let max = 0;
    for (var i = 0; i < trots.length; i++) {
        if (max < trots[i].id) {
            max = trots[i].id;
        }
    }
    return max;
}

function getTrotById(id) {
    let trots = getTrots();// citire json din fisier
    let selectedTrot = null;
    for (var i = 0; i < trots.length; i++) {
        if (id == trots[i].id) selectedTrot = trots[i];
    }
    return selectedTrot;
}
