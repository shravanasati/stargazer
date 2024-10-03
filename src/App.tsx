// "use client";

// import { Link } from "react-router-dom"; // Import Link from react-router-dom
// import { ShootingStars } from "@/components/ui/shooting-stars";
// import { StarsBackground } from "@/components/ui/stars-background";
// import { Button } from "@/components/ui/button";
// import Bento2c from "./components/Bento2c";

// type Props = {
//   text: string;
//   className?: string;
//   to: string;
// };

// export default function App() {
//   return (
//     <>
//       <section className="h-screen relative w-full bg-zinc-950 flex flex-col items-center justify-center overflow-hidden">
//         <div className="w-full h-screen absolute inset-0">
//           <ShootingStars />
//           <StarsBackground />
//         </div>
//         <div className="text-zinc-100 w-full h-screen z-50 flex flex-col justify-center items-center gap-2 flex-wrap">
//           <h1 className="text-6xl md:text-7xl p-6 text-center w-full font-black md:p-0">
//             Welcome to Stargazer
//           </h1>
//           <p className="w-4/5 md:w-1/2 text-center md:text-lg text-xl text-slate-100/70 font-light">
//             Unveil the mysteries of the night sky with a dashboard designed for
//             dreamers and explorers. Your journey to the stars starts here.
//           </p>
//           <CtaButton text="Dashboard" to="/dashboard" className="mt-4" />
//         </div>
//       </section>

//       <Bento2c />
//     </>
//   );
// }

// export function CtaButton({ text, className, to }: Props) {
//   return (
//     <Link to={to}>
//       <Button
//         className={`${className} hover:bg-transparent text-xl p-6 shadow-2xl shadow-blue-500/50 hover:shadow-indigo-500/50 transition-all ease-in-out duration-500 hover:shadow-lg hover:text-white hover:border-white hover:border border-0`}
//       >
//         {text}
//       </Button>
//     </Link>
//   );
// }

"use client";

import { Link } from "react-router-dom";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import { Button } from "@/components/ui/button";
import Bento2c from "./components/Bento2c";

export default function App() {
  return (
    <>
      <section className="min-h-screen relative w-full bg-zinc-950 flex flex-col items-center justify-center overflow-hidden py-12 px-4">
        <div className="absolute inset-0">
          <ShootingStars />
          <StarsBackground />
        </div>
        <div className="text-zinc-100 z-10 flex flex-col justify-center items-center gap-6 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-center font-black">
            Welcome to Stargazer
          </h1>
          <p className="text-center text-base sm:text-lg md:text-xl text-slate-100/70 font-light">
            Unveil the mysteries of the night sky with a dashboard designed for
            dreamers and explorers. Your journey to the stars starts here.
          </p>
          <Link to="/dashboard">
            <Button className="mt-4 hover:bg-transparent text-lg sm:text-xl p-4 sm:p-6 shadow-2xl shadow-blue-500/50 hover:shadow-indigo-500/50 transition-all ease-in-out duration-500 hover:shadow-lg hover:text-white hover:border-white hover:border border-0">
              Dashboard
            </Button>
          </Link>
        </div>
      </section>

      <Bento2c />
    </>
  );
}
