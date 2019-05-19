const path = require('path');
const express = require('express');
const app = express();
const session = require ('express-session')
const agent = require('superagent')
const realm = require('realm')
var request = require('request');
var bodyParser = require('body-parser');

// var flash    = require('connect-flash');
// var passport = require('passport');

 
app.set('view engine', 'ejs');
app.set('views', 'views');

// akses API KELOMPOK 1
const apiHost = 'https://pbkk-online-absen-api.herokuapp.com'

// ipkelompok snediri

//  const apiHost = 'http://10.151.37.55:3000'
// akses API SENDIRI
//  const router = require('./routes/routesAPI.js');
//  app.use(router);

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json())

app.use(bodyParser.urlencoded({
    extended: true
}))
let Users = []
app.use(
    session({
        secret: "user session"
    })
)

function checkSignIn(req, res, next) {
    if (req.session.user) {
        return next();
    }
    else {
        res.redirect('/login')
    }
}
app.get('/', checkSignIn, (req, res) => {
    console.log(Users)
    agent.get(apiHost)
        .then(
            (response) => {
                request(apiHost, function (error, response1, body) {
                    if (!error && response1.statusCode == 200) {
                        var info = JSON.parse(body)
                        var size = Object.keys(info.user).length
                        var i;
                        var nama;
                        for (i = 0; i < size; i++) {
                            if (info.user[i].nrp == req.session.user.nrp) {
                                nama = info.user[i].nama;
                                console.log(nama);
                                break;
                            }

                        }
                        console.log(response.body.matkul)
                        res.render('index', {nrp: req.session.user.nrp, matkul: response.body.matkul, peserta: response.body.peserta, nama: nama})
                    }
                })
            }
        )
})

app.get('/login', (req, res) => {
    if (req.session.error != null) {
        // console.log(req.session.error);
        req.session.error = null;
        res.render('login', {message: "hai"})

    }
    else {
        res.render('login', {message: ""})
    }

})
app.get('/signup', (req, res) => {
    res.render('signup')
})

app.post('/signup', (req, res) => {
    let nrp = req.body['nrp']
    let nama = req.body['nama']
    let password = req.body['password']

    agent.post(apiHost + '/tambahmahasiswa')
        .send({
            nrp: nrp,
            nama: nama,
            password: password
        })
        .then(
            (response) => {
                if (response.status == 201) {
                    // res.render('signup',{message: "berhasil"})
                    res.redirect('/login');
                }
            }
        )
        .catch(
            (err) => {
                console.log(err)
            }
        )
})

app.post('/login', (req, res) => {
    let nrp = req.body['nrp']
    let password = req.body['password']
    console.log(nrp)
    agent.post(apiHost + '/user')
        .send({
            nrp: nrp,
            password: password
        })
        .then(
            (response) => {
                console.log(response.status)
                if (response.status == 200) {
                    let newUser = { nrp: nrp, password: password };
                    Users.push(newUser);
                    req.session.user = newUser;
                    res.redirect('/')
                }
            }
        )
        .catch(
            (err) => {
                console.log(err)
                req.session.error = 'Incorrect username or password';
                res.redirect('/login');
            }
        )
})

app.get('/keluar', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
})

app.get('/tambahpeserta', (req, res) => {
    res.render('tambahpeserta')
})

app.post('/tambahpeserta', (req, res) => {
    let idmatkul = req.body['idmatkul']
    let smt = req.body['smt']
    let nrp = req.body['nrp']

    agent.post(apiHost + '/tambahpeserta')
        .send({
            idmatkul: idmatkul,
            smt: smt,
            nrp: nrp
        })
        .then(
            (response) => {
                if (response.status == 201) {
                    res.redirect('/')
                }
            }
        )
        .catch(
            (err) => {
                console.log(err)
            }
        )
})


app.listen(5000, () => console.log(`Server listening on port 5000!`))

