export interface ColorZone {
  id: number;
  color: string;
  number: number;
  filled: boolean;
}

export interface Painting {
  id: number;
  name: string;
  category: 'animals' | 'tech' | 'nature' | 'study';
  difficulty: number;
  zones: ColorZone[];
  colors: { number: number; color: string; name: string }[];
  emoji: string;
}

const generateCatPattern = (): ColorZone[] => {
  const pattern = [
    0,0,1,1,0,0,0,0,0,0,0,0,1,1,0,0,
    0,1,1,2,1,0,0,0,0,0,0,1,2,1,1,0,
    1,1,2,2,2,1,0,0,0,0,1,2,2,2,1,1,
    1,2,2,2,2,2,1,1,1,1,2,2,2,2,2,1,
    1,2,2,3,2,2,2,2,2,2,2,2,3,2,2,1,
    1,2,2,3,3,2,2,2,2,2,2,3,3,2,2,1,
    1,2,2,2,2,2,4,4,4,4,2,2,2,2,2,1,
    1,2,2,2,2,4,4,4,4,4,4,2,2,2,2,1,
    1,2,2,2,2,4,5,4,4,5,4,2,2,2,2,1,
    1,2,2,2,2,4,4,6,6,4,4,2,2,2,2,1,
    1,2,2,2,2,4,6,6,6,6,4,2,2,2,2,1,
    0,1,2,2,2,4,4,6,6,4,4,2,2,2,1,0,
    0,1,2,2,2,2,4,4,4,4,2,2,2,2,1,0,
    0,0,1,2,2,2,2,2,2,2,2,2,2,1,0,0,
    0,0,1,1,2,2,2,2,2,2,2,2,1,1,0,0,
    0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0
  ];
  
  const colors = ['#FFFFFF', '#FF8C42', '#FFB366', '#1C1C1C', '#FFF5E1', '#333333', '#FFE4CC'];
  return pattern.map((num, idx) => ({
    id: idx,
    color: colors[num],
    number: num + 1,
    filled: false
  }));
};

const generateTVPattern = (): ColorZone[] => {
  const pattern = [
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,
    0,1,1,2,2,2,2,2,2,2,2,2,2,1,1,0,
    1,1,2,3,3,3,3,3,3,3,3,3,3,2,1,1,
    1,2,2,3,4,4,4,4,4,4,4,4,3,2,2,1,
    1,2,3,3,4,4,4,4,4,4,4,4,3,3,2,1,
    1,2,3,4,4,5,5,5,5,5,5,4,4,3,2,1,
    1,2,3,4,5,5,5,5,5,5,5,5,4,3,2,1,
    1,2,3,4,5,5,5,5,5,5,5,5,4,3,2,1,
    1,2,3,4,5,5,5,5,5,5,5,5,4,3,2,1,
    1,2,3,4,4,5,5,5,5,5,5,4,4,3,2,1,
    1,2,3,3,4,4,4,4,4,4,4,4,3,3,2,1,
    1,2,2,3,3,3,3,3,3,3,3,3,3,2,2,1,
    1,1,2,2,2,2,2,1,1,2,2,2,2,2,1,1,
    0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
    0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0
  ];
  
  const colors = ['#FFFFFF', '#1A1A1A', '#333333', '#555555', '#0A0A0A', '#4A90E2'];
  return pattern.map((num, idx) => ({
    id: idx,
    color: colors[num],
    number: num + 1,
    filled: false
  }));
};

const generateCameraPattern = (): ColorZone[] => {
  const pattern = [
    0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,
    0,0,0,1,1,2,2,2,2,2,2,1,1,0,0,0,
    0,0,1,1,2,2,3,3,3,3,2,2,1,1,0,0,
    0,1,1,2,2,3,3,4,4,3,3,2,2,1,1,0,
    1,1,2,2,3,3,4,4,4,4,3,3,2,2,1,1,
    1,2,2,3,3,4,4,5,5,4,4,3,3,2,2,1,
    1,2,3,3,4,4,5,5,5,5,4,4,3,3,2,1,
    1,2,3,4,4,5,5,6,6,5,5,4,4,3,2,1,
    1,2,3,4,5,5,6,6,6,6,5,5,4,3,2,1,
    1,2,3,4,5,5,6,6,6,6,5,5,4,3,2,1,
    1,2,3,4,4,5,5,6,6,5,5,4,4,3,2,1,
    1,2,3,3,4,4,5,5,5,5,4,4,3,3,2,1,
    1,2,2,3,3,4,4,4,4,4,4,3,3,2,2,1,
    1,1,2,2,3,3,3,3,3,3,3,3,2,2,1,1,
    0,1,1,2,2,2,2,2,2,2,2,2,2,1,1,0,
    0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0
  ];
  
  const colors = ['#FFFFFF', '#2C3E50', '#34495E', '#E74C3C', '#95A5A6', '#BDC3C7', '#ECF0F1'];
  return pattern.map((num, idx) => ({
    id: idx,
    color: colors[num],
    number: num + 1,
    filled: false
  }));
};

const generateNotebookPattern = (): ColorZone[] => {
  const pattern = [
    0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,
    0,1,1,2,2,2,2,2,2,2,2,2,2,1,1,0,
    1,1,2,2,2,2,2,2,2,2,2,2,2,2,1,1,
    1,2,2,3,3,3,3,3,3,3,3,3,3,2,2,1,
    1,2,2,3,4,4,4,4,4,4,4,4,3,2,2,1,
    1,2,2,3,4,5,5,5,5,5,5,4,3,2,2,1,
    1,2,2,3,4,5,6,6,6,6,5,4,3,2,2,1,
    1,2,2,3,4,5,6,7,7,6,5,4,3,2,2,1,
    1,2,2,3,4,5,6,7,7,6,5,4,3,2,2,1,
    1,2,2,3,4,5,6,6,6,6,5,4,3,2,2,1,
    1,2,2,3,4,5,5,5,5,5,5,4,3,2,2,1,
    1,2,2,3,4,4,4,4,4,4,4,4,3,2,2,1,
    1,2,2,3,3,3,3,3,3,3,3,3,3,2,2,1,
    1,1,2,2,2,2,2,2,2,2,2,2,2,2,1,1,
    0,1,1,2,2,2,2,2,2,2,2,2,2,1,1,0,
    0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0
  ];
  
  const colors = ['#FFFFFF', '#E91E63', '#F06292', '#FFF59D', '#FFEB3B', '#81C784', '#4CAF50', '#2196F3'];
  return pattern.map((num, idx) => ({
    id: idx,
    color: colors[num],
    number: num + 1,
    filled: false
  }));
};

export const paintings: Painting[] = [
  {
    id: 1,
    name: 'Кот',
    category: 'animals',
    difficulty: 3,
    emoji: '🐱',
    colors: [
      { number: 1, color: '#FFFFFF', name: 'Белый' },
      { number: 2, color: '#FF8C42', name: 'Оранжевый' },
      { number: 3, color: '#FFB366', name: 'Светло-оранжевый' },
      { number: 4, color: '#1C1C1C', name: 'Чёрный' },
      { number: 5, color: '#FFF5E1', name: 'Кремовый' },
      { number: 6, color: '#333333', name: 'Тёмно-серый' },
      { number: 7, color: '#FFE4CC', name: 'Персиковый' },
    ],
    zones: generateCatPattern()
  },
  {
    id: 2,
    name: 'Кинокамера',
    category: 'tech',
    difficulty: 2,
    emoji: '🎥',
    colors: [
      { number: 1, color: '#FFFFFF', name: 'Белый' },
      { number: 2, color: '#2C3E50', name: 'Тёмно-синий' },
      { number: 3, color: '#34495E', name: 'Серый' },
      { number: 4, color: '#E74C3C', name: 'Красный' },
      { number: 5, color: '#95A5A6', name: 'Светло-серый' },
      { number: 6, color: '#BDC3C7', name: 'Серебряный' },
      { number: 7, color: '#ECF0F1', name: 'Почти белый' },
    ],
    zones: generateCameraPattern()
  },
  {
    id: 3,
    name: 'Телевизор',
    category: 'tech',
    difficulty: 4,
    emoji: '📺',
    colors: [
      { number: 1, color: '#FFFFFF', name: 'Белый' },
      { number: 2, color: '#1A1A1A', name: 'Чёрный' },
      { number: 3, color: '#333333', name: 'Тёмно-серый' },
      { number: 4, color: '#555555', name: 'Серый' },
      { number: 5, color: '#0A0A0A', name: 'Глубокий чёрный' },
      { number: 6, color: '#4A90E2', name: 'Синий экран' },
    ],
    zones: generateTVPattern()
  },
  {
    id: 4,
    name: 'Тетрадь',
    category: 'study',
    difficulty: 5,
    emoji: '📓',
    colors: [
      { number: 1, color: '#FFFFFF', name: 'Белый' },
      { number: 2, color: '#E91E63', name: 'Розовый' },
      { number: 3, color: '#F06292', name: 'Светло-розовый' },
      { number: 4, color: '#FFF59D', name: 'Светло-жёлтый' },
      { number: 5, color: '#FFEB3B', name: 'Жёлтый' },
      { number: 6, color: '#81C784', name: 'Светло-зелёный' },
      { number: 7, color: '#4CAF50', name: 'Зелёный' },
      { number: 8, color: '#2196F3', name: 'Голубой' },
    ],
    zones: generateNotebookPattern()
  }
];

export const categories = [
  { id: 'all', name: 'Все', icon: 'Palette' },
  { id: 'animals', name: 'Животные', icon: 'Cat' },
  { id: 'tech', name: 'Техника', icon: 'Monitor' },
  { id: 'nature', name: 'Природа', icon: 'Trees' },
  { id: 'study', name: 'Учёба', icon: 'BookOpen' },
];
