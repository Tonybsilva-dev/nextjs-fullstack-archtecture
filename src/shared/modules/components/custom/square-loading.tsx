'use client';

import { motion } from 'framer-motion';
import { shuffle } from 'lodash';
import * as React from 'react';
import { useEffect,useState } from 'react';

const spring = {
  type: 'spring',
  damping: 20,
  stiffness: 300,
};

const initialColors = ['#FDE68A', '#FBBF24', '#D97706', '#92400E'];

export const SquareLoading = () => {
  const [colors, setColors] = useState(initialColors);

  useEffect(() => {
    const interval = setTimeout(() => setColors(shuffle(colors)), 500);
    return () => clearTimeout(interval);
  }, [colors]);

  return (
    <ul className="relative flex w-[120px] flex-wrap items-center justify-center gap-1">
      {colors.map((background) => (
        <motion.li
          key={background}
          layout
          transition={spring}
          className="h-[40px] w-[40px] rounded-md"
          style={{ background }}
        />
      ))}
    </ul>
  );
};
