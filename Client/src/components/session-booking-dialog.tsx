import * as React from "react"
import { ChevronDown, ChevronRight, Star, Users, Verified } from 'lucide-react'
import { motion } from "framer-motion"

import { Button } from "../components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../components/ui/collapsible"
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group"
import { Label } from "../components/ui/label"
import { Textarea } from "../components/ui/textarea"
import { SessionDetailsDialog } from "./session-details-dialog"

interface ConnectOption {
  id: string
  title: string
  description: string
  originalPrice?: number
  price: number
}

const connectOptions: ConnectOption[] = [
  {
    id: "chat",
    title: "Connect via Chat",
    description: "Continue your conversations through chat interaction.",
    price: 99
  },
  {
    id: "call",
    title: "Connect via Audio/Video Call",
    description: "Engage in dynamic voice and video conversations meetings.",
    price: 199
  },
  // {
  //   id: "resume",
  //   title: "Resume Review",
  //   description: "Get your resume reviewed by a top mentor through a chat, audio, or video call.",
  //   originalPrice: 599,
  //   price: 300
  // },
  // {
  //   id: "interview",
  //   title: "Mock Interview",
  //   description: "Get interviewed by a top mentor through an audio or video call.",
  //   originalPrice: 999,
  //   price: 500
  // },
  // {
  //   id: "referral",
  //   title: "Job Referral",
  //   description: "A mentor will evaluate your profile, conduct basic interviews, and provide a referral if eligible.",
  //   originalPrice: 999,
  //   price: 500
  // }
]

export function SessionBookingDialog({isOpen,setIsOpen}) {
  // const [isOpen, setIsOpen] = React.useState(true)
  const [sessionDetailsOpen , setSessionDetalsOpen] = React.useState(false)
  const [selectedOption, setSelectedOption] = React.useState<string>("")
  const [concerns, setConcerns] = React.useState("")
  console.log(selectedOption);
  
  return (
    <>
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-2xl p-0">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-xl font-semibold">
            Session Booking - One Time Mentorship
          </DialogTitle>
        </DialogHeader>
        
        <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
          <div className="space-y-4 p-6">
            <Collapsible className="w-full">
              <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg bg-secondary/80 px-4 py-3">
                <span className="font-semibold">About Mentor</span>
                <ChevronRight className="h-5 w-5" />
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-4 rounded-lg bg-card p-4">
                <div className="flex items-start gap-4">
                  <img
                    src="/placeholder.svg"
                    alt="Salauddin N"
                    className="h-16 w-16 rounded-full"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold">Salauddin N</h3>
                      <Verified className="h-5 w-5 text-blue-500" />
                    </div>
                    <p className="text-sm text-muted-foreground">@salauddin</p>
                    <p className="text-primary">
                      Senior Software Engineer @ Everest engineering
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-primary text-primary" />
                        <span>3.8 Ratings</span>
                      </div>
                      <div className="flex items-center gap-1 text-green-500">
                        <Users className="h-4 w-4" />
                        <span>170 Sessions</span>
                      </div>
                    </div>
                    <p className="text-sm">
                      8+ Years of Experience at{" "}
                      <span className="text-primary">
                        Everest engineering | ThoughtWorks
                      </span>
                    </p>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>

            <Collapsible className="w-full">
              <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg bg-secondary/80 px-4 py-3">
                <span className="font-semibold">Describe your concerns</span>
                <ChevronDown className="h-5 w-5" />
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-4">
                <Textarea
                  placeholder="Write your concerns here..."
                  value={concerns}
                  onChange={(e) => setConcerns(e.target.value)}
                  className="min-h-[100px]"
                />
              </CollapsibleContent>
            </Collapsible>

            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg bg-secondary/80 px-4 py-3">
                <span className="font-semibold">Select connect option</span>
              </div>
              <RadioGroup
                value={selectedOption}
                onValueChange={setSelectedOption}
                className="space-y-2"
              >
                {connectOptions.map((option) => (
                  <Label
                    key={option.id}
                    className="flex cursor-pointer items-center justify-between rounded-lg border bg-card p-4 hover:bg-accent"
                  >
                    <div className="flex items-start gap-3">
                      <RadioGroupItem value={option.id} />
                      <div className="space-y-1">
                        <p className="font-medium">{option.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {option.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-baseline gap-2">
                      {option.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          ₹{option.originalPrice}
                        </span>
                      )}
                      <span className="text-lg font-semibold text-primary">
                        ₹{option.price}
                      </span>
                    </div>
                  </Label>
                ))}
              </RadioGroup>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 border-t bg-background p-4">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button
            disabled={!selectedOption || !concerns.trim()}
            onClick={() =>{
              setSessionDetalsOpen(true)
               setIsOpen(false)
              }}
          >
            Proceed
          </Button>
        </div>
      </DialogContent>
    </Dialog>
    <SessionDetailsDialog setSessionBookingDialougeOpen={setIsOpen} isOpen={sessionDetailsOpen} setIsOpen={setSessionDetalsOpen} />
    </>
  )
}