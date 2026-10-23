'use client';

import { useEffect } from 'react';
import { track, type AnalyticsEventName } from '@/lib/analytics/events';

// Evento de visualização (ex.: doctor_view) — só nome e local genéricos, nunca quem ou o quê (LGPD).
export function TrackView({ event, location }: { event: AnalyticsEventName; location: string }) {
  useEffect(() => {
    track(event, { location });
  }, [event, location]);
  return null;
}
