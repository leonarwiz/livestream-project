import Image from "next/image";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";

const font = Poppins({
    subsets: ["latin"],
    weight: ["200", "300", "400", "500", "600", "700", "800"]
})

export const Logo = () => {
    return (
        <div className="flex flex-col items-center gap-y-4">
            <div className="bh-white rouneded-full p-1">
                <Image
                    src="/spooky.svg"
                    alt="livestream-project"
                    height="80"
                    width="80"
                />
            </div>
            <div className={cn("flex flex-col items-center", font.className)}>
                <p className={cn(
                    "txt-xl font-semibold"
                )}>
                    livestream
                </p>
                <p 
                    className={cn(
                        "text-sm text-muted-foreground"
                    )}
                >
                    Interact with your favorite streaming with 3D !!
                </p>
            </div>
        </div>
    )
}