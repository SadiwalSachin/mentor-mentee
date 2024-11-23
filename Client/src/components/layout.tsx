import * as React from "react"
import SideBar from "./SideBar"
import Navbar from "./Navbar"
import { Outlet } from "react-router-dom"

export function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  
  return (
    <div className="h-screen bg-background">
      {/* Navbar */}

      <Navbar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen}/>

      {/* Main Content */}
      <div className="flex pt-16">
        {/* Desktop Sidebar */}
        <SideBar/>

        {/* Main Content Area */}
        <Outlet/>
      </div>
    </div>
  )
}