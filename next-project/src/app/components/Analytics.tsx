import { Card } from './ui/Card';
type AnalyticsProps = {
    clicks: number;
    views: number;
    conversionRate: string;
};

export const Analytics: React.FC<AnalyticsProps> = ({ clicks, views, conversionRate }) => (
    <Card>
        <div>
            <h3>Analytics</h3>
        </div>
        <div>
            <div className="grid gap-4">
                <div className="flex items-center justify-between">
                    <span>Clicks</span>
                    <span className="text-2xl font-bold">{clicks}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span>Views</span>
                    <span className="text-2xl font-bold">{views}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span>Conversion Rate</span>
                    <span className="text-2xl font-bold">{conversionRate}</span>
                </div>
            </div>
        </div>
    </Card>
);
