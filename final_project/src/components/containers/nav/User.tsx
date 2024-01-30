import { useState } from "react";
import { cartUser, closeIcon, showPasswordIcon } from "../../common/icons";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { twJoin } from "tailwind-merge";

const SignUpSchema = z
  .object({
    name: z.string().min(2, { message: "Name is required" }),
    email: z.string().min(8, { message: "Email is required" }).email({
      message: "Must be a valid email",
    }),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password don't match",
  });

type TSignUpSchema = z.infer<typeof SignUpSchema>;

const User = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TSignUpSchema>({
    resolver: zodResolver(SignUpSchema),
  });

  const onSubmit: SubmitHandler<TSignUpSchema> = ({
    name,
    email,
    password,
  }) => {
    console.log(`user: ${name}, email: ${email}, password: ${password}`);

    reset();
  };

  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(true);

  const [registered, setRegistered] = useState(false);

  if (open) document.body.style.overflow = "hidden";

  return (
    <>
      <div onClick={() => setOpen(true)} className="cursor-pointer">
        {cartUser}
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] grid items-center bg-black/75 px-[14vw]"
          >
            <div className="rounded-md bg-base-300">
              <h2 className="relative border-b border-neutral py-3 pl-4 text-2xl font-bold">
                {registered ? "Sign in" : "Register"}{" "}
                <span
                  onClick={() => setOpen(false)}
                  className="absolute right-4 top-2.5 cursor-pointer"
                >
                  {closeIcon}
                </span>
              </h2>
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
                    {!registered && (
                      <label htmlFor="confirmPassword" className="relative">
                        <span className="absolute -top-6 text-sm opacity-60">
                          Confirm password
                        </span>
                        <input
                          {...register("confirmPassword")}
                          type={`${showPassword ? "text" : "password"}`}
                          name="confirmPassword"
                          id="confirmPassword"
                          className={twJoin(
                            "w-full rounded-md border bg-transparent p-2",
                            errors.confirmPassword
                              ? "border-red-600"
                              : "border-neutral",
                          )}
                        />
                        {errors.confirmPassword && (
                          <p className="absolute top-11 text-red-600">{`${errors.confirmPassword.message}`}</p>
                        )}
                      </label>
                    )}
                  </div>
                  <div className="grid gap-4 px-6 py-4 text-sm">
                    <button className="btn btn-outline btn-secondary rounded-md border border-neutral p-3 text-center disabled:opacity-30">
                      {registered ? "Sign in" : "Register"}
                    </button>
                    <button
                      className="rounded-md border border-neutral p-3 text-center"
                      onClick={(e) => {
                        e.preventDefault();
                        reset();
                        setRegistered(!registered);
                      }}
                    >
                      {registered ? "Register" : "I'm already registered"}
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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default User;
