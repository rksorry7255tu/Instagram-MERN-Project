import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import {
  Bookmark,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Send,
} from "lucide-react";
import { Button } from "./ui/button";
import CommentDialog from "./CommentDialog";

const Post = ({ post }) => {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);

  return (
    <div className="my-8 w-full max-w-sm mx-auto">
      <div className="flex items-center justify-between  p-4">
        <div className="flex flex-row gap-2 items-center">
          <Avatar>
            <AvatarImage
              className="w-8 rounded-full h-8"
              src="https://images.unsplash.com/photo-1761872936220-1531e97a158a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1fHx8ZW58MHx8fHx8&auto=format&fit=crop&q=60&w=1000"
              alt="post_image"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h1>username</h1>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <MoreHorizontal />
          </DialogTrigger>
          <DialogContent className="flex flex-col items-center text-sm text-center">
            <Button
              variant="ghost"
              className="cursor-pointer w-fit text-[#ED4956] font-bold"
            >
              Unfollow
            </Button>
            <Button variant="ghost" className="cursor-pointer w-fit">
              Add to favourites
            </Button>
            <Button variant="ghost" className="cursor-pointer w-fit  ">
              Delete
            </Button>
          </DialogContent>
        </Dialog>
      </div>
      <img
        src="https://images.unsplash.com/photo-1761872936220-1531e97a158a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1fHx8ZW58MHx8fHx8&auto=format&fit=crop&q=60&w=1000"
        alt="post_img"
      />
      <div className="flex items-center justify-between my-2">
        <div className="flex items-center gap-3 ">
          <Heart size={"24"} className="cursor-pointer hover:text-gray-600" />
          <MessageCircle
            size={"22"}
            onClick={() => setOpen(true)}
            className="cursor-pointer hover:text-gray-600"
          />
          <Send size={"22"} className="cursor-pointer hover:text-gray-600" />
        </div>
        <Bookmark size={"22"} className="cursor-pointer hover:text-gray-600" />
      </div>
      <span className="font-medium block mb-2">4 likes</span>
      <p>
        <span className="font-medium mr-2">Username</span> captions...
      </p>
      <span
        className="cursor-pointer text-sm text-gray-400"
        onClick={() => setOpen(true)}
      >
        View all comments
      </span>
      <CommentDialog open={open} setOpen={setOpen} post={post} />
      <div className="flex ">
        <input
          type="text"
          placeholder="Add a comment..."
          name="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="outline-none w-full text-sm text-gray-400"
        />
        {text && <span className="cursor-pointer text-[#3BADF8]">Post</span>}
      </div>
    </div>
  );
};

export default Post;
