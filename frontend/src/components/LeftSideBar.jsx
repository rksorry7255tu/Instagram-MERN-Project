import {
  Heart,
  Home,
  LogOut,
  MessageCircle,
  PlusSquare,
  Search,
  TrendingUp,
} from "lucide-react";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { data, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import CreatePost from "./CreatePost";

const LeftSideBar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/user/logout");
      if (res?.data?.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const sideHandler = (textType) => {
    if (textType === "Home") {
      navigate("/");
    } else if (textType === "Profile") {
      navigate("/profile");
    } else if (textType === "Logout") {
      logoutHandler();
    } else if (textType === "Create") {
      setOpen(true);
    } else if (textType == "Explore") {
      navigate("");
    }
  };

  const LeftSideItem = [
    {
      icon: <Home />,
      text: "Home",
    },
    {
      icon: <Search />,
      text: "Search",
    },
    {
      icon: <TrendingUp />,
      text: "Explore",
    },
    {
      icon: <MessageCircle />,
      text: "Messages",
    },
    {
      icon: <Heart />,
      text: "Notifications",
    },
    {
      icon: <PlusSquare />,
      text: "Create",
    },
    {
      icon: (
        <Avatar className="w-6 h-6">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ),
      text: "Profile",
    },
    {
      icon: <LogOut />,
      text: "Logout",
    },
  ];

  return (
    <div className="fixed top-0 left-0 z-10 h-screen  border-r flex items-center justify-center sm:p-4 md:p-6 lg:p-8">
      <div className="flex flex-col gap-3">
        <h1 className="font-bold text-2xl py-6 ml-3">Logo</h1>
        {LeftSideItem.map((item, i) => (
          <div
            className="flex flex-row ml-2 p-3 gap-3 hover:bg-gray-200 rounded cursor-pointer sm:w-30 md:w-40 lg:w-50"
            onClick={() => sideHandler(item?.text)}
            key={i}
          >
            {item.icon}
            <span>{item.text}</span>
          </div>
        ))}
        <div className="font-semibold flex flex-col gap-1 text-lg cursor-pointer">
          <span className="hover:bg-gray-200 rounded p-2">More</span>
          <span className="hover:bg-gray-200 rounded p-2">Also from Meta</span>
        </div>
      </div>
      {/* <CreatePost open={open} setOpen={setOpen} /> */}
    </div>
  );
};

export default LeftSideBar;
