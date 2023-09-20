import React from 'react'

export default function ChatSuggestion({ ref }) {

    const query = async (text) => {
        try {
            promptInputField.disabled = true
            setLoadingState(true)
            const response = await axios.post('/api/bot', { prompt: text })
            const chat = response.data
            appendChat(chat)
        } catch (error) {
            alert('something went wrong')
        } finally {
            promptInputField.disabled = false
            setLoadingState(false)
        }
    }
    return (
        <div className='absolute bottom-0 left-0 right-0 grid grid-cols-1 md:grid-cols-2 gap-2 mx-4'>
            <div className="flex items-center justify-between bg-white cursor-pointer transition hover:scale-95 font-semibold rounded-md p-3 group">
                <p>How many click?</p>
                <svg className="w-5 h-5 opacity-0 transition group-hover:opacity-100" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
            </div>
            <div className="flex items-center justify-between bg-white cursor-pointer transition hover:scale-95 font-semibold rounded-md p-3 group">
                <p>Describe data</p>
                <svg className="w-5 h-5 opacity-0 transition group-hover:opacity-100" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
            </div>
            <div className="flex items-center justify-between bg-white cursor-pointer transition hover:scale-95 font-semibold rounded-md p-3 group">
                <p>Generate summary</p>
                <svg className="w-5 h-5 opacity-0 transition group-hover:opacity-100" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
            </div>
            <div className="flex items-center justify-between bg-white cursor-pointer transition hover:scale-95 font-semibold rounded-md p-3 group">
                <p>Show me analytics</p>
                <svg className="w-5 h-5 opacity-0 transition group-hover:opacity-100" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
            </div>
        </div>
    )
}
