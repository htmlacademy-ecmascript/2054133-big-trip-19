import { nanoid } from 'nanoid';
import { POINT_PRICE, TYPES_OF_POINT } from '../utils/const';
import { getRandomArrayElement, getRandomIntInclusive, isEqual } from '../utils/utils';

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
      {
        src: 'http://picsum.photos/300/200?r=0.0762563005163316',
        description: 'Chamonix parliament building',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.0762563005163318',
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
        src: 'http://picsum.photos/300/200?r=0.0762563005163319',
        description: 'Geneva city park',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.0762563005163315',
        description: 'Geneva city park',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.0762563005163314',
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
        src: 'http://picsum.photos/300/200?r=0.0762563005163313',
        description: 'Amsterdam tropical museum',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.0762563005163312',
        description: 'Amsterdam tropical museum',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.0762563005163311',
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
      id: 2,
      title: 'Order by yandex',
      price: 20,
    }],
  },
  {
    type: 'bus',
    offers: [{
      id: 1,
      title: 'Choose seats',
      price: 5,
    },
    {
      id: 2,
      title: 'Book tickets',
      price: 40,
    },
    {
      id: 3,
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
      id: 4,
      title: 'add lunch',
      price: 20,
    },
    {
      id: 5,
      title: 'Book tickets',
      price: 40,
    }],
  },
  {
    type: 'train',
    offers: [{
      id: 1,
      title: 'Add luggage',
      price: 50,
    },
    {
      id: 2,
      title: 'Choose seats',
      price: 5,
    },
    {
      id: 3,
      title: 'add lunch',
      price: 20,
    },
    {
      id: 4,
      title: 'Book tickets',
      price: 40,
    }],
  },
  {
    type: 'drive',
    offers: [{
      id: 1,
      title: 'Upgrade to a business class',
      price: 120,
    },
    {
      id: 2,
      title: 'Order by yandex',
      price: 20,
    }],
  },
  {
    type: 'check-in',
    offers: [{
      id: 1,
      title: 'Choose seats',
      price: 5,
    },
    {
      id: 2,
      title: 'Book tickets',
      price: 40,
    },
    {
      id: 3,
      title: 'Add luggage',
      price: 50,
    }],
  },
  {
    type: 'sightseeing',
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
      id: 4,
      title: 'add lunch',
      price: 20,
    },
    {
      id: 5,
      title: 'Book tickets',
      price: 40,
    }],
  },
  {
    type: 'restaurant',
    offers: [{
      id: 1,
      title: 'Add luggage',
      price: 50,
    },
    {
      id: 2,
      title: 'Choose seats',
      price: 5,
    },
    {
      id: 3,
      title: 'add lunch',
      price: 20,
    },
    {
      id: 4,
      title: 'Book tickets',
      price: 40,
    }],
  },
  {
    type: 'ship',
    offers: [{
      id: 1,
      title: 'Add luggage',
      price: 50,
    },
    {
      id: 2,
      title: 'Choose seats',
      price: 5,
    },
    {
      id: 3,
      title: 'add lunch',
      price: 20,
    },
    {
      id: 4,
      title: 'Book tickets',
      price: 40,
    }],
  },
];

const generatePoint = () => ({
  basePrice: getRandomIntInclusive(POINT_PRICE.min, POINT_PRICE.max),
  dateFrom: `${getRandomIntInclusive(2022, 2023)}-07-${getRandomIntInclusive(25, 29)}T${getRandomIntInclusive(10, 20)}:${getRandomIntInclusive(10, 59)}:10.845Z`,
  dateTo: `${getRandomIntInclusive(2022, 2023)}-07-30T18:59:13.375Z`,
  destination: getRandomArrayElement(Destinations).id,
  id: nanoid(),
  isFavorite: isEqual(getRandomIntInclusive(0, 1), 1),
  offers: getRandomArrayElement(Offers).offers.map((offer) => offer.id),
  type: getRandomArrayElement(TYPES_OF_POINT),
});

export { Destinations, Offers, generatePoint };
