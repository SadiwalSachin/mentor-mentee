import { Session } from "../models/session.model.js"
import { User } from "../models/user.model.js"

const bookSession = async (req,res) => {
    try {
        const {mentorId,selectedSession} = req.body
        const menteeId = req.userId

        const startDate = new Date()
        const endDate = new Date()
        endDate.setDate(startDate.getDate() + 1 )
        const session = await Session.create({
            menteeId,
            mentorId,
            startTime:startDate,
            endTime:endDate,
            status:"active",
            sessionType:selectedSession,
            paymentStatus:true
        })

        if(!session){
            return res.status(400).json({success:false,message:"some error occured while generating session"})
        }

        const addSessionToUser = await User.findByIdAndUpdate(menteeId,
            {
                $push:{
                    sessions:session._id
                }
            },
            {
                new:true
            }
        )
        
        if (!addSessionToMentee) {
            return res.status(404).json({
                success: false,
                message: "Mentee not found to add session in the",
            });
        }

        return res.status(201).json({success:true,message:"Session is created and added to user",session})

    } catch (error) {
        console.log("Error while creating a session");
        return res.status(500).json({success:false,message:"Error while creating a session",error})
    }
}