const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const {User , Course} = require("../db")

// User Routes
router.post('/signup', async (req, res) => {
    let username = req.body["username"];
    let password = req.body["password"];
    let user = new User({
        username,password
    })
    await user.save();
    res.json( { message: 'User created successfully' });
    
});

router.get('/courses',userMiddleware, async (req, res) => {
    let allCourse = await Course.find({});
    res.json({
        courses: allCourse
    })
});

router.post('/courses/:courseId',  userMiddleware, async (req, res) => {
    // Implement course purchase logic
    let _id = req.params["courseId"];
    let username = req.headers["username"];

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
    let username = req.headers["username"];
    
    let user = await User.findOne({username});
    let purchasedCourses =  user.purchasedCourses;

    let courses2 = await Course.find({ _id :  {
        "$in" : purchasedCourses
    }
    });

    res.json({
        courses : courses2
    });



});

module.exports = router