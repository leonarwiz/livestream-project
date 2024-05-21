"use client"

import { useViewerToken } from "@/use-viewer-token"
import { Stream, User } from "@prisma/client"
import {Chat, LiveKitRoom} from "@livekit/components-react"
import { Video } from "./video"
import { useChatSidebar } from "@/store/use-chat-sidebar"
import { cn } from "@/lib/utils"

interface StreamPlayerProps{
    user: User & {stream: Stream | null}
    stream: Stream
    isFollowing: boolean
}

export const StreamPlayer = ({
    user,
    stream,
    isFollowing
}:StreamPlayerProps) => {
    const {
        token,
        name,
        identity
    } = useViewerToken(user.id)

    const {
        collapsed
    } = useChatSidebar((state) => state)

    if(!token || !name || !identity){
        return(
            <div>
                Cannot watch the stream
            </div>
        )
    }

    return (
        <>
            <LiveKitRoom
                token={token}
                serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WEBSOCKET_URL}
                className={cn(
                    "grid gird-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full",
                    collapsed && "lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2"
                )}
            >
                <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
                    <Video 
                        hostName={user.username}
                        hostIdentity={user.id}
                    />
                </div>
                <div
                    className={cn(
                        "col-span-1",
                        collapsed && "hidden"
                    )}
                >
                    
                </div>
            </LiveKitRoom>
        </>
    )
}