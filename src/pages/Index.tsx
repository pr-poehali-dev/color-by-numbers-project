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

const paintings: Painting[] = [
  {
    id: 1,
    name: 'Кот',
    category: 'animals',
    difficulty: 3,
    emoji: '🐱',
    colors: [
      { number: 1, color: '#FF6B35', name: 'Оранжевый' },
      { number: 2, color: '#FFD700', name: 'Жёлтый' },
      { number: 3, color: '#8B4513', name: 'Коричневый' },
      { number: 4, color: '#FFFFFF', name: 'Белый' },
    ],
    zones: [
      { id: 1, color: '#FF6B35', number: 1, filled: false },
      { id: 2, color: '#FF6B35', number: 1, filled: false },
      { id: 3, color: '#FFD700', number: 2, filled: false },
      { id: 4, color: '#8B4513', number: 3, filled: false },
      { id: 5, color: '#FFFFFF', number: 4, filled: false },
      { id: 6, color: '#FF6B35', number: 1, filled: false },
      { id: 7, color: '#FFD700', number: 2, filled: false },
      { id: 8, color: '#8B4513', number: 3, filled: false },
    ]
  },
  {
    id: 2,
    name: 'Кинокамера',
    category: 'tech',
    difficulty: 2,
    emoji: '🎥',
    colors: [
      { number: 1, color: '#2C3E50', name: 'Тёмно-синий' },
      { number: 2, color: '#E74C3C', name: 'Красный' },
      { number: 3, color: '#BDC3C7', name: 'Серый' },
    ],
    zones: [
      { id: 1, color: '#2C3E50', number: 1, filled: false },
      { id: 2, color: '#E74C3C', number: 2, filled: false },
      { id: 3, color: '#BDC3C7', number: 3, filled: false },
      { id: 4, color: '#2C3E50', number: 1, filled: false },
      { id: 5, color: '#BDC3C7', number: 3, filled: false },
      { id: 6, color: '#E74C3C', number: 2, filled: false },
    ]
  },
  {
    id: 3,
    name: 'Телевизор',
    category: 'tech',
    difficulty: 4,
    emoji: '📺',
    colors: [
      { number: 1, color: '#1A1A1A', name: 'Чёрный' },
      { number: 2, color: '#4A90E2', name: 'Синий' },
      { number: 3, color: '#7F8C8D', name: 'Серебристый' },
      { number: 4, color: '#E8E8E8', name: 'Светло-серый' },
    ],
    zones: [
      { id: 1, color: '#1A1A1A', number: 1, filled: false },
      { id: 2, color: '#4A90E2', number: 2, filled: false },
      { id: 3, color: '#7F8C8D', number: 3, filled: false },
      { id: 4, color: '#E8E8E8', number: 4, filled: false },
      { id: 5, color: '#1A1A1A', number: 1, filled: false },
      { id: 6, color: '#4A90E2', number: 2, filled: false },
      { id: 7, color: '#7F8C8D', number: 3, filled: false },
      { id: 8, color: '#E8E8E8', number: 4, filled: false },
      { id: 9, color: '#1A1A1A', number: 1, filled: false },
    ]
  },
  {
    id: 4,
    name: 'Тетрадь',
    category: 'study',
    difficulty: 5,
    emoji: '📓',
    colors: [
      { number: 1, color: '#FF6B9D', name: 'Розовый' },
      { number: 2, color: '#FFFFFF', name: 'Белый' },
      { number: 3, color: '#FFD93D', name: 'Жёлтый' },
      { number: 4, color: '#6BCB77', name: 'Зелёный' },
      { number: 5, color: '#4D96FF', name: 'Голубой' },
    ],
    zones: [
      { id: 1, color: '#FF6B9D', number: 1, filled: false },
      { id: 2, color: '#FFFFFF', number: 2, filled: false },
      { id: 3, color: '#FFD93D', number: 3, filled: false },
      { id: 4, color: '#6BCB77', number: 4, filled: false },
      { id: 5, color: '#4D96FF', number: 5, filled: false },
      { id: 6, color: '#FF6B9D', number: 1, filled: false },
      { id: 7, color: '#FFFFFF', number: 2, filled: false },
      { id: 8, color: '#FFD93D', number: 3, filled: false },
      { id: 9, color: '#6BCB77', number: 4, filled: false },
      { id: 10, color: '#4D96FF', number: 5, filled: false },
    ]
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
  const [selectedPainting, setSelectedPainting] = useState<Painting | null>(null);
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
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-orange-50 to-blue-50 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Button 
              variant="outline" 
              onClick={() => setActivePainting(null)}
              className="hover-scale"
            >
              <Icon name="ArrowLeft" size={20} />
              <span className="ml-2">Назад</span>
            </Button>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2 justify-center">
                <span className="text-4xl">{activePainting.emoji}</span>
                {activePainting.name}
              </h2>
              <div className="flex items-center gap-1 mt-1 justify-center">
                {getDifficultyStars(activePainting.difficulty)}
              </div>
            </div>
            <Button 
              variant="outline"
              className="hover-scale"
              onClick={() => startPainting(activePainting)}
            >
              <Icon name="RotateCcw" size={20} />
            </Button>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Прогресс</span>
              <span className="text-sm font-bold text-purple-600">{progress}%</span>
            </div>
            <Progress value={progress} className="h-3" />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card className="p-6 bg-white shadow-xl">
                <div className="grid grid-cols-4 gap-3">
                  {activePainting.zones.map((zone) => (
                    <button
                      key={zone.id}
                      onClick={() => fillZone(zone.id)}
                      className={`
                        aspect-square rounded-xl border-4 transition-all duration-300
                        ${zone.filled 
                          ? 'border-green-400 hover:scale-105' 
                          : 'border-gray-300 hover:border-purple-400 hover-scale'
                        }
                        ${selectedColor === zone.number && !zone.filled ? 'ring-4 ring-purple-400' : ''}
                      `}
                      style={{
                        backgroundColor: zone.filled ? zone.color : '#ffffff'
                      }}
                    >
                      {!zone.filled && (
                        <span className="text-2xl font-bold text-gray-700">
                          {zone.number}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </Card>
            </div>

            <div>
              <Card className="p-6 bg-white shadow-xl">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Icon name="Palette" size={24} className="text-purple-600" />
                  Палитра
                </h3>
                <div className="space-y-3">
                  {activePainting.colors.map((color) => (
                    <button
                      key={color.number}
                      onClick={() => setSelectedColor(color.number)}
                      className={`
                        w-full p-4 rounded-xl border-3 transition-all duration-200
                        flex items-center gap-3 hover-scale
                        ${selectedColor === color.number 
                          ? 'border-purple-600 ring-4 ring-purple-200 scale-105' 
                          : 'border-gray-200 hover:border-purple-300'
                        }
                      `}
                    >
                      <div 
                        className="w-12 h-12 rounded-lg border-2 border-gray-300"
                        style={{ backgroundColor: color.color }}
                      />
                      <div className="text-left flex-1">
                        <div className="font-bold text-gray-800">{color.number}</div>
                        <div className="text-sm text-gray-600">{color.name}</div>
                      </div>
                      {selectedColor === color.number && (
                        <Icon name="Check" size={24} className="text-purple-600" />
                      )}
                    </button>
                  ))}
                </div>

                {progress === 100 && (
                  <div className="mt-6 p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl text-center animate-scale-in">
                    <Icon name="Trophy" size={48} className="text-yellow-500 mx-auto mb-2" />
                    <h4 className="font-bold text-lg text-gray-800">Поздравляем!</h4>
                    <p className="text-sm text-gray-600 mb-4">Картина завершена</p>
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600">
                      <Icon name="Share2" size={18} />
                      <span className="ml-2">Поделиться</span>
                    </Button>
                  </div>
                )}
              </Card>
            </div>
          </div>
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
                <h1 className="text-2xl font-bold text-gray-800">ColorByNum</h1>
                <p className="text-xs text-gray-600">Раскрашивай по номерам</p>
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
            Создавай шедевры
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600">
              по номерам
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Выбери картину, раскрась по номерам и поделись результатом с друзьями
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
              <div className="aspect-square bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 flex items-center justify-center text-8xl">
                {painting.emoji}
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-800">{painting.name}</h3>
                  <Badge variant="secondary" className="text-xs">
                    {painting.colors.length} цветов
                  </Badge>
                </div>
                <div className="flex items-center gap-1 mb-3">
                  {getDifficultyStars(painting.difficulty)}
                  <span className="text-xs text-gray-600 ml-2">
                    Сложность {painting.difficulty}/5
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
                ColorByNum — творческая платформа для раскрашивания картин по номерам
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
            © 2026 ColorByNum. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}
