import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

export default function Home() {
  return (
    <main
      className={`${poppins.className} relative flex h-screen w-screen flex-col items-center justify-center overflow-hidden bg-[#0D1B4B] px-6`}
    >
      {/* ambient corner glows */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-[#1D4ED8] opacity-20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-[#10B981] opacity-10 blur-3xl" />

      {/* status chip */}
      <div className="absolute right-6 top-6 hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-slate-300 sm:flex">
        <span className="h-1.5 w-1.5 rounded-full bg-[#10B981]" />
        All systems online
      </div>

      <div className="relative z-10 flex w-full max-w-2xl flex-col items-center text-center">
        {/* huge sunburst + logo, sized off the viewport so it always fits without scrolling */}
        <div className="relative mb-[3vh] h-[min(60vw,46vh)] w-[min(60vw,46vh)]">
          <div className="absolute inset-0 animate-[spin_70s_linear_infinite] motion-reduce:animate-none">
            {Array.from({ length: 24 }).map((_, i) => (
              <span
                key={i}
                className="absolute left-1/2 top-1/2 h-[44%] w-0.5 origin-top bg-gradient-to-b from-[#F59E0B]/60 to-transparent"
                style={{ transform: `translateX(-50%) rotate(${i * 15}deg)` }}
              />
            ))}
          </div>

          <div className="absolute inset-[12%] overflow-hidden rounded-[2rem] bg-white/[0.06] ring-1 ring-white/10 backdrop-blur-sm">
            <Image
              src="/uni-gate-logo.png"
              alt="Uni Gate logo"
              fill
              className="object-contain p-[8%]"
              sizes="46vh"
              priority
            />
          </div>
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
          UNI <span className="text-[#1D4ED8]">GATE</span>
        </h1>
        <p className="mt-2 max-w-xs text-sm text-slate-400">
          Your gateway to courses, grades, and everything campus.
        </p>

        <Link
          href="/select-role"
          className="mt-[3vh] inline-flex items-center gap-2 rounded-xl bg-[#1D4ED8] px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#1D4ED8]/30 transition-all hover:bg-[#1D4ED8]/90 hover:shadow-xl hover:shadow-[#1D4ED8]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4ED8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D1B4B]"
        >
          Select Role
          <ArrowRight className="h-4 w-4" />
        </Link>

        <p className="mt-[2vh] text-xs text-slate-500">
          Capital University · Student &amp; TA Portal
        </p>
      </div>
    </main>
  );
}
