export const metadata = {
  title: 'ScamShield.ai',
  description: 'Global Scam Detector',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
