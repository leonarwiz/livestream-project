"use client"

import { Follow, User } from "@prisma/client"

interface FollowingProps {
    data: (Follow & {following : User})[]
}

export const Following = ({
    data
}: FollowingProps) => {
    return (
        <div>
            Following
        </div>
    )
}