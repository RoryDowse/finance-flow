import './Footer.css';

// Basic footer that shows both cooperators and links to our github
const Footer = () => {
    return (
          <div className="footer webpage-background">
            <p>Created By</p>
            <div className="footer-content">
                <div className="footer-link-container">
                    <a className="footer-link" href="https://github.com/RoryDowse" target="_blank" rel="noopener noreferrer">Rory Dowse</a>
                </div>
                <div className="footer-link-container">
                    <a className="footer-link" href="https://github.com/Runnerrupert" target="_blank" rel="noopener noreferrer">Cameron Barfuss</a>
                </div>
            </div>
          </div>
      );
    };
    
    export default Footer;