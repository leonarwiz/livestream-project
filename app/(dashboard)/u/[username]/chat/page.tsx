import { getSelf } from '@/lib/auth-service'
import { getStreamByUserId } from '@/lib/stream-service'
import React from 'react'

import {ToggleCard} from './_components/toggle-card'



export default async function ChatPage() {
    const self = await getSelf()
    const stream = await getStreamByUserId(self.id)

    if(!stream){
        throw new Error("Stream Not Found")
    }

  return (
    <div className='p-6'>
        <div className='mb-4'>
            <h1 className='text-2xl text-white font-bold'>
                Chat settings
            </h1>
        </div>
        <div className='space-y-4'>
            <ToggleCard
                field="isChatEnabled"
                label="Enable chat"
                value={stream.isChatEnabled}
            />
            <ToggleCard
                field="isChatEnabled"
                label="Enable chat"
                value={stream.isChatEnabled}
            />
            <ToggleCard
                field="isChatEnabled"
                label="Enable chat"
                value={stream.isChatEnabled}
            />
            <ToggleCard
                field="isChatEnabled"
                label="Enable chat"
                value={stream.isChatEnabled}
            />
        </div>
    </div>
  )
}
