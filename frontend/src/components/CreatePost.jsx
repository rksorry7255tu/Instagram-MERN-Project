import React, { useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader } from "./ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

const CreatePost = ({ open, setOpen }) => {
  const imageRef = useRef();
  const [file, setFile] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);

  const fileChangeHandler = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      const dataUrl = await readFileAsDataURL(file);
      setImagePreview(dataUrl);
      // console.log(file);
    }
  };

  const createPostHandler = async (e) => {
    const formData = new FormData();
    formData.append("caption", caption);
    if (imagePreview) formData.append("image", file);
    // console.log(formData.values());

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:8000/api/v1/post/addpost",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setPosts([res.data.post, ...posts]));
        toast.success(res.data.message);
        setOpen(false);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent
        onInteractOutside={() => {
          setOpen(false);
        }}
      >
        <DialogHeader className="items-center font-semibold">
          Create New Post
        </DialogHeader>
        <div className=" flex p-3 items-center gap-4 ">
          <Avatar>
            <AvatarImage />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col ">
            <h1 className="font-semibold text-xs">username</h1>
            <span className="text-gray-600 text-xs">bio...</span>
          </div>
        </div>
        <Textarea
          className="focus-visible:ring-transparent border-gray-50"
          placeholder="write a caption"
        />
        <input
          ref={imageRef}
          type="file"
          className="hidden"
          onChange={fileChangeHandler}
        />
        <Button
          onClick={() => imageRef.current.click()}
          className="w-fit mx-auto bg-[#0095F6] hover:bg-[#0997f5]"
        >
          Select from computer
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePost;
