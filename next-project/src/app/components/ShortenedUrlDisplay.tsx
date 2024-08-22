// // components/ShortenedUrlDisplay.tsx
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import CopyIcon from "@/icons/CopyIcon";
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Input } from './ui/Input';

import { FiCopy } from '../../../public/icons';
type ShortenedUrlDisplayProps = {
    url: string;
};

export const ShortenedUrlDisplay: React.FC<ShortenedUrlDisplayProps> = ({ url }) => (
    <Card>
        <div>
            <h3>Shortened URL</h3>
        </div>
        {/* card content */}
        <div>
            <div className="flex items-center gap-2">
                <Input type="text" value={url} className="flex-1" readOnly />
                <Button variant="ghost" size="icon" className="rounded-full">
                    <FiCopy className="h-5 w-5" />
                    <span className="sr-only">Copy URL</span>
                </Button>
            </div>
        </div>
    </Card>
);
