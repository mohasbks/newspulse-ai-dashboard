import LiveDashboard from '@/components/LiveDashboard';

export default function DashboardPage() {
  return (
    <div className="w-full flex-1 p-4 md:p-8 bg-background">
      <div className="max-w-[1400px] mx-auto w-full">
        <LiveDashboard />
      </div>
    </div>
  );
}
