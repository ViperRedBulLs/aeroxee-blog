import Container from "@/components/container";
import { cn } from "@/lib/utils";
import { Mail, Phone } from "lucide-react";
import { Metadata } from "next";

const metadata: Metadata = {
  title: "Contact | aeroxee",
  description: "This is page to describe how to contact me.",
};

export default function About() {
  return (
    <Container className="relative w-full min-h-screen min-w-full">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-[96%] md:w-[68%] lg:w-[80%] flex flex-col gap-2">
        <div className="flex flex-col items-center justify-center w-full gap-4">
          <h1 className="text-4xl font-extrabold mb-4">Contact me at:</h1>
          <div className="space-y-2 text-center">
            <div className={cn("pb-4 border-b flex items-center w-full gap-4")}>
              <Mail size={20} />
              <span className="font-light">fathfajhri40@gmail.com</span>
            </div>
            <div className={cn("pb-4 border-b flex items-center w-full gap-4")}>
              <Phone size={20} />
              <span className="font-light">+62 831 9932 9020</span>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
