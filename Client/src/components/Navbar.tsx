import { Menu, Moon, Sun } from 'lucide-react'
import { Link } from "react-router-dom"

import { Button } from "../components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components/ui/sheet"

const navItems = [
    { name: "Feed", href: "#" },
    { name: "Search", href: "#" },
    { name: "Mentors", href: "#" },
    { name: "Ask", href: "#" },
    { name: "Roadmaps", href: "#" },
    { name: "Problems", href: "#" },
    { name: "Communities", href: "#" },
    { name: "Sessions", href: "#" },
  ]

const Navbar = ({setIsMobileMenuOpen,isMobileMenuOpen}) => {
  return (
    <>
            <nav className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 bg-red-800">
        <div className="flex h-16 items-center px-4">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-red-500">
              <SheetHeader>
                <SheetTitle>Navigation</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 pt-4 bg-red-500">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-lg font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center gap-2 ml-4">
            <span className="text-xl font-bold">ProPeers</span>
          </Link>
          <div className="flex-1" />
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            <Link
            to="/login"
            >
            <Button>
              Login
            </Button>
            </Link>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
