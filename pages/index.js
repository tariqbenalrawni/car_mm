import Link from 'next/link';
import cars from '../data/cars.json';

export default function Home() {
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
        marginBottom: '60px',
        padding: '40px 0',
        background: 'linear-gradient(135deg, #2c3e50 0%, #3498db 100%)',
        borderRadius: '20px',
        color: 'white',
        boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{
          fontSize: '3.5rem',
          marginBottom: '20px',
          fontWeight: 'bold',
          textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
        }}>مرحبا بك في منصة تأجير السيارات</h1>
        <p style={{
          fontSize: '1.4rem',
          opacity: 0.9,
          maxWidth: '800px',
          margin: '0 auto'
        }}>اختر سيارتك المفضلة للحجز من القائمة التالية</p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '30px',
        marginBottom: '50px'
      }}>
        {cars.map(car => (
          <div key={car.id} style={{
            backgroundColor: 'white',
            borderRadius: '15px',
            overflow: 'hidden',
            boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            cursor: 'pointer',
            ':hover': {
              transform: 'translateY(-10px)',
              boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
            }
          }}>
            <Link href={`/cars/${car.id}`} style={{
              textDecoration: 'none',
              color: 'inherit'
            }}>
              <div style={{
                height: '200px',
                overflow: 'hidden'
              }}>
                <img 
                  src={car.image} 
                  alt={car.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease'
                  }}
                />
              </div>
              <div style={{
                padding: '25px'
              }}>
                <h2 style={{
                  fontSize: '1.8rem',
                  color: '#2c3e50',
                  marginBottom: '15px',
                  fontWeight: 'bold'
                }}>{car.name}</h2>
                <p style={{
                  color: '#666',
                  marginBottom: '15px',
                  fontSize: '1.1rem'
                }}>موديل: {car.model}</p>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <p style={{
                    color: '#e74c3c',
                    fontSize: '1.4rem',
                    fontWeight: 'bold'
                  }}>${car.price} / يوم</p>
                  <span style={{
                    backgroundColor: '#3498db',
                    color: 'white',
                    padding: '8px 15px',
                    borderRadius: '20px',
                    fontSize: '0.9rem',
                    fontWeight: 'bold'
                  }}>
                    احجز الآن
                  </span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <div style={{
        textAlign: 'center',
        marginTop: '40px'
      }}>
        <Link href="/my-bookings" style={{
          display: 'inline-block',
          backgroundColor: '#3498db',
          color: 'white',
          padding: '15px 40px',
          borderRadius: '30px',
          textDecoration: 'none',
          fontSize: '1.2rem',
          fontWeight: 'bold',
          transition: 'all 0.3s ease',
          boxShadow: '0 5px 15px rgba(52, 152, 219, 0.3)',
          ':hover': {
            backgroundColor: '#2980b9',
            transform: 'translateY(-3px)',
            boxShadow: '0 8px 20px rgba(52, 152, 219, 0.4)'
          }
        }}>
          شاهد حجوزاتي
        </Link>
      </div>
    </div>
  );
}