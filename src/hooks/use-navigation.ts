import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const useNavigation = () => {
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/') {
      const hash = location.hash.replace('#', '');
      if (hash) {
        setActiveSection(hash);
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        setActiveSection('home');
      }
    }
  }, [location]);

  const handleSectionChange = (section: string) => {
    if (location.pathname !== '/') {
      navigate(`/#${section}`);
    } else {
      setActiveSection(section);
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return {
    activeSection,
    handleSectionChange
  };
};
