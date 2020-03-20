let NeDB = require('nedb');
let db = new NeDB({
    // Nome do arquivo
    filename: 'users.db',
    // Se o arquivo não existir, cria ele pra mim
    autoload: true
});

module.exports = (app) => {

    let route = app.route('/users');

    //Me traga todos os usuarios de forma ascendente(1). Descendente(é -1). E execute esse callback
    db.find({}).sort({ name: 1 }).exec((err, users) => {

        if (err) {

            app.utils.error.send(err, req, res);

        } else {
            route.get((req, res) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json')
                res.json({
                    users
                });
            });
        }

    });

    route.post((req, res) => {

    if(!app.utils.validator.user(app, req, res)) return false; 

        db.insert(req.body, (err, user) => {

            if (err) {
                app.utils.error.send(err, req, res);
            } else {
                res.status(200).json(user);
            }

        });

    });

    let routeId = app.route('/users/:id');

    routeId.get((req, res) => {

        db.findOne({ _id: req.params.id }).exec((err, user) => {
            if (err) {
                app.utils.error.send(err, req, res);
            } else {
                res.status(200).json(user);
            }
        });

    });

    routeId.put((req, res) => {

        if(!app.utils.validator.user(app, req, res)) return false; 

        db.update({ _id: req.params.id }, req.body, err => {
            if (err) {
                app.utils.error.send(err, req, res);
            } else {
                res.status(200).json(Object.assign(req.params, req.body));
            }
        });
    });

    routeId.delete((req, res) => {

        db.remove({ _id: req.params.id}, {}, err=>{

            if (err) {
                app.utils.error.send(err, req, res);
            } else {
                res.status(200).json(req.params);
            }

        });

    });

};

