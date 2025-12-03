import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface SkillBarProps {
  skill: string;
  level: number; // 0-100
  color?: string;
  delay?: number;
}

const SkillBar: React.FC<SkillBarProps> = ({
  skill,
  level,
  color = '#3b82f6',
  delay = 0
}) => {
  const [animatedLevel, setAnimatedLevel] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedLevel(level);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [level, delay]);

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-white font-medium">{skill}</span>
        <span className="text-blue-200 text-sm">{animatedLevel}%</span>
      </div>
      <div className="h-3 bg-white/20 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${animatedLevel}%` }}
          transition={{
            duration: 1.5,
            delay,
            ease: "easeOut"
          }}
        />
      </div>
    </div>
  );
};

export default SkillBar;
