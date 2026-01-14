import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';

interface ColorZone {
  id: number;
  color: string;
  number: number;
  filled: boolean;
}

interface Painting {
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
    0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,
    0,0,1,1,2,2,2,2,2,2,2,2,1,1,0,0,
    0,1,1,2,2,3,2,2,2,2,3,2,2,1,1,0,
    0,1,2,2,3,3,3,2,2,3,3,3,2,2,1,0,
    1,1,2,2,2,3,2,2,2,2,3,2,2,2,1,1,
    1,2,2,2,2,2,2,4,4,2,2,2,2,2,2,1,
    1,2,2,2,2,4,4,4,4,4,4,2,2,2,2,1,
    1,2,2,2,4,4,3,4,4,3,4,4,2,2,2,1,
    1,2,2,2,4,4,4,4,4,4,4,4,2,2,2,1,
    1,2,2,2,4,3,3,3,3,3,3,4,2,2,2,1,
    1,2,2,2,4,4,4,5,5,4,4,4,2,2,2,1,
    1,1,2,2,2,4,4,4,4,4,4,2,2,2,1,1,
    0,1,2,2,2,2,2,2,2,2,2,2,2,2,1,0,
    0,1,1,2,2,2,2,2,2,2,2,2,2,1,1,0,
    0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,
    0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0
  ];
  
  const colors = ['#FFFFFF', '#8B4513', '#FFB366', '#2C1810', '#F4DCC3', '#FFD4A3'];
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
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,
    0,0,0,0,1,1,2,2,2,2,1,1,0,0,0,0,
    0,1,1,1,1,2,2,3,3,2,2,1,1,1,1,0,
    1,1,2,2,2,2,2,3,3,2,2,2,2,2,1,1,
    1,2,2,3,3,3,3,3,3,3,3,3,3,2,2,1,
    1,2,3,3,4,4,4,4,4,4,4,4,3,3,2,1,
    1,2,3,4,4,5,5,5,5,5,5,4,4,3,2,1,
    1,2,3,4,5,5,6,6,6,6,5,5,4,3,2,1,
    1,2,3,4,5,6,6,6,6,6,6,5,4,3,2,1,
    1,2,3,4,5,5,6,6,6,6,5,5,4,3,2,1,
    1,2,3,3,4,4,5,5,5,5,4,4,3,3,2,1,
    1,2,2,3,3,3,4,4,4,4,3,3,3,2,2,1,
    1,1,2,2,2,2,3,3,3,3,2,2,2,2,1,1,
    0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
    0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0
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
    1,1,2,2,3,3,3,3,3,3,3,3,2,2,1,1,
    1,2,2,3,3,4,4,4,4,4,4,3,3,2,2,1,
    1,2,3,3,4,4,5,5,5,5,4,4,3,3,2,1,
    1,2,3,4,4,5,5,6,6,5,5,4,4,3,2,1,
    1,2,3,4,5,5,6,6,6,6,5,5,4,3,2,1,
    1,2,3,4,5,6,6,7,7,6,6,5,4,3,2,1,
    1,2,3,4,5,6,6,7,7,6,6,5,4,3,2,1,
    1,2,3,4,5,5,6,6,6,6,5,5,4,3,2,1,
    1,2,3,4,4,5,5,6,6,5,5,4,4,3,2,1,
    1,2,3,3,4,4,5,5,5,5,4,4,3,3,2,1,
    1,2,2,3,3,4,4,4,4,4,4,3,3,2,2,1,
    1,1,2,2,3,3,3,3,3,3,3,3,2,2,1,1,
    0,1,1,2,2,2,2,2,2,2,2,2,2,1,1,0,
    0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0
  ];
  
  const colors = ['#FFFFFF', '#FF6B9D', '#FFB3D1', '#FFD93D', '#FFF0B3', '#6BCB77', '#4D96FF', '#E8E8E8'];
  return pattern.map((num, idx) => ({
    id: idx,
    color: colors[num],
    number: num + 1,
    filled: false
  }));
};

const paintings: Painting[] = [
  {
    id: 1,
    name: 'Кот',
    category: 'animals',
    difficulty: 3,
    emoji: '🐱',
    colors: [
      { number: 1, color: '#FFFFFF', name: 'Белый' },
      { number: 2, color: '#8B4513', name: 'Коричневый' },
      { number: 3, color: '#FFB366', name: 'Персиковый' },
      { number: 4, color: '#2C1810', name: 'Тёмно-коричневый' },
      { number: 5, color: '#F4DCC3', name: 'Светло-бежевый' },
      { number: 6, color: '#FFD4A3', name: 'Светло-оранжевый' },
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
      { number: 2, color: '#FF6B9D', name: 'Розовый' },
      { number: 3, color: '#FFB3D1', name: 'Светло-розовый' },
      { number: 4, color: '#FFD93D', name: 'Жёлтый' },
      { number: 5, color: '#FFF0B3', name: 'Светло-жёлтый' },
      { number: 6, color: '#6BCB77', name: 'Зелёный' },
      { number: 7, color: '#4D96FF', name: 'Голубой' },
      { number: 8, color: '#E8E8E8', name: 'Светло-серый' },
    ],
    zones: generateNotebookPattern()
  }
];

const categories = [
  { id: 'all', name: 'Все', icon: 'Palette' },
  { id: 'animals', name: 'Животные', icon: 'Cat' },
  { id: 'tech', name: 'Техника', icon: 'Monitor' },
  { id: 'nature', name: 'Природа', icon: 'Trees' },
  { id: 'study', name: 'Учёба', icon: 'BookOpen' },
];

export default function Index() {
  const [activePainting, setActivePainting] = useState<Painting | null>(null);
  const [selectedColor, setSelectedColor] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeTab, setActiveTab] = useState('daily');

  const filteredPaintings = activeCategory === 'all' 
    ? paintings 
    : paintings.filter(p => p.category === activeCategory);

  const startPainting = (painting: Painting) => {
    setActivePainting({
      ...painting,
      zones: painting.zones.map(z => ({ ...z, filled: false }))
    });
    setSelectedColor(null);
  };

  const fillZone = (zoneId: number) => {
    if (!activePainting || !selectedColor) return;
    
    setActivePainting({
      ...activePainting,
      zones: activePainting.zones.map(zone => 
        zone.id === zoneId && zone.number === selectedColor
          ? { ...zone, filled: true }
          : zone
      )
    });
  };

  const calculateProgress = () => {
    if (!activePainting) return 0;
    const filled = activePainting.zones.filter(z => z.filled).length;
    return Math.round((filled / activePainting.zones.length) * 100);
  };

  const getDifficultyStars = (difficulty: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icon 
        key={i} 
        name={i < difficulty ? "Star" : "Star"} 
        size={16}
        className={i < difficulty ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
      />
    ));
  };

  if (activePainting) {
    const progress = calculateProgress();
    
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 p-2 flex items-center justify-between px-4">
          <Button 
            size="icon"
            variant="ghost" 
            onClick={() => setActivePainting(null)}
            className="bg-white rounded-full hover:bg-gray-100"
          >
            <Icon name="ArrowLeft" size={24} className="text-gray-700" />
          </Button>
          
          <div className="flex-1 mx-4 bg-white/30 backdrop-blur rounded-full h-8 flex items-center px-3 gap-2">
            <Icon name="Palette" size={18} className="text-white" />
            <div className="flex-1 bg-white/50 rounded-full h-4">
              <div 
                className="bg-gradient-to-r from-green-500 to-blue-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-white font-bold text-sm">{progress}%</span>
          </div>
          
          <Button 
            size="icon"
            variant="ghost"
            className="bg-white rounded-full hover:bg-gray-100"
            onClick={() => startPainting(activePainting)}
          >
            <Icon name="RotateCcw" size={20} className="text-gray-700" />
          </Button>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-4 pb-32">
          <div className="bg-white rounded-3xl shadow-2xl p-6 max-w-2xl w-full">
            <div 
              className="grid gap-0 border-4 border-gray-800 rounded-lg overflow-hidden"
              style={{ 
                gridTemplateColumns: 'repeat(16, 1fr)',
                aspectRatio: '1/1'
              }}
            >
              {activePainting.zones.map((zone) => (
                <button
                  key={zone.id}
                  onClick={() => fillZone(zone.id)}
                  className={`
                    aspect-square border border-gray-200 transition-all duration-200 flex items-center justify-center
                    ${zone.filled 
                      ? 'hover:opacity-80' 
                      : 'hover:bg-yellow-100 active:bg-yellow-200'
                    }
                    ${selectedColor === zone.number && !zone.filled ? 'ring-2 ring-inset ring-yellow-400' : ''}
                  `}
                  style={{
                    backgroundColor: zone.filled ? zone.color : '#ffffff'
                  }}
                >
                  {!zone.filled && (
                    <span className="text-[10px] font-bold text-gray-600">
                      {zone.number}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-white border-t-4 border-gray-200 shadow-lg p-4">
          {progress === 100 ? (
            <div className="max-w-2xl mx-auto text-center py-4">
              <Icon name="Trophy" size={48} className="text-yellow-500 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Отлично! Картина готова!</h3>
              <Button className="w-full max-w-md bg-gradient-to-r from-purple-600 to-pink-600 text-lg py-6">
                <Icon name="Share2" size={20} />
                <span className="ml-2">Поделиться результатом</span>
              </Button>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto">
              <div className="flex gap-2 overflow-x-auto pb-2">
                {activePainting.colors.map((color) => {
                  const remaining = activePainting.zones.filter(z => z.number === color.number && !z.filled).length;
                  
                  return (
                    <button
                      key={color.number}
                      onClick={() => setSelectedColor(color.number)}
                      className={`
                        flex-shrink-0 relative transition-all duration-200
                        ${selectedColor === color.number 
                          ? 'scale-110 ring-4 ring-green-400' 
                          : 'hover:scale-105'
                        }
                        ${remaining === 0 ? 'opacity-40' : ''}
                      `}
                    >
                      <div 
                        className="w-16 h-16 rounded-2xl border-4 border-gray-300 shadow-lg flex items-center justify-center relative"
                        style={{ backgroundColor: color.color }}
                      >
                        <span className="text-2xl font-black text-gray-700 drop-shadow-[0_2px_2px_rgba(255,255,255,0.8)]">
                          {color.number}
                        </span>
                        {remaining > 0 && (
                          <div className="absolute -top-2 -right-2 bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold border-2 border-white">
                            {remaining}
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-orange-50 to-blue-50">
      <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center text-2xl">
                🎨
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Pixel Paint</h1>
                <p className="text-xs text-gray-600">Раскрашивай пиксель-арт по номерам</p>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center gap-6">
              <Button variant="ghost" className="hover-scale">
                <Icon name="Home" size={20} />
                <span className="ml-2">Главная</span>
              </Button>
              <Button variant="ghost" className="hover-scale">
                <Icon name="Camera" size={20} />
                <span className="ml-2">Создать</span>
              </Button>
              <Button variant="ghost" className="hover-scale">
                <Icon name="Users" size={20} />
                <span className="ml-2">Сообщество</span>
              </Button>
              <Button variant="ghost" className="hover-scale">
                <Icon name="User" size={20} />
                <span className="ml-2">Профиль</span>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <section className="mb-12 text-center animate-fade-in">
          <h2 className="text-5xl font-bold text-gray-800 mb-4">
            Создавай пиксель-арт
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600">
              по номерам
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            16×16 пикселей настоящего искусства! Раскрась и поделись с друзьями
          </p>
        </section>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 h-12">
            <TabsTrigger value="daily" className="text-base">
              <Icon name="Calendar" size={18} className="mr-2" />
              Ежедневные
            </TabsTrigger>
            <TabsTrigger value="popular" className="text-base">
              <Icon name="TrendingUp" size={18} className="mr-2" />
              Популярные
            </TabsTrigger>
            <TabsTrigger value="new" className="text-base">
              <Icon name="Sparkles" size={18} className="mr-2" />
              Новинки
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <Button
              key={cat.id}
              variant={activeCategory === cat.id ? "default" : "outline"}
              onClick={() => setActiveCategory(cat.id)}
              className={`
                hover-scale whitespace-nowrap
                ${activeCategory === cat.id 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600' 
                  : ''
                }
              `}
            >
              <Icon name={cat.icon as any} size={18} />
              <span className="ml-2">{cat.name}</span>
            </Button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPaintings.map((painting, index) => (
            <Card 
              key={painting.id}
              className="overflow-hidden hover-scale cursor-pointer animate-fade-in bg-white shadow-lg"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => startPainting(painting)}
            >
              <div className="aspect-square bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 flex items-center justify-center p-8">
                <div 
                  className="grid gap-0 w-full h-full border-2 border-gray-300 rounded-lg overflow-hidden"
                  style={{ gridTemplateColumns: 'repeat(16, 1fr)' }}
                >
                  {painting.zones.map((zone, idx) => (
                    <div
                      key={idx}
                      className="aspect-square"
                      style={{ backgroundColor: zone.color }}
                    />
                  ))}
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <span className="text-2xl">{painting.emoji}</span>
                    {painting.name}
                  </h3>
                  <Badge variant="secondary" className="text-xs">
                    16×16
                  </Badge>
                </div>
                <div className="flex items-center gap-1 mb-3">
                  {getDifficultyStars(painting.difficulty)}
                  <span className="text-xs text-gray-600 ml-2">
                    {painting.colors.length} цветов
                  </span>
                </div>
                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  <Icon name="Play" size={18} />
                  <span className="ml-2">Начать</span>
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {filteredPaintings.length === 0 && (
          <div className="text-center py-20 animate-fade-in">
            <Icon name="Palette" size={64} className="text-gray-300 mx-auto mb-4" />
            <p className="text-xl text-gray-500">Картин в этой категории пока нет</p>
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-gray-800 mb-4">О платформе</h4>
              <p className="text-sm text-gray-600">
                Pixel Paint — пиксель-арт платформа для раскрашивания по номерам
              </p>
            </div>
            <div>
              <h4 className="font-bold text-gray-800 mb-4">Категории</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Животные</li>
                <li>Техника</li>
                <li>Природа</li>
                <li>Учёба</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-800 mb-4">Возможности</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Создать из фото</li>
                <li>Сообщество</li>
                <li>Поделиться работами</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-800 mb-4">Социальные сети</h4>
              <div className="flex gap-3">
                <Button size="icon" variant="outline" className="hover-scale">
                  <Icon name="Share2" size={20} />
                </Button>
                <Button size="icon" variant="outline" className="hover-scale">
                  <Icon name="MessageCircle" size={20} />
                </Button>
              </div>
            </div>
          </div>
          <Separator className="mb-6" />
          <div className="text-center text-sm text-gray-600">
            © 2026 Pixel Paint. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}
