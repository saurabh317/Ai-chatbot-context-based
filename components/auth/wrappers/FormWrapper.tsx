"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useSignin, useSignup } from "@/hooks/api/use-auth";
import { useAppDispatch } from "@/store/hooks";
import { setUser } from "@/store/userSlice";
import { Mail, Lock, User } from "lucide-react";
import { showToast } from "@/components/common/Toast";
import Header from "../components/Header";
import AuthToggle from "../components/Toggle";
import { Form } from "@/components/common/Form";
import AuthInputField from "../components/AuthInputField";
import SubmitButton from "../components/Submit";
import Footer from "../components/Footer";
import BottomText from "../components/BottomText";

type AuthFormValues = {
  name?: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

export default function FormWrapper() {
  const [isSignIn, setIsSignIn] = useState(true);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { mutate: signup, isPending: isSignupPending } = useSignup();
  const { mutate: signin, isPending: isSigninPending } = useSignin();

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<AuthFormValues>({
    defaultValues: {
      email: "",
      password: "",
      name: "",
      confirmPassword: "",
    },
  });

  const isLoading = isSigninPending || isSignupPending;

  const validateForm = useCallback(
    (data: AuthFormValues) => {
      let hasErrors = false;

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!data.email || !emailRegex.test(data.email)) {
        setError("email", { message: "Invalid email address" });
        hasErrors = true;
      }

      if (!data.password || data.password.length < 6) {
        setError("password", {
          message: "Password must be at least 6 characters",
        });
        hasErrors = true;
      }

      if (!isSignIn) {
        if (!data.name || data.name.length < 2) {
          setError("name", { message: "Name must be at least 2 characters" });
          hasErrors = true;
        }

        if (data.password !== data.confirmPassword) {
          setError("confirmPassword", {
            message: "Passwords don't match",
          });
          hasErrors = true;
        }
      }

      return hasErrors;
    },
    [isSignIn, setError],
  );

  const handleAuthSuccess = useCallback(
    (user: any, isSignup = false) => {
      showToast(
        "success",
        isSignup ? "Sign up successful" : "Sign in successful",
      );
      localStorage.setItem("user", JSON.stringify(user));
      dispatch(setUser(user));

      if (isSignup) {
        setIsSignIn(true);
      } else {
        router.push("/chat");
      }
    },
    [dispatch, router],
  );

  const onSubmit = useCallback(
    (data: AuthFormValues) => {
      if (validateForm(data)) return;

      if (isSignIn) {
        signin(
          { email: data.email, password: data.password },
          {
            onSuccess: (res) => handleAuthSuccess(res.user),
            onError: (err) => showToast("error", err.message),
          },
        );
      } else {
        signup(
          { name: data.name!, email: data.email, password: data.password },
          {
            onSuccess: (res) => handleAuthSuccess(res.user, true),
            onError: (err) => showToast("error", err.message),
          },
        );
      }
    },
    [isSignIn, signin, signup, validateForm, handleAuthSuccess],
  );

  return (
    <div className="relative z-10 w-full max-w-md px-6">
      <Header isSignIn={isSignIn} />

      <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">
        <AuthToggle isSignIn={isSignIn} setIsSignIn={setIsSignIn} />

        <Form onSubmit={handleSubmit(onSubmit)}>
          {!isSignIn && (
            <AuthInputField
              control={control}
              name="name"
              label="Name"
              icon={<User className="w-4 h-4" />}
              placeholder="Your name"
            />
          )}

          <AuthInputField
            control={control}
            name="email"
            label="Email"
            icon={<Mail className="w-4 h-4" />}
            type="email"
            placeholder="you@example.com"
          />

          <AuthInputField
            control={control}
            name="password"
            label="Password"
            icon={<Lock className="w-4 h-4" />}
            type="password"
            placeholder="••••••••"
          />

          {!isSignIn && (
            <AuthInputField
              control={control}
              name="confirmPassword"
              label="Confirm Password"
              icon={<Lock className="w-4 h-4" />}
              type="password"
              placeholder="••••••••"
            />
          )}

          <SubmitButton isLoading={isLoading} isSignIn={isSignIn} />
        </Form>

        <Footer isSignIn={isSignIn} setIsSignIn={setIsSignIn} />
      </div>

      <BottomText />
    </div>
  );
}
