import { db } from "@/lib/db";
import { WebhookReceiver } from "livekit-server-sdk";
import { headers } from "next/headers";

const receiver = new WebhookReceiver(
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!
)

export async function POST(req : Request){
    const body = await req.text()
    const headerPayload = headers()
    const authorization = headerPayload.get("Authorization")
    console.log("auth", authorization)
    if(!authorization){
        return new Response("No authorization header", {status : 400})
    }

    const event = receiver.receive(body, authorization)

    if(event.event === "ingress_started"){
        await db.stream.update({
            where:{
                ingressId: event.ingressInfo?.ingressId,
            },
            data:{
                isLive: true
            }
        })
    }

    if(event.event === "ingress_ended"){
        await db.stream.update({
            where:{
                ingressId: event.ingressInfo?.ingressId,
            },
            data:{
                isLive: false
            }
        })
    }
    return new Response("Webhook POST Success", {status: 200})
}