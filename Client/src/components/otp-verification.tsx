import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { Dialog, DialogContent } from "../components/ui/dialog";
import axios from "axios";
import { redirect, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoggedIn, setUserDetails } from "../redux/slices/userSlice";

export function OtpVerification() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(55);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [isResending, setIsResending] = useState(false);
  const navigate = useNavigate();
  const {userEmail} = useSelector((state)=>state.userReducer)
  const dispatch = useDispatch()

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value[0];
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if value is entered
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      // Move to previous input on backspace if current input is empty
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    const newOtp = [...otp];

    pastedData.split("").forEach((char, index) => {
      if (index < 6) {
        newOtp[index] = char;
      }
    });

    setOtp(newOtp);
    inputRefs.current[Math.min(pastedData.length, 5)]?.focus();
  };

  const handleResendOtp = async () => {
    setIsResending(true);
    // Simulate OTP resend
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setTimeLeft(55);
    setIsResending(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const onSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:7878/api/v1/user/verify-code",
        { userEmail, verificationCode: otp.join("") }
      );
      console.log(response.data);
      if (response.data.success) {
        alert(response.data.message);
        localStorage.setItem("token",response.data.token)
        dispatch(setIsLoggedIn(response.data.success))
        dispatch(setUserDetails(response.data))
        navigate("/");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log("Error while sign up the user", error);
    }
  };

  return (
    <Dialog open>
      <DialogContent className="sm:max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-2xl font-bold"
            >
              Verify Email
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <p className="text-sm text-muted-foreground">
              A verification code has been sent to
              <br />
              {userEmail}.<br />
              Enter the code below.
            </p>

            <div className="flex justify-center gap-2">
              {otp.map((digit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <input
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className="h-12 w-12 rounded-md border bg-background text-center text-lg font-semibold shadow-sm focus:border-primary focus:ring-1 focus:ring-primary"
                    aria-label={`Digit ${index + 1} of OTP`}
                  />
                </motion.div>
              ))}
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                {formatTime(timeLeft)}
              </span>
              <Button
                variant="link"
                className="p-0 text-primary hover:text-primary/90"
                disabled={timeLeft > 0 || isResending}
                onClick={handleResendOtp}
              >
                Resend OTP
              </Button>
            </div>

            <Button
              onClick={onSubmit}
              className="w-full"
              disabled={otp.some((digit) => !digit)}
            >
              Verify
            </Button>
          </motion.div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
