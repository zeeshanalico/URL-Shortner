'use client'
import React, { lazy, Suspense, useState } from 'react'
const Statistics = lazy(() => import('./Statistics'))
import Loader from '../components/ui/loader'
import { useGetUrlsQuery } from '../store/slices/urlSlice/urlApiSlice'
import { Card } from '../components/ui/Card'
import { Url, URLCLICK } from '../types/url'

const AccordionItem = ({ url }: { url: Url }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200">
      <div
        className="flex justify-between items-center p-4 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="text-lg font-medium">{url.short_url}</div>
        <div className="text-gray-500">{isOpen ? '-' : '+'}</div>
      </div>
      <div
        className={`overflow-y-scroll scrollbar-style  transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          }`}
      >
        <div className="p-4 bg-gray-100 ">
          <div className="mb-2">
            <div className="font-bold">Original URL:</div>
            <div>{url.original_url}</div>
          </div>
          {url.url_click.length !== 0 &&
           <table className="min-w-full">
            <thead>
              <tr>
                <th className="border border-gray-200 px-2 py-1">Access Date</th>
                <th className="border border-gray-200 px-2 py-1">Access Time</th>
                <th className="border border-gray-200 px-2 py-1">IP Address</th>
                <th className="border border-gray-200 px-2 py-1">User Agent</th>
                <th className="border border-gray-200 px-2 py-1">Referrer</th>
              </tr>
            </thead>
            <tbody>
              {url.url_click.map((urlclick) => (
                <tr key={urlclick.click_id}>
                  <td className="border border-gray-200 px-2 py-1">{new Date(urlclick.access_date).toLocaleDateString()}</td>
                  <td className="border border-gray-200 px-2 py-1">{new Date(urlclick.access_time).toLocaleTimeString()}</td>
                  <td className="border border-gray-200 px-2 py-1">{urlclick.ip_address}</td>
                  <td className="border border-gray-200 px-2 py-1">{urlclick.user_agent}</td>
                  <td className="border border-gray-200 px-2 py-1">{urlclick.referrer}</td>
                </tr>
              ))}
            </tbody>
          </table>}
        </div>
      </div>
    </div>
  );
};


const Page = () => {
  const { data } = useGetUrlsQuery({ limit: 20 });

  return (
    <Suspense fallback={<Loader />}>
      <Statistics />
      <Card className='m-4 border border-gray-200'>
        <div className="accordion ">
          {data?.urls.map((url) => (
            <AccordionItem key={url.url_id} url={url} />
          ))}
        </div>
      </Card>
    </Suspense>
  )
}

export default Page;
