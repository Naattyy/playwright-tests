export const employeesData = {
  testCaseId: 'TC_03',
    birthCertificate: '050505/0954',
    firstName: 'EMÍLIA',
    lastName: 'HRUŠKOVÁ',
    phone: '912345678',
    birthDate: '25.09.1998',
    newTitle: 'PhDr.',
    street: 'Jarná 5',
    citySearch: 'Raje',
    city: 'Rajec',
  };

  export const employeeWithPhoto = {
  testCaseId: 'TC_03.1',
  birthCertificate: '999999/9999',
  firstName: 'Shrek',
  lastName: 'Tester',
  birthDate: '01.01.2000',
  photoPath: 'tests/CIPKART/shrek1.jpg'
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
    type: 'ŽP ZSSK ZAM.',
    option: 'druhá trieda',
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

export const employeesForSelection = [
  'Hraškova',
  'Pikachu',
  'Vtáčik'
];

export const employeesForToggle = [
  { lastName: 'Hraškova', firstName: 'Janka' },
  { lastName: 'Pikachu', firstName: 'Pika' },
  { lastName: 'VTÁČIK', firstName: 'LEONARD' }
];
