import { twJoin } from "tailwind-merge";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { showPasswordIcon } from "../../common/icons";
import { useAppDispatch } from "../../../app/store";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/rootReducer";
import {
  setSignedIn,
  switchForm,
} from "../../../features/registration/registerSlice";
import { showForm } from "../../../features/registration/registerSlice";

const signUpSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  email: z
    .string()
    .min(8, { message: "Email is required" })
    .email({ message: "Must be a valid email" }),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type TSignUpSchema = z.infer<typeof signUpSchema>;

const Form = () => {
  const dispatch = useAppDispatch();

  const { alreadyRegistered, signedIn } = useSelector(
    (state: RootState) => state.register,
  );

  const [showPassword, setShowPassword] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit: SubmitHandler<TSignUpSchema> = ({
    name,
    email,
    password,
  }) => {
    const userExist = localStorage.getItem(`user-${email}`);

    if (!alreadyRegistered) {
      if (userExist) {
        alert(`User already exist`);
      } else {
        localStorage.setItem(
          `user-${email}`,
          JSON.stringify({ name, email, password }),
        );
        dispatch(showForm());
      }
    } else {
      if (userExist) {
        localStorage.setItem("signedIn", JSON.stringify("true"));
        dispatch(setSignedIn(true));
        dispatch(showForm());
        alert("you signed in");
      } else {
        alert(`user doesnt exist, try again`);
      }
    }

    reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-y-14 border-b border-neutral px-6 py-8">
          <label htmlFor="name" className="relative">
            <span className="absolute -top-6 text-sm opacity-60">Name</span>
            <input
              {...register("name")}
              type="text"
              name="name"
              id="name"
              className={twJoin(
                "w-full rounded-md border bg-transparent p-2",
                errors.name ? "border-red-600" : "border-neutral",
              )}
            />
            {errors.name && (
              <p className="absolute top-11 text-red-600">{`${errors.name.message}`}</p>
            )}
          </label>
          <label htmlFor="email" className="relative">
            <span className="absolute -top-6 text-sm opacity-60">Email</span>
            <input
              {...register("email")}
              type="text"
              name="email"
              id="email"
              className={twJoin(
                "w-full rounded-md border bg-transparent p-2",
                errors.email ? "border-red-600" : "border-neutral",
              )}
            />
            {errors.email && (
              <p className="absolute top-11 text-red-600">{`${errors.email.message}`}</p>
            )}
          </label>
          <label htmlFor="password" className="relative">
            <span className="absolute -top-6 text-sm opacity-60">Password</span>
            <input
              {...register("password")}
              type={`${showPassword ? "text" : "password"}`}
              name="password"
              id="password"
              className={twJoin(
                "w-full rounded-md border bg-transparent p-2",
                errors.password ? "border-red-600" : "border-neutral",
              )}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className={twJoin(
                "absolute right-2 top-2.5",
                !showPassword && "opacity-35",
              )}
            >
              {showPasswordIcon}
            </span>
            {errors.password && (
              <p className="absolute top-11 text-red-600">{`${errors.password.message}`}</p>
            )}
          </label>
        </div>
        <div className="grid gap-4 px-6 py-4 text-sm">
          <button className="btn btn-outline btn-secondary rounded-md border border-neutral p-3 text-center">
            {alreadyRegistered ? "Sign in" : "Register"}
          </button>
          <button
            className="rounded-md border border-neutral p-3 text-center"
            onClick={(e) => {
              e.preventDefault();
              reset();
              dispatch(switchForm());
            }}
          >
            {alreadyRegistered ? "Register" : "I'm already registered"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
