import { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../context/ThemeContext';
import { toast } from 'react-toastify';
import Toast from './Toast';
import './Resources.css';

const Resources = () => {
  const { theme } = useContext(ThemeContext);
  const [search, setSearch] = useState('');
  const [chatInput, setChatInput] = useState('');
  const resources = [
    { title: 'How to Prevent a Heart Attack', url: '#', description: 'Learn lifestyle changes to reduce risk.' },
    { title: 'CPR Training Video', url: '#', description: 'Step-by-step CPR guide.' },
    { title: 'Healthy Diet Tips', url: '#', description: 'Nutrition for heart health.' },
  ];

  const filteredResources = resources.filter((res) =>
    res.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleChatSubmit = () => {
    if (!chatInput.trim()) {
      Toast('Please enter a question.', 'error');
      return;
    }
    Toast('A normal heart rate is 60-100 bpm at rest.', 'success');
    setChatInput('');
  };

  return (
    <motion.div
      className={`resources ${theme}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <h2>Heart Health Resources</h2>
      <input
        type="text"
        placeholder="Search resources..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />
      <div className="resource-grid">
        {filteredResources.map((res, index) => (
          <motion.div
            key={res.title}
            className="resource-card"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <h3>{res.title}</h3>
            <p>{res.description}</p>
            <a href={res.url}>Learn More</a>
          </motion.div>
        ))}
      </div>
      <div className="chatbot">
        <h3>Ask Our Chatbot</h3>
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
    </motion.div>
  );
};

export default Resources;