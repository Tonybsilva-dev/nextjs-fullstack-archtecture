import { cva, VariantProps } from 'class-variance-authority';
import React from 'react';
import { twMerge } from 'tailwind-merge';

const typographyVariants = cva('', {
  variants: {
    variant: {
      h1: 'text-4xl font-bold',
      h2: 'text-3xl font-bold',
      h3: 'text-2xl font-semibold',
      h4: 'text-xl font-semibold',
      h5: 'text-lg font-medium',
      h6: 'text-base font-medium',
      body1: 'text-base text-gray-500 dark:text-gray-400',
      body2: 'text-sm text-gray-500 dark:text-gray-400',
      body3: 'text-md',
      caption: 'text-xs',
      overline: 'text-xs uppercase tracking-wider',
    },
    color: {
      primary: 'text-primary-500',
      secondary: 'text-secondary-500',
      description: 'text-gray-500 dark:text-gray-400',
      error: 'text-red-600',
      warning: 'text-yellow-600',
      info: 'text-blue-600',
      success: 'text-green-600',
      inherit: 'text-inherit',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
      justify: 'text-justify',
    },
    gutterBottom: {
      true: 'mb-2',
    },
    noWrap: {
      true: 'truncate',
    },
    paragraph: {
      true: 'mb-6',
    },
  },
  defaultVariants: {
    variant: 'body1',
    color: 'inherit',
    align: 'left',
  },
});

interface TypographyProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'color'>, // Omitir 'color' aqui
    VariantProps<typeof typographyVariants> {
  as?: React.ElementType;
}

export const Typography: React.FC<TypographyProps> = ({
  as: Component = 'p',
  variant,
  color,
  align,
  gutterBottom,
  noWrap,
  paragraph,
  className,
  children,
  ...props
}) => {
  return (
    <Component
      className={twMerge(
        typographyVariants({
          variant,
          color,
          align,
          gutterBottom,
          noWrap,
          paragraph,
        }),
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};
