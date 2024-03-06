"use client";

import { cn } from "@/lib/utils";
import { AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Button } from "./ui/button";

export default function FormRegister() {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password1, setPassword1] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertType, setAlertType] = useState<
    "destructive" | "default" | null | undefined
  >("default");
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // check password
    if (password1 !== password2) {
      setShowAlert(true);
      setAlertType("destructive");
      setIsLoading(false);
      setAlertMessage("Password confirmation not match.");
      return;
    }

    const response = await fetch("/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
        password: password2,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      setShowAlert(true);
      setIsLoading(false);
      setAlertType("default");
      setAlertMessage(data.message);
      return;
    } else {
      setShowAlert(true);
      setIsLoading(false);
      setAlertType("destructive");
      setAlertMessage(data.message);
      return;
    }
  };

  return (
    <form action="" method="post" onSubmit={handleSubmit}>
      {showAlert && (
        <div className="my-5">
          <Alert variant={alertType}>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Status</AlertTitle>
            <AlertDescription>{alertMessage}</AlertDescription>
          </Alert>
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        <div className="flex flex-col gap-1 mb-2">
          <label htmlFor="first_name">First name</label>
          <input
            type="text"
            name="first_name"
            className={cn("border bg-background rounded-md px-4 py-2")}
            onChange={(e) => setFirstName(e.target.value)}
            autoFocus
            required
          />
        </div>
        <div className="flex flex-col gap-1 mb-2">
          <label htmlFor="last_name">Last name</label>
          <input
            type="text"
            name="last_name"
            className={cn("border bg-background rounded-md px-4 py-2")}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-1 mb-2">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            className={cn("border bg-background rounded-md px-4 py-2")}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-1 mb-2">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            className={cn("border bg-background rounded-md px-4 py-2")}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-1 mb-2">
          <label htmlFor="password1">Password</label>
          <input
            type="password"
            name="password1"
            className={cn("border bg-background rounded-md px-4 py-2")}
            onChange={(e) => setPassword1(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-1 mb-2">
          <label htmlFor="password2">Confirmation Password</label>
          <input
            type="password"
            name="password2"
            className={cn("border bg-background rounded-md px-4 py-2")}
            onChange={(e) => setPassword2(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Link href="/login" className="text-xs font-extralight underline">
          Already have an account, login here?
        </Link>

        <Button
          type="submit"
          variant="default"
          className="flex items-center gap-2"
        >
          {isLoading && <Loader2 className="animate-spin" />}
          Login
        </Button>
      </div>
    </form>
  );
}
