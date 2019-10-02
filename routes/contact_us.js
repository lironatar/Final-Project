const express = require ('express');
const router = express.Router();
const nodemailer= require('nodemailer');
const {postLimiter} = require('../helper/limiter');

router.get('', (req,res)=>{
    res.render('pages/contact_us');
});


/*router.post('', (req, res) => {
    var transporter = nodemailer.createTransport({

        host: "smtp-mail.outlook.com", // hostname
        secureConnection: false, // TLS requires secureConnection to be false
        port: 587, // port for secure SMTP
        tls: {
            ciphers: 'SSLv3'
        },
        requireTLS:true,
        auth: {
            user: 'lironatar94@outlook.co.il',
            pass: '5327158li'
        },
        
    });

    var mailOptions = {
        from: 'lironatar94@outlook.co.il', // sender address
        to: 'lironatar1994@gmail.com', // list of receivers
        subject: 'Test Email', // Subject line
        text: 'Hello world ?' // plain text body
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log('error sending email: ' + error);
        } else {
            console.log('email sent' + info.response);
        }
    });

});
*/
router.post('', postLimiter,(req, res) => {
    var smtpTransposrt = nodemailer.createTransport({
        host:"smtp.gmail.com",
        secureConnection:false,
        port:587,
        requiresAuth:true,
        auth: {
            user: 'lironatar1994@gmail.com',
            pass: '5327158li'
        }
    });
    user=req.user;
    if (req.user == undefined){
        var email= req.body.email;
        var fullname= req.body.fullname;
    }else{
        var fullname = user.fname+' '+user.lname;
        var email = user.email;
    }
    
    var text= email +'\n'+ req.body.message;
    var mailOptions = {
        from: `"אתר דפור ראובן" <lironatar1994@gmail.com>`,
        to: `lironatar94@gmail.com`,
        subject: `${fullname} : ${req.body.title}`,
        text: text
    }
    smtpTransposrt.sendMail(mailOptions, function(error, request){
    if(error){
        console.log(error);
        
    }else{
        console.log('success');
        
        req.flash('success', 'ההודעה נשלחה בהצלחה!');
        res.redirect('/home');
    }
})
});




module.exports = router;