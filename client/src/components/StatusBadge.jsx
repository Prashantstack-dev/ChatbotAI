import useServerStatus from "../hooks/useServerStatus";
import { chatStyles } from "../chatStyles";

const StatusBadge = () => {
  const { isOnline, loading } = useServerStatus();

  return (
    <div className='flex items-center gap-2 mt-1'>
      <div
        className={
          loading
            ? " w-3 h-3 bg-yellow-400 rounded-full animate-pulse"
            : isOnline
              ? chatStyles.circleOn
              : chatStyles.circleOff
        }
      />
      {/* AI Assistant */}
      <span
        className={
          loading
            ? "text-gray-500"
            : isOnline
            ? "text-green-600 font-medium"
            : "text-gray-500"
        }
      >
        AI Assistant
      </span>

      {/* text */}
      <span className='text-sm text-gray-600'>
        {loading ? "Checking..." : isOnline ? "Online" : "Offline"}
      </span>
 

    </div>
  );
};
export default StatusBadge;
