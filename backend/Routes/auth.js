const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

router.post('/signup',async (req,res) =>{
    try{
        const {email,password} = req.body;
        if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
        }

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
    } catch(error){
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/login', async (req, res) => {
  try {
    
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ token, userId: user._id });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
