import type { Variants, Transition } from "framer-motion";

export const transitionVariantsPage = {
    initial :{
        x:"100%",
        width:"100%"
    },
    animate :{
        x:"0%",
        width:"0%"
    },
    exit :{
        x: ['0%','100%'],
        width:['0%','100%']
    }
}

export const fadeIn = (position: "right" | "bottom"): Variants => {
  const transition: Transition = {
    type: "tween",
    duration: 1.4,
    delay: 0.5,
    ease: [0.25, 0.25, 0.25, 0.75],
  };

  return {
    active: {
      y: 0,
      x: 0,
      opacity: 1,
      transition,
    },
    inactive: {
      y: position === "bottom" ? -80 : 0,
      x: position === "right" ? 80 : 0,
      opacity: 0,
      transition,
    },
  };
};