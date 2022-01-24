import { useTheme } from 'next-themes';
import { FaRegMoon } from 'react-icons/fa';
import { IoIosSunny } from 'react-icons/io';

export default function ThemeChanger() {
  const { theme, setTheme } = useTheme();

  return (
    <div>
        <a 
            className={`theme-trigger ${theme}`} 
            title={`Activate ${theme === 'light' ? 'dark' : 'light'} mode`} 
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
            {theme === 'light' ? <FaRegMoon /> : <IoIosSunny /> }
        </a>
    </div>
  )
}