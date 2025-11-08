import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { MoreHorizontal } from "lucide-react";
import { Button } from "./ui/button";

const CommentDialog = ({ open, setOpen, post }) => {
  const [text, setText] = useState("");
  const changeEventHandler = (e) => {
    const inputText = e.target.value;
    if (inputText.trim()) {
      setText(inputText);
    } else {
      setText("");
    }
  };
  return (
    <Dialog open={open}>
      <DialogContent
        onInteractOutside={() => setOpen(false)}
        className="flex max-w-5 p-0 flex-col"
      >
        <div className="flex flex-1">
          <div className="w-1/2">
            <img
              className="w-full h-full object-cover rounded-l-lg"
              src="https://images.unsplash.com/photo-1761872936220-1531e97a158a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1fHx8ZW58MHx8fHx8&auto=format&fit=crop&q=60&w=1000"
            />
          </div>
          <div className="w-1/2 flex flex-col justify-between">
            <div className="flex items-center justify-between p-4">
              <div className="flex gap-2 items-center ">
                <Avatar>
                  <AvatarImage src="https://images.unsplash.com/photo-1761872936220-1531e97a158a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1fHx8ZW58MHx8fHx8&auto=format&fit=crop&q=60&w=1000" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex  flex-col">
                  <span className="text-sm font-semibold">username</span>
                  <span className="text-sm text-gray-400">bio...</span>
                </div>
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
            <hr />
            <div className="flex-1 overflow-y-auto max-h-90 p-4">
              {/* className="flex-1 overflow-y-auto max-h-96 p-4" */}
              {[
                1, 2, 3, 4, 3, 4, 5, 6, 3, 4, 5, 5, 6, 6, 6, 1, 1, 1, 1, 1, 1,
                1,
              ].map((comment, i) => (
                <p>comments</p>
              ))}
            </div>
            <div className="p-2">
              <div className="flex items-center gap-1">
                <input
                  type="text"
                  value={text}
                  onChange={changeEventHandler}
                  placeholder="Add a comment..."
                  className="w-full outline-none border text-sm border-gray-300 p-1.5 rounded"
                />
                <Button disabled={!text.trim()} variant="outline">
                  Send
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommentDialog;
