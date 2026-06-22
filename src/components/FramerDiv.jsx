import { motion } from "framer-motion";

export const FramerDiv = ({children}) => {
  return (
    <motion.div
      initial={{ opacity: 0.5, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0.5, y: 10 }}
      transition={{ duration: 0.3, delayChildren: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
