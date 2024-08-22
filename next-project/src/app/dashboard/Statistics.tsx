'use client';

import { useGetClicksQuery } from "../store/slices/urlClickSlice/urlClickApiSlice";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Bar } from 'react-chartjs-2';
import { format, subMonths, isToday } from 'date-fns';
import { Url } from "../store/slices/urlClickSlice/urlClickSlice";
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import Loader from "../components/ui/loader";
import { handleCopyClick } from "../utils/handleCopyClick";
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Statistics = () => {
  const { data: urls, error, isLoading } = useGetClicksQuery();

  if (isLoading) return <Loader></Loader>;
  if (error) return <div>Error fetching data</div>;

  const previousMonth = format(subMonths(new Date(), 1), 'yyyy-MM');
  const previousMonthData = urls?.filter(url => format(new Date(url.created_at), 'yyyy-MM') === previousMonth);
  const todayData = urls
    ?.slice() // Create a shallow copy of the array
    ?.sort((a, b) => b.clicks - a.clicks)
    ?.slice(0, 1); // Limit to top 1 most clicked URL
  const latestToOldestData = urls?.slice().sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  const generateChartData = (data: Url[]) => ({
    labels: data?.map(url => url.short_url),
    datasets: [
      {
        label: 'Clicks',
        data: data?.map(url => url.clicks),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  });

 

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'URL Clicks Statistics',
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
    onClick: (event: any, elements: any, chart: any) => {
      if (elements.length > 0) {
        const elementIndex = elements[0].index;
        const clickedUrl = chart.data.labels[elementIndex];
        handleCopyClick(clickedUrl as string);
      }
    },
  };

  return (
    <div className='flex flex-col bg-background p-4 space-y-6'>
      <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Today Most Visited URLs</CardTitle>
          </CardHeader>
          <CardContent>
            {todayData && todayData.length > 0 ? (
              <div className="overflow-x-auto" style={{ maxHeight: '400px' }}>
                <Bar data={generateChartData(todayData)} options={chartOptions} />
              </div>
            ) : (
              <p>No data available for today</p>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Previous Month Most Visited URLs</CardTitle>
          </CardHeader>
          <CardContent>
            {previousMonthData && previousMonthData.length > 0 ? (
              <div className="overflow-x-auto" style={{ maxHeight: '400px' }}>
                <Bar data={generateChartData(previousMonthData)} options={chartOptions} />
              </div>
            ) : (
              <p>No data available for the previous month</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Card for Latest to Oldest URLs */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Latest to Oldest URLs</CardTitle>
        </CardHeader>
        <CardContent>
          {latestToOldestData && latestToOldestData.length > 0 ? (
            <div className="overflow-x-auto" style={{ maxHeight: '400px' }}>
              <Bar data={generateChartData(latestToOldestData)} options={chartOptions} />
            </div>
          ) : (
            <p>No data available</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Statistics;
