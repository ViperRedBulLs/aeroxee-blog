"use client";

import { cn } from "@/lib/utils";
import { setCookie } from "cookies-next";
import { AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Button } from "./ui/button";

export default function FormLogin() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [alertType, setAlertType] = useState<
    "destructive" | "default" | null | undefined
  >(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const response = await fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      if (data.status === "success") {
        setCookie("isLogined", true);
        setCookie("user", data.data);
        window.location.href = "/";
      }
    } else {
      setAlertMessage(data.message);
      setAlertType("destructive");
      setShowAlert(true);
      setIsLoading(false);
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
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          className={cn("border bg-background rounded-md px-4 py-2")}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <Link href="/register" className="text-xs font-extralight underline">
          Don&apos;t have an account, register here.
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
