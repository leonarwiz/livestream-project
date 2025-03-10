"use client"

import { toast } from 'sonner';
import { useTransition } from 'react';

import { Switch } from '@/components/ui/switch';
import { updateStream } from '@/actions/stream';
import React from 'react'

type FieldType = "isChatEnabled" | "isChatDelayed" | "isChatFollowersOnly"

interface ToggleCardProps{
    field: FieldType;
    label: string;
    value: boolean;
}

export function ToggleCard({
    field,
    label,
    value = false
}:ToggleCardProps) {
    const [isPending, startTransition] = useTransition()
    const onChange = async () => {
        startTransition(() => {
            updateStream({[field]: !value})
                .then(() => toast.success("Chat settings updated!"))
                .catch(() => toast.error("Something went wrong"))
        })
    }
  return (
    <div className='rounded-xl bg-muted p-6'>
        <div className='flex items-center justify-between'>
            <p className='font-semibold shrink-0'>
                {label}
            </p>
            <div className='space-y-2'>
                <Switch
                    disabled={isPending}
                    onCheckedChange={onChange}
                    checked={value}
                >
                    {value ? "On" : "Off"}
                </Switch>
            </div>
        </div>
    </div>
  )
}
