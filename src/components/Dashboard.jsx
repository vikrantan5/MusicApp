import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import zoomPlugin from 'chartjs-plugin-zoom';
import './Dashboard.css';

Chart.register(zoomPlugin);

const Dashboard = () => {
  const [medicalHistory, setMedicalHistory] = useState({
    age: '',
    weight: '',
    cholesterol: '',
    familyHistory: false,
  });
  const [healthData, setHealthData] = useState({ heartRate: [], bloodPressure: [], timestamps: [] });
  const [riskScore, setRiskScore] = useState(null);
  const [timeRange, setTimeRange] = useState('1d');
  const [theme, setTheme] = useState('light');
  const chartRef = useRef(null);
  const bpChartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/health/data', { params: { range: timeRange } });
        setHealthData(res.data);
      } catch (err) {
        console.error('Error fetching health data:', err);
      }
    };
    fetchData();
  }, [timeRange]);

  useEffect(() => {
    const calculateRisk = () => {
      const { age, weight, cholesterol, familyHistory } = medicalHistory;
      if (!age || !weight || !cholesterol) return;
      let score = 0;
      score += age > 50 ? 30 : age > 30 ? 15 : 0;
      score += weight > 80 ? 20 : weight > 60 ? 10 : 0;
      score += cholesterol > 240 ? 30 : cholesterol > 200 ? 15 : 0;
      score += familyHistory ? 20 : 0;
      setRiskScore(Math.min(score, 100));
    };
    calculateRisk();
  }, [medicalHistory]);

  useEffect(() => {
    if (!healthData.heartRate.length) return;

    if (chartRef.current) chartRef.current.destroy();
    const ctx = document.getElementById('heartRateChart').getContext('2d');
    chartRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: healthData.timestamps,
        datasets: [{
          label: 'Heart Rate (bpm)',
          data: healthData.heartRate,
          borderColor: '#ff5252',
          backgroundColor: 'rgba(255, 82, 82, 0.2)',
          fill: true,
          tension: 0.4,
        }],
      },
      options: {
        responsive: true,
        scales: {
          x: { type: 'time', time: { unit: 'hour' } },
          y: { beginAtZero: false, suggestedMin: 40, suggestedMax: 120 },
        },
        plugins: {
          zoom: {
            zoom: { wheel: { enabled: true }, pinch: { enabled: true }, mode: 'x' },
            pan: { enabled: true, mode: 'x' },
          },
          tooltip: { mode: 'index', intersect: false },
        },
        animation: { duration: 1000, easing: 'easeOutQuart' },
      },
    });

    if (bpChartRef.current) bpChartRef.current.destroy();
    const bpCtx = document.getElementById('bpChart').getContext('2d');
    bpChartRef.current = new Chart(bpCtx, {
      type: 'line',
      data: {
        labels: healthData.timestamps,
        datasets: [
          {
            label: 'Systolic (mmHg)',
            data: healthData.bloodPressure.map(bp => bp.systolic),
            borderColor: '#3f51b5',
            backgroundColor: 'rgba(63, 81, 181, 0.2)',
            fill: true,
          },
          {
            label: 'Diastolic (mmHg)',
            data: healthData.bloodPressure.map(bp => bp.diastolic),
            borderColor: '#2196f3',
            backgroundColor: 'rgba(33, 150, 243, 0.2)',
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: { type: 'time', time: { unit: 'hour' } },
          y: { beginAtZero: false, suggestedMin: 60, suggestedMax: 180 },
        },
        plugins: {
          zoom: { zoom: { wheel: { enabled: true }, pinch: { enabled: true }, mode: 'x' },
            pan: { enabled: true, mode: 'x' },
          },
          tooltip: { mode: 'index', intersect: false },
        },
        animation: { duration: 1000, easing: 'easeOutQuart' },
      },
    });

    return () => {
      if (chartRef.current) chartRef.current.destroy();
      if (bpChartRef.current) bpChartRef.current.destroy();
    };
  }, [healthData]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setMedicalHistory({
      ...medicalHistory,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleExport = () => {
    const data = JSON.stringify({ medicalHistory, riskScore });
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'health_summary.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`dashboard ${theme}`}>
      <div className="dashboard-header">
        <h2>Your Heart Health Dashboard</h2>
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
      </div>

      <div className="dashboard-grid">
        <div className="card input-card">
          <h3>Update Medical History</h3>
          <form>
            <label>
              Age:
              <input
                type="number"
                name="age"
                value={medicalHistory.age}
                onChange={handleInputChange}
                placeholder="e.g., 40"
              />
            </label>
            <label>
              Weight (kg):
              <input
                type="number"
                name="weight"
                value={medicalHistory.weight}
                onChange={handleInputChange}
                placeholder="e.g., 70"
              />
            </label>
            <label>
              Cholesterol (mg/dL):
              <input
                type="number"
                name="cholesterol"
                value={medicalHistory.cholesterol}
                onChange={handleInputChange}
                placeholder="e.g., 200"
              />
            </label>
            <label>
              Family History:
              <input
                type="checkbox"
                name="familyHistory"
                checked={medicalHistory.familyHistory}
                onChange={handleInputChange}
              />
            </label>
          </form>
          {riskScore !== null && (
            <div className="risk-score">
              <h4>Risk Score: {riskScore}%</h4>
              <progress value={riskScore} max="100"></progress>
              <p>{riskScore > 70 ? 'High Risk: Consult a doctor.' : riskScore > 30 ? 'Moderate Risk: Monitor closely.' : 'Low Risk: Keep healthy!'}</p>
            </div>
          )}
        </div>

        <div className="card chart-card">
          <h3>Heart Rate Trends</h3>
          <div className="time-filter">
            <button onClick={() => setTimeRange('1d')} className={timeRange === '1d' ? 'active' : ''}>1 Day</button>
            <button onClick={() => setTimeRange('1w')} className={timeRange === '1w' ? 'active' : ''}>1 Week</button>
            <button onClick={() => setTimeRange('1m')} className={timeRange === '1m' ? 'active' : ''}>1 Month</button>
          </div>
          <canvas id="heartRateChart"></canvas>
        </div>

        <div className="card chart-card">
          <h3>Blood Pressure Trends</h3>
          <canvas id="bpChart"></canvas>
        </div>

        <div className="card export-card">
          <h3>Health Summary</h3>
          <button onClick={handleExport}>Export Data</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;