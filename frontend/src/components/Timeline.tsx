import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Code, Award, Rocket } from 'lucide-react';

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
}

const Timeline: React.FC = () => {
  const timelineItems: TimelineItem[] = [
    {
      year: '2020',
      title: 'Started Coding Journey',
      description: 'Began learning programming fundamentals and web development basics.',
      icon: <Code className="w-6 h-6" />,
      delay: 0.2
    },
    {
      year: '2021',
      title: 'First Major Project',
      description: 'Completed first full-stack application with modern technologies.',
      icon: <Rocket className="w-6 h-6" />,
      delay: 0.4
    },
    {
      year: '2022',
      title: 'Advanced Skills Development',
      description: 'Mastered React, Node.js, and cloud technologies.',
      icon: <Award className="w-6 h-6" />,
      delay: 0.6
    },
    {
      year: '2023',
      title: 'Professional Experience',
      description: 'Started working on enterprise-level applications and complex systems.',
      icon: <Calendar className="w-6 h-6" />,
      delay: 0.8
    }
  ];

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-400 to-purple-500 rounded-full"></div>

      <div className="space-y-12">
        {timelineItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: item.delay }}
            className={`flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
          >
            <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-blue-500/20 rounded-lg text-blue-300">
                    {item.icon}
                  </div>
                  <div className="text-blue-300 font-bold text-lg">{item.year}</div>
                </div>
                <h3 className="text-white font-bold text-xl mb-2">{item.title}</h3>
                <p className="text-blue-100 leading-relaxed">{item.description}</p>
              </motion.div>
            </div>

            {/* Timeline dot */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: item.delay + 0.3 }}
              className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-400 rounded-full border-4 border-blue-900 shadow-lg"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
