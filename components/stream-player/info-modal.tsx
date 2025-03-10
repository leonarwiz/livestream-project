import { Dialog, DialogClose, DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import { DialogContent, DialogHeader } from "../ui/dialog";
import { ElementRef, useRef, useState, useTransition } from "react";
import {Label} from "../ui/label"
import { Input } from "../ui/input";
import { updateStream } from "@/actions/stream";
import { toast } from "sonner";
import {UploadDropzone} from "@/lib/uploadthing"
import { useRouter } from "next/navigation";
import { Hint } from "../hint";
import { Trash } from "lucide-react";
import Image from "next/image";

interface InfoModalProps{
    initialName: string;
    initialThumbnailUrl: string;
}

export const InfoModal = ({
    initialName,
    initialThumbnailUrl
}:InfoModalProps) => {
    const [isPending, startTransition] = useTransition()
    const [name, setName] = useState(initialName)
    const router = useRouter()
    const [thumbnailUrl, setThumbnailUrl] = useState
    (initialThumbnailUrl)
    const closeRef = useRef<ElementRef<"button">>(null)
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        startTransition(() => {
            updateStream({name: name})
                .then(() => {
                    toast.success("Stream updated")
                    closeRef?.current?.click()
                })
                .catch(() => toast.error("Something went wrong"))
        })
    }
    const onRemove = () => {
        startTransition(() => {
            updateStream({thumbnailUrl: null})
                .then(() => {
                    toast.success("Thumbnail removed")
                    setThumbnailUrl("")
                    closeRef?.current?.click()
                })
                .catch(() => toast.error("Something went wrong"))
        })
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="link" size="sm" className="ml-auto">
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Edit stream info
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={onSubmit} className="space-y-14">
                    <div className="space-y-2">
                        <Label>
                            Name
                        </Label>
                        <Input
                            disabled={isPending}
                            placeholder="Stream name"
                            onChange={onChange}
                            value={name}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>
                            Thumbnail
                        </Label>
                        {thumbnailUrl ? (
                            <div className="relative aspect-ratio rounded-xl overflow-hidden border border-white/10">
                                <div className="absolute top-2 right-2 z-[10]">
                                    <Hint label="remove thumbnail" asChild side="left">
                                        <Button
                                            type="button"
                                            disabled={isPending}
                                            onClick={onRemove}
                                            className="h-auto w-auto p-1.5"
                                        >
                                            <Trash className="h-4 w-4"/>
                                        </Button>
                                    </Hint>
                                </div>
                                <Image
                                    alt="Thumbnail"
                                    src={thumbnailUrl}
                                    fill
                                    className="object-cover"
                                />
                                hello 
                                hello
                                {/* Hello */}
                            </div>
                        ) : (
                        <div className="rounded-xl border- outline-dashed outline-muted">
                            <UploadDropzone
                                endpoint="thumbnailUploader"
                                appearance={{
                                    label:{
                                        color: "#FFFFFF"
                                    },
                                    allowedContent:{
                                        color: "#FFFFFF"
                                    }
                                }}
                                onClientUploadComplete={(res) => {
                                    setThumbnailUrl(res?.[0]?.url)
                                    router.refresh()
                                    closeRef?.current?.click()
                                }}
                            />
                        </div>
                        )}
                    </div>
                    <div className="flex justify-between">
                        <DialogClose ref={closeRef} asChild>
                            <Button type="button" variant="ghost">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button
                            type="submit"
                            disabled={isPending}
                        >
                            Save
                        </Button>

                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
