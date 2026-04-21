import { useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { CalendarDays, CalendarRange, Percent, Users } from 'lucide-react';

interface Submission {
  id: string;
  type: string;
  created_at: string;
}

interface Props {
  submissions: Submission[];
}

const startOfDay = (d: Date) => {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
};

const startOfWeek = (d: Date) => {
  const x = startOfDay(d);
  const day = x.getDay() || 7; // Mon=1..Sun=7
  x.setDate(x.getDate() - (day - 1));
  return x;
};

export const SubmissionsKpis = ({ submissions }: Props) => {
  const stats = useMemo(() => {
    const now = new Date();
    const today = startOfDay(now).getTime();
    const weekStart = startOfWeek(now).getTime();

    let todayCount = 0;
    let weekCount = 0;
    let leadMagnet = 0;
    let contact = 0;

    submissions.forEach((s) => {
      const t = new Date(s.created_at).getTime();
      if (t >= today) todayCount += 1;
      if (t >= weekStart) weekCount += 1;
      if (s.type === 'lead_magnet') leadMagnet += 1;
      else if (s.type === 'contact') contact += 1;
    });

    const total = leadMagnet + contact;
    const leadRate = total > 0 ? Math.round((leadMagnet / total) * 100) : 0;

    return {
      todayCount,
      weekCount,
      total,
      leadMagnet,
      contact,
      leadRate,
    };
  }, [submissions]);

  const cards = [
    {
      label: 'Heute',
      value: stats.todayCount,
      hint: 'Neue Einsendungen',
      icon: CalendarDays,
    },
    {
      label: 'Diese Woche',
      value: stats.weekCount,
      hint: 'Seit Montag',
      icon: CalendarRange,
    },
    {
      label: 'Gesamt',
      value: stats.total,
      hint: `${stats.leadMagnet} Lead · ${stats.contact} Kontakt`,
      icon: Users,
    },
    {
      label: 'Lead-Magnet-Anteil',
      value: `${stats.leadRate}%`,
      hint: 'vs. Kontaktanfragen',
      icon: Percent,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
      {cards.map((c) => {
        const Icon = c.icon;
        return (
          <Card key={c.label} className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                {c.label}
              </span>
              <Icon className="size-4 text-primary" />
            </div>
            <div className="text-2xl font-bold text-foreground">{c.value}</div>
            <p className="text-xs text-muted-foreground mt-1">{c.hint}</p>
          </Card>
        );
      })}
    </div>
  );
};
