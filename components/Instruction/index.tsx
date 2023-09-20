'use client'
import React, { useState } from 'react'
import Facebook from './facebook'
import Google from './google'

export default function Index() {

    const [activeTab, setTab] = useState('facebook')
    const renderTabContent = () => {
        switch (activeTab) {
            case 'facebook':
                return <Facebook />
            case 'google':
                return <Google />
            default:
                return null;
        }
    };
    return <>
        <div className='mx-auto max-w-180'>
            <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
                <ul className="flex flex-wrap -mb-px">
                    <li className="mr-2">
                        <button className={`inline-block p-4 border-b-2 ${activeTab == 'facebook' ? 'text-primary border-primary' : 'border-transparent'} rounded-t-lg`} onClick={() => setTab('facebook')}>Facebook</button>
                    </li>
                    <li className="mr-2">
                        <button className={`inline-block p-4 border-b-2 ${activeTab == 'google' ? 'text-primary border-primary' : 'border-transparent'} rounded-t-lg`} onClick={() => setTab('google')}>Google</button>
                    </li>
                </ul>
            </div>
            <div className='py-5'>
                {renderTabContent()}
            </div>
        </div>
    </>
}


