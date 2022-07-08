const Course = require("../models/course");
const multer = require ("multer");
const path = require("path");
// Create course
module.exports.createCourse = async (req, res, next) => {
    const course = new Course(req.body);

   
    await course.save().then((course) => {
        res.status(200).send(course);
    }).catch ((error) => {
    res.status(400).send(error);
   })
};


// get all courses
module.exports.getAllCourses = async (req, res, next) => {
    
    const course = Course.find({}).then((course) => {
        res.status(200).json(course);
    }).catch((error) => {
        res.status(400).send(error.message);
       })
    // console.log(course)
    if (!course) {
        throw new Error("No Courses available");
    }
    
};


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
      },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

module.exports.uploadImg = multer({storage: storage});
module.exports.display = async (req, res, next) => {
    
    const courseImg = new Course.create({
        
        image: req.body.image
    })
    
    res.status(200).send("uploaded");
};