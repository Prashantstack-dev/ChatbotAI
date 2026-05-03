// import useServerStatus from "../hooks/useServerStatus";
// import { chatStyles } from "../chatStyles";

// const StatusBadge = () => {
//   const { isOnline, loading } = useServerStatus();

//   return (
//     <div className='flex items-center gap-2 mt-1'>
//       <div
//         className={
//           loading
//             ? " w-3 h-3 bg-yellow-400 rounded-full animate-pulse"
//             : isOnline
//               ? chatStyles.circleOn
//               : chatStyles.circleOff
//         }
//       />
//       {/* AI Assistant */}
//       <span
//         className={
//           loading
//             ? "text-gray-500"
//             : isOnline
//             ? "text-green-600 font-medium"
//             : "text-gray-500"
//         }
//       >
//        Kim Sun Young Assistant

//       </span>

//       {/* text */}
//       <span className='text-sm text-gray-600'>
//         {loading ? "Checking..." : isOnline ? "Online" : "Offline"}
//       </span>
 

//     </div>
//   );
// };
// export default StatusBadge;

import useServerStatus from "../hooks/useServerStatus";

import { motion } from "framer-motion";

const MotionDiv = motion.div

const StatusBadge = () => {
  const { isOnline, loading } = useServerStatus();
 
  const statusColor = loading
    ? "bg-yellow-400 animate-pulse"
    : isOnline
    ? "bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]"
    : "bg-gray-400";

  const statusText = loading
    ? "Checking availability"
    : isOnline
    ? "Assistant is available"
    : "Currently offline";

  return (
    <motion.div
  className="flex items-center gap-3"
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
>
      {/* Avatar */}
      <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center text-sm shadow-md">
        KSY
      </div>

      {/* Text block */}
      <div className="flex flex-col leading-tight">
        <div className="flex items-center gap-2">
          {/* Status dot */}
          <motion.span
  className={`w-2.5 h-2.5 rounded-full ${statusColor}`}
  animate={
    loading
      ? { scale: [1, 1.4, 1] }
      : isOnline
      ? { scale: [1, 1.2, 1] }
      : { scale: 1 }
  }
  transition={{
    duration: loading ? 0.8 : 1.5,
    repeat: loading || isOnline ? Infinity : 0,
    ease: "easeInOut"
  }}
/>

          {/* Brand name */}
          <span className="text-sm font-semibold text-black tracking-wide">
            Kim Sun Young
          </span>
        </div>

        {/* Subtext */}
        <motion.span
  key={statusText}
  initial={{ opacity: 0, y: 5 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -5 }}
  transition={{ duration: 0.2 }}
  className="text-xs text-gray-500"
>
  {statusText}
</motion.span>
      </div>

     
    </motion.div>
  );
};

export default StatusBadge;