import React, { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  // const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const changeHandler = async (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const formHandling = async (e) => {
    e.preventDefault();
    console.log(input);

    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/login",
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        // navigate("/");
        setInput({
          email: "",
          password: "",
        });
      }

      setInput({
        email: "",
        password: "",
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-50 ">
      <div className=" shadow-2xl p-8 flex items-center justify-center border rounded-2xl">
        <form onSubmit={formHandling} className="flex flex-col gap-2 w-70">
          <div className="flex items-center justify-center">
            <h1 className="font-bold text-2xl">Login</h1>
          </div>

          <div className="flex flex-col gap-2">
            <Label className="font-medium px-1">Email</Label>
            <Input
              onChange={changeHandler}
              type="text"
              className="text-sm hover:border-2 rounded px-1"
              placeholder="email"
              name="email"
              value={input?.email}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="font-medium px-1">Password</Label>
            <Input
              onChange={changeHandler}
              type="text"
              className="text-sm hover:border-2 rounded px-1"
              placeholder="password"
              name="password"
              value={input?.password}
            />
          </div>
          <Button type="submit">Submit</Button>
          <div className="text-end">
            Don't have Account :
            <span className="pl-1 text-blue-800 font-semibold">Signup</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
