import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import cars from '../../data/cars.json';
import Link from 'next/link';

export default function CarDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [days, setDays] = useState(1);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const car = cars.find(c => c.id === parseInt(id));

  const saudiCities = [
    { id: 'riyadh', name: 'الرياض' },
    { id: 'jeddah', name: 'جدة' },
    { id: 'dammam', name: 'الدمام' },
    { id: 'makkah', name: 'مكة المكرمة' },
    { id: 'medina', name: 'المدينة المنورة' }
  ];

  useEffect(() => {
    if (bookingSuccess) {
      const timer = setTimeout(() => {
        router.push('/my-bookings');
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [bookingSuccess, router]);

  // تحديث عدد الأيام عند تغيير التواريخ
  useEffect(() => {
    if (pickupDate && returnDate) {
      const start = new Date(pickupDate);
      const end = new Date(returnDate);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDays(diffDays);
    }
  }, [pickupDate, returnDate]);

  if (!car) {
    return (
      <div style={{
        maxWidth: 1200,
        margin: 'auto',
        padding: '40px 20px',
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f8f9fa',
        minHeight: 'calc(100vh - 70px)'
      }}>
        <h1 style={{ color: '#e74c3c' }}>السيارة غير موجودة</h1>
      </div>
    );
  }

  const handleBooking = () => {
    if (!pickupDate || !returnDate || !selectedCity) {
      alert('الرجاء ملء جميع الحقول المطلوبة');
      return;
    }

    const booking = {
      carName: car.name,
      pickupDate: pickupDate,
      returnDate: returnDate,
      city: selectedCity,
      days: days,
      totalPrice: car.price * days
    };

    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    bookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(bookings));
    setBookingSuccess(true);
  };

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
        backgroundColor: 'white',
        borderRadius: '10px',
        padding: '30px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          color: '#2c3e50',
          marginBottom: '20px',
          textAlign: 'center'
        }}>{car.name}</h1>

        <Link href="/" style={{
          display: 'inline-block',
          backgroundColor: '#3498db',
          color: 'white',
          padding: '12px 25px',
          borderRadius: '25px',
          textDecoration: 'none',
          fontSize: '1.1rem',
          fontWeight: 'bold',
          marginBottom: '20px',
          transition: 'all 0.3s ease',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          ← العودة للرئيسية
        </Link>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '30px',
          marginBottom: '30px'
        }}>
          <div>
            <img 
              src={car.image} 
              alt={car.name}
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '10px',
                marginBottom: '20px'
              }}
            />
            <h2 style={{
              fontSize: '1.8rem',
              color: '#2c3e50',
              marginBottom: '15px'
            }}>تفاصيل السيارة</h2>
            <p style={{
              fontSize: '1.2rem',
              color: '#666',
              marginBottom: '10px'
            }}>الموديل: {car.model}</p>
            <p style={{
              fontSize: '1.2rem',
              color: '#666',
              marginBottom: '10px'
            }}>السعر: ${car.price} / يوم</p>
            <p style={{
              fontSize: '1.2rem',
              color: '#666',
              marginBottom: '20px'
            }}>{car.description}</p>
            
            <h3 style={{
              fontSize: '1.5rem',
              color: '#2c3e50',
              marginBottom: '15px'
            }}>المميزات</h3>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              {car.features.map((feature, index) => (
                <li key={index} style={{
                  fontSize: '1.1rem',
                  color: '#666',
                  marginBottom: '8px',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <span style={{
                    color: '#2ecc71',
                    marginRight: '10px'
                  }}>✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div style={{
              backgroundColor: '#f8f9fa',
              padding: '20px',
              borderRadius: '10px',
              marginBottom: '20px'
            }}>
              <h2 style={{
                fontSize: '1.8rem',
                color: '#2c3e50',
                marginBottom: '15px'
              }}>الحجز</h2>
              
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '10px',
                  color: '#666',
                  fontSize: '1.1rem'
                }}>
                  تاريخ الاستلام:
                  <input
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      marginTop: '5px',
                      borderRadius: '5px',
                      border: '1px solid #ddd',
                      fontSize: '1.1rem'
                    }}
                  />
                </label>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '10px',
                  color: '#666',
                  fontSize: '1.1rem'
                }}>
                  تاريخ الإرجاع:
                  <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      marginTop: '5px',
                      borderRadius: '5px',
                      border: '1px solid #ddd',
                      fontSize: '1.1rem'
                    }}
                  />
                </label>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '10px',
                  color: '#666',
                  fontSize: '1.1rem'
                }}>
                  المنطقة:
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      marginTop: '5px',
                      borderRadius: '5px',
                      border: '1px solid #ddd',
                      fontSize: '1.1rem'
                    }}
                  >
                    <option value="">اختر المدينة</option>
                    {saudiCities.map(city => (
                      <option key={city.id} value={city.name}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '10px',
                  color: '#666',
                  fontSize: '1.1rem'
                }}>
                  عدد الأيام:
                  <input
                    type="number"
                    min="1"
                    value={days}
                    readOnly
                    style={{
                      width: '100%',
                      padding: '12px',
                      marginTop: '5px',
                      borderRadius: '5px',
                      border: '1px solid #ddd',
                      fontSize: '1.1rem',
                      backgroundColor: '#f0f0f0'
                    }}
                  />
                </label>
              </div>

              <div style={{
                backgroundColor: '#fff',
                padding: '15px',
                borderRadius: '5px',
                marginBottom: '20px'
              }}>
                <p style={{
                  fontSize: '1.2rem',
                  color: '#2c3e50',
                  marginBottom: '10px'
                }}>السعر الإجمالي:</p>
                <p style={{
                  fontSize: '1.5rem',
                  color: '#e74c3c',
                  fontWeight: 'bold'
                }}>${car.price * days}</p>
              </div>
              <button
                onClick={handleBooking}
                style={{
                  backgroundColor: '#3498db',
                  color: 'white',
                  padding: '15px 30px',
                  borderRadius: '25px',
                  border: 'none',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  width: '100%',
                  transition: 'background-color 0.2s'
                }}
              >
                احجز الآن
              </button>
            </div>

            {bookingSuccess && (
              <div style={{
                backgroundColor: '#2ecc71',
                color: 'white',
                padding: '15px',
                borderRadius: '5px',
                textAlign: 'center',
                marginTop: '20px',
                animation: 'fadeIn 0.5s ease-in'
              }}>
                تم الحجز بنجاح! جاري تحويلك إلى صفحة الحجوزات...
              </div>
            )}
          </div>
        </div>
      </div>
      <br />
      <Link href="/my-bookings">اذهب إلى حجوزاتي</Link><br />
      <Link href="/">العودة للرئيسية</Link>
    </div>
  );
}