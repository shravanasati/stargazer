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
        <div className="text-zinc-50 w-4/5 h-screen z-50 flex flex-col justify-center items-center gap-4">
          <h1 className="text-7xl p-2">Welcome to Stargazer</h1>
          <p className="w-2/4 text-center">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Soluta
            error eveniet maiores deleniti, assumenda, nihil est sed iusto
            autem, quod similique nam eaque iste magnam temporibus accusamus
            libero quis ad!
          </p>
          <CtaButton text="Hello Niggas" />
        </div>
      </div>
      <Bento2c />
    </>
  );
}

//! later
export function CtaButton({ text, className }: Props) {
  return <Button className={`${className} bg-[#10a4ea] `}>{text}</Button>;
}
