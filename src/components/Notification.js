import React, { useEffect, useState } from 'react';

function Notification({ message, onClose }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => {
        onClose();
      }, 500); // Wait for the fade-out transition to complete
    }, 1000); // 2 seconds before starting the fade out

    return () => clearTimeout(timer);
  }, [onClose]);

  const handleClick = () => {
    setVisible(false);
    setTimeout(() => {
      onClose();
    }, 500); // Wait for the fade-out transition to complete
  };

  return (
    <div
      className={`notification ${visible ? 'visible' : 'hidden'}`}
      onClick={handleClick}
    >
      <p>{message}</p>
    </div>
  );
}

export default Notification;
