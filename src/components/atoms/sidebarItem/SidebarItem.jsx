import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'
import React from 'react'
import { Link, useParams } from 'react-router-dom'


const sideBarItemVariants = cva(
    'flex items-center justify-start gap-1.5 font-normal h-7 px-[20px] text-sm overflow-hidden', 
    {
        variants: {
            variant: {
                default: 'text-[#f9edffcc]',
                active: 'text=[#481350] bg-white/90 hover:bg-white/80'
            }
        },
        defaultVariants: 'default'
    }
)

export const SidebarItem = ({
    label,
    icon: Icon,
    variant,
    id
}) => {

    const { workspaceId } = useParams()

  return (
   
        <Button variant='transparent'className={cn(sideBarItemVariants({variant}))} size='sm'  >
            <Link to={`/workspace/${workspaceId}/channels/${id}`} className='flex items-center gap-1.5' >
                <Icon className='size-3.5 mr-1' />
                <span className='text-sm' > { label } </span>
            </Link>
        </Button>

  )
}

