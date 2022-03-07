var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var session=require('express-session');
var helper=require('../Helpers/MysqlHelpers');
var url = require('url');
var mailAccountUser = 'ayberkoteli@gmail.com';
var mailAccountPassword = '12345678AA';
var fromEmailAddress = 'asd@gmail.com';
var toEmailAddress = 'asd@gmail.com';
var transport = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    auth: {
        user: 'asd@gmail.com',
        pass: '123456789'
    }
}));
module.exports = router;
var inDate;
var outDate;
var adults ;
var children;
var kisiler = adults + children;
function checkSession(req,res,callback) {
    if(req.session.username!=null){
        callback(req,res);
    }else{
        res.redirect('/admin')
    }
}
router.use(session({
    'secret':'benimders',
    proxy: true,
    resave: true,
    saveUninitialized: true
}));
router.get("/",function (req,res) {
    res.render('anasayfa.ejs');
});
router.get("/iletisim",function (req,res) {
    res.render('iletisim.ejs');
});
router.get("/davet",function (req,res) {
    res.render('davet.ejs');
});
router.get("/roof-orta-salon",function (req,res) {
    res.render('ortaSalon.ejs');
});
router.get("/roof-deniz-salonu",function (req,res) {
    res.render('denizSalonu.ejs');
});
router.get("/yemek",function (req,res) {
    res.render('yemek.ejs');
});
router.get("/rezervasyon-ekle",function (req,res) {
    checkSession(req,res,function (req,res) {
        res.render('rezervasyonEkle.ejs',{username:req.session.username});
    });
});
router.get("/rezervasyon-sil",function (req,res) {
    checkSession(req,res,function (req,res) {
        res.render('rezervasyonSil.ejs',{username:req.session.username});
    });
});
router.get("/oda-ekle",function (req,res) {
    checkSession(req,res,function (req,res) {
        res.render('odaEkle.ejs',{username:req.session.username});
    });
});
router.get("/oda-guncelle",function (req,res) {
    checkSession(req,res,function (req,res) {
        database.query("SELECT id,kisi FROM odalar ORDER BY id", null, function (err, rows) {
            var result=null;
            var error=false;
            if (err) {
                error=true;
            } else if(rows.length){
                result=rows;
            }
            res.render('odaGuncelle.ejs',{username:req.session.username,error:error,rooms:result});
        });
    });
});
router.get("/oda-sil",function (req,res) {
    checkSession(req,res,function (req,res) {
        res.render('odaSil.ejs',{username:req.session.username});
    });
});
router.get("/admin",function (req,res) {
    if(req.session.username!=null){
        res.redirect('/adminsayfa');
    }else{
        res.render('admin.ejs');
    }
});
router.get("/adminsayfa",function (req,res) {
    checkSession(req,res,function (req,res) {
        database.query("SELECT isim,soyadi,indate,outdate,id,odaid,tckno,telefon FROM rezervasyon ORDER BY indate", null, function (err, rows) {
            var result=null;
            var error=false;
            if (err) {
                error=true;
            } else if(rows.length){
                result=rows;
            }
            res.render('adminsayfa.ejs',{username:req.session.username,error:error,empty:result});
        });
    });
});
router.get("/cikis",function (req,res) {
    res.render("cikis.ejs")
});
router.get("/oda-gor",function (req,res) {
    checkSession(req,res,function (req,res) {
        database.query("SELECT id,kisi FROM odalar ORDER BY id", null, function (err, rows) {
            var result=null;
            var error=false;
            if (err) {
                error=true;
            } else if(rows.length){
                result=rows;
            }
            res.render('odaGor.ejs',{username:req.session.username,error:error,rooms:result});
        });
    });
});
router.get("/rezervasyon",function (req,res) {

    database.query("SELECT id,kisi FROM odalar ORDER BY id", null, function (err, rows) {
        var result=null;
        var error=false;
        if (err) {
            error=true;
        } else if(rows.length){
            result=rows;
        }
        res.render('rezervasyon.ejs',{error:error,rooms:result});
    });
    /*
    checkSession(req,res,function (req,res) {
        database.query("SELECT id,kisi FROM odalar ORDER BY id", null, function (err, rows) {
            var result=null;
            var error=false;
            if (err) {
                error=true;
            } else if(rows.length){
                result=rows;
            }
            res.render('odaGor.ejs',{username:req.session.username,error:error,rooms:result});
        });
    });
    */
});
/*
router.get("/rezervasyon",function (req,res) {

    res.render('rezervasyon.ejs')

    res.setHeader('Content-Type', 'application/json');
    var response = {err : false , message : '' };
    var body = req.body;
    var inDate = body.inDate;
    var outDate = body.outDate;
    var adults = body.adults;
    var children = body.children;
    var kisiler = adults + children;
    console.log("indateeget:" +inDate);
    console.log("outdate:" +outDate);
    console.log("yetiskin:" +adults);
    console.log("cocuk:" +children);

});
*/
router.post("/rezervasyon",function (req,res) {

    res.setHeader('Content-Type', 'application/json');
    var response = {err : false , message : '' };
    var body = req.body;
    var inDate = body.inDate;
    var outDate = body.outDate;
    var adults = body.adults;
    var children = body.children;
    var kisiler = adults + children;
    console.log("indatepost:" +inDate);
    console.log("outdate:" +outDate);
    console.log("yetiskin:" +adults);
    console.log("cocuk:" +children);

    res.send(JSON.stringify({ a: 1 }, null, 3));
    //database.query("INSERT INTO odalar(kisi) VALUES(?)", [kapasite], function (err, rows) {
    //    if (err) {
    //        response.err=true;
    //        response.message="Veritabanında bir hata oluştu."
    //    }
    //    res.send(JSON.stringify({ a: 1 }, null, 3));

    /*
    res.setHeader('Content-Type', 'application/json');
    var response = {err : false , message : '' };
    var body = req.body;
    var inDate = body.inDate;
    var outDate = body.outDate;
    var adults = body.adults;
    var children = body.children;
    var kisiler = adults + children;
    console.log("indatepost:" +inDate);
    console.log("outdate:" +outDate);
    console.log("yetiskin:" +adults);
    console.log("cocuk:" +children);
    sql="SELECT id "
        +"FROM odalar "
        +"WHERE kisi=? AND id not in ("
        +"SELECT id "
        +"FROM rezervasyon "
        +"WHERE (indate<=? and outdate>=?) OR (indate>=? and indate>=?) OR (outdate>=? and outdate>=?)"
        +")"
    database.query(sql, [kisiler,inDate,outDate,inDate,inDate,outDate,outDate],null, function (err, rows) {
        //var result=null;
        //var error=false;
        //if (err) {
        //    error=true;
        //} else if(rows.length){
        //    result=rows;
        //}
        res.send(JSON.stringify({ a: 1 }, null, 3));
        res.render('rezervasyon2.ejs',{indate:inDate,oudate:outDate,kisiler:kisiler,error:error,empty:result});
    });
    */
});
router.post("/iletisim",function(req,res){
    //res.send(req.body); // bütün  postu gösterir
    res.setHeader('Content-Type', 'application/json');
    var response = {err : false , message : '' };

    res.send(JSON.stringify({ a: 1 }, null, 3));

    var body=req.body;
    var name = body.name;
    var surname = body.surname;
    var email = body.email;
    var konu = body.konu;
    var message = body.message;

    var mail = {
        from: fromEmailAddress,
        to: toEmailAddress,
        subject: konu,
        text: email,
        html:
        "Gönderici Adı :" + name + "<br>" +

        "Gönderici Soyadı:" + surname+  "<br>" +

        "Maili gönderen: " + email + "<br>"+

        "Konusu :" + konu + "<br>"+

        "İçeriği : "  + message
    }

    transport.sendMail(mail, function(error, response){
        if(error){
            console.log(error);
        }else{
            console.log("Message sent");
        }

        transport.close();
    });
});
router.post("/odaEkle",function (req,res) {

    res.setHeader('Content-Type', 'application/json');
    var response = {err : false , message : '' };
    var body = req.body;
    var kapasite = body.odaKapasite;
    console.log("kapasite:" + kapasite)
    database.query("INSERT INTO odalar(kisi) VALUES(?)", [kapasite], function (err, rows) {
        if (err) {
          response.err=true;
          response.message="Veritabanında bir hata oluştu."
        }
        res.send(JSON.stringify({ a: 1 }, null, 3));
    });
});
router.post("/adminsayfa",function(req,res){

    res.setHeader('Content-Type', 'application/json');
    var response = {err : false , message : '' };

    database.query("SELECT password FROM user WHERE username=? ",[req.body.username], function (err, rows) {
        if (err || !rows.length) {
            response.err=true;
            response.message="Hatalı Giriş";
        } else if(rows[0].password!=helper.md5(req.body.password)){
            response.err=true;
            response.message="Şifre Yanlış";
        }
        else {
            req.session.username=req.body.username;
        }
        res.send(JSON.stringify( response , null, 3));
    })
})
router.post("/cikis",function(req,res){

    res.setHeader('Content-Type', 'application/json');
    var response = {err : false , message : '' };
    req.session.destroy();
    res.send(JSON.stringify({ a: 1 }, null, 3));

})
router.get("/oda-sil",function (req,res) {

    res.setHeader('Content-Type', 'application/json');
    var response = {err : false , message : '' };

    console.log('Search is : ',parsedUrl.search);

    console.log("ayberk")
    var id = req.query.id; // $_GET["id"]

    console.log("id:"+id);
    console.log("ayberk")

});
router.get('/delete', function(req, res) {
    var id = req.params.id;
    req.getConnection(function (err, connection) {
        connection.query("DELETE FROM rezervasyon WHERE id = ? ", [id], function(err, results) {
            res.redirect('/adminsayfa');
            console.log('Some data has been deleted')
        });
    });
});
router.post("/rezervasyonsil",function (req,res) {
    res.setHeader('Content-Type', 'application/json');
    var response = {err : false , message : '' };
    var body = req.body;
    var odaid = body.secilen;
    console.log("odaid:" + odaid)
    database.query("DELETE from rezervasyon WHERE odaid = ?", [odaid], function (err, rows) {
        if (err) {
            response.err=true;
            response.message="Veritabanında bir hata oluştu."
        }
        res.send(JSON.stringify({ a: 1 }, null, 3));
    });
});
router.post("/odasil",function (req,res) {

    res.setHeader('Content-Type', 'application/json');
    var response = {err : false , message : '' };
    var body = req.body;
    var secilenoda = body.secilenoda;
    console.log("odaid:" + secilenoda)
    database.query("DELETE from odalar WHERE id = ?", [secilenoda], function (err, rows) {
        if (err) {
            response.err=true;
            response.message="Veritabanında bir hata oluştu."
        }
        res.send(JSON.stringify({ a: 1 }, null, 3));
    });
});
router.post("/odaguncelle",function (req,res) {

    res.setHeader('Content-Type', 'application/json');
    var response = {err : false , message : '' };
    var body = req.body;
    var sectiginoda = body.sectiginoda;
    var güncelkapasite = body.güncelkapasite;

    console.log("sectiginoda:" + sectiginoda)
    console.log("güncelkapasite:" + güncelkapasite)

    database.query("UPDATE odalar SET kisi = ? WHERE id = ?", [güncelkapasite,sectiginoda], function (err, rows) {
        if (err) {
            response.err=true;
            response.message="Veritabanında bir hata oluştu."
        }
        res.send(JSON.stringify({ a: 1 }, null, 3));
    });
});
router.post("/rezerve",function (req,res) {

    res.setHeader('Content-Type', 'application/json');
    var response = {err : false , message : '' };
    var body = req.body;
    var odaid = body.odaid;
    var name = body.name;
    var surname = body.surname;
    var tckno = body.tckno;
    var telefon = body.telefon;
    var inDate = body.inDate;
    var outDate = body.outDate;
    var id=odaid;
    console.log("surname:" + surname)
    console.log("telefon:" + telefon)

    var post  = {odaid: odaid, name: name, surname: surname, tckno:tckno,telefon:telefon,inDate:inDate,outDate:outDate};

    database.query("INSERT INTO rezervasyon(id,odaid,isim,soyadi,tckno,telefon,indate,outdate) VALUES(?,?,?,?,?,?,?,?)", [id,odaid,name,surname,tckno,telefon,inDate,outDate], function (err, rows) {
        if (err) {
            response.err=true;
            response.message="Veritabanında bir hata oluştu."
            console.log("eklenmedi")
            console.log("error:"+err)

        }
        else{
            console.log("kayıt edildi.")
        }
        res.send(JSON.stringify({ a: 1 }, null, 3));
    });
});
