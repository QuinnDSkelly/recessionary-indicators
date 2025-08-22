// Lightweight client-side fetcher that scrapes the Federal Reserve events calendar
// via the open CORS text proxy at r.jina.ai, then extracts the next scheduled
// public remarks by the Fed Chair. This is a best-effort approach until an
// official JSON or ICS feed is available.

const CALENDAR_SOURCE = "https://r.jina.ai/http://www.federalreserve.gov/newsevents/calendar.htm";

export interface FedEvent {
  title: string;
  dateTimeISO: string; // ISO string with timezone offset
  source: string;
}

const monthMap: Record<string, number> = {
  january: 0,
  february: 1,
  march: 2,
  april: 3,
  may: 4,
  june: 5,
  july: 6,
  august: 7,
  september: 8,
  october: 9,
  november: 10,
  december: 11,
};

const parseDateEtToIso = (dateText: string): string | null => {
  // Examples that might appear in the calendar text:
  // "Friday, August 22, 2025 10:00 a.m. ET" or "Aug 22, 2025 10:00 am ET"
  // Normalize whitespace and lower-case am/pm
  const text = dateText.replace(/\s+/g, " ").trim();

  const regex = /(?:(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday),?\s+)?([A-Za-z]+)\s+(\d{1,2}),\s*(\d{4})\s+(\d{1,2}):(\d{2})\s*(a\.m\.|p\.m\.|am|pm)\s*ET/i;
  const m = text.match(regex);
  if (!m) return null;

  const monthName = m[2].toLowerCase();
  const day = Number(m[3]);
  const year = Number(m[4]);
  let hour = Number(m[5]);
  const minute = Number(m[6]);
  const meridiem = m[7].toLowerCase();

  if (meridiem.includes("p") && hour !== 12) hour += 12;
  if (meridiem.includes("a") && hour === 12) hour = 0;

  const monthIndex = monthMap[monthName];
  if (monthIndex === undefined) return null;

  // ET offset handling: daylight saving varies; assume Eastern Time and let
  // Intl compute the correct offset by constructing in America/New_York.
  try {
    const zoned = new Date(
      new Date(Date.UTC(year, monthIndex, day, hour, minute)).toLocaleString("en-US", {
        timeZone: "America/New_York",
      })
    );
    // Convert to America/New_York and then to ISO with offset by using the timezone format trick
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/New_York",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const parts = formatter.formatToParts(zoned).reduce<Record<string, string>>((acc, p) => {
      if (p.type !== "literal") acc[p.type] = p.value;
      return acc;
    }, {});
    const isoLocalNy = `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}:00`;
    // Append the NY offset by comparing NY time to UTC at that instant
    const nyDate = new Date(isoLocalNy + "Z");
    const offsetMin = Math.round((nyDate.getTime() - Date.parse(isoLocalNy + "Z")) / 60000);
    const offsetHours = -new Date().getTimezoneOffset(); // fallback not reliable here
    // Build ISO with New York offset computed via Date API
    const offset = new Date().toLocaleString("en-US", { timeZoneName: "short", timeZone: "America/New_York" }).includes("EDT") ? "-04:00" : "-05:00";
    return isoLocalNy + offset;
  } catch {
    return null;
  }
};

export async function fetchNextPowellRemarks(): Promise<FedEvent | null> {
  const res = await fetch(CALENDAR_SOURCE, { cache: "no-store" });
  if (!res.ok) return null;
  const text = await res.text();

  // Find the first event mentioning the Chair by name or title
  const lines = text.split(/\n+/);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/Jerome\s+H\.\s+Powell|Chair\s+Powell/i.test(line)) {
      // Look around this line for a date/time string within nearby lines
      const windowText = lines.slice(Math.max(0, i - 5), i + 6).join(" ");
      const iso = parseDateEtToIso(windowText);
      if (iso) {
        return {
          title: line.trim(),
          dateTimeISO: iso,
          source: CALENDAR_SOURCE,
        };
      }
    }
  }
  return null;
}


