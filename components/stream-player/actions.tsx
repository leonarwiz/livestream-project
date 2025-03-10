"use client"

import { useAuth } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { onFollow, onUnfollow } from "@/actions/follow";
import { toast } from "sonner";
import { Skeleton } from "../ui/skeleton";

interface ActionsProps {
    hostIdentity: string;
    isFollowing: boolean;
    isHost: boolean; 
}

export const Actions = ({
    hostIdentity,
    isFollowing,
    isHost
}:ActionsProps) => {
    const router = useRouter()
    const {userId} = useAuth()
    const [isPending, startTransition] = useTransition()

    const handleFollow = () => {
        startTransition(() => {
            onFollow(hostIdentity)
                .then((data) => toast.success(`You are now following ${data.following.username}`))
                .catch((data) => toast.error("Something went wrong"))
        })
    }

    const handleUnfollow = () => {
        startTransition(() => {
            onUnfollow(hostIdentity)
                .then((data) => toast.success(`You now unfollow ${data.following.username}`))
                .catch(() => toast.error("Something went wrong"))
        })
    }

    const toggleFollow = () => {
        if(!userId){
            return router.push("/sign-in")
        }

        if(isHost)
            return
        if(isFollowing){
            handleUnfollow()
        }else{
            handleFollow()
        }
    }
    return (
        <Button
            disabled={isPending || isHost}
            onClick={toggleFollow}
            size="sm"
            className="w-full lg:w-auto"
        >
            <Heart 
                className="w-4 h-4 mr-2"
            />
            {isFollowing ? "Unfollow" : "Follow"}
        </Button>
    )
}

export const ActionsSkeleton = () => {
    return (
        <Skeleton className="h-10 w-full lg:w-24"/>
    )
}