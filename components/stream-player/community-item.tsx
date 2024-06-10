"use client"

import {toast} from "sonner"
import { useTransition } from "react"
import { MinusCircle } from "lucide-react"

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
    return (
        <div>
            {participantName}
        </div>
    )
}