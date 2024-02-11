import { RootState } from "@/app/rootReducer.tsx";
import { useAppDispatch } from "@/app/store.tsx";
import { closeIcon, showPasswordIcon } from "@/components/common/icons.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { setAlertText, showAlert } from "@/features/alert/alertSlice.tsx";
import {
  setRegistered,
  setSignedIn,
  showForm,
} from "@/features/registration/registerSlice.tsx";
import { mOpacity } from "@/utils/motionSettings.tsx";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion as m } from "framer-motion";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { twJoin } from "tailwind-merge";
import { z } from "zod";

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
          // if user exists and pass the right password, it makes him signed in, close the form and give the access
          // to user panel

          localStorage.setItem("signedIn", JSON.stringify("true"));

          dispatch(setSignedIn(true));

          dispatch(showForm(false));
          document.body?.removeAttribute("class");

          dispatch(setAlertText("You successfully signed in!"));
          dispatch(showAlert(true));
        } else if (userExist && userExist.password !== password) {
          //if user pass wrong password = alert wrong password and reset the form

          dispatch(setAlertText("Wrong password, try again!"));
          dispatch(showAlert(true));
        } else {
          //if user pass wrong email

          dispatch(setAlertText("User doesnt exist, try again!"));
          dispatch(showAlert(true));
        }
      } else {
        if (userExist) {
          //if user try to registrate with existing email

          dispatch(setAlertText("User already exist, try again!"));
          dispatch(showAlert(true));
        } else {
          //if user successfully registrated

          localStorage.setItem(
            `user-${email}`,
            JSON.stringify({ name, email, password }),
          );

          localStorage.setItem("userData", JSON.stringify({ name, email }));

          dispatch(showForm(false));
          document.body?.removeAttribute("class");

          dispatch(setAlertText("You successfully registered!"));
          dispatch(showAlert(true));
        }
      }
      reset();
    }, 1000);
  };

  const handleCloseForm = () => {
    document.body?.removeAttribute("class");
    dispatch(showForm(false));
  };

  return (
    <>
      <m.div
        {...mOpacity}
        className="fixed inset-0 z-[200] grid items-center bg-black/70 px-4"
      >
        <div className="relative left-1/2 -translate-x-1/2 rounded-md bg-background max-md:container md:max-w-[45vw] xl:max-w-[35vw]">
          <div className="relative grid grid-cols-[1fr_0.8fr] justify-items-center gap-x-12 border-b px-6 py-2">
            {/* Buttons for switch between Sign in and Register */}
            <Button
              onClick={() => {
                reset();
                dispatch(setRegistered(true));
              }}
              variant={alreadyRegistered ? "default" : "outline"}
            >
              Sign in
            </Button>
            <Button
              onClick={() => {
                reset();
                dispatch(setRegistered(false));
              }}
              variant={!alreadyRegistered ? "default" : "outline"}
            >
              Register
            </Button>

            {/* Close the form */}
            <Button
              onClick={handleCloseForm}
              variant="outline"
              className="absolute right-2 top-2"
            >
              {closeIcon}
            </Button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-y-14 border-b px-6 py-8">
              <label htmlFor="name" className="relative">
                <span className="absolute -top-6 text-sm opacity-60">Name</span>
                <Input
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
                <Input
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
                <Input
                  {...register("password")}
                  type={`${showPassword ? "text" : "password"}`}
                  name="password"
                  id="password"
                  className={twJoin(
                    "w-full rounded-md border bg-transparent p-2",
                    errors.password ? "border-red-600" : "border-neutral",
                  )}
                />

                {/* Icon to show/hide password  */}
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className={twJoin(
                    "absolute right-2 top-2 cursor-pointer",
                    !showPassword &&
                      "before:bg-base-300 opacity-30 before:absolute before:top-[10px] before:h-[2px] before:w-5 before:-rotate-45",
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
              {/* Submitting button */}
              <Button>{alreadyRegistered ? "Sign in" : "Register"}</Button>
            </div>
          </form>
        </div>
      </m.div>
    </>
  );
};

export default Form;
