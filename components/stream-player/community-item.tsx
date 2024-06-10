"use client"

import {toast} from "sonner"
import { startTransition, useTransition } from "react"
import { MinusCircle } from "lucide-react"
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Hint } from "../hint";
import { onBlock } from "@/actions/block";

interface CommunityItemProps{
    hostName: string;
    viewerName : string;
    participantName ?: string;
    participantIdentity: string;
}

export const CommunityItem = ({
    hostName,
    viewerName,
    participantName,
    participantIdentity
}:CommunityItemProps) => {
    const [isPending, startTransition] = useTransition()

    const isSelf = participantName === viewerName
    const isHost = viewerName === hostName

    const handleBlock = () => {
        if(!participantName || isSelf || !isHost)
            return;
        startTransition(() => {
            onBlock(participantIdentity)
                .then(() => toast.success(`Blocked ${participantName}`))
                .catch(() => toast.error("Something went wrong"))
        })
    }
    return (
        <div className={cn(
            "group flex items-center justify-between w-full p-2 rounded-mmd text-sm hover:bg-white/5",
            isPending && "opacity-50 pointer-events-none"
        )}> 
            {participantName}
            {
                isHost && !isSelf && (
                    <Hint label="Block">
                        <Button 
                            variant="ghost"
                            disabled={isPending}
                            onClick={handleBlock}
                            className="h-auto w-auto p-1 opacity-0 group-hover:opacity-100 transition">
                            <MinusCircle className="h-4 w-4 text-muted-foreground"/>
                        </Button>
                    </Hint>
                )
            }
        </div>
    )
}