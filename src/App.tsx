"use client";
import Bento2c from "./components/Bento2c";
import { SparklesCore } from "./components/ui/sparkles";
import { Button } from "@/components/ui/button";

type Props = {
  text: string;
  className?: string;
};

export default function App() {
  return (
    <>
      <div className="h-screen relative w-full bg-zinc-950 flex flex-col items-center justify-center overflow-scroll">
        <div className="w-full h-screen absolute inset-0">
          <SparklesCore
            id="tsparticlesfullpage"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={50}
            className="w-full h-full"
            particleColor="#cbd5e1"
          />
        </div>
        <div className="text-zinc-50 w-4/5 h-screen z-50 flex flex-col justify-center items-center gap-4 flex-wrap">
          <h1 className="text-6xl md:text-7xl p-2 text-center w-full mb-4">
            Welcome to Stargazer
          </h1>
          <p className="w-full md:w-1/2 text-center md:text-lg text-md text-slate-100/70">
            Unveil the mysteries of the night sky with a dashboard designed for
            dreamers and explorers. Your journey to the stars starts here.
          </p>
          <CtaButton text="Dashboard" className="mt-4" />
        </div>
      </div>
      <Bento2c />
    </>
  );
}

export function CtaButton({ text, className }: Props) {
  return (
    <Button
      className={`${className}  hover:bg-zinc-800 text-xl p-6 shadow-2xl shadow-blue-500/50 hover:shadow-indigo-500/50 transition-all ease-in-out duration-500 hover:shadow-lg`}
    >
      {text}
    </Button>
  );
}
