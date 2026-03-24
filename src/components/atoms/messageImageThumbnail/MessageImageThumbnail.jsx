import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import React from 'react'

export const MessageImageThumbnail = ({ url }) => {
  return (
    <Dialog>

        <DialogTrigger>

            <div className="relative overflow-hidden cursor-zoom-in border rounded-lg max-w-[370px]">
                        <img src={url} alt="" className='rounded-md object-cover size-full'/>
            </div>

        </DialogTrigger>

        <DialogContent
            className="max-w-[850px] border-none bg-transparent p-0 shadow-none"
        >

            <img src={url} alt="" className='rounded-md object-cover size-full' />

        </DialogContent>

    </Dialog>
  )
}

