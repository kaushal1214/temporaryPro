var sampleMailData =
    [
       
        {"_id":"5ac1caea5c70fc3be819216a",
           "boDmr":{"queue":"New Mail","status":"New"},
           "boxofficeData":{
                "Postal_Post_Location":{"fieldname":"Postal Post Location","pageno":"0","confidence":"100","value":""},
                "Sender_Name":{"fieldname":"Sender Name","pageno":"0","confidence":"100","value":"PEREZ-KUDZMA LAW OFFICE, P.C."},
                "Recipient_Name":{"fieldname":"Recipient Name","pageno":"0","confidence":"100","value":"AT T"},
                "Courier_Name":{"fieldname":"Courier_Name","pageno":"0","confidence":"100","value":"USPS"},
                "Received_Time":{"fieldname":"Received_Time","pageno":"0","confidence":"100","value":"124120"},
                "Received_Date":{"fieldname":"Received_Date","pageno":"0","confidence":"100","value":"20180307"}
            },
            "commonData":{"bo_lastModifiedDate":1522649859596,"bo_docType":"ENV"}
        },
        {"_id":"5ac1cade5c70fc3be8192158",
            "boDmr":{"queue":"New Mail","status":"New"},
            "boxofficeData":{
                "Postal_Post_Location":{"fieldname":"Postal Post Location","pageno":"0","confidence":"100","value":""},
                "Sender_Name":{"fieldname":"Sender Name","pageno":"0","confidence":"100","value":"HELLER AND FRISONE, LTD."},
                "Recipient_Name":{"fieldname":"Recipient Name","pageno":"0","confidence":"100","value":""},
                "Courier_Name":{"fieldname":"Courier_Name","pageno":"0","confidence":"100","value":"USPS"},
                "Received_Time":{"fieldname":"Received_Time","pageno":"0","confidence":"100","value":"124120"},
                "Received_Date":{"fieldname":"Received_Date","pageno":"0","confidence":"100","value":"20180307"}
            },
            "commonData":{"bo_lastModifiedDate":1522649830641,"bo_docType":"ENV"}
        },
        {"_id":"5ac1cac25c70fc3be8192150",
            "boDmr":{"queue":"New Mail","status":"New"},
            "boxofficeData":{
                "Postal_Post_Location":{"fieldname":"Postal Post Location","pageno":"0","confidence":"100","value":""},
                "Sender_Name":{"fieldname":"Sender Name","pageno":"0","confidence":"100","value":"RAE Systems"},
                "Recipient_Name":{"fieldname":"Recipient Name","pageno":"0","confidence":"100","value":"po III sill"},
                "Courier_Name":{"fieldname":"Courier_Name","pageno":"0","confidence":"100","value":"USPS"},
                "Received_Time":{"fieldname":"Received_Time","pageno":"0","confidence":"100","value":"124120"},
                "Received_Date":{"fieldname":"Received_Date","pageno":"0","confidence":"100","value":"20180307"}
            },
            "commonData":{"bo_lastModifiedDate":1522649808937,"bo_docType":"ENV"}
        }
    ];

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
                console.log(req.headers['x-real-ip']);
                console.log(req.ip);
                console.log(req.ips);
                console.log(req.headers['X-FORWARDED-FOR']);
                console.log(req.connection.remoteAddress);
                console.log(req.fingerprint);
                res.render('index', { title: 'Express' });
    }
}