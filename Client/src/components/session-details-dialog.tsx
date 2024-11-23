import * as React from "react"
import { motion } from "framer-motion"
import { Ticket } from 'lucide-react'

import { Button } from "../components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"

interface FormData {
  phone: string
  email: string
  state: string
  address: string
}

export function SessionDetailsDialog({isOpen,setIsOpen,setSessionBookingDialougeOpen}) {
  // const [isOpen, setIsOpen] = React.useState(true)
  const [couponCode, setCouponCode] = React.useState("")
  const [formData, setFormData] = React.useState<FormData>({
    phone: "+917415162758",
    email: "sachin.aiuser@gmail.com",
    state: "",
    address: ""
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    setIsOpen(false)
  }

  const handleApplyCoupon = () => {
    console.log("Applying coupon:", couponCode)
    // Add coupon logic here
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-md p-0">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-xl font-semibold">
            Session Booking - One Time Mentorship
          </DialogTitle>
        </DialogHeader>

        <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-6 p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Listed Price of Session:</span>
                <span>₹99</span>
              </div>

              <div className="flex items-center justify-between font-medium">
                <span>Amount Payable</span>
                <span className="flex items-center gap-1 text-primary">
                  ₹99.00
                  <span className="text-yellow-500">✨</span>
                </span>
              </div>

              <div className="space-y-2">
                <Label>Coupons</Label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Ticket className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input
                      placeholder="Enter Coupon Code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleApplyCoupon}
                    className="shrink-0"
                  >
                    Apply
                  </Button>
                </div>
              </div>

              <div className="pt-4">
                <h3 className="mb-4 font-medium">Please Enter the Below Details Carefully.</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      Phone Number <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">
                      Email Address <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="state">
                      State <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">
                      Address <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="flex items-center justify-end gap-2 border-t bg-background p-4">
          <Button variant="outline" onClick={() => {
            
            setIsOpen(false)
            setSessionBookingDialougeOpen(true)
            }}>
            Back
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!formData.phone || !formData.email || !formData.state || !formData.address}
          >
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}