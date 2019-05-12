// 'use strict';

// module.exports = function(app) {
//     var todoList = require('./controller');

//     app.route('/')
//         .get(todoList.index);

//     app.route('/users')
//         .get(todoList.users);
// };

var express = require('express');
var router = express.Router();
var response = require('./res');
var connection = require('./conn');

module.exports = router;



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
     router.post('/registeruser',function(req,res){
         var nrp_nip = req.body.nrp_nip;
         var nama_user = req.body.nama_user;
         var password = req.body.password;
         var role = req.body.role;
         connection.query("Insert into user (nrp_nip,nama_user,password,role) values (?,?,?,?)",
         [nrp_nip,nama_user,password,role],
         function (error, row, fields){
            if(error){
                console.log(error)
            } else{
                response.ok("Berhasil menambahkan Mahasiswa!", res)
            }
        });
         
     });

    //tambahjadwal
router.post('/tambahjadwal', function(req,res){
    var id_matkul  = req.body.id_matkul;
    var pertemuan  = req.body.pertemuan_ke;
    var waktu_awal = req.body.waktu_awal;
    var waktu_akhir= req.body.waktu_akhir;
    var ruangan    = req.body.ruangan;
    connection.query("INSERT INTO transaksi_matkul (id_matkul, pertemuan_ke, waktu_awal, waktu_akhir, ruangan) values (?,?,?,?,?)",
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
   
   connection.query("SELECT u.nama_user, m.nama_matkul, tm.pertemuan_ke, tu.status from matkul m, transaksi_matkul tm, transaksi_user tu, `user` u, daftar_peserta dp WHERE m.id_matkul = ? AND tm.id_matkul = m.id_matkul AND tu.id_tran_matkul = tm.id_tran_matkul AND dp.id_matkul = m.id_matkul AND dp.id_user = u.id_user AND u.role = 2",
   [matkul],
   function (error, rows, fields){
      if(error){
          console.log(error)
      } else{
          response.ok(rows, res)
      }
  });
});


//API rekap kuliah per pertemuan, belom kelar
router.get('/rekap/:IDMATAKULIAH/:PERTEMUANKE', function(req, res){
    var pertemuan = req.params.PERTEMUANKE
    var idmatkul  = req.params.IDMATAKULIAH
    // console.log(matkul)
   
   connection.query("SELECT u.nama_user, m.nama_matkul, tm.pertemuan_ke, tu.status from matkul m, transaksi_matkul tm, transaksi_user tu, `user` u, daftar_peserta dp WHERE m.id_matkul = ? AND tm.pertemuan_ke = ? AND tm.id_matkul = m.id_matkul AND tu.id_tran_matkul = tm.id_tran_matkul AND dp.id_matkul = m.id_matkul AND dp.id_user = u.id_user AND u.role = 2",
   [idmatkul, pertemuan],
   function (error, rows, fields){
      if(error){
          console.log(error)
      } else{
          response.ok(rows, res)
      }
  });
});



