import Link from 'next/link';

export default function Navbar() {
  return (
    <nav style={{
      backgroundColor: 'rgba(44, 62, 80, 0.95)',
      padding: '20px 0',
      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      backdropFilter: 'blur(10px)'
    }}>
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '0 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Link href="/" style={{
          color: 'white',
          textDecoration: 'none',
          fontSize: '1.8rem',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <span style={{
            backgroundColor: '#3498db',
            padding: '8px 15px',
            borderRadius: '10px',
            fontSize: '1.2rem'
          }}>🚗</span>
          تأجير السيارات
        </Link>
        
        <div style={{
          display: 'flex',
          gap: '25px'
        }}>
          <Link href="/" style={{
            color: 'white',
            textDecoration: 'none',
            padding: '10px 20px',
            borderRadius: '25px',
            transition: 'all 0.3s ease',
            fontSize: '1.1rem',
            fontWeight: '500',
            ':hover': {
              backgroundColor: '#3498db',
              transform: 'translateY(-2px)'
            }
          }}>
            الرئيسية
          </Link>
          <Link href="/my-bookings" style={{
            color: 'white',
            textDecoration: 'none',
            padding: '10px 20px',
            borderRadius: '25px',
            transition: 'all 0.3s ease',
            fontSize: '1.1rem',
            fontWeight: '500',
            backgroundColor: '#3498db',
            ':hover': {
              backgroundColor: '#2980b9',
              transform: 'translateY(-2px)'
            }
          }}>
            حجوزاتي
          </Link>
        </div>
      </div>
    </nav>
  );
} 