import React from "react";
import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <section className="grid min-h-[78vh] place-items-center ">
      <div className="space-y-5 rounded-md border border-neutral">
        <h2 className="border-b border-neutral py-3 text-center text-3xl font-bold">
          Sign In
        </h2>
        <form className="">
          <div className="grid grid-cols-2 place-items-center gap-4 border-b border-neutral px-4 pb-4">
            <input
              type="text"
              placeholder="Name"
              name=""
              id=""
              className="rounded-md border border-neutral bg-transparent p-2"
            />
            <input
              placeholder="Email"
              type="text"
              name=""
              id=""
              className="rounded-md border border-neutral bg-transparent p-2"
            />
            <input
              placeholder="Password"
              type="text"
              name=""
              id=""
              className="rounded-md border border-neutral bg-transparent p-2"
            />
            <input
              placeholder="Repeat password"
              type="text"
              name=""
              id=""
              className="rounded-md border border-neutral bg-transparent p-2"
            />
          </div>
          <div className="grid grid-cols-2 p-4 text-sm">
            <Link to="./logIn">Have an account?</Link>
            <a href="">Forgot your password?</a>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SignIn;
