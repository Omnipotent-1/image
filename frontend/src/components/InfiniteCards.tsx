import mq1 from "@/assets/mq1.webp";
import mq2 from "@/assets/mq2.webp";
import mq3 from "@/assets/mq3.webp";
import mq4 from "@/assets/mq4.webp";
import mq5 from "@/assets/mq5.webp";
import mq6 from "@/assets/mq6.webp";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

const images = [mq1, mq2, mq3, mq4, mq5, mq6];
const prompts = [
  "A futuristic cityscape at sunset",
  "Surreal dreamlike forest",
  "Portrait of a cyberpunk warrior",
  "Abstract geometric art with neon",
  "Fantasy castle floating in the sky",
  "Retro 80s synthwave beach",
];

const InfiniteCards = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const controls = useAnimation();
  const controls2 = useAnimation();

  // Duplicate for seamless loop
  const duplicatedImages = [...images, ...images];
  const duplicatedPrompts = [...prompts, ...prompts];

  // Start first row (slower left scroll)
  useEffect(() => {
    controls.start({
      x: ["0%", "-100%"],
      transition: { ease: "linear", duration: 45, repeat: Infinity },
    });
  }, [controls]);

  // Start second row (faster right scroll)
  useEffect(() => {
    controls2.start({
      x: ["-100%", "0%"],
      transition: { ease: "linear", duration: 30, repeat: Infinity },
    });
  }, [controls2]);

  const handleMouseEnter = (idx, ctrl) => {
    setHoveredIndex(idx);
    ctrl.stop(); // pause scroll
  };

  const handleMouseLeave = (ctrl, reverse = false, speed = 40) => {
    setHoveredIndex(null);
    ctrl.start({
      x: reverse ? ["-100%", "0%"] : ["0%", "-100%"],
      transition: { ease: "linear", duration: speed, repeat: Infinity },
    });
  };

  return (
    <div className="bg-black p-4">
      <div className="container mx-auto">
        <div className="text-center space-y-8 mb-8">
          <h2 className="text-4xl font-bold">
            Limitless Creativity with{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              No Style Constraints
            </span>
          </h2>
          <p className="text-xl text-muted-foreground w-11/12 mx-auto">
            Creating compelling AI-generated images unleashes creativity by
            removing traditional restrictions. Without worrying about technical
            drawing skills or being limited by inspiration solely from
            references, artists can now dive deep into their imagination.
          </p>
        </div>
      </div>

      <div className="relative w-full overflow-hidden py-6 space-y-8">
        {/* First row */}
        <motion.div className="flex" animate={controls}>
          {duplicatedImages.map((src, idx) => (
            <motion.div
              key={`row1-${idx}`}
              className="relative flex-shrink-0 px-3"
              style={{ width: `${120 / images.length}%` }} // bigger cards
              onMouseEnter={() => handleMouseEnter(idx, controls)}
              onMouseLeave={() => handleMouseLeave(controls, false, 45)}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <img
                src={src}
                alt={`slide-${idx}`}
                className="w-full h-full shadow-lg rounded-xl pointer-events-auto transform hover:scale-105 transition-transform duration-300"
              />

              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredIndex === idx ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-0 left-0 right-0 p-4 text-white rounded-lg bg-black/40 backdrop-blur-sm border border-white/20"
              >
                <p className="text-white text-sm md:text-base">
                  {duplicatedPrompts[idx]}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Second row */}
        <motion.div className="flex" animate={controls2}>
          {duplicatedImages.map((src, idx) => (
            <motion.div
              key={`row2-${idx}`}
              className="relative flex-shrink-0 px-3"
              style={{ width: `${120 / images.length}%` }} // bigger cards
              onMouseEnter={() => handleMouseEnter(idx, controls2)}
              onMouseLeave={() => handleMouseLeave(controls2, true, 30)}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <img
                src={src}
                alt={`slide-${idx}`}
                className="w-full h-full shadow-lg rounded-xl pointer-events-auto transform hover:scale-105 transition-transform duration-300"
              />

              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredIndex === idx ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-0 left-0 right-0 p-4 text-white rounded-lg bg-black/40 backdrop-blur-sm border border-white/20"
              >
                <p className="text-white text-sm md:text-base">
                  {duplicatedPrompts[idx]}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default InfiniteCards;
