import { motion } from "motion/react";

export function ShipSymbol({ dream }: { dream: boolean }) {
  return (
    <div className="relative grid place-items-center aspect-square w-[min(280px,75%)] sun-ring">
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "repeating-conic-gradient(from 0deg, var(--brut-yellow) 0deg 8deg, transparent 8deg 16deg)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: dream ? 8 : 24, ease: "linear", repeat: Infinity }}
      />
      <div className="absolute inset-[34px] rounded-full border-[3px] border-ink bg-brut-orange" />
      <div className="relative z-[2] h-[120px] w-[130px]">
        <span className="absolute left-[18px] top-[15px] h-[62px] w-[48px] -skew-y-6 rounded-[50%_8px_8px_50%] border-[3px] border-ink bg-brut-white" />
        <span className="absolute left-[63px] top-[10px] h-[77px] w-[5px] border-2 border-ink bg-ink" />
        <span className="absolute bottom-[18px] left-[10px] h-[34px] w-[112px] rounded-[4px_4px_55px_55px] border-[3px] border-ink bg-ink" />
      </div>
    </div>
  );
}
