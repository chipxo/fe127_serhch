import { twJoin } from "tailwind-merge";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { closeIcon, showPasswordIcon } from "@/components/common/icons";
import { useAppDispatch } from "@/app/store";
import { useSelector } from "react-redux";
import { RootState } from "@/app/rootReducer";
import {
  setRegistered,
  setSignedIn,
} from "@/features/registration/registerSlice";
import { showForm } from "@/features/registration/registerSlice";
import { motion as m } from "framer-motion";
import { Link } from "react-router-dom";
import { setAlertText, showAlert } from "@/features/alert/alertSlice";

const signUpSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z
    .string()
    .min(4, { message: "Email must be at least 4 characters" })
    .email({ message: "Must be a valid email" }),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type TSignUpSchema = z.infer<typeof signUpSchema>;

const Form = () => {
  const dispatch = useAppDispatch();

  const { alreadyRegistered } = useSelector(
    (state: RootState) => state.register,
  );

  const [showPassword, setShowPassword] = useState(false);

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
    const userDataString = localStorage.getItem(`user-${email}`);
    const userExist = userDataString ? JSON.parse(userDataString) : null;

    setTimeout(() => {
      if (alreadyRegistered) {
        if (userExist && userExist.password === password) {
          localStorage.setItem("userData", JSON.stringify({ name, email }));
          localStorage.setItem("signedIn", JSON.stringify("true"));

          dispatch(setSignedIn(true));

          dispatch(showForm(false));

          dispatch(setAlertText("You successfully signed in!"));
          dispatch(showAlert(true));
        } else if (userExist && userExist.password !== password) {
          dispatch(setAlertText("Wrong password, try again!"));
          dispatch(showAlert(true));
        } else {
          dispatch(setAlertText("User doesnt exist, try again!"));
          dispatch(showAlert(true));
        }
      } else {
        if (userExist) {
          dispatch(setAlertText("User already exist, try again!"));
          dispatch(showAlert(true));
        } else {
          localStorage.setItem(
            `user-${email}`,
            JSON.stringify({ name, email, password }),
          );

          dispatch(showForm(false));

          dispatch(setAlertText("You successfully registered!"));
          dispatch(showAlert(true));
        }
      }
    }, 1000);

    reset();
  };

  const handleCloseForm = () => {
    document.body?.removeAttribute("class");
    dispatch(showForm(false));
  };

  return (
    <>
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] grid items-center bg-black/75 px-[14vw]"
      >
        <div className="rounded-md bg-base-300">
          <div className="relative grid grid-cols-[1fr_0.8fr] justify-items-center gap-x-12 border-b border-neutral px-6 py-4">
            <button
              onClick={() => {
                reset();
                dispatch(setRegistered(true));
              }}
              className={twJoin(
                "w-fit rounded-md border border-neutral px-4 py-1",
                alreadyRegistered && "scale-110 bg-black/30",
              )}
            >
              Sign in
            </button>
            <button
              onClick={() => {
                reset();
                dispatch(setRegistered(false));
              }}
              className={twJoin(
                "w-fit rounded-md border border-neutral px-4 py-1",
                !alreadyRegistered && "scale-110 bg-black/30",
              )}
            >
              Register
            </button>
            <div
              onClick={handleCloseForm}
              className="absolute right-4 top-4 cursor-pointer rounded-lg border border-neutral px-3 py-1"
            >
              {closeIcon}
            </div>
          </div>
          <div className="grid grid-cols-[1fr_0.8fr]">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-y-14 border-b border-neutral px-6 py-8">
                <label htmlFor="name" className="relative">
                  <span className="absolute -top-6 text-sm opacity-60">
                    Name
                  </span>
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
                  <span className="absolute -top-6 text-sm opacity-60">
                    Email
                  </span>
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
                  <span className="absolute -top-6 text-sm opacity-60">
                    Password
                  </span>
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
                      "absolute right-2 top-2.5 cursor-pointer",
                      !showPassword &&
                        "opacity-30 before:absolute before:top-[10px] before:h-[2px] before:w-5 before:-rotate-45 before:bg-base-300",
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
              </div>
            </form>
            <div className="relative grid place-items-center border-l border-neutral">
              <span className="absolute -left-2 top-1/2 -translate-y-1/2 bg-base-300 py-3">
                or
              </span>
              <div className="grid gap-4">
                <h2 className="text-2xl">Sign in with</h2>
                <Link
                  to=""
                  className="rounded-md border border-neutral px-4 py-1 text-center text-info"
                >
                  {/* {googleIcon} */}
                  Google
                </Link>
              </div>
            </div>
          </div>
        </div>
      </m.div>
    </>
  );
};

export default Form;
