import './globals.css';
import NavbarWrapper from './components/NavbarWrapper';

export const metadata = {
  title: 'Stock Data',
  description: 'Stock Data Monitoring System',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NavbarWrapper />
        {children}
      </body>
    </html>
  );
}
