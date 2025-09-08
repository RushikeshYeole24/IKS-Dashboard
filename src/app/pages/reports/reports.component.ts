import { Component, inject, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, ChartData, ChartOptions } from 'chart.js';
import { UserService } from '../../services/user.service';

// Import required Chart.js modules
import {
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PieController,
  BarElement,
  BarController,
  CategoryScale,
  LinearScale,
} from 'chart.js';

// ✅ Register all chart components to avoid conflicts
Chart.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PieController,
  BarElement,
  BarController,
  CategoryScale,
  LinearScale
);

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
  imports: [BaseChartDirective], // ✅ Import chart module here
})
export class ReportsComponent implements OnInit {
  private userService = inject(UserService);

  chartData: ChartData<'pie'> = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
          '#C9CBCF',
        ],
        borderWidth: 2,
        borderColor: '#fff',
      },
    ],
  };

  ngOnInit() {
    this.loadChartData();
  }

  private loadChartData() {
    const roleDistribution = this.userService.getRoleDistribution();
    const roles = Object.keys(roleDistribution);
    const counts = Object.values(roleDistribution);

    this.chartData = {
      labels: roles,
      datasets: [
        {
          data: counts,
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
            '#FF9F40',
            '#C9CBCF',
          ].slice(0, roles.length),
          borderWidth: 2,
          borderColor: '#fff',
        },
      ],
    };
  }

  chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          usePointStyle: true,
          padding: 20,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.parsed as number;
            const data = context.dataset.data as number[];
            const total = data.reduce((a, b) => (a || 0) + (b || 0), 0);
            const percentage =
              total > 0 ? ((value / total) * 100).toFixed(1) : '0';
            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
  };
}
