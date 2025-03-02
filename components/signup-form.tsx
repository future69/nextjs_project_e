"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";
import { SignUp } from "@/app/login/actions";
import { useFormStatus } from "react-dom";
import Link from "next/link";

export function SignupForm() {
  //useActionState, logInAction is assigned to login function in /actions,
  //when form is submitted, that action is called with the data as props
  const [state, signUpAction] = useActionState(SignUp, undefined);
  return (
    <form action={signUpAction}>
      <div className="flex flex-col items-center gap-2 text-center pb-2">
        <h1 className="text-2xl font-bold">Sign Up Now!</h1>
        <p className="text-muted-foreground text-sm text-balance ">
          It's Free!
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
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
          </div>
          <Input name="password" id="password" type="password" required />
        </div>
        {state?.errors?.email && (
          <p className="text-red-500">{state.errors.email}</p>
        )}
        <SubmitButton />
        <Link
          href="/login"
          className="flex h-10 items-center justify-center rounded-lg bg-blue-200 px-4 text-sm font-medium text-black transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
      </div>
    </form>
  );

  //Disables button if form is undergoing submission, prevents duplicate submissions
  function SubmitButton() {
    //useFormStatus checks if form is currently being submitted, aka status
    const { pending } = useFormStatus();

    return (
      <Button disabled={pending} type="submit">
        Create Account
      </Button>
    );
  }
}
