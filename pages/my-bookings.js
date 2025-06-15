import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const savedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    setBookings(savedBookings);
  }, []);

  return (
    <div style={{
      maxWidth: 1200,
      margin: 'auto',
      padding: '40px 20px',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f8f9fa',
      minHeight: 'calc(100vh - 70px)'
    }}>
      <div style={{
        textAlign: 'center',
        marginBottom: '40px'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          color: '#2c3e50',
          marginBottom: '15px',
          fontWeight: 'bold'
        }}>حجوزاتي</h1>
      </div>

      {bookings.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '40px',
          backgroundColor: 'white',
          borderRadius: '10px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <p style={{
            fontSize: '1.2rem',
            color: '#666',
            marginBottom: '20px'
          }}>لا توجد حجوزات حالياً</p>
          <Link href="/" style={{
            display: 'inline-block',
            backgroundColor: '#3498db',
            color: 'white',
            padding: '12px 30px',
            borderRadius: '25px',
            textDecoration: 'none',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            transition: 'background-color 0.2s'
          }}>
            احجز سيارة الآن
          </Link>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px'
        }}>
          {bookings.map((booking, index) => (
            <div key={index} style={{
              backgroundColor: 'white',
              borderRadius: '10px',
              padding: '20px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <h2 style={{
                fontSize: '1.5rem',
                color: '#2c3e50',
                marginBottom: '15px'
              }}>{booking.carName}</h2>
              <p style={{
                color: '#666',
                marginBottom: '10px'
              }}>تاريخ الحجز: {booking.date}</p>
              <p style={{
                color: '#666',
                marginBottom: '10px'
              }}>عدد الأيام: {booking.days}</p>
              <p style={{
                color: '#e74c3c',
                fontSize: '1.2rem',
                fontWeight: 'bold'
              }}>السعر الإجمالي: ${booking.totalPrice}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}