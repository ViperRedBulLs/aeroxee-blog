import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <Container className="relative w-full min-h-screen min-w-full">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-[96%] md:w-[68%] lg:w-[60%] flex flex-col gap-2">
        <h1 className="text-xl md:text-4xl lg:text-6xl font-extrabold">
          Welcome to Aeroxee
        </h1>
        <p className="text-lg font-extralight italic">
          Welcome to my website. If you want to create a free article or want to
          share your experience about anything, please register an account on{" "}
          <Link href="/login" className="text-sky-600 underline italic">
            the account registration page
          </Link>
          .
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link href="/" legacyBehavior>
            <Button variant="default">Get Started</Button>
          </Link>
          <Link href="/login" legacyBehavior>
            <Button variant="outline">Login</Button>
          </Link>
        </div>
      </div>
    </Container>
  );
}
