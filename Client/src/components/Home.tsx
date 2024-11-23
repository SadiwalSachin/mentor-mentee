import { motion } from 'framer-motion'
import { Search } from 'lucide-react'


const Home = () => {
  return (
    <>
       <main className="flex-1 md:ml-64">
          <div className="container flex gap-4 p-4">
            {/* Posts Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex-1 space-y-4 overflow-y-auto scrollbar-hide"
              style={{ maxHeight: "calc(100vh - 5rem)" }}
            >
              {Array.from({ length: 78 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm"
                >
                  <h3 className="text-lg font-semibold">Post Title {i + 1}</h3>
                  <p className="text-sm text-muted-foreground">
                    This is a sample post content. It demonstrates how the posts will appear in the feed.
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* Mentors Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden w-80 space-y-4 overflow-y-auto scrollbar-hide lg:block"
              style={{ maxHeight: "calc(100vh - 5rem)" }}
            >
              <div className="rounded-lg border bg-card shadow-sm">
                <div className="p-4">
                  <h3 className="font-semibold">Suggested Mentors</h3>
                  <div className="relative mt-2">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <input
                      placeholder="Search mentors..."
                      className="w-full rounded-md border pl-8 text-sm"
                    />
                  </div>
                </div>
                <div className="space-y-2 p-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-3 rounded-lg p-2 hover:bg-accent"
                    >
                      <div className="h-10 w-10 rounded-full bg-muted" />
                      <div>
                        <p className="font-medium">Mentor Name {i + 1}</p>
                        <p className="text-sm text-muted-foreground">Expertise Area</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </main>
    </>
  )
}

export default Home
