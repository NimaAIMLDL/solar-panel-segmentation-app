import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import { IconLoader2 } from '@tabler/icons-react'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow-lg hover:brightness-105 active:scale-[0.98]',
        destructive:
          'bg-destructive text-destructive-foreground shadow-md hover:brightness-95 active:scale-[0.98]',
        outline:
          'bg-background text-foreground border border-transparent shadow-sm hover:shadow-md active:scale-[0.97] border-[1.5px] border-gradient-to-r from-primary to-secondary',
        secondary:
          'bg-secondary text-secondary-foreground shadow-md hover:brightness-105 active:scale-[0.98]',
        ghost:
          'text-muted-foreground hover:bg-muted/40 active:bg-muted/60 active:scale-[0.97]',
        link:
          'text-primary underline-offset-4 hover:text-primary/90 rounded-full px-3 py-1 font-medium transition-colors',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 px-3 text-xs rounded-md',
        lg: 'h-10 px-8 text-base rounded-lg',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

interface ButtonPropsBase
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

type ButtonProps = ButtonPropsBase &
  (
    | { asChild: true }
    | {
        asChild?: false
        loading?: boolean
        leftSection?: JSX.Element
        rightSection?: JSX.Element
      }
  )

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    if (props.asChild) {
      return (
        <Slot
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        >
          {children}
        </Slot>
      )
    }

    const {
      loading = false,
      leftSection,
      rightSection,
      disabled,
      ...rest
    } = props

    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={loading || disabled}
        ref={ref}
        {...rest}
      >
        {loading && !leftSection && !rightSection && (
          <IconLoader2 className="mr-2 h-4 w-4 animate-spin" />
        )}
        {!loading && leftSection && (
          <span className="mr-2">{leftSection}</span>
        )}
        {children}
        {!loading && rightSection && (
          <span className="ml-2">{rightSection}</span>
        )}
        {rightSection && loading && (
          <IconLoader2 className="ml-2 h-4 w-4 animate-spin" />
        )}
      </button>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
