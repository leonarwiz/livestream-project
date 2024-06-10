"use client"

import {useState} from "react"

import { cn } from "@/lib/utils"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Skeleton } from "../ui/skeleton"
import { ChatInfo } from "./chat-info"

interface ChatFormProps{
    onSubmit: () => void;
    value: string
    onChange: (value: string) => void
    isHidden: boolean
    isFollowersOnly: boolean
    isFollowing: boolean
    isDelayed: boolean
}

export const ChatForm = ({
    onSubmit,
    value,
    onChange,
    isHidden,
    isFollowersOnly,
    isFollowing,
    isDelayed
}:ChatFormProps) => {

    const [isDelayBlocked, setIsDelayBlocked] = useState(false)

    const isFollowerOnlyAndNotFollowing = isFollowersOnly && !isFollowing
    const isDisabled = isHidden || isDelayBlocked || isFollowerOnlyAndNotFollowing

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        e.stopPropagation()

        if(!value || isDelayBlocked)
            return
        if(isDelayed || !isDelayBlocked){
            setIsDelayBlocked(true)
            setTimeout(() => {
                setIsDelayBlocked(false)
                onSubmit()
            }, 3000)
        }else{
            onSubmit()
        }
    }
    if(isHidden){
        return null
    }
    return (
        <form 
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-y-4 p-3"
        >
            <div className="w-full">
                <ChatInfo
                    isDelayed={isDelayed}   
                    isFollowersOnly={isFollowersOnly} 
                />
                <Input
                    onChange={(e) => onChange(e.target.value)}
                    value={value}
                    disabled={isDisabled}
                    placeholder="Send a message"
                    className={cn(
                        "border-white/10",
                        isFollowersOnly && "rounded-t-none border-t-0"
                    )}
                />
            </div>
            <div>
                <Button
                    type="submit"
                    size="sm"
                    disabled={isDisabled}
                >
                    Chat
                </Button>
            </div>
            

        </form>
    )
}