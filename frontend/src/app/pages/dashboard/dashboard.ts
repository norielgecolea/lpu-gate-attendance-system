import { DecimalPipe } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideIdCard,
  lucideUserRound,
  lucideUsers,
  lucideUserX,
} from '@ng-icons/lucide';
import { HlmCardImports } from '@spartan-ng/helm/card';

interface StatCard {
  label: string;
  value: number;
  icon: string;
  tone: 'primary' | 'emerald' | 'amber' | 'rose';
}

interface MonthBar {
  label: string;
  value: number;
}

@Component({
  selector: 'app-dashboard',
  imports: [DecimalPipe, NgIcon, HlmCardImports],
  viewProviders: [
    provideIcons({ lucideUsers, lucideIdCard, lucideUserRound, lucideUserX }),
  ],
  templateUrl: './dashboard.html',
})
export class Dashboard {
  protected readonly stats: StatCard[] = [
    { label: 'Students', value: 4292, icon: 'lucideUsers', tone: 'primary' },
    { label: 'RFID', value: 3987, icon: 'lucideIdCard', tone: 'emerald' },
    { label: 'No RFID', value: 305, icon: 'lucideUserRound', tone: 'amber' },
    { label: 'Deleted', value: 4, icon: 'lucideUserX', tone: 'rose' },
  ];

  protected readonly withRfid = 3987;
  protected readonly noRfid = 305;

  protected readonly donutAngle = computed(
    () => Math.round((this.withRfid / (this.withRfid + this.noRfid)) * 360),
  );
  protected readonly rfidPercent = computed(
    () => Math.round((this.withRfid / (this.withRfid + this.noRfid)) * 100),
  );

  protected readonly months = signal<MonthBar[]>([
    { label: 'Feb', value: 18 },
    { label: 'Mar', value: 11 },
    { label: 'Apr', value: 72 },
    { label: 'May', value: 84 },
    { label: 'Jun', value: 65 },
    { label: 'Jul', value: 14 },
  ]);

  protected readonly maxValue = computed(() =>
    Math.max(...this.months().map((m) => m.value)),
  );

  // Build the SVG polyline points for the line overlay (0..100 viewBox).
  protected readonly linePoints = computed(() => {
    const data = this.months();
    const max = this.maxValue();
    const step = 100 / data.length;
    return data
      .map((m, i) => {
        const x = step * i + step / 2;
        const y = 100 - (m.value / max) * 92 - 4;
        return `${x.toFixed(2)},${y.toFixed(2)}`;
      })
      .join(' ');
  });

  protected barHeight(value: number): number {
    return Math.round((value / this.maxValue()) * 100);
  }

  protected linePointY(value: number): number {
    return 100 - (value / this.maxValue()) * 92 - 4;
  }
}
