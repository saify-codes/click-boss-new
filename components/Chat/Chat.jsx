'use client'
// import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'


export default function ChatMessage({ user, msg }) {
    const session = useSession()
    const [image, setImge] = useState()
    useEffect(() => {
        setImge(user == 'bot' ? '/bot.jpg' : session.data?.image)
    }, [session])

    return <div className={`chat flex gap-3 ${user == 'bot' ? 'bg-white' : 'bg-gray'} p-3`}>
        <div className="avatar w-8 h-8 shrink-0">
            <img src={image}/>
        </div>
        <div className="content text-black font-normal leading-6 whitespace-pre-wrap">
            {msg}
        </div>
    </div>
}
