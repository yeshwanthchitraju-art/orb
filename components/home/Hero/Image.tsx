"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function FullWidthImageSection() {
  return (
    <section className="relative w-full overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 1.02 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative w-full h-[320px] sm:h-[450px] md:h-[600px] lg:h-[750px]"
      >
        <Image
          src="/section.png" 
          alt="Orva"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />

        {/* Optional subtle overlay */}
        <div className="absolute inset-0 bg-black/10" />
      </motion.div>
    </section>
  );
}