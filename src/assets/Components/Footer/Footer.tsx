import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="social-icons">
        <a href="https://www.facebook.com/ludusglobal/" target="_blank" rel="noopener noreferrer">
          <FaFacebook />
        </a>
        <a href="https://twitter.com/ludusglobal?lang=es" target="_blank" rel="noopener noreferrer">
          <FaTwitter />
        </a>
        <a href="https://www.instagram.com/ludusglobal/" target="_blank" rel="noopener noreferrer">
          <FaInstagram />
        </a>
      </div>
      <a className="web-link" href="https://www.ludusglobal.com/" target="_blank" rel="noopener noreferrer">
        www.ludusglobal.com
      </a>
      <p className='powered'>© Powered by Lucas Riestra</p>
    </footer>
  );
}

export default Footer;