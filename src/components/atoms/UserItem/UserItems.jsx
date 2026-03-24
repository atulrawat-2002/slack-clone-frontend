import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useCurrentWorkspace } from '@/hooks/context/useCurrentWorkspace'
import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'
import React from 'react'
import { Link } from 'react-router-dom'

const userItemsVariants = cva(
    'flex items-center gap-1.5 justify-start font-normal h-7 px-4 mt-2 text-sm overflow-hidden',
    {
        variants: {
            variant: {
                default: 'text-[#f9edffcc]',
                active: 'text-[#481350] bg-white/90  hover:bg-white/80'
            }
        },
        defaultVariants: 'default'
    }
)

export const UserItems = ({ id, label='Member', image, variant='default' }) => {

    const workspace = useCurrentWorkspace();

  return (
    <Button
  className={cn(userItemsVariants({ variant }))}
  variant="transparent"
  size="sm"
>
  <Link
    to={`/workspace/${workspace?.currentWorkspace?._id}/member/${id}`}
    className="flex items-center gap-2 w-full"
  >
    <Avatar className="h-6 w-6">
      <AvatarImage src={image} className="rounded-md object-cover" />
      <AvatarFallback className="rounded-md bg-sky-500 text-white text-xs">
        {label.charAt(0).toUpperCase()}
      </AvatarFallback>
    </Avatar>

    <span className="truncate text-sm">
      {label}
    </span>
  </Link>
</Button>
  )
}

