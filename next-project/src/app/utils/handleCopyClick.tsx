import { toast } from "react-toastify";
export const handleCopyClick = (shortUrl: string) => {
  navigator.clipboard.writeText(`http://localhost:3001/redirect/${shortUrl}`);
  toast.success('Short URL copied to clipboard!');
};

export const handleSimpleCopyClick = (text: string) => {
  navigator.clipboard.writeText(text);
  toast.success('Copied to clipboard!');
};