import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import { motion } from 'framer-motion'

const DashboardLayout = () => {
  return (
    <div className="min-h-screen w-screen bg-[#f1fffa] flex font-[Paprika]">
      <Sidebar />
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        className="flex-1 p-8 overflow-y-auto"
      >
        <Outlet />
      </motion.div>
    </div>
  )
}

export default DashboardLayout
