var bodyParser = require('body-parser');
var multer = require('multer');
var xlstojson = require("xls-to-json-lc");
var xlsxtojson = require("xlsx-to-json-lc");

var mongoose = require('mongoose'),
    Student = mongoose.model('Students');
var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './api/uploads/')
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
    }
});

var upload = multer({ //multer settings
    storage: storage,
    fileFilter: function (req, file, callback) { //file filter
        if (['xls', 'xlsx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length - 1]) === -1) {
            return callback(new Error('Wrong extension type'));
        }
        callback(null, true);
    }
}).single('file');
exports.fileUpload = function (req, res) {
    var exceltojson;
    upload(req, res, function (err) {
        console.log(req.body);
        if (err) {
            res.json({ error_code: 1, err_desc: err });

            console.log("at 1" + err);
            return;
        }
        /** Multer gives us file info in req.file object */
        if (!req.file) {

            res.json({ error_code: 1, err_desc: "No file passed" });
            return;
        }
        /** Check the extension of the incoming file and 
         *  use the appropriate module
         */
        if (req.file.originalname.split('.')[req.file.originalname.split('.').length - 1] === 'xlsx') {
            exceltojson = xlsxtojson;
        } else {
            exceltojson = xlstojson;
        }
        console.log(req.file.path);
        try {
            exceltojson({
                input: req.file.path,
                output: null, //since we don't need output.json
                lowerCaseHeaders: false
            }, function (err, result) {
                
                console.log('I am after result', result);
                if (err) {
                    return res.json({ error_code: 1, err_desc: err, data: null });
                    console.log(err);
                }
             //   res.json({ error_code: 0, err_desc: null, data: result });
                for (var i = 0; i < result.length; i++) {
                     var new_student = new Student(result[i]);
                      new_student.save(function (err, student) {
                      if (err)
                             console.log(err);
                      })
                }
                res.json({ error_code: 0, err_desc: null, data: result });

                /*  result.forEach(function(value){
                      console.log(value);
                      var new_student = new Student(value);
                   new_student.save(function (err, student) {
                             if (err)
                             console.log(err);
                        // res.send(err);
                        // res.json(student);
})
                 
}) */
            })
        } catch (e) {
            res.json({ error_code: 1, err_desc: "Corupted excel file" });
        }
    })
};