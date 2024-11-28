import { cva, VariantProps } from 'class-variance-authority';
import React from 'react';
import { twMerge } from 'tailwind-merge';

const typographyVariants = cva('', {
  variants: {
    variant: {
      h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
      h2: 'mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
      h3: 'mt-8 scroll-m-20 text-2xl font-semibold tracking-tight',
      h4: 'text-lg sm:text-xl font-semibold',
      h5: 'text-md sm:text-lg font-semibold',
      h6: 'text-sm sm:text-md font-semibold',
      body1:
        'leading-7 text-base sm:text-lg text-gray-600 dark:text-gray-400 [&:not(:first-child)]:mt-6',
      body2: 'text-sm sm:text-base text-gray-500 dark:text-gray-400',
      blockquote:
        'mt-6 border-l-2 pl-6 italic text-gray-800 dark:text-gray-200',
      list: 'my-6 ml-6 list-disc [&>li]:mt-2',
      caption: 'text-xs sm:text-sm',
      table: 'my-6 w-full overflow-y-auto border-collapse border-spacing-0',
      tableHead:
        'border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right',
      tableCell:
        'border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right',
      inline:
        'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
      lead: 'text-xl text-muted-foreground',
      muted: 'text-sm text-muted-foreground',
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
