"use client"
import { fadeIn } from "@/utils/motion-transition";
import { motion } from "framer-motion";

interface MotionTransitionProps{
    children:React.ReactNode,
    position: 'right' | 'bottom',
    className?: string
}

const TransitionComponents = (props: MotionTransitionProps) =>{
    const {children, position, className} = props
    return(
        <motion.div
        variants={fadeIn(position)}
        initial= "inactive"
        animate= "active"
        exit="inactive"
        className={className}
        >
            {children}
        </motion.div>
    )
}
export default TransitionComponents;