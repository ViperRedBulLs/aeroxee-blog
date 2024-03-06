import Container from "@/components/container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings | aeroxee",
  description: "",
};

export default function Settings() {
  return (
    <>
      <Container className="relative w-full min-h-screen">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <h1 className="text-4xl font-extrabold text-center mb-3">Settings</h1>
          <p className="text-lg font-extralight italic text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea vero
            quis quas in excepturi porro eligendi aspernatur ratione obcaecati,
            corporis repellat quam facere, enim dolorum iure, praesentium dolore
            cum error.
          </p>
        </div>
      </Container>
    </>
  );
}
