import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { fetchNextPowellRemarks } from "@/services/fedScheduleService";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

// Fallback date if the live fetch fails
const FALLBACK_EVENT_ISO = "2025-09-18T14:00:00-04:00"; // Example placeholder date/time (ET)

const getTimeLeft = (target: Date): TimeLeft => {
  const now = new Date();
  const diffMs = Math.max(0, target.getTime() - now.getTime());

  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
};

const FedCountdown = () => {
  const [targetIso, setTargetIso] = useState<string>(FALLBACK_EVENT_ISO);
  const targetDate = useMemo(() => new Date(targetIso), [targetIso]);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => getTimeLeft(new Date(targetIso)));

  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(getTimeLeft(targetDate)), 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const evt = await fetchNextPowellRemarks();
        if (mounted && evt?.dateTimeISO) {
          setTargetIso(evt.dateTimeISO);
        }
      } catch {
        // keep fallback
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const isElapsed =
    timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-3xl mx-auto text-center space-y-8 py-16">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-financial-blue bg-clip-text text-transparent">
          Countdown to the Next Fed Chair Remarks
        </h1>
        <p className="text-muted-foreground">Jerome Powell's next scheduled public remarks</p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Days", value: timeLeft.days },
            { label: "Hours", value: timeLeft.hours },
            { label: "Minutes", value: timeLeft.minutes },
            { label: "Seconds", value: timeLeft.seconds },
          ].map((item) => (
            <div key={item.label} className="rounded-xl border bg-card p-6">
              <div className="text-4xl font-bold">{String(item.value).padStart(2, "0")}</div>
              <div className="text-sm text-muted-foreground mt-1">{item.label}</div>
            </div>
          ))}
        </div>

        {isElapsed && (
          <div className="text-sm text-muted-foreground">Event time reached. Check official channels for the livestream.</div>
        )}

        <div className="flex items-center justify-center gap-3 pt-6">
          <Link to="/leading">
            <Button variant="outline">View Leading Indicators</Button>
          </Link>
          <Link to="/lagging">
            <Button variant="outline">View Lagging Indicators</Button>
          </Link>
        </div>

        {/* Removed placeholder disclaimer */}
      </div>
    </div>
  );
};

export default FedCountdown;


