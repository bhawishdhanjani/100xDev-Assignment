const { Router } = require("express");
const userMiddleware = require("../middleware/user");
const jwt = require("jsonwebtoken")
const {User , Course}  = require("../db")

const router = Router();
const privateKey = "abkabkhadsfkbskvbsfkhlbakbfbalkkgsdflkjaddfkjjhdsf";


// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    let username = req.body["username"];
    let password = req.body["password"];
    let user = new User({
        username,password
    })
    await user.save();
    res.json( { message: 'User created successfully' });
});

router.post('/signin', (req, res) => {
    let username = req.body["username"];
    let password = req.body["password"];
    let userExits =User.findOne({
        username,
        password
    });
    if(userExits==null){
        res.status(403).json({
            msg: "User doesnt exist"
        });
        return;
    }
    let token = jwt.sign({username},privateKey);
    res.json({token});
    return;
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    let allCourse = await Course.find({});
    res.json({
        courses: allCourse
    })
});

router.post('/courses/:courseId', userMiddleware,  async(req, res) => {
    // Implement course purchase logic
    let _id = req.params["courseId"];
    let token = req.headers["authorization"].substring(7);
    let username = jwt.decode(token).username;
    let course = await Course.findOne({_id});
    if(course!=null){
       await User.updateOne({username},{
        "$push": {
            purchasedCourses : _id
        }
       })
       res.json({ message: 'Course purchased successfully' });
       return;
    }    
    return  res.status(404).json({ message: 'Course Not Found' }) ;
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    let token = req.headers["authorization"].substring(7);
    let username = jwt.decode(token).username;
    
    let user = await User.findOne({username});
    let purchasedCourses =  user.purchasedCourses;

    let courses = await Course.find({ _id :  {
        "$in" : purchasedCourses
    }
    });

    res.json({
        courses
    });

});

module.exports = router