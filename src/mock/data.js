import { getRandomArrayElement, getRandomIntInclusive, isEqual } from '../utils';

const POINT_PRICE = {
  min: 100,
  max: 2000,
};

const TYPES_OF_TRANSPORT = [
  'taxi',
  'bus',
  'train',
  'flight',
];

const Destinations = [
  {
    id: 1,
    description:
      'Chamonix-Mont-Blanc (usually shortened to Chamonix) is a resort area near the junction of France, Switzerland and Italy. At the base of Mont Blanc, the highest summit in the Alps, it"s renowned for its skiing.',
    name: 'Chamonix',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.0762563005163317',
        description: 'Chamonix parliament building',
      },
    ],
  },
  {
    id: 2,
    description:
      'Geneva is a city in Switzerland that lies at the southern tip of expansive Lac Léman (Lake Geneva). Surrounded by the Alps and Jura mountains, the city has views of dramatic Mont Blanc.',
    name: 'Geneva',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.0762563005163317',
        description: 'Geneva city park',
      },
    ],
  },
  {
    id: 3,
    description:
      'Amsterdam is the capital and largest city of the Netherlands. It has been the capital of the kingdom since 1814. It is located in the province of North Holland in the west of the country at the mouth of the rivers Amstel and IJ. Amsterdam is connected by the Nordsee Canal to the North Sea.',
    name: 'Amsterdam',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.0762563005163317',
        description: 'Amsterdam tropical museum',
      },
    ],
  },
];

const Offers = [
  {
    type: 'taxi',
    offers: [{
      id: 1,
      title: 'Upgrade to a business class',
      price: 120,
    },
    {
      id: 4,
      title: 'Order by yandex',
      price: 20,
    }],
  },
  {
    type: 'bus',
    offers: [{
      id: 3,
      title: 'Choose seats',
      price: 5,
    },
    {
      id: 6,
      title: 'Book tickets',
      price: 40,
    },
    {
      id: 2,
      title: 'Add luggage',
      price: 50,
    }],
  },
  {
    type: 'flight',
    offers: [{
      id: 1,
      title: 'Upgrade to a business class',
      price: 120,
    },
    {
      id: 2,
      title: 'Add luggage',
      price: 50,
    },
    {
      id: 3,
      title: 'Choose seats',
      price: 5,
    },
    {
      id: 5,
      title: 'add lunch',
      price: 20,
    },
    {
      id: 6,
      title: 'Book tickets',
      price: 40,
    }],
  },
  {
    type: 'train',
    offers: [{
      id: 2,
      title: 'Add luggage',
      price: 50,
    },
    {
      id: 3,
      title: 'Choose seats',
      price: 5,
    },
    {
      id: 5,
      title: 'add lunch',
      price: 20,
    },
    {
      id: 6,
      title: 'Book tickets',
      price: 40,
    }],
  },
];

const generatePoint = () => ({
  basePrice: getRandomIntInclusive(POINT_PRICE.min, POINT_PRICE.max),
  dateFrom: '2022-07-14T07:55:56.845Z',
  dateTo: '2022-07-15T16:25:13.375Z',
  destination: getRandomArrayElement(Destinations).id,
  id: '0',
  isFavorite: isEqual(getRandomIntInclusive(0, 1), 1),
  offers: getRandomArrayElement(Offers).offers,
  type: getRandomArrayElement(TYPES_OF_TRANSPORT),
});

export { Destinations, Offers, generatePoint };

