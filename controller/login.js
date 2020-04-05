let fs = require('fs');

const USER_FILE = __dirname+'/../db/user.json';
module.exports = {
    getToken: function(req,res){
        let mockUser = 'Kaushal Kishor',
            mockPass = 'password';

        let response = { token:"alsindfaljwerbiausfn"};
        if(req.body.username == mockUser && req.body.password == mockPass)
        {
            res.status(200).json(sampleMailData);
        }
        else
         res.status(404).json({status:"User not found"});
    },
    
    homepage: function(req, res, next) {
                console.log(`${JSON.stringify(req.fingerprint)}`);
                res.render('index');
    },
    loginPage: function(req,res){
        res.render('login');
    },

    login: function(req,res){
        let fingerprint = req.fingerprint;

        fs.readFile(USER_FILE,'utf8',(err,jsonString)=>{
            if(!err){
                console.log(jsonString);
                let userDetails = JSON.parse(jsonString);

                if(userDetails.username==req.body.username && userDetails.password === req.body.password)
                {
                    if(userDetails.fingerprint)
                    {
                        if(fingerprint.hash===userDetails.fingerprint.hash)
                        {
                            let data = userDetails.fingerprint.components;
                            let viewModel={device:{
                                country:data.geoip.country,
                                city:data.geoip.city,
                                timezone:data.geoip.timezone,
                                browser:data.useragent.browser.family,
                                os:data.useragent.os.family
                            }};

                            res.render('welcome', viewModel);
                        } else{ 

                            res.render('mfa');
                        } 
                    } else {
                        userDetails.fingerprint = fingerprint;
                        userDetails = JSON.stringify(userDetails,null,2);
                        fs.writeFile(USER_FILE, userDetails,(err,update)=>{
                            res.render('welcome');
                        });
                    }
                } else {
                    res.render('login',{error:'Wrong Username or Password'});
                }
                
            } 
        })
       
    },
    mfa : function(req,res){
        let code = req.body.securitycode1+req.body.securitycode2+req.body.securitycode3+req.body.securitycode4+req.body.securitycode5+req.body.securitycode6;

        console.log('MFA request accepted');
        fs.readFile(USER_FILE,'utf8',(err,jsonString)=>{

            if(!err){

                let userDetails = JSON.parse(jsonString);
               
                if(Number(code)===userDetails.securitycode) {
                    console.log('SecurityCode matched');
                    userDetails.fingerprint = req.fingerprint;
                    
                    fs.writeFile(USER_FILE, JSON.stringify(userDetails,null,2),(err)=>{
                        console.log('Updated!');
                        let data = userDetails.fingerprint.components;
                        let viewModel={device:{
                            country:data.geoip.country,
                            city:data.geoip.city,
                            timezone:data.geoip.timezone,
                            browser:data.useragent.browser.family,
                            os:data.useragent.os.family
                        }};
                        res.render('welcome', viewModel);
                    });
                } else {
                    res.render('mfa',{error:'MFA Validation Failed!'});
                }
            } else {
                console.log(err);
            }
        })
    }
}