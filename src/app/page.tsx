import Image from "next/image";

export default function Home() {
  return (
    <div className="relative h-screen">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/bg.png"
          alt="Background image"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>
      <div className="relative z-10 p-5">Some overlay things go in here</div>
    </div>
  );
}
