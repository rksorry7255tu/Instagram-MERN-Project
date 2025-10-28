import {
  Heart,
  Home,
  MessageCircle,
  PlusSquare,
  Search,
  TrendingUp,
} from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const LeftSideBar = () => {
  const navigate = useNavigate();
  const LeftSideBarHandler = (textType) => {
    if (textType === "Home") {
      navigate("/");
    } else if (textType === "Profile") {
      navigate("/profile");
    }
  };

  const sideBarItems = [
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
      icon: <Home />,
      text: "Create",
    },
    {
      icon: <PlusSquare />,
      text: "Profile",
    },
  ];

  return (
    <div className="fixed top-0 left-0 z-10 px-4 border-r border-gray-300 h-screen ">
      <div className="flex flex-col">
        <h1 className="my-8 pl-3 font-bold text-xl">Logo</h1>
        {sideBarItems.map((item, i) => (
          <div
            key={i}
            onClick={() => LeftSideBarHandler(item.text)}
            className="flex items-center gap-3 p-3 my-2 hover:bg-gray-100 cursor-pointer rounded-lg"
          >
            {item.icon}
            <span>{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeftSideBar;
