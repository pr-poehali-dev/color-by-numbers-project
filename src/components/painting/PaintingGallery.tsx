import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Painting, paintings, categories } from './types';

interface PaintingGalleryProps {
  onSelectPainting: (painting: Painting) => void;
}

export default function PaintingGallery({ onSelectPainting }: PaintingGalleryProps) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeTab, setActiveTab] = useState('daily');

  const filteredPaintings = activeCategory === 'all' 
    ? paintings 
    : paintings.filter(p => p.category === activeCategory);

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
              onClick={() => onSelectPainting(painting)}
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
