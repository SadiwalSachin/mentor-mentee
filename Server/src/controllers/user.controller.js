import { User } from "../models/user.model.js";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken"

const generateToken = async (userId) => {
  try {
    const user = await User.findById(userId)
    const token = jwt.sign(
      {
        _id:user._id,
        email:user.email
      },
     "kjashdflkjahsdflkjahsdf" ,
     {
      expiresIn:"3d"
     }
    )
    return token 
  } catch (error) {
    console.log("Error while creating token",error);
  }
}

const signUpUser = async (req, res) => {
  try {
    const { email } = req.body;

    console.log("Email coming from user while sign-up :- ", email);

    if (!email) {
      return res
        .status(400)
        .message({ success: false, message: "Email is required" });
    }

    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    console.log(
      "Verification code generated while signing up the user :- " ,
      verificationCode
    );

    const newUser = await User.create({
      email,
      verificationCode,
    });

    console.log("New user created :- ", newUser);

    let transporter = nodemailer.createTransport({
      service: "gmail",
      port: 465,
      secure: true,
      auth: {
        user: "sachin.aiuser@gmail.com",
        pass: "ofwsvayehkjbtzaf",
      },
    });

    await transporter
      .sendMail({
        from: "sachin.aiuser@gmail.com",
        to: email,
        subject: "Your verificationCode",
        text: `Hello, this is your verification code: ${verificationCode} to verify your account`,
      })
      .then((data) => {
        console.log("Data coming after mail sent :-", data);
        console.log("verificationCode has been sent : ", verificationCode);
        return res
          .status(201)
          .json({
            success: true,
            message: "verificationCode sent successfully",
            verificationCode
          });
      })
      .catch((error) => console.log(error));


  } catch (error) {
    console.log("Error while sign up the user", error);
    return res.status(500).json({
      success: false,
      message: "Error while sign up the user",
      error: error,
    });
  }
};

const verifyVerificationCode = async (req, res) => {
  try {

    const { verificationCode, userEmail } = req.body;

    console.log(verificationCode,userEmail);

    if (!verificationCode || !userEmail) {
      return res.status(500).json({
        success: false,
        message: "Email and verification code is required",
      });
    }

    const userForVerification = await User.findOne({ email:userEmail });

    console.log(userForVerification);

    console.log(userForVerification.verificationCode,verificationCode);
    
    const check = userForVerification?.verificationCode == verificationCode;

    console.log(check);
    
    const token = await generateToken(userForVerification._id)
    console.log("token come in verify cotroller",token);
    
    if (check) {
      console.log("Code will be sent now");
      return res.status(201).json({
        success: true,
        message: "User email verification is done",
        token,
        user:userForVerification
      });
    }
    
  } catch (error) {
    console.log("Error while verifiying the verification code", error);
    return res.status(500).json({
      success: false,
      message: "Error while verifiying the verification code",
      error: error,
    });
  }
};

const getAllOtherUser = async (req, res) => {
  try {
    const loggedInUserId = req.userId
    console.log("loggedInUserId in getAllOtherUser",loggedInUserId);
    

    const allUsers = await User.find({_id:{
      $ne:loggedInUserId
    }})

    return res.status(200).json({success:true,message:"Other user finded",users:allUsers})

  } catch (error) {
    console.log("Errro occured while fetching getAllOtherUser",error);
    
  }
}


export { signUpUser, verifyVerificationCode, getAllOtherUser };
