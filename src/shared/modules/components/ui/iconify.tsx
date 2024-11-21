import { LucideIcon } from 'lucide-react'
import React, { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

interface IconProps extends React.SVGProps<SVGSVGElement> {
  icon: LucideIcon
  size?: number
  className?: string
}

const Iconify = forwardRef<SVGSVGElement, IconProps>(
  ({ icon: IconComponent, size = 20, className, ...props }, ref) => {
    const mergedClassName = twMerge(
      className
    )

    return (
      <IconComponent
        ref={ref}
        className={mergedClassName}
        {...props}
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
      />
    )
  }
)

Iconify.displayName = 'Icon'

export default Iconify