// import { motion } from "motion/react";

// export default function BounceCards({
//   className = "",
//   images = [],
//   containerWidth = 500,
//   containerHeight = 420,
//   animationDelay = 0.5,
//   animationDuration = 0.8,
//   easingValues = [0.175, 0.885, 0.32, 1.275],
//   transformStyles = [],
// }) {
//   return (
//     <div
//       className={`relative ${className}`}
//       style={{
//         width: containerWidth,
//         height: containerHeight,
//       }}
//     >
//       {images.map((image, index) => (
//         <motion.div
//           key={index}
//           className="
//           absolute
//           w-[170px]
//           h-[240px]
//           rounded-[32px]
//           overflow-hidden
//           shadow-[0_20px_60px_rgba(0,0,0,0.35)]
//           border border-white/10
//           bg-white/10
//           backdrop-blur-xl
//           "
//           style={transformStyles[index] || {}}
//           initial={{
//             scale: 0,
//             opacity: 0,
//             y: 100,
//           }}
//           animate={{
//             scale: 1,
//             opacity: 1,
//             y: 0,
//           }}
//           whileHover={{
//             y: -15,
//             scale: 1.03,
//           }}
//           transition={{
//             delay: animationDelay + index * 0.12,
//             duration: animationDuration,
//             ease: easingValues,
//           }}
//         >
//           <img
//             src={image}
//             alt={`card-${index}`}
//             className="
//             w-full h-full
//             object-cover
//             hover:scale-105
//             transition-transform
//             duration-500
//             "
//           />
//         </motion.div>
//       ))}
//     </div>
//   );
// }


import { motion } from "framer-motion";

export default function BounceCards({
  className = "",
  images = [],
  containerWidth = "100%",
  containerHeight = "420px",
  animationDelay = 0.5,
  animationDuration = 0.8,
  easingValues = [0.175, 0.885, 0.32, 1.275],
  transformStyles = [],
}) {
  return (
    <div
      className={`relative mx-auto w-full max-w-[500px] ${className}`}
      style={{
        height: containerHeight,
      }}
    >
      {images.map((image, index) => (
        <motion.div
          key={image}
          className="absolute w-[120px] sm:w-[150px] md:w-[170px] h-[180px] sm:h-[220px] md:h-[240px] rounded-[28px] overflow-hidden shadow-xl border border-white/10 bg-white/10"
          style={transformStyles[index] || {}}
          initial={{
            scale: 0,
            opacity: 0,
            y: 80,
          }}
          animate={{
            scale: 1,
            opacity: 1,
            y: 0,
          }}
          whileHover={{
            y: -10,
            scale: 1.02,
          }}
          transition={{
            delay: animationDelay + index * 0.12,
            duration: animationDuration,
            ease: easingValues,
          }}
        >
          <img
            src={image}
            alt={`Chocolate card ${index + 1}`}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = "/fallback.jpg";
            }}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </motion.div>
      ))}
    </div>
  );
}