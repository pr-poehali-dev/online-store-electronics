import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  category: string;
  brand: string;
  price: number;
  originalPrice?: number;
  specs: string[];
  image: string;
  badge?: string;
  description?: string;
  detailedSpecs?: { label: string; value: string }[];
  images?: string[];
}

const products: Product[] = [
  {
    id: 1,
    name: 'NVIDIA GeForce RTX 4090',
    category: 'Видеокарты',
    brand: 'NVIDIA',
    price: 159990,
    originalPrice: 179990,
    specs: ['24GB GDDR6X', '16384 ядер CUDA', 'Ray Tracing'],
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400',
    badge: 'ХИТ',
    description: 'Топовая видеокарта NVIDIA GeForce RTX 4090 обеспечивает невероятную производительность для игр в 4K, рендеринга и AI-вычислений. Архитектура Ada Lovelace с технологией Ray Tracing 3-го поколения и DLSS 3.',
    images: [
      'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800',
      'https://images.unsplash.com/photo-1587202372616-b43abea06c2a?w=800',
      'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800&sat=-100'
    ],
    detailedSpecs: [
      { label: 'Объем памяти', value: '24 GB GDDR6X' },
      { label: 'Ядра CUDA', value: '16384' },
      { label: 'Частота GPU', value: '2.52 GHz' },
      { label: 'Шина памяти', value: '384-bit' },
      { label: 'TDP', value: '450W' },
      { label: 'Разъемы', value: '3x DisplayPort 1.4a, 1x HDMI 2.1' }
    ]
  },
  {
    id: 2,
    name: 'AMD Ryzen 9 7950X',
    category: 'Процессоры',
    brand: 'AMD',
    price: 54990,
    specs: ['16 ядер', '32 потока', '5.7 GHz'],
    image: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=400',
    badge: 'НОВИНКА'
  },
  {
    id: 3,
    name: 'Corsair Vengeance DDR5 64GB',
    category: 'Память',
    brand: 'Corsair',
    price: 24990,
    specs: ['64GB (2x32GB)', 'DDR5-6000', 'RGB'],
    image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=400'
  },
  {
    id: 4,
    name: 'Samsung 980 PRO 2TB',
    category: 'Накопители',
    brand: 'Samsung',
    price: 16990,
    originalPrice: 19990,
    specs: ['NVMe M.2', '7000 MB/s чтение', 'PCIe 4.0'],
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400'
  },
  {
    id: 5,
    name: 'MSI MAG B650 TOMAHAWK',
    category: 'Материнские платы',
    brand: 'MSI',
    price: 21990,
    specs: ['Socket AM5', 'DDR5', 'PCIe 5.0'],
    image: 'https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=400',
    badge: 'ХИТ'
  },
  {
    id: 6,
    name: 'be quiet! Dark Power 13 1000W',
    category: 'Блоки питания',
    brand: 'be quiet!',
    price: 19990,
    specs: ['1000W', '80 Plus Titanium', 'Модульный'],
    image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400'
  },
  {
    id: 7,
    name: 'NZXT H7 Flow',
    category: 'Корпуса',
    brand: 'NZXT',
    price: 12990,
    specs: ['Mid Tower', 'RGB', 'Закаленное стекло'],
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400'
  },
  {
    id: 8,
    name: 'Arctic Liquid Freezer II 360',
    category: 'Охлаждение',
    brand: 'Arctic',
    price: 13990,
    originalPrice: 15990,
    specs: ['360mm радиатор', 'RGB', 'LGA1700/AM5'],
    image: 'https://images.unsplash.com/photo-1593640495253-23196b27a87f?w=400',
    badge: 'НОВИНКА'
  }
];

const categories = ['Все', 'Видеокарты', 'Процессоры', 'Память', 'Накопители', 'Материнские платы', 'Блоки питания', 'Корпуса', 'Охлаждение'];
const brands = ['NVIDIA', 'AMD', 'Intel', 'Corsair', 'Samsung', 'MSI', 'ASUS', 'be quiet!', 'NZXT', 'Arctic'];

export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategory === 'Все' || product.category === selectedCategory;
    const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
    const brandMatch = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
    return categoryMatch && priceMatch && brandMatch;
  });

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  const toggleBrand = (brand: string) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter(b => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  const openProductDetail = (product: Product) => {
    setSelectedProduct(product);
    setSelectedImageIndex(0);
  };

  const closeProductDetail = () => {
    setSelectedProduct(null);
  };

  if (selectedProduct) {
    const productImages = selectedProduct.images || [selectedProduct.image];
    const relatedProducts = products
      .filter(p => p.category === selectedProduct.category && p.id !== selectedProduct.id)
      .slice(0, 4);

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/70 border-b border-slate-200/50 shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={closeProductDetail}
                  className="hover:scale-105 transition-transform"
                >
                  <Icon name="ArrowLeft" size={24} />
                </Button>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                  <Icon name="Zap" className="text-white" size={24} />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Knoc
                </h1>
              </div>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="lg" className="relative gap-2 hover:scale-105 transition-transform">
                    <Icon name="ShoppingCart" size={20} />
                    Корзина
                    {cart.length > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600">
                        {cart.length}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-lg animate-slide-in-right">
                  <SheetHeader>
                    <SheetTitle className="text-2xl">Корзина покупок</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 space-y-4">
                    {cart.length === 0 ? (
                      <div className="text-center py-12 text-muted-foreground">
                        <Icon name="ShoppingBag" size={48} className="mx-auto mb-4 opacity-50" />
                        <p>Корзина пуста</p>
                      </div>
                    ) : (
                      <>
                        {cart.map((item, index) => (
                          <Card key={`${item.id}-${index}`} className="overflow-hidden">
                            <CardContent className="p-4">
                              <div className="flex gap-4">
                                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                                <div className="flex-1">
                                  <h4 className="font-semibold text-sm mb-1">{item.name}</h4>
                                  <p className="text-lg font-bold text-blue-600">{item.price.toLocaleString('ru-RU')} ₽</p>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => removeFromCart(item.id)}
                                  className="hover:bg-destructive/10 hover:text-destructive"
                                >
                                  <Icon name="Trash2" size={18} />
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                        <div className="pt-4 border-t">
                          <div className="flex justify-between items-center mb-4">
                            <span className="text-lg font-semibold">Итого:</span>
                            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                              {cartTotal.toLocaleString('ru-RU')} ₽
                            </span>
                          </div>
                          <Button className="w-full h-12 text-base bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                            Оформить заказ
                            <Icon name="ArrowRight" className="ml-2" size={18} />
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <div className="space-y-4">
              <div className="relative overflow-hidden rounded-2xl bg-white shadow-2xl aspect-square">
                <img 
                  src={productImages[selectedImageIndex]} 
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                />
                {selectedProduct.badge && (
                  <Badge className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-red-500 shadow-lg text-base px-4 py-2">
                    {selectedProduct.badge}
                  </Badge>
                )}
              </div>
              {productImages.length > 1 && (
                <div className="flex gap-3">
                  {productImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`relative overflow-hidden rounded-lg w-24 h-24 border-2 transition-all hover:scale-105 ${
                        selectedImageIndex === idx 
                          ? 'border-blue-600 shadow-lg' 
                          : 'border-slate-200 opacity-60'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-6 animate-fade-in">
              <div>
                <Badge variant="outline" className="mb-3 text-sm">{selectedProduct.category}</Badge>
                <h1 className="text-4xl font-bold mb-2">{selectedProduct.name}</h1>
                <p className="text-lg text-slate-600 mb-4">{selectedProduct.brand}</p>
              </div>

              {selectedProduct.description && (
                <p className="text-slate-700 leading-relaxed">{selectedProduct.description}</p>
              )}

              <div className="flex items-end gap-3">
                <span className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {selectedProduct.price.toLocaleString('ru-RU')} ₽
                </span>
                {selectedProduct.originalPrice && (
                  <span className="text-2xl text-slate-400 line-through mb-2">
                    {selectedProduct.originalPrice.toLocaleString('ru-RU')} ₽
                  </span>
                )}
              </div>

              <div className="flex gap-3">
                <Button 
                  size="lg"
                  className="flex-1 h-14 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all"
                  onClick={() => addToCart(selectedProduct)}
                >
                  <Icon name="ShoppingCart" className="mr-2" size={22} />
                  В корзину
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="h-14 px-6 hover:scale-105 transition-transform"
                >
                  <Icon name="Heart" size={22} />
                </Button>
              </div>

              <Card className="backdrop-blur-sm bg-white/80 border-slate-200/50">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <Icon name="Package" size={20} />
                    Основные характеристики
                  </h3>
                  <div className="space-y-3">
                    {selectedProduct.specs.map((spec, i) => (
                      <div key={i} className="flex items-center gap-2 text-slate-700">
                        <Icon name="Check" size={16} className="text-green-600 flex-shrink-0" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {selectedProduct.detailedSpecs && (
                <Card className="backdrop-blur-sm bg-white/80 border-slate-200/50">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                      <Icon name="ListChecks" size={20} />
                      Детальные спецификации
                    </h3>
                    <div className="space-y-3">
                      {selectedProduct.detailedSpecs.map((spec, i) => (
                        <div key={i} className="flex justify-between py-2 border-b border-slate-100 last:border-0">
                          <span className="text-slate-600">{spec.label}</span>
                          <span className="font-semibold text-slate-900">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {relatedProducts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-3xl font-bold mb-8 text-center">Похожие товары</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map(product => (
                  <Card 
                    key={product.id}
                    className="group overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm bg-white/80 border-slate-200/50 cursor-pointer"
                    onClick={() => openProductDetail(product)}
                  >
                    <div className="relative overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold text-base mb-2 line-clamp-2">{product.name}</h3>
                      <p className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        {product.price.toLocaleString('ru-RU')} ₽
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/70 border-b border-slate-200/50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                <Icon name="Zap" className="text-white" size={24} />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Knoc
              </h1>
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="lg" className="relative gap-2 hover:scale-105 transition-transform">
                  <Icon name="ShoppingCart" size={20} />
                  Корзина
                  {cart.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600">
                      {cart.length}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-lg animate-slide-in-right">
                <SheetHeader>
                  <SheetTitle className="text-2xl">Корзина покупок</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  {cart.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <Icon name="ShoppingBag" size={48} className="mx-auto mb-4 opacity-50" />
                      <p>Корзина пуста</p>
                    </div>
                  ) : (
                    <>
                      {cart.map((item, index) => (
                        <Card key={`${item.id}-${index}`} className="overflow-hidden">
                          <CardContent className="p-4">
                            <div className="flex gap-4">
                              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                              <div className="flex-1">
                                <h4 className="font-semibold text-sm mb-1">{item.name}</h4>
                                <p className="text-lg font-bold text-blue-600">{item.price.toLocaleString('ru-RU')} ₽</p>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeFromCart(item.id)}
                                className="hover:bg-destructive/10 hover:text-destructive"
                              >
                                <Icon name="Trash2" size={18} />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                      <div className="pt-4 border-t">
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-lg font-semibold">Итого:</span>
                          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            {cartTotal.toLocaleString('ru-RU')} ₽
                          </span>
                        </div>
                        <Button className="w-full h-12 text-base bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                          Оформить заказ
                          <Icon name="ArrowRight" className="ml-2" size={18} />
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-cyan-600/10" />
        <div className="container mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto animate-fade-in">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
              Комплектующие для вашего ПК
            </h2>
            <p className="text-xl text-slate-600 mb-8">
              Мощные видеокарты, процессоры и всё необходимое для сборки компьютера мечты
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" className="h-14 px-8 text-base bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-105 transition-all shadow-lg shadow-blue-500/50">
                <Icon name="Sparkles" className="mr-2" size={20} />
                Новинки
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-base hover:scale-105 transition-transform">
                <Icon name="TrendingUp" className="mr-2" size={20} />
                Хиты продаж
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-20">
        <div className="flex gap-6">
          <aside className="w-80 flex-shrink-0 space-y-6 hidden lg:block">
            <Card className="p-6 backdrop-blur-sm bg-white/80 border-slate-200/50 shadow-lg">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Icon name="SlidersHorizontal" size={20} />
                Фильтры
              </h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3 text-sm text-slate-600">Категории</h4>
                  <div className="space-y-2">
                    {categories.map(cat => (
                      <Button
                        key={cat}
                        variant={selectedCategory === cat ? 'default' : 'ghost'}
                        className={`w-full justify-start ${selectedCategory === cat ? 'bg-gradient-to-r from-blue-600 to-purple-600' : ''}`}
                        onClick={() => setSelectedCategory(cat)}
                      >
                        {cat}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 text-sm text-slate-600">
                    Цена: {priceRange[0].toLocaleString()} - {priceRange[1].toLocaleString()} ₽
                  </h4>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={200000}
                    step={1000}
                    className="mb-2"
                  />
                </div>

                <div>
                  <h4 className="font-semibold mb-3 text-sm text-slate-600">Бренды</h4>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {brands.map(brand => (
                      <div key={brand} className="flex items-center space-x-2">
                        <Checkbox
                          id={brand}
                          checked={selectedBrands.includes(brand)}
                          onCheckedChange={() => toggleBrand(brand)}
                        />
                        <label htmlFor={brand} className="text-sm cursor-pointer">
                          {brand}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    setSelectedCategory('Все');
                    setPriceRange([0, 200000]);
                    setSelectedBrands([]);
                  }}
                >
                  <Icon name="X" className="mr-2" size={16} />
                  Сбросить фильтры
                </Button>
              </div>
            </Card>
          </aside>

          <main className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-slate-600">
                Найдено товаров: <span className="font-semibold text-slate-900">{filteredProducts.length}</span>
              </p>
              <Button variant="outline" size="sm" className="lg:hidden">
                <Icon name="SlidersHorizontal" className="mr-2" size={16} />
                Фильтры
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product, index) => (
                <Card 
                  key={product.id} 
                  className="group overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm bg-white/80 border-slate-200/50 animate-scale-in cursor-pointer"
                  style={{ animationDelay: `${index * 0.05}s` }}
                  onClick={() => openProductDetail(product)}
                >
                  <div className="relative overflow-hidden">
                    {product.badge && (
                      <Badge className="absolute top-3 right-3 z-10 bg-gradient-to-r from-orange-500 to-red-500 shadow-lg">
                        {product.badge}
                      </Badge>
                    )}
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <CardContent className="p-5">
                    <Badge variant="outline" className="mb-2">{product.category}</Badge>
                    <h3 className="font-bold text-lg mb-2 line-clamp-2">{product.name}</h3>
                    <div className="space-y-1 mb-4 text-xs text-slate-600">
                      {product.specs.map((spec, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <Icon name="Check" size={14} className="text-green-600" />
                          <span>{spec}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-end gap-2 mb-4">
                      <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        {product.price.toLocaleString('ru-RU')} ₽
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-slate-400 line-through mb-1">
                          {product.originalPrice.toLocaleString('ru-RU')} ₽
                        </span>
                      )}
                    </div>
                    <Button 
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 group-hover:shadow-lg transition-all"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                    >
                      <Icon name="ShoppingCart" className="mr-2" size={18} />
                      В корзину
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}