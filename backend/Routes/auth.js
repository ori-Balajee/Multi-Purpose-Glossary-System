const router = express.Router();

router.post('/signup',async (req,res) =>{
    const {email,password} = req.body;
    const existingUser = await User.findOne({email});
    if(existingUser){
        return res.status(400).json({message:'Email already exist'});
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);

    // CREATE A  DOCUMENT
    const user = await User.create({
        email,
        password:hashedPassword
    });

    res.status(201).json({message:'User created successfully'});
})

router.post('/login', async (req,res) =>{
    const{email,password} = req.body;
    const user = await User.findOne({email});
    if(!user){
        return res.status(400).json({message:'Invalid'});
    }

    const isMatch = await bcrypt.compare(password,User.password )
    if(!isMatch){
        return res.stasus(400).json({message:'Invalid credentials'});
    }

    const token = jwt.sign(
        {userId: user._id},
        process.env.JWT_SECRET,
        {expiresIn: '1d'}
    );

    res.json({token});
});

