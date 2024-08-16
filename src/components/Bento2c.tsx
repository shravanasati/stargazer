"use client";
import { SparklesCore } from "./ui/sparkles";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";

export default function Bento2c() {
  return (
    <>
      <section className="h-screen relative w-full bg-zinc-950 flex flex-col items-center justify-center overflow-hidden">
        <div className="w-full h-screen absolute inset-0">
          <SparklesCore
            id="bentoparticles"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={50}
            className="w-full h-full"
            particleColor="#cbd5e1"
          />
        </div>
        <div className="text-zinc-100 w-full h-screen z-50 flex flex-col justify-center items-center gap-2 flex-wrap md:p-0 p-2">
          <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[20rem]">
            {items.map((item, i) => (
              <BentoGridItem
                key={i}
                title={item.title}
                description={item.description}
                header={item.header}
                className={item.className}
              />
            ))}
          </BentoGrid>
        </div>
      </section>
    </>
  );
}

type HeaderImageProps = {
  source: string;
};

const HeaderImage = ({ source }: HeaderImageProps) => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl   dark:bg-dot-white/[0.2] bg-dot-black/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]  border border-transparent dark:border-white/[0.2] bg-neutral-100 dark:bg-black">
    <img src={source} alt="bleh :p" className="w-full" />
  </div>
);
const items = [
  {
    title: "Grid Item 1",
    description: "Description for the item 1.",
    header: (
      <HeaderImage source="https://i.pinimg.com/originals/bb/12/03/bb12038681429c0e313c3001a973ef0f.jpg" />
    ),
    className: "md:col-span-2",
  },
  {
    title: "Grid Item 2",
    description: "Description for the item 2.",
    header: (
      <HeaderImage source="https://i.pinimg.com/originals/bb/12/03/bb12038681429c0e313c3001a973ef0f.jpg" />
    ),
    className: "md:col-span-1",
  },
  {
    title: "Grid Item 3",
    description: "Description for the item 3.",
    header: (
      <HeaderImage source="https://i.pinimg.com/originals/bb/12/03/bb12038681429c0e313c3001a973ef0f.jpg" />
    ),
    className: "md:col-span-1",
  },
  {
    title: "Grid Item 4",
    description: "Description for the item 4.",
    header: (
      <HeaderImage source="https://i.pinimg.com/originals/bb/12/03/bb12038681429c0e313c3001a973ef0f.jpg" />
    ),
    className: "md:col-span-2",
  },
];
