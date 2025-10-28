import React from 'react';

const InstallPrompt = ({ show, onInstall, onClose }) => {
  if (!show) return null;

  return (
    <div className="install-prompt show">
      <h3>Install Gas Mediator</h3>
      <p>Install this app on your device for quick access and offline functionality.</p>
      <div className="install-buttons">
        <button className="install-btn" onClick={onInstall}>
          Install
        </button>
        <button className="install-btn close-install" onClick={onClose}>
          Not Now
        </button>
      </div>
    </div>
  );
};

export default InstallPrompt;
