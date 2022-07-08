const router = require("express").Router();
// const multer = require("multer")
const { createCourse, getAllCourses, display, uploadImg } = require("../controllers/courseController");


// const upload = multer({storage: storage});

// routes for courses
router.route("/course").post(createCourse);
router.route("/getAllCourses").get(getAllCourses);
// router.route("/display").post(upload.any(), display);
router.route("/img").post(uploadImg.any("myFile"), display);
module.exports = router;