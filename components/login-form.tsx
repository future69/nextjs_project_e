"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";
import { login } from "@/app/login/actions";
import { useFormStatus } from "react-dom";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  //useActionState, logInAction is assigned to login function in /actions,
  //when form is submitted, that action is called with the data as props
  const [state, logInAction] = useActionState(login, undefined);
  return (
    <form
      action={logInAction}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            name="email"
            id="email"
            type="email"
            placeholder="m@example.com"
            required
          />
          {state?.errors?.email && (
            <p className="text-red-500">{state.errors.email}</p>
          )}
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input name="password" id="password" type="password" required />
          {state?.errors?.email && (
            <p className="text-red-500">{state.errors.password}</p>
          )}
        </div>
        <SubmitButton />
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <a href="#" className="underline underline-offset-4">
          Sign up
        </a>
      </div>
    </form>
  );

  //Disables button if form is undergoing submission, prevents duplicate submissions
  function SubmitButton() {
    //useFormStatus checks if form is currently being submitted, aka status
    const { pending } = useFormStatus();

    return (
      <Button disabled={pending} type="submit">
        Login
      </Button>
    );
  }
}
