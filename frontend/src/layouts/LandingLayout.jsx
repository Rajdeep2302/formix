import { Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'

const LandingLayout = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="min-h-screen w-screen bg-[#f1fffa] flex justify-center items-center font-[Paprika]"
    >
      <Outlet />
    </motion.div>
  )
}

export default LandingLayout
