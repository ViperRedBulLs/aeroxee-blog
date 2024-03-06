import Container from "@/components/container";

export default function About() {
  return (
    <Container className="relative w-full min-h-screen min-w-full">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-[96%] md:w-[68%] lg:w-[60%] flex flex-col gap-2">
        <h1 className="text-xl md:text-4xl lg:text-6xl font-extrabold">
          This is about page
        </h1>
        <p className="text-lg font-extralight italic">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit atque
          sit voluptates ea aliquam sequi quisquam quas fugiat unde excepturi?
        </p>
      </div>
    </Container>
  );
}
