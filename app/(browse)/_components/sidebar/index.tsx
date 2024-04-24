import { Wrapper } from "./wrapper"
import { Toggle, ToggleSkeleton } from "./toggle"
import { Recommended, RecommendedSkeleton } from "./recommended"
import { getRecommended } from "@/lib/recommnended-service"
import { getFollowedUsers } from "@/lib/follow-service"
import { Following } from "./following"

export const Sidebar = async () => {
    const recommended = await getRecommended();
    const following = await getFollowedUsers()
    return (
        <Wrapper>
            <Toggle/>
            <div className="space-y-4 pt-4 lg:pt-0">
                <Recommended data={recommended}/>
                <Following data={following}/>
            </div>
        </Wrapper>
    )
}

export const SidebarSkeleton = () => {
    return (
        <aside className="fixed left-9 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50">
            <ToggleSkeleton/>
            <RecommendedSkeleton/>
        </aside>
    )
}