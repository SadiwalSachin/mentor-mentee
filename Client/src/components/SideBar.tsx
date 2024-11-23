import { motion } from "framer-motion"
import { Link } from "react-router-dom"

const navItems = [
  { name: "Feed", href: "/" },
  { name: "Search", href: "#" },
  { name: "Mentors", href: "/mentors" },
  { name: "Chat", href: "/chat" },
  { name: "Roadmaps", href: "#" },
  { name: "Problems", href: "#" },
  { name: "Communities", href: "#" },
  { name: "Sessions", href: "#" },
]

function SideBar() {
  return (
    <>
       <motion.aside
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          className="fixed hidden h-[calc(100vh-4rem)] w-64 border-r bg-background md:block"
        >
          <nav className="flex flex-col gap-2 p-4">
            {navItems.map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link
                  to={item.href}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </nav>
        </motion.aside>
    </>
  )
}

export default SideBar
