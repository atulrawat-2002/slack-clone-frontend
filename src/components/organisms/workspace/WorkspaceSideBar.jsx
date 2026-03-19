import UserButton from "@/components/atoms/UserButton/UserButton"
import { SideBarButton } from "@/components/molecules/sideBarButton/SideBarButton"
import { BellIcon, HomeIcon, MessagesSquareIcon, MoreHorizontalIcon } from "lucide-react"
import { WorkspaceSwitcher } from "./WorkspaceSwitcher"

export const WorkspaceSideBar = () => {
    return (
        <aside className="w-[70px] h-full bg-slack-DARK flex flex-col gap-y-4 mb-5 items-center pt-[10px] pb-[5px]" >

        <WorkspaceSwitcher />

        <SideBarButton  Icon={HomeIcon} label="Home" />

        <SideBarButton Icon={MessagesSquareIcon} label="DMs" />

        <SideBarButton Icon={BellIcon} label="Notifications" />  

        <SideBarButton Icon={MoreHorizontalIcon} label="More" />  

        <div className="flex flex-col items-center justify-center mt-auto gap-y-1" >

            <UserButton />

        </div>

        </aside>
    )
}