import { Component, inject, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, ChartData, ChartOptions } from 'chart.js';
import { CommonModule } from '@angular/common';
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
  imports: [BaseChartDirective, CommonModule],
})
export class ReportsComponent implements OnInit {
  private userService = inject(UserService);

  chartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        label: 'Absenteeism Hours',
        data: [],
        backgroundColor: '#36A2EB',
        borderColor: '#1E88E5',
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  isLoading = true;
  error: string | null = null;

  ngOnInit() {
    this.loadAbsenteeismData();
  }

  private loadAbsenteeismData() {
    this.userService.getAbsenteeismReport().subscribe({
      next: (data) => {
        const ids = data.map(item => `ID: ${item.id}`);
        const hours = data.map(item => item.totalHours);

        this.chartData = {
          labels: ids,
          datasets: [
            {
              label: 'Total Absenteeism Hours',
              data: hours,
              backgroundColor: '#36A2EB',
              borderColor: '#1E88E5',
              borderWidth: 1,
              borderRadius: 4,
            },
          ],
        };
        
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching absenteeism data:', err);
        this.error = 'Failed to load absenteeism report data';
        this.isLoading = false;
      }
    });
  }

  chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.parsed.y;
            return `${context.dataset.label}: ${value} hours`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Hours'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Employee ID'
        }
      }
    },
  };
}
