var express = require('express');
var router = express.Router();
var response = require('./res');
var connection = require('./conn');
var md5 = require('md5');
var session = require('express-session');

module.exports = router;


var root = express();

root.use(session({
    secret :'secret',
    resave:true,
    saveUninitialized:true
}))
// API 
// nyobanya localhost:3000/routes/sesuaiAPI

    //tambah user mhs ke mata kuliah
router.post('/tambahpeserta/:IDMATAKULIAH/:NRP', function(req,res){
    var id_matkul= req.params.IDMATAKULIAH;
    var id_user  = req.params.NRP;
    connection.query("Insert into daftar_peserta (id_matkul, id_user) values (?, (select id_user from user where nrp_nip = ?))",
    [id_matkul, id_user],
    function (error, row, fields){
    if(error){
        console.log(error)
    } else{
        response.ok("Berhasil menambahkan peserta!", res)
    }
    });
});

    // tambah user
     router.post('/signup',function(req,res){
         var nrp_nip = req.body.nrp;
         var nama_user = req.body.nama;
         var password = req.body.password;
         var pass = md5(password);
         var role = "2";
         connection.query("Insert into user (nrp_nip,nama_user,password,role) values (?,?,?,?)",
         [nrp_nip,nama_user,pass,role],
         function (error, row, fields){
            if(error){
                console.log(error)
            } else{
                response.ok("Berhasil menambahkan Mahasiswa!", res)
            }
        });
         
     });
    //auth
    router.get('/auth',function(req,res){
        if(req.session.wrongpass){
            var wrong = req.session.wrongpass;  
        }
        res.render('/login.ejs',{wrong});
    });
    //login
    router.post('/login',function(req,res){
        var user = req.body.nrp;
        var password = req.body.password;
        var pass = md5(password);
        connection.query("SELECT * FROM user where nrp_nip = ? AND password= ? limit 1",
        [user,pass],
        function(error,results,fields){
            if(error){
                console.log(error)
            }else{
                if(results.length>0){
                    var user_id =  results[0].id_user;
                    var nrp = results[0].nrp_nip;
                    var nama = results[0].nama_user;
                    var role = results[0].role;


                    req.session.id_user = user_id;
                    req.session.nrp_nip = nrp;
                    req.session.nama_user = nama;
                    req.session.role = role;
                    
                    console.log(results[0].id_user)
                    if(req.session.role ==1){
                        res.redirect('/dosen');
                    }
                    else{
                        res.redirect('/mahasiswa');
                    }
           //         response.ok("Berhasil menambahkan jadwal!", res)
                }
                else{
                    req.session.wrongpass = "Kombinasi NRP/NIP Atau Password Salah !!";
                    res.redirect('/auth')
                }
            }
        });
        
    });
    //logout
    router.get('/logout',function(req,res){
        req.session.destroy();
        response.redirect('/auth')
    })

    //tambahjadwal
router.post('/tambahjadwal', function(req,res){
    var id_matkul  = req.body.id_matkul;
    var pertemuan  = req.body.pertemuan_ke;
    var waktu_awal = req.body.waktu_awal;
    var waktu_akhir= req.body.waktu_akhir;
    var ruangan    = req.body.ruangan;
    connection.query("INSERT INTO jadwal_matkul (id_matkul, pertemuan_ke, waktu_awal, waktu_akhir, ruangan) values (?,?,?,?,?)",
    [id_matkul,pertemuan,waktu_awal,waktu_akhir,ruangan],
    function (error, row, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Berhasil menambahkan jadwal!", res)
        }
    });

});
    //tambahmatkul
 router.post('/tambahmatkul',function(req,res){
    var nama_matkul = req.body.nama_matkul;
    var kelas = req.body.kelas;
    var semester = req.body.semester;

    connection.query("INSERT INTO matkul (nama_matkul,kelas,semester) values(?,?,?)",
    [nama_matkul,kelas,semester],
    function(error,row,fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Berhasil menambahkan Matakuliah!", res)
        }
    });
 });

//tes tambah user
// router.post('/', function(req, res){
   
//     var id_user = req.body.id_user;
//     var nama_user = req.body.nama_user;
//     var password_user = req.body.password_user;
    


//     connection.query("INSERT INTO user (id_user, nama_user, password_user) values (?,?,?)",
//     [ id_user, nama_user, password_user ], 
//     function (error, rows, fields){
//         if(error){
//             console.log(error)
//         } else{
//             response.ok("Berhasil menambahkan user!", res)
//         }
//     });

// });

 //API rekap kuliah per semester
router.get('/rekap/:IDMATAKULIAH', function(req, res){
    var matkul = req.params.IDMATAKULIAH
   
   connection.query("SELECT u.nama_user, m.nama_matkul, jm.pertemuan_ke, au.status from matkul m, jadwal_matkul jm, absen_user au, `user` u, daftar_peserta dp WHERE m.id_matkul = ? AND jm.id_matkul = m.id_matkul AND au.id_tran_matkul = jm.id_tran_matkul AND dp.id_matkul = m.id_matkul AND dp.id_user = u.id_user AND u.role = 2",
   [matkul],
   function (error, rows, fields){
      if(error){
          console.log(error)
      } else{
          response.ok(rows, res)
      }
  });
});


//API rekap kuliah per pertemuan
router.get('/rekap/:IDMATAKULIAH/:PERTEMUANKE', function(req, res){
    var pertemuan = req.params.PERTEMUANKE
    var idmatkul  = req.params.IDMATAKULIAH
   
   connection.query("SELECT u.nama_user, m.nama_matkul, jm.pertemuan_ke, au.status from matkul m, jadwal_matkul jm, absen_user au, `user` u, daftar_peserta dp WHERE m.id_matkul = ? AND jm.pertemuan_ke = ? AND jm.id_matkul = m.id_matkul AND au.id_tran_matkul = jm.id_tran_matkul AND dp.id_matkul = m.id_matkul AND dp.id_user = u.id_user AND u.role = 2",
   [idmatkul, pertemuan],
   function (error, rows, fields){
      if(error){
          console.log(error)
      } else{
          response.ok(rows, res)
      }
  });
});

//API rekap permahasiswa perkuliah
router.get('/rekapmahasiswa/:NRP/:IDMATAKULIAH', function(req, res){
    var nrp = req.params.NRP;
    var idmatkul  = req.params.IDMATAKULIAH;
  
   
   connection.query("SELECT u.nama_user, m.nama_matkul, jm.pertemuan_ke, au.status from matkul m, jadwal_matkul jm, absen_user au, `user` u, daftar_peserta dp WHERE m.id_matkul = ? AND u.nrp_nip = ? AND jm.id_matkul = m.id_matkul AND au.id_tran_matkul = jm.id_tran_matkul AND dp.id_matkul = m.id_matkul AND dp.id_user = u.id_user AND u.role = 2",
   [idmatkul, nrp],
   function (error, rows, fields){
      if(error){
          console.log(error)
      } else{
          response.ok(rows, res)
      }
  });
});

//API rekap permahasiswa persemester
router.get('/rekapmahasiswasemester/:NRP/:IDSEMESTER', function(req, res){
    var nrp = req.params.NRP;
    var semester  = req.params.IDSEMESTER;
  
   connection.query("SELECT u.nama_user, m.nama_matkul, jm.pertemuan_ke, au.status from matkul m, jadwal_matkul jm, absen_user au, `user` u, daftar_peserta dp WHERE u.nrp_nip = ? AND m.semester = ? AND jm.id_matkul = m.id_matkul AND au.id_tran_matkul = jm.id_tran_matkul AND dp.id_matkul = m.id_matkul AND dp.id_user = u.id_user AND u.role = 2",
   [nrp, semester],
   function (error, rows, fields){
      if(error){
          console.log(error)
      } else{
          response.ok(rows, res)
      }
  });
});

//Absensi
router.post('/absen/:ruang/:nrp', function(req, res) {
    var ruangan = req.params.ruang;
    var nrp_nip = req.params.nrp;
    var status = "1";
    var date = new Date();
  
    connection.query('SELECT u.nrp_nip, jm.ruangan,jm.id_tran_matkul, d.id_daftar FROM daftar_peserta d, matkul m, jadwal_matkul jm, user u WHERE m.id_matkul = d.id_matkul AND u.id_user=d.id_user AND jm.id_matkul = m.id_matkul AND ? > jm.waktu_awal AND ? < jm.waktu_akhir AND u.nrp_nip=? AND jm.ruangan=?',
     [date, date, nrp_nip, ruangan], function (error, results, fields) {
      if (error){
        console.log(error);
      }
      if (results.length == 0 ){
        console.log(error);
        response.ok('Peserta tidak terdaftar dalam kelas',res);
      }else{
        console.log(results);
        var matkul = results[0].id_tran_matkul;
        var id_daftar = results[0].id_daftar;
        connection.query('INSERT INTO absen_user (id_daftar,id_tran_matkul,waktu,status) values (?,?,?,?)',
         [id_daftar,matkul,date,status], function (error, results, fields) {
            if (error){
              console.log(error);
            }else{
              response.ok('Absen Berhasil',res);
            }
          });
      }
    });
  });