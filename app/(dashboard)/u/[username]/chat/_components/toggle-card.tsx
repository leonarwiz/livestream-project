"use client"

import { Switch } from '@/components/ui/switch';
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
  return (
    <div className='rounded-xl bg-muted p-6'>
        <div className='flex items-center justify-between'>
            <p className='font-semibold shrink-0'>
                {label}
            </p>
            <div className='space-y-2'>
                <Switch
                    checked={value}
                >
                    {value ? "On" : "Off"}
                </Switch>
            </div>
        </div>
    </div>
  )
}
