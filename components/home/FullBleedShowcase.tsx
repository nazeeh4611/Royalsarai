import Image from "next/image";

export function FullBleedShowcase() {
  return (
    <section className="relative isolate flex min-h-[360px] items-end overflow-hidden bg-indigo sm:min-h-[440px] lg:min-h-[520px]">
      <Image
        src="/cyberhome.png"
        alt="Data security operations and access control systems"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

      <div className="edge container-max relative w-full pb-10 lg:pb-14">
        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-white/60">
          Infrastructure
        </span>
        <h2 className="mt-4 max-w-2xl text-[clamp(2rem,4.6vw,3.8rem)] font-bold leading-[1.05] tracking-[-0.02em] text-white text-balance">
          Built to carry a business further than it operates today.
        </h2>
      </div>
    </section>
  );
}
