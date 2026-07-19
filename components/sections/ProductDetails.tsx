import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { PRODUCT } from "@/lib/product";

export function ProductDetails() {
  return (
    <section
      id="details"
      className="relative border-t border-white/5 px-6 py-28"
    >
      <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-2 md:items-center">
        {/* Product imagery — the two printed sides */}
        <Reveal className="order-2 md:order-1">
          <div className="grid grid-cols-2 gap-4">
            {[PRODUCT.media.graphic, PRODUCT.media.wordmark].map((media) => (
              <div
                key={media.src}
                className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-fog/5 ring-1 ring-inset ring-white/10"
              >
                <Image
                  src={media.src}
                  alt={media.alt}
                  fill
                  sizes="(max-width: 768px) 45vw, 300px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </Reveal>

        {/* Spec sheet */}
        <div className="order-1 md:order-2">
          <p className="text-[11px] uppercase tracking-[0.4em] text-ash">
            The Details
          </p>
          <h2 className="mt-6 font-display text-4xl leading-tight tracking-tight sm:text-5xl">
            <TextReveal text="Built to be worn hard." />
          </h2>

          <dl className="mt-10 divide-y divide-white/10 border-y border-white/10">
            {PRODUCT.specs.map((spec, i) => (
              <Reveal as="div" key={spec.label} delay={i * 0.05}>
                <div className="grid grid-cols-3 gap-4 py-5">
                  <dt className="text-[11px] uppercase tracking-[0.2em] text-ash">
                    {spec.label}
                  </dt>
                  <dd className="col-span-2 text-sm text-white/85">
                    {spec.value}
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
