'use client'
import { Header } from "@/app/components/ui/Header";
import  ShortenUrlForm  from "@/app/components/Forms/ShortenUrlForm";
import { Analytics } from "@/app/components/Analytics";
import { ShortenedUrlDisplay } from "@/app/components/ShortenedUrlDisplay";
import UrlTable from "./UrlTable";
export default function Home() {
  return (
    <div className="flex flex-col bg-background">
      {/* <Header title="URL Shortener" /> */}
          <ShortenUrlForm />
          <UrlTable />
          
          {/* <ShortenedUrlDisplay url="https://example.com/abc123" /> */}
          {/* <Analytics clicks={1234} views={5678} conversionRate="21.4%" /> */}
          {/* Add more components here */}
    </div>
  );
}
