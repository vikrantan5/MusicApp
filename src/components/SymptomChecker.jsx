import { useState, useContext, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';
import Chart from 'chart.js/auto';
import { ThemeContext } from '../context/ThemeContext';
import Toast from './Toast';
import './SymptomChecker.css';

const SymptomChecker = () => {
  const { theme } = useContext(ThemeContext);
  const [step, setStep] = useState(1); // 1: Symptoms, 2: History, 3: Results
  const [symptoms, setSymptoms] = useState({
    chestPain: { checked: false, severity: 1 },
    shortnessBreath: { checked: false, severity: 1 },
    fatigue: { checked: false, severity: 1 },
    dizziness: { checked: false, severity: 1 },
    nausea: { checked: false, severity: 1 },
    sweating: { checked: false, severity: 1 },
  });
  const [history, setHistory] = useState({
    age: '',
    gender: '',
    smoker: false,
  });
  const [risk, setRisk] = useState(null);
  const [pastAssessments, setPastAssessments] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [isSymptomsOpen, setIsSymptomsOpen] = useState(true);
  const [isHistoryOpen, setIsHistoryOpen] = useState(true);

  // Load past assessments from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('assessments');
    if (saved) setPastAssessments(JSON.parse(saved));
  }, []);

  // Initialize Chart.js gauge
  useEffect(() => {
    if (risk && step === 3) {
      const ctx = document.getElementById('riskGauge')?.getContext('2d');
      if (ctx) {
        new Chart(ctx, {
          type: 'doughnut',
          data: {
            datasets: [{
              data: [risk.score, 100 - risk.score],
              backgroundColor: [risk.score > 70 ? '#ff5252' : risk.score > 30 ? '#ffc107' : '#4caf50', 'rgba(0,0,0,0.1)'],
              borderWidth: 0,
            }],
          },
          options: {
            circumference: 180,
            rotation: -90,
            cutout: '80%',
            plugins: { legend: { display: false } },
            animation: { duration: 1500, easing: 'easeOutQuart' },
          },
        });
      }
    }
  }, [risk, step]);

  const handleSymptomChange = (e) => {
    const { name, checked } = e.target;
    setSymptoms((prev) => ({
      ...prev,
      [name]: { ...prev[name], checked },
    }));
  };

  const handleSeverityChange = (name, value) => {
    setSymptoms((prev) => ({
      ...prev,
      [name]: { ...prev[name], severity: value },
    }));
  };

  const handleHistoryChange = (e) => {
    const { name, value, type, checked } = e.target;
    setHistory((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const calculateRisk = () => {
    const symptomCount = Object.values(symptoms).filter(s => s.checked).length;
    const totalSeverity = Object.values(symptoms).reduce((sum, s) => sum + (s.checked ? s.severity : 0), 0);
    let score = symptomCount * 10 + totalSeverity;
    
    // History factors
    score += history.age > 50 ? 20 : history.age > 30 ? 10 : 0;
    score += history.gender === 'male' ? 5 : 0;
    score += history.smoker ? 15 : 0;

    score = Math.min(score, 100);
    let level, message;
    if (score > 70) {
      level = 'High';
      message = 'Seek emergency care immediately.';
    } else if (score > 30) {
      level = 'Moderate';
      message = 'Consult a doctor if symptoms persist.';
    } else {
      level = 'Low';
      message = 'Monitor your health.';
    }

    setRisk({ score, level, message });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    calculateRisk();
    try {
      const assessment = { symptoms, history, risk, timestamp: new Date().toISOString() };
      await axios.post('http://localhost:5000/api/health/symptoms', assessment);
      const newAssessments = [...pastAssessments, assessment];
      setPastAssessments(newAssessments);
      localStorage.setItem('assessments', JSON.stringify(newAssessments));
      Toast('Assessment saved successfully!', 'success');
      setStep(3);
    } catch (err) {
      Toast('Error saving assessment.', 'error');
      console.error('Error:', err);
    }
  };

  const handleChatSubmit = () => {
    if (!chatInput.trim()) {
      Toast('Please enter a question.', 'error');
      return;
    }
    Toast('A normal heart rate is 60-100 bpm at rest.', 'success');
    setChatInput('');
  };

  const resetForm = () => {
    setSymptoms({
      chestPain: { checked: false, severity: 1 },
      shortnessBreath: { checked: false, severity: 1 },
      fatigue: { checked: false, severity: 1 },
      dizziness: { checked: false, severity: 1 },
      nausea: { checked: false, severity: 1 },
      sweating: { checked: false, severity: 1 },
    });
    setHistory({ age: '', gender: '', smoker: false });
    setRisk(null);
    setStep(1);
  };

  return (
    <motion.div
      className={`checker ${theme}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Symptom Checker</h2>
      {/* Progress Bar */}
      <div className="progress-bar">
        {['Symptoms', 'Medical History', 'Results'].map((label, index) => (
          <motion.div
            key={label}
            className={`progress-step ${step > index ? 'completed' : step === index + 1 ? 'active' : ''}`}
            animate={{ scale: step === index + 1 ? 1.1 : 1 }}
            transition={{ duration: 0.3 }}
          >
            {label}
          </motion.div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        {/* Symptoms Section */}
        <motion.div className="section-header" onClick={() => setIsSymptomsOpen(!isSymptomsOpen)}>
          <h3>Symptoms</h3>
          <span>{isSymptomsOpen ? '−' : '+'}</span>
        </motion.div>
        <AnimatePresence>
          {isSymptomsOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {[
                { name: 'chestPain', label: 'Chest Pain', tooltip: 'Tightness or pressure in the chest.' },
                { name: 'shortnessBreath', label: 'Shortness of Breath', tooltip: 'Difficulty breathing or feeling winded.' },
                { name: 'fatigue', label: 'Fatigue', tooltip: 'Unusual tiredness or weakness.' },
                { name: 'dizziness', label: 'Dizziness', tooltip: 'Feeling lightheaded or faint.' },
                { name: 'nausea', label: 'Nausea', tooltip: 'Feeling sick or queasy.' },
                { name: 'sweating', label: 'Sweating', tooltip: 'Unexplained excessive sweating.' },
              ].map((symptom) => (
                <div key={symptom.name} className="symptom-item">
                  <motion.label
                    className="symptom-label"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <input
                      type="checkbox"
                      name={symptom.name}
                      checked={symptoms[symptom.name].checked}
                      onChange={handleSymptomChange}
                    />
                    <span className="label-text">{symptom.label}</span>
                    <span className="tooltip">{symptom.tooltip}</span>
                  </motion.label>
                  {symptoms[symptom.name].checked && (
                    <motion.div
                      className="severity-slider"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <label>Severity (1-10):</label>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={symptoms[symptom.name].severity}
                        onChange={(e) => handleSeverityChange(symptom.name, Number(e.target.value))}
                      />
                      <span>{symptoms[symptom.name].severity}</span>
                    </motion.div>
                  )}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Medical History Section */}
        {step >= 2 && (
          <>
            <motion.div className="section-header" onClick={() => setIsHistoryOpen(!isHistoryOpen)}>
              <h3>Medical History</h3>
              <span>{isHistoryOpen ? '−' : '+'}</span>
            </motion.div>
            <AnimatePresence>
              {isHistoryOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="history-item">
                    <label>
                      Age:
                      <input
                        type="number"
                        name="age"
                        value={history.age}
                        onChange={handleHistoryChange}
                        placeholder="e.g., 40"
                      />
                    </label>
                  </div>
                  <div className="history-item">
                    <label>
                      Gender:
                      <select name="gender" value={history.gender} onChange={handleHistoryChange}>
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </label>
                  </div>
                  <div className="history-item">
                    <label>
                      Smoker:
                      <input
                        type="checkbox"
                        name="smoker"
                        checked={history.smoker}
                        onChange={handleHistoryChange}
                      />
                    </label>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}

        {/* Navigation Buttons */}
        <div className="nav-buttons">
          {step > 1 && (
            <motion.button
              type="button"
              onClick={() => setStep(step - 1)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Back
            </motion.button>
          )}
          {step < 3 && (
            <motion.button
              type="button"
              onClick={() => {
                if (step === 1 && !Object.values(symptoms).some(s => s.checked)) {
                  Toast('Please select at least one symptom.', 'error');
                  return;
                }
                if (step === 2 && (!history.age || !history.gender)) {
                  Toast('Please complete medical history.', 'error');
                  return;
                }
                setStep(step + 1);
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Next
            </motion.button>
          )}
          {step === 3 && (
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Save Assessment
            </motion.button>
          )}
        </div>
      </form>

      {/* Results Section */}
      {step === 3 && risk && (
        <motion.div
          className={`risk-result ${risk.level.toLowerCase()}`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          <h3>Risk Level: {risk.level}</h3>
          <canvas id="riskGauge" width="200" height="100"></canvas>
          <p>Risk Score: {risk.score}%</p>
          <p>{risk.message}</p>
          <motion.button
            onClick={resetForm}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            New Assessment
          </motion.button>
        </motion.div>
      )}

      {/* History Modal */}
      {showHistory && (
        <motion.div
          className="history-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="modal-content">
            <h3>Past Assessments</h3>
            {pastAssessments.length ? (
              pastAssessments.map((ass, index) => (
                <div key={index} className="assessment-item">
                  <p><strong>Date:</strong> {new Date(ass.timestamp).toLocaleString()}</p>
                  <p><strong>Risk:</strong> {ass.risk.level} ({ass.risk.score}%)</p>
                  <p><strong>Symptoms:</strong> {Object.keys(ass.symptoms).filter(k => ass.symptoms[k].checked).join(', ')}</p>
                </div>
              ))
            ) : (
              <p>No past assessments.</p>
            )}
            <motion.button
              onClick={() => setShowHistory(false)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Close
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Chatbot */}
      <div className="chatbot">
        <h3>Quick Question?</h3>
        <div className="chat-input">
          <input
            type="text"
            placeholder="E.g., What is a normal heart rate?"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
          />
          <motion.button
            onClick={handleChatSubmit}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Ask
          </motion.button>
        </div>
      </div>

      {/* View History Button */}
      <motion.button
        className="history-btn"
        onClick={() => setShowHistory(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        View Past Assessments
      </motion.button>
    </motion.div>
  );
};

export default SymptomChecker;