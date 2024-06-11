"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

const ErrorPage = () => {
    return (
        <div className="h-full flex flex-col space-y-4 items-center justify-center text-muted-foreground">
            <h1 className="text-4xl">
                Something went wrong
            </h1>
            <p>
                We couldn't find the user your were looking for
            </p>
            <Button variant="secondary" asChild>
                <Link href="/">
                    Go back home
                </Link>
            </Button>
        </div>
    )
}

export default ErrorPage;