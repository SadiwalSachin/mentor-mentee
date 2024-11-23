import { Link } from "react-router-dom"
import { useState } from "react"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { Card } from "../components/ui/card"
import { Verified, Phone, Users, Target, FileText } from 'lucide-react'
import { SessionBookingDialog } from "./session-booking-dialog"

interface Mentor {
  id: string
  name: string
  handle: string
  isVerified: boolean
  position: string
  company: string
  description: string
  experience: {
    years: number
    companies: string[]
  }
  rating: number
  sessionsCompleted: number
  skills: string[]
  imageUrl: string
}

const mentors: Mentor[] = [
  {
    id: "1",
    name: "Salauddin N",
    handle: "@salauddin",
    isVerified: true,
    position: "Senior Software Engineer",
    company: "Everest engineering",
    description: "I am a senior full stack developer in mern and aws",
    experience: {
      years: 8,
      companies: ["Everest engineering", "ThoughtWorks"]
    },
    rating: 3.8,
    sessionsCompleted: 170,
    skills: ["Javascript", "Node JS", "React", "AWS"],
    imageUrl: "/placeholder.svg"
  },
  {
    id: "2",
    name: "Sudhir Dhangar",
    handle: "@sudhirdhangar",
    isVerified: true,
    position: "Power Programmer",
    company: "Infosys",
    description: "Specialist Programmer at infosys with 3 YOE",
    experience: {
      years: 3,
      companies: ["Infosys"]
    },
    rating: 4.2,
    sessionsCompleted: 85,
    skills: ["Javascript", "React", "Node JS"],
    imageUrl: "/placeholder.svg"
  },
  {
    id: "2",
    name: "Sudhir Dhangar",
    handle: "@sudhirdhangar",
    isVerified: true,
    position: "Power Programmer",
    company: "Infosys",
    description: "Specialist Programmer at infosys with 3 YOE",
    experience: {
      years: 3,
      companies: ["Infosys"]
    },
    rating: 4.2,
    sessionsCompleted: 85,
    skills: ["Javascript", "React", "Node JS"],
    imageUrl: "/placeholder.svg"
  },
  {
    id: "2",
    name: "Sudhir Dhangar",
    handle: "@sudhirdhangar",
    isVerified: true,
    position: "Power Programmer",
    company: "Infosys",
    description: "Specialist Programmer at infosys with 3 YOE",
    experience: {
      years: 3,
      companies: ["Infosys"]
    },
    rating: 4.2,
    sessionsCompleted: 85,
    skills: ["Javascript", "React", "Node JS"],
    imageUrl: "/placeholder.svg"
  }
]

export function MentorsList() {

  const [isOpen, setIsOpen] = useState(false)

  return (<>
    <div className="flex-1 md:ml-64">
    <div className="space-y-6 p-4">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Our Mentors</h1>
        <p className="text-muted-foreground">
          Any queries? Chat with us here @propeers-support or Whatsapp/Call us at +919625145690
        </p>
      </div>

      <div className="space-y-4">
        {mentors.map((mentor) => (
          <Card key={mentor.id} className="p-6">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1 space-y-4">
                <div className="flex items-start gap-4">
                  <img
                    src={mentor.imageUrl}
                    alt={mentor.name}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-semibold">{mentor.name}</h2>
                      {mentor.isVerified && (
                        <Verified className="h-5 w-5 text-blue-500" />
                      )}
                    </div>
                    <p className="text-muted-foreground">{mentor.handle}</p>
                    <p className="text-primary">{`${mentor.position} @ ${mentor.company}`}</p>
                  </div>
                </div>

                <p className="text-muted-foreground">{mentor.description}</p>

                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5 text-primary"
                      fill="currentColor"
                    >
                      <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z" />
                    </svg>
                    <span className="ml-1 font-medium">{mentor.rating} Ratings</span>
                  </div>
                  <span className="text-muted-foreground">•</span>
                  <div className="flex items-center text-green-500">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{mentor.sessionsCompleted} Sessions Completed</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 text-primary" fill="currentColor">
                    <path d="M20 6h-3V4c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM9 4h6v2H9V4zm11 15H4V8h16v11z" />
                  </svg>
                  <span>{mentor.experience.years}+ Years of Experience at</span>
                  {mentor.experience.companies.map((company, index) => (
                    <span key={company} className="text-primary">
                      {company}
                      {index < mentor.experience.companies.length - 1 && " | "}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  {mentor.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="lg:w-80 space-y-4">
                <div className="space-y-3">
                  <h3 className="font-semibold">What this Mentor offers:</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      <span>Audio/Video Sessions</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>Mock Interviews & Talk Sessions</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Target className="h-4 w-4" />
                      <span>Goal Setting & Follow Ups</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <FileText className="h-4 w-4" />
                      <span>Resume Reviews & Job Refferals</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button 
                  onClick={()=>setIsOpen(true)}
                  className="w-full" variant="outline">
                    Book One Time Mentorship @₹99
                  </Button>
                  <Link
                  to="/mentors/book-session"
                  >
                  <Button className="w-full">
                    Book Full Time Mentorship @₹3000
                  </Button>
                  </Link>
                  <p className="text-center text-sm text-muted-foreground">
                    No Cost EMI available
                  </p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
    </div>
    <SessionBookingDialog isOpen={isOpen} setIsOpen={setIsOpen}/>
  </>

  )
}