import React from "react";
import { Button } from "./ui/button";
import { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

import { toast } from "sonner";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

const Signup = () => {
  // const navigation = useNavigate();
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const signUpHandling = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/register",
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      // console.log(res);
      if (res.data.success) {
        toast.success(res.data.message);
        // navigation("/login");
        setInput({
          username: "",
          email: "",
          password: "",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-50 ">
      <div className=" shadow-2xl p-8 flex items-center justify-center border rounded-2xl">
        <form onSubmit={signUpHandling} className="flex flex-col gap-2 w-70">
          <div className="flex items-center justify-center">
            <h1 className="font-bold text-2xl">Signup</h1>
          </div>
          <div className="flex flex-col gap-2">
            <Label className="font-medium px-1">Username</Label>
            <Input
              onChange={changeEventHandler}
              type="text"
              className="text-sm hover:border-2 rounded px-1"
              placeholder="username"
              name="username"
              value={input.username}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="font-medium px-1">Email</Label>
            <Input
              onChange={changeEventHandler}
              type="text"
              className="text-sm hover:border-2 rounded px-1"
              placeholder="email"
              name="email"
              value={input.email}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="font-medium px-1">Password</Label>
            <Input
              onChange={changeEventHandler}
              type="text"
              className="text-sm hover:border-2 rounded px-1"
              placeholder="password"
              name="password"
              value={input.password}
            />
          </div>
          {loading ? <></> : <Button type="submit">Submit</Button>}

          <div className="text-end">
            Already have Account :
            <span className="pl-1 text-blue-800 font-semibold">Login</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
