import { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../context/ThemeContext';
import { toast } from 'react-toastify';
import Toast from './Toast';
import './EmergencyButton.css';

const EmergencyButton = () => {
  const { theme } = useContext(ThemeContext);
  const [showModal, setShowModal] = useState(false);

  const handleEmergency = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          Toast(`Calling emergency services. Location: Lat ${latitude}, Lon ${longitude}`, 'success');
          setShowModal(false);
        },
        () => {
          Toast('Geolocation access denied.', 'error');
          setShowModal(false);
        }
      );
    } else {
      Toast('Geolocation not supported.', 'error');
      setShowModal(false);
    }
  };

  return (
    <>
      <motion.button
        className={`emergency-btn ${theme}`}
        onClick={() => setShowModal(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ scale: [1, 1.05, 1], transition: { repeat: Infinity, duration: 1.5 } }}
      >
        Emergency
      </motion.button>
      {showModal && (
        <motion.div
          className={`modal ${theme}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="modal-content">
            <h3>Confirm Emergency Call</h3>
            <p>Are you sure you want to contact emergency services?</p>
            <div className="modal-buttons">
              <motion.button
                onClick={handleEmergency}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Yes
              </motion.button>
              <motion.button
                onClick={() => setShowModal(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                No
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default EmergencyButton;