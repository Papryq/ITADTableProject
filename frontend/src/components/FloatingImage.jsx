import { motion } from "framer-motion";
import minion from "../assets/minionek.png";

const FloatingImage = ({ size, top, left, delay }) => {
  const randomY = Math.floor(Math.random() * 37);
  const randomX = Math.floor(Math.random() * 37);
  const randomRotate = Math.floor(Math.random() * 100) * 2;
  console.log(randomRotate);

  return (
    <motion.img
      src={minion}
      className={`absolute rounded-full ${size} opacity-20 blur-xl`}
      style={{ top, left }}
      animate={{
        y: [`${randomY}%`, `${-randomY}%`],
        x: [`${randomX}%`, `${-randomX}%`],
        rotate: [`${randomRotate}`, 360],
      }}
      transition={{
        duration: 60,
        ease: "linear",
        repeat: Infinity,
        delay,
      }}
    />
  );
};

export default FloatingImage;
