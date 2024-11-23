import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MessageCircle, Users } from "lucide-react";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { ScrollArea } from "../components/ui/scroll-area";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUserForChat } from "../redux/slices/userSlice";
import useGetOtherUser from "../hooks/useGetOtherUser";

interface User {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unreadCount?: number;
  isOnline: boolean;
}

const peers: User[] = [
  {
    id: "1",
    name: "Alice Johnson",
    avatar: "/placeholder.svg",
    lastMessage: "Hey, how's it going?",
    time: "2m ago",
    unreadCount: 3,
    isOnline: true,
  },
  {
    id: "2",
    name: "Bob Smith",
    avatar: "/placeholder.svg",
    lastMessage: "Can you help me with...",
    time: "1h ago",
    isOnline: false,
  },
  {
    id: "3",
    name: "Charlie Brown",
    avatar: "/placeholder.svg",
    lastMessage: "Thanks for your help!",
    time: "3h ago",
    unreadCount: 1,
    isOnline: true,
  },
  // Add more peers as needed
];

const mentors: User[] = [
  {
    id: "4",
    name: "Diana Prince",
    avatar: "/placeholder.svg",
    lastMessage: "Your progress is impressive!",
    time: "1d ago",
    isOnline: true,
  },
  {
    id: "5",
    name: "Ethan Hunt",
    avatar: "/placeholder.svg",
    lastMessage: "Let's schedule our next...",
    time: "2d ago",
    isOnline: false,
  },
  {
    id: "6",
    name: "Fiona Gallagher",
    avatar: "/placeholder.svg",
    lastMessage: "Here's a resource that...",
    time: "1w ago",
    unreadCount: 2,
    isOnline: true,
  },
  // Add more mentors as needed
];

export function ChatSectionComponent() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [showMentors, setShowMentors] = React.useState(false);
  const [filteredUsers, setFilteredUsers] = React.useState<User[]>(peers);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  React.useEffect(() => {
    const users = showMentors ? mentors : peers;
    setFilteredUsers(
      users.filter(
        (user) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, showMentors]);

  const navigateToChat = (user: User) => {
    console.log(user);
    dispatch(setSelectedUserForChat(user));
    navigate(`/chat/${user.id}`);
  };

  useGetOtherUser();
  const { otherUsers } = useSelector((state) => state.userReducer);
  if (otherUsers) return null;

  return (
    <div className="flex-1 md:ml-64">
      <div className="flex flex-col h-full bg-background">
        <div className="flex items-center gap-2 p-4 border-b">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              className="pl-10"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
            onClick={() => setShowMentors(!showMentors)}
          >
            {showMentors ? (
              <Users className="h-4 w-4" />
            ) : (
              <MessageCircle className="h-4 w-4" />
            )}
            <span>{showMentors ? "Mentors" : "Peers"}</span>
          </Button>
        </div>

        <ScrollArea className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={showMentors ? "mentors" : "peers"}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              // maping all the users and mentors coming from useGetOtherUser hook
              isko component banan hoga usme user ki details as a prop bhejni hai
              {otherUsers?.map((user: User) => (
                <motion.div
                  onClick={() => navigateToChat(user)}
                  key={user.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-4 p-4 hover:bg-accent/50 cursor-pointer"
                >
                  <Avatar className="relative">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>
                      {user.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                    {user.isOnline && (
                      <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
                    )}
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-semibold truncate">{user.name}</h3>
                      <span className="text-xs text-muted-foreground">
                        {user.time}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {user.lastMessage}
                    </p>
                  </div>
                  {user.unreadCount && (
                    <Badge variant="secondary" className="ml-auto">
                      {user.unreadCount}
                    </Badge>
                  )}
                </motion.div>
              ))}


              {filteredUsers.map((user) => (
                <motion.div
                  onClick={() => navigateToChat(user)}
                  key={user.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-4 p-4 hover:bg-accent/50 cursor-pointer"
                >
                  <Avatar className="relative">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>
                      {user.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                    {user.isOnline && (
                      <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
                    )}
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-semibold truncate">{user.name}</h3>
                      <span className="text-xs text-muted-foreground">
                        {user.time}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {user.lastMessage}
                    </p>
                  </div>
                  {user.unreadCount && (
                    <Badge variant="secondary" className="ml-auto">
                      {user.unreadCount}
                    </Badge>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </ScrollArea>
      </div>
    </div>
  );
}
