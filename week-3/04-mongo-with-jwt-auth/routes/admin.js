const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const {Admin , Course}  = require("../db")
const router = Router();

const jwt = require("jsonwebtoken")

const privateKey = "abkabkhadsfkbskvbsfkhlbakbfbalkkgsdflkjaddfkjjhdsf";



// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    let username = req.body["username"];
    let password = req.body["password"];
    let admin = new Admin({
        username,password
    })
    await admin.save();
    res.json( { message: 'Admin created successfully' });
});
router.post('/signin', (req, res) => {
    let username = req.body["username"];
    let password = req.body["password"];
    let ifExit = Admin.findOne({
        username,password
    })
    if(ifExit==null){
        res.status(403).json({
            msg: "Admin doesnt exist"
        });
        return;
    }
    let token = jwt.sign({username},privateKey);
    res.json({token});
    return;
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    let title = req.body["title"];
    let  description = req.body["description"];
    let price = req.body["price"];
    let imageLink = req.body["imageLink"];
    let course =  new Course({
        title,description,price,imageLink
    });
    let newCourse =  await course.save();
    res.json({
        message: 'Course created successfully', courseId: newCourse._id
    })
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    let allCourse = await Course.find({});
    res.json({
        courses: allCourse
    })
});

module.exports = router;