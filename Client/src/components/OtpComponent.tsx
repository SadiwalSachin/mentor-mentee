import { useRef, useState } from "react";

const OtpComponent = () => {
  const count = 4;
  // otp ko store karne ke liye ham array banyenge kyunki jyada length ke otp honge to ye method work sahi karege multiple varible banane ki jaruruat nahi padegi
  const [otps,setOtps] = useState<String[]>(new Array(count).fill(""))

  // masking
  const tempMaskArray = ["*","*","*","*"]
  const [masking, setMasking] = useState<String[]>(new Array(count).fill(""))

  // ab hame saare input ka ref chaiye focus ko implement karne ke liye uske liye ham ref ka use karenge usme bhi ham refList ka use karenge matlab saare input element ek array me aa jayenge
  const inputRefs = useRef([])

  function handleClick (index) {
    return (event) => {
      event.target.setSelectionRange(0,1)
    }
  }

  function handleKeyUp (index) {
    return (event) => {
      const key = event.key
      console.log(key);
      const oldOtps = [...otps]
      const maskingCopy = [...masking]

      // muze backspace wala case pehle hi handle karna hoga taki input me backspace print na ho aage ham dusra case bhi handle karenge jisme agar dusri koi key press karenge rather than no then vo print na ho

      if(key === "Backspace"){
        oldOtps[index] = ""
        maskingCopy[index]= ""
        moveFocusToLeft(index)
        setOtps(oldOtps)
        setMasking(maskingCopy)
        return
      }

      // handleing arrow key for moving focus
      if(key === "ArrowRight"){
       moveFocusToRight(index,oldOtps)
      }

      if(key === "ArrowLeft"){
       moveFocusToLeft(index,oldOtps)
      }

      // if user koi special character ya or kuch type karta hai to vo add nahi karna hai or na hi dikhana hai isliye isNaN method ka use kar rahe hai
      if(isNaN(key)){
        return
      }

      oldOtps[index] = key

      setOtps(oldOtps)
      maskingCopy[index]= "*"
      setMasking(maskingCopy)

      // ab jesse hi input par click karke usme kuch calue daal di ham uska focus aage shift karenge\
      // Send focus to next box if is it availabale 
      moveFocusToRight(index)

      const optToSend = oldOtps.join("")
      if(optToSend.length == count){
        console.log(optToSend );
        
      }
      
    }
  }

  function moveFocusToRight(index,oldOtps){
    if(inputRefs.current[index + 1]){
      console.log("index",index);
      if(oldOtps){
        const tempArray = [...otps]
        const trimmedArray = tempArray.fill("*",0,index)
        console.log("trimmedArray",trimmedArray);
        // find the index of empty box
        const emptyIndex = trimmedArray.indexOf(" ")
        console.log("emptyIndex",emptyIndex);
        inputRefs.current[emptyIndex]?.focus()
      } else {
        inputRefs.current[index + 1]?.focus()
      }
    }
  }

  function moveFocusToLeft(index,oldOtps){
    if(inputRefs.current[index - 1]){
      inputRefs.current[index - 1]?.focus()
    }
  }

  function handlePaste (index) {
    return (event) => {
      const pastedData = event.clipboardData.getData("Text").slice(index,count)
      if(!isNaN(pastedData)){
        console.log(pastedData);
        setOtps(pastedData.split(""))
        setMasking(tempMaskArray)
      }
    }
  }

  return (
    <div className="h-screen w-screen bg-zinc-300">
      {new Array(count).fill("").map((_, index) => (

        <input
        ref={(iRef)=>{inputRefs.current[index]=iRef}}
          type="text"
          key={index}
          value={masking[index] ?? ""}
          onKeyUp={handleKeyUp(index)}
          onClick={handleClick(index)}
          maxLength={1}
          onPaste={handlePaste(index)}
          autoComplete="one-time-code"
          inputMode="numeric"
          className="p-5 h-20 w-20 outline-none rounded-xl font-semibold text-xl border-black border-2"
        />
        
      ))}
    </div>
  );
};

export default OtpComponent;
