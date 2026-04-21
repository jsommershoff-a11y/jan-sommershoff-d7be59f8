import { useMemo, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface Submission {
  id: string;
  type: string;
  created_at: string;
}

interface Props {
  submissions: Submission[];
}

type Granularity = 'day' | 'week';

const isoWeekKey = (d: Date) => {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const day = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil(((+date - +yearStart) / 86400000 + 1) / 7);
  return `${date.getUTCFullYear()}-W${String(weekNo).padStart(2, '0')}`;
};

const dayKey = (d: Date) => d.toISOString().slice(0, 10);

export const SubmissionsChart = ({ submissions }: Props) => {
  const [granularity, setGranularity] = useState<Granularity>('day');

  const data = useMemo(() => {
    const now = new Date();
    const buckets = new Map<string, { key: string; label: string; contact: number; lead_magnet: number }>();

    if (granularity === 'day') {
      for (let i = 13; i >= 0; i--) {
        const d = new Date(now);
        d.setDate(d.getDate() - i);
        const key = dayKey(d);
        buckets.set(key, {
          key,
          label: d.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' }),
          contact: 0,
          lead_magnet: 0,
        });
      }
    } else {
      for (let i = 7; i >= 0; i--) {
        const d = new Date(now);
        d.setDate(d.getDate() - i * 7);
        const key = isoWeekKey(d);
        if (!buckets.has(key)) {
          buckets.set(key, {
            key,
            label: `KW ${key.split('-W')[1]}`,
            contact: 0,
            lead_magnet: 0,
          });
        }
      }
    }

    submissions.forEach((s) => {
      const d = new Date(s.created_at);
      const key = granularity === 'day' ? dayKey(d) : isoWeekKey(d);
      const bucket = buckets.get(key);
      if (!bucket) return;
      if (s.type === 'lead_magnet') bucket.lead_magnet += 1;
      else bucket.contact += 1;
    });

    return Array.from(buckets.values());
  }, [submissions, granularity]);

  const total = data.reduce((sum, d) => sum + d.contact + d.lead_magnet, 0);

  return (
    <Card className="p-5 mb-6">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Einsendungen</h2>
          <p className="text-sm text-muted-foreground">
            {granularity === 'day' ? 'Letzte 14 Tage' : 'Letzte 8 Wochen'} · {total} insgesamt
          </p>
        </div>
        <div className="flex gap-1 rounded-md border border-border p-1">
          <Button
            size="sm"
            variant={granularity === 'day' ? 'default' : 'ghost'}
            onClick={() => setGranularity('day')}
            className="h-7"
          >
            Tag
          </Button>
          <Button
            size="sm"
            variant={granularity === 'week' ? 'default' : 'ghost'}
            onClick={() => setGranularity('week')}
            className="h-7"
          >
            Woche
          </Button>
        </div>
      </div>
      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
              tickLine={false}
              axisLine={{ stroke: 'hsl(var(--border))' }}
            />
            <YAxis
              allowDecimals={false}
              tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                background: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: 8,
                fontSize: 12,
              }}
              cursor={{ fill: 'hsl(var(--muted))' }}
            />
            <Legend
              wrapperStyle={{ fontSize: 12 }}
              formatter={(v) => (v === 'contact' ? 'Kontakt' : 'Lead-Magnet')}
            />
            <Bar dataKey="contact" stackId="a" fill="hsl(var(--primary))" />
            <Bar dataKey="lead_magnet" stackId="a" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
