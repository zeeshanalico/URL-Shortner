'use client'
import React from 'react'
import Sidebar from './sidebar'
import useRouteLoader from '../hooks/useRouterLoader'
import Loader from '../components/ui/loader'
export interface LayoutProps {
    children: React.ReactNode
}
const layout = ({ children }: LayoutProps) => {
    const loading = useRouteLoader();

    return (
            <div className="flex h-screen">
                <Sidebar />
                <div className="h-screen m-3 flex-1 no-scrollbar rounded-lg overflow-x-scroll">
                    {children}
                </div>
            </div>
    )
}

export default layout