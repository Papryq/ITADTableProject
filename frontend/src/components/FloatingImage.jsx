import { motion } from "framer-motion"
import minion from "../assets/pobrane.png"

const FloatingImage = ({ size, top, left, delay  }) => {
  const randomY = Math.floor(Math.random() * 41) - 20;
  const randomX = Math.floor(Math.random() * 41) - 20;


  return (
    <motion.img 
    src={minion}
    className={`absolute rounded-full ${size} opacity-20 blur-xl`}
    style={{ top, left }}
    animate={{
      y: [`${randomY}%`, `${-randomY}%`],
      x: [`${randomX}%`, `${-randomX}%`],
      rotate: [0, 360],
    }}
    transition={{
      duration: 3600,
      ease: "linear",
      repeat: Infinity,
      delay,
    }}
    />
  )
}

export default FloatingImage