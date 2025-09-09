

import { Component, ChangeDetectionStrategy, signal, viewChild, ElementRef, afterNextRender } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatCard } from '../../../models/ui.model';

declare const d3: any;

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminDashboardComponent {
  stats = signal<StatCard[]>([
    { title: 'کل کاربران', value: '۱۲,۵۴۰', icon: 'users', color: 'blue', change: '+۱۲٪', changeType: 'increase' },
    { title: 'دوره های فعال', value: '۲۵', icon: 'book-open', color: 'indigo', change: '+۲', changeType: 'increase' },
    { title: 'فروش ماهانه (تومان)', value: '۸۵M', icon: 'trending-up', color: 'emerald', change: '-۳٪', changeType: 'decrease' },
    { title: 'مقالات منتشر شده', value: '۱۱۰', icon: 'file-text', color: 'amber', change: '+۵', changeType: 'increase' },
  ]);

  readonly accentColorMap: { [key: string]: string } = {
    blue: 'bg-blue-500',
    indigo: 'bg-indigo-500',
    emerald: 'bg-emerald-500',
    amber: 'bg-amber-500',
  };

  readonly containerColorMap: { [key: string]: string } = {
    blue: 'bg-blue-100 text-blue-600',
    indigo: 'bg-indigo-100 text-indigo-600',
    emerald: 'bg-emerald-100 text-emerald-600',
    amber: 'bg-amber-100 text-amber-600',
  };

  chartContainer = viewChild<ElementRef>('chartContainer');

  constructor() {
    afterNextRender(() => {
      if (this.chartContainer() && typeof d3 !== 'undefined') {
        this.renderSalesChart();
      }
    });
  }

  renderSalesChart(): void {
    const data = [
      { month: 'فروردین', sales: 45 },
      { month: 'اردیبهشت', sales: 52 },
      { month: 'خرداد', sales: 60 },
      { month: 'تیر', sales: 75 },
      { month: 'مرداد', sales: 85 },
      { month: 'شهریور', sales: 68 },
    ];
    
    const container = this.chartContainer()!.nativeElement;
    const margin = {top: 20, right: 20, bottom: 30, left: 50};
    const width = container.clientWidth - margin.left - margin.right;
    const height = 256 - margin.top - margin.bottom; // h-64 in tailwind is 16rem = 256px

    // Clear previous chart
    d3.select(container).select('svg').remove();

    const svg = d3.select(container)
      .append('svg')
        .attr('width', '100%')
        .attr('height', '100%')
        .attr('viewBox', `0 0 ${container.clientWidth} 256`)
      .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);
    
    const x = d3.scaleBand()
      .range([0, width])
      .domain(data.map(d => d.month))
      .padding(0.3);

    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
        .style("font-family", "Vazirmatn")
        .style("font-size", "12px");

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.sales)])
      .range([height, 0]);

    svg.append('g')
      .call(d3.axisRight(y).ticks(5).tickFormat((d: number) => `${d}M`))
      .attr('transform', `translate(${width}, 0)`)
      .selectAll("text")
        .style("font-family", "Vazirmatn")
        .style("font-size", "12px");
    
    svg.selectAll("mybar")
      .data(data)
      .enter()
      .append("rect")
        .attr("x", (d: any) => x(d.month)!)
        .attr("y", (d: any) => y(d.sales))
        .attr("width", x.bandwidth())
        .attr("height", 0)
        .attr("fill", "#007aff")
        .attr("rx", 4)
        .transition()
        .duration(800)
        .attr("height", (d: any) => height - y(d.sales))
        .delay((d: any, i: number) => i * 100);
  }
}
