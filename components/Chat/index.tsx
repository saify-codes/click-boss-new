'use client'
import { LiaTelegramPlane } from 'react-icons/lia'
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { ThreeDots } from 'react-loader-spinner'
import Chat from './Chat'
import axios from "axios";

export default function Index() {

  const prompt = useRef<HTMLInputElement | null>(null)
  const chatArea = useRef<HTMLDivElement | null>(null)
  const [chats, addChat] = useState<any>([])
  const [isLoading, setLoadingState] = useState<boolean>(false)
  const [fetching, setFetchingState] = useState<boolean>(false)

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const promptInputField = prompt.current!
    const text = promptInputField.value.trim()
    if (text != '' && !fetching) {
      appendChat({ user: 'human', msg: text })
      await query(text)
      promptInputField.value = ''
      promptInputField.focus()
    }
  }
  const appendChat = (chat: any) => {
    addChat((prevChats: any) => [...prevChats, chat]);
  }
  const query = async (text: string) => {

    const promptInputField: HTMLInputElement = prompt.current!
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
  const fetchWindsorData = async () => {
    try {
      setFetchingState(true)
      await axios.get('/api/bot')
    } catch (error) {
      alert('something went wrong while fetching data please refresh the page')
    } finally {
      setFetchingState(false)
    }
  }
  useEffect(() => {
    fetchWindsorData()
  }, [])
  useEffect(() => {
    if (chatArea.current) {
      chatArea.current.scrollTop = chatArea.current.scrollHeight
    }
  }, [chats])


  return (
    <>

      {fetching &&
        <div className="flex items-center p-4 mb-4 text-sm text-white rounded-lg bg-primary dark:bg-gray-800 dark:text-blue-400" role="alert">
          <div className="text-left">
            <div className='grid place-content-center'>
              <svg aria-hidden="true" className="inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
              </svg>
            </div>
          </div>
          <div>
            <span className="font-medium">Fetching data</span> please wait.
          </div>
        </div>}

      <div className="chat-container h-[80vh] flex flex-col border border-body rounded-md overflow-hidden">
        <div className="chat-message-container grow overflow-auto" ref={chatArea}>
          {chats.map((chat: any) => <Chat user={chat.user} msg={chat.msg} key={chat.id} />)}
        </div>
        <form className="flex border rounded-lg m-4 py-3 px-2" onSubmit={submit}>
          <input
            ref={prompt}
            type="text"
            className="grow border-none text-sm outline-none"
            placeholder="Ask me anything"
          />
          <button>
            {isLoading ? <ThreeDots
              height="20"
              width="20"
              color="#3C50E0"
            /> : <LiaTelegramPlane />}
          </button>
        </form>
      </div>
    </>
  );
}
