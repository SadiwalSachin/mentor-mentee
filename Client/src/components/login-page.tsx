import { useState } from "react"
import { motion } from "framer-motion"
import axios from "axios"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setUserEmail } from "../redux/slices/userSlice"

export function LoginPage() {
  const [email, setEmail] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Login attempted with email:", email)

    try {
      const response = await axios.post("http://localhost:7878/api/v1/user/sign-up",{email})
      console.log(response.data);
      if(response.data.success){
        alert(response.data.message)
        navigate("/verify-otp")
        dispatch(setUserEmail(email))
      } else {
        alert(response.data.message)
      }
    } catch (error) {
      console.log("Error while sign up the user",error);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md space-y-6 rounded-xl bg-card p-6 shadow-lg"
      >
        <div className="space-y-2 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-3xl font-bold tracking-tight"
          >
            Hey! 👋
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-2xl font-semibold tracking-tight"
          >
            Welcome to ProPeers
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-muted-foreground"
          >
            Enter your email to continue
          </motion.p>
        </div>
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              placeholder="Enter your email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-12"
            />
          </div>
          <Button type="submit" className="w-full h-12 text-base">
            Continue
          </Button>
          <div className="flex items-center my-4 px-3">
              <hr className="flex-grow border-t border-gray-300" />
              <span className="mx-2 text-gray-500">OR</span>
              <hr className="flex-grow border-t border-gray-300" />
          </div>
          <div>
            <h2 className="text-center">Do you have an account? <Link className="text-blue-500" to="/sign-up">Sign Up</Link></h2>
          </div>
        </motion.form>
      </motion.div>
    </div>
  )
}