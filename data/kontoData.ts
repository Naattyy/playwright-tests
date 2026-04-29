export const kontoData = {
  firstName: 'EMÍLIA',
  lastName: 'HRUŠKOVÁ',
  phone: '912345678',
  birthDate: '1998-09-25',
  street: 'Jarná 5',
  city: 'Raje',
};

export const orderData = {
  user: {
    firstName: 'EMÍLIA',
    lastName: 'HRUŠKOVÁ',
    email: 'emiliahruskova62@deltajohnsons.com',
  },
  address: {
    country: 'Slovenská Republika',
    city: 'Rajec',
    zip: '01501',
    zipSearch: '015',
    street: 'Jarná 5',
  },
  product: {
    type: 'KLASIK',
    card: 'BEZKONTAKTNÁ ČIPOVÁ KARTA',
  },
  payment: {
    method: 'muzoPay',
  },
  file: 'tests/ZSSK/mys.jpg',
};

export const orderNoCardData = {
  product: {
    type: 'MAXI KLASIKN',
    option: 'prvá trieda',
  },
  user: {
    email: 'emiliahruskova62@deltajohnsons.com',
  },
  payment: {
    method: 'muzoPay',
    card: {
      number: '4056 0700 0000 0016',
      expiry: '12/28',
      cvc: '288',
    },
  },
};