import React, { useState, useEffect, useRef } from 'react';

// Import images directly - preferred approach in React
import ethLogo from '../../assets/crypto/eth.png';
import usdtLogo from '../../assets/crypto/usdt.png';
import bnbLogo from '../../assets/crypto/bnb.png';

const cryptoOptions = [
  {
    id: 'eth',
    name: 'Ethereum',
    logo: ethLogo
  },
  {
    id: 'usdt',
    name: 'USDT.BSC',
    logo: usdtLogo
  },
  {
    id: 'bnb',
    name: 'BNB',
    logo: bnbLogo
  }
];

const CryptoDropdown = ({ value, onChange, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    value ? cryptoOptions.find(option => option.id === value) : cryptoOptions[0]
  );
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Update when value prop changes
  useEffect(() => {
    if (value) {
      const option = cryptoOptions.find(option => option.id === value);
      if (option) setSelectedOption(option);
    }
  }, [value]);

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onChange) onChange(option.id);
  };

  return (
    <div className={`crypto-dropdown ${className}`} ref={dropdownRef}>
      <div 
        className="crypto-dropdown-header" 
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        role="combobox"
      >
        <div className="crypto-dropdown-header-selected">
          <img src={selectedOption.logo} alt={selectedOption.name} />
          <span>{selectedOption.name}</span>
        </div>
        <svg 
          width="14" 
          height="8" 
          viewBox="0 0 14 8" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease', marginLeft: 10 }}
        >
          <path d="M1 1L7 7L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      
      <div className={`crypto-dropdown-body ${isOpen ? 'open' : ''}`}>
        {cryptoOptions.map((option) => (
          <div 
            key={option.id}
            className={`crypto-dropdown-item ${selectedOption.id === option.id ? 'selected' : ''}`}
            onClick={() => handleSelect(option)}
            role="option"
            aria-selected={selectedOption.id === option.id}
          >
            <img src={option.logo} alt={option.name} />
            <span>{option.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CryptoDropdown;
