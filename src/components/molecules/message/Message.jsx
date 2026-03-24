import { MessageImageThumbnail } from '@/components/atoms/messageImageThumbnail/MessageImageThumbnail'
import { MessageRenderer } from '@/components/atoms/messageRenderer/MessageRenderer'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import React from 'react'

export const Message = ({ authorImage, authorName, createdAt, body, image }) => {
  return (
    <div
        className='flex flex-col gap-2 px-1.5 p-2 hover:bg-gray-100/60 group relative'
    >
        
    <div className='flex items-start gap-2' >

        <button>
            <Avatar>
                <AvatarImage className="rounded-md" src={authorImage} />

                <AvatarFallback className="rounded-md bg-sky-500 text-white text-sm" >
                    { authorName?.charAt(0).toUpperCase() }
                </AvatarFallback>

            </Avatar>   
        </button>

        <div className="flex flex-col w-full overflow-hidden">

            <div className='text-xs' >

                <button className="font-bold text-primary hover:underline">
                    {authorName}
                </button>
                
                <span> &nbsp; &nbsp; </span>

                <button className='text-xs text-slate-500 hover:underline' >
                    {createdAt}
                </button>

            </div>

            <MessageRenderer value={body} />

           {image && <MessageImageThumbnail url={image} />} 

        </div>

    </div>

    </div>
  )
}

