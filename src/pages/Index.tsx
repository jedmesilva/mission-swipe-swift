import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Clock, DollarSign, User, Heart, X, Star, Camera, Music, Code, Wrench, Book, Coffee, ChevronLeft, Share2, Bookmark, Navigation, MessageCircle, CheckCircle2, Filter, Search, Bell, TrendingUp, Zap, Award, Users, Eye, ChevronRight, ChevronUp, ChevronDown } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

const MissionsApp = () => {
  const [currentMission, setCurrentMission] = useState(0);
  const [acceptedMissions, setAcceptedMissions] = useState([]);
  const [savedMissions, setSavedMissions] = useState([]);
  const [showAccepted, setShowAccepted] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [cardPosition, setCardPosition] = useState({ x: 0, y: 0, rotation: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: 'all',
    distance: 'all',
    price: 'all'
  });

  const cardRef = useRef(null);
  const startPos = useRef({ x: 0, y: 0 });

  const missions = [
    {
      id: 1,
      category: 'Fotografia',
      categoryColor: 'bg-orange-500',
      title: 'Fotógrafo de Evento',
      description: 'Grave um vídeo de 2 minutos do show que está acontecendo na Praça da Liberdade agora',
      location: 'Praça da Liberdade',
      distance: '1.2 km',
      time: 'Próximas 2 horas',
      price: 'R$ 40,00',
      urgency: 'Urgente',
      difficulty: 'Fácil',
      matchScore: 95,
      viewCount: 127,
      client: {
        name: 'Carlos Santos',
        rating: 4.9,
        reviews: 127,
        avatar: '👨‍💼',
        verified: true,
        responseTime: '< 1h'
      },
      icon: Camera,
      tags: ['Evento', 'Vídeo', 'Ao vivo'],
      benefits: ['Pagamento rápido', 'Cliente frequente', 'Avaliação garantida']
    },
    {
      id: 2,
      category: 'Música',
      categoryColor: 'bg-orange-400',
      title: 'Aula de Violão',
      description: 'Preciso de aulas particulares de violão para iniciante, 1 hora por semana',
      location: 'Savassi',
      distance: '3.5 km',
      time: 'Flexível',
      price: 'R$ 60,00',
      urgency: 'Normal',
      difficulty: 'Médio',
      matchScore: 87,
      viewCount: 89,
      client: {
        name: 'Maria Silva',
        rating: 4.7,
        reviews: 89,
        avatar: '👩‍🎓',
        verified: true,
        responseTime: '< 2h'
      },
      icon: Music,
      tags: ['Aulas', 'Música', 'Iniciante'],
      benefits: ['Longo prazo', 'Flexibilidade de horário']
    },
    {
      id: 3,
      category: 'Tecnologia',
      categoryColor: 'bg-orange-600',
      title: 'Desenvolvimento Web',
      description: 'Criar landing page responsiva para pequena empresa local',
      location: 'Remoto',
      distance: 'Online',
      time: '1 semana',
      price: 'R$ 350,00',
      urgency: 'Normal',
      difficulty: 'Avançado',
      matchScore: 92,
      viewCount: 203,
      client: {
        name: 'João Ferreira',
        rating: 4.8,
        reviews: 203,
        avatar: '👨‍💻',
        verified: true,
        responseTime: '< 30min'
      },
      icon: Code,
      tags: ['Web', 'Landing Page', 'Responsivo'],
      benefits: ['Alto valor', 'Portfolio', 'Trabalho remoto']
    },
    {
      id: 4,
      category: 'Serviços',
      categoryColor: 'bg-orange-500',
      title: 'Montagem de Móveis',
      description: 'Montar guarda-roupa e cômoda que chegaram hoje da loja',
      location: 'Bairro Funcionários',
      distance: '2.1 km',
      time: 'Hoje',
      price: 'R$ 80,00',
      urgency: 'Urgente',
      difficulty: 'Médio',
      matchScore: 78,
      viewCount: 156,
      client: {
        name: 'Ana Costa',
        rating: 4.6,
        reviews: 156,
        avatar: '👩‍🔧',
        verified: false,
        responseTime: '< 3h'
      },
      icon: Wrench,
      tags: ['Montagem', 'Móveis', 'Urgente'],
      benefits: ['Pagamento na hora', 'Trabalho rápido']
    },
    {
      id: 5,
      category: 'Educação',
      categoryColor: 'bg-orange-400',
      title: 'Aula de Matemática',
      description: 'Reforço escolar em matemática para ensino médio, 2x por semana',
      location: 'Centro',
      distance: '4.2 km',
      time: 'Tardes livres',
      price: 'R$ 45,00/aula',
      urgency: 'Normal',
      difficulty: 'Médio',
      matchScore: 85,
      viewCount: 78,
      client: {
        name: 'Pedro Oliveira',
        rating: 4.9,
        reviews: 78,
        avatar: '👨‍🏫',
        verified: true,
        responseTime: '< 1h'
      },
      icon: Book,
      tags: ['Educação', 'Matemática', 'Reforço'],
      benefits: ['Recorrente', 'Impacto social', 'Horário flexível']
    }
  ];

  const showToastMessage = (message, type = 'success') => {
    setToastMessage({ text: message, type });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleSwipeGesture = (direction, distance) => {
    const threshold = 100;
    
    if (distance < threshold) return;
    
    switch (direction) {
      case 'right':
        handleAccept();
        break;
      case 'left':
        handleSkip();
        break;
      case 'up':
        setShowDetails(true);
        showToastMessage('Vendo detalhes da missão', 'info');
        break;
      case 'down':
        handleSaveForLater();
        break;
      default:
        break;
    }
  };

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    startPos.current = { x: touch.clientX, y: touch.clientY };
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    
    const touch = e.touches[0];
    const deltaX = touch.clientX - startPos.current.x;
    const deltaY = touch.clientY - startPos.current.y;
    
    setCardPosition({
      x: deltaX,
      y: deltaY,
      rotation: deltaX * 0.1
    });
  };

  const handleTouchEnd = (e) => {
    if (!isDragging) return;
    
    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - startPos.current.x;
    const deltaY = touch.clientY - startPos.current.y;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
    let direction = null;
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      direction = deltaX > 0 ? 'right' : 'left';
    } else {
      direction = deltaY > 0 ? 'down' : 'up';
    }
    
    handleSwipeGesture(direction, distance);
    
    setIsDragging(false);
    setCardPosition({ x: 0, y: 0, rotation: 0 });
  };

  const handleAccept = async () => {
    setIsLoading(true);
    const mission = missions[currentMission];
    
    setSwipeDirection('right');
    
    await new Promise(resolve => setTimeout(resolve, 300));
    
    setAcceptedMissions([...acceptedMissions, mission]);
    showToastMessage('Missão aceita! Cliente será notificado 🎉', 'success');
    setIsLoading(false);
    setSwipeDirection(null);
    nextMission();
  };

  const handleSkip = () => {
    setSwipeDirection('left');
    showToastMessage('Missão pulada', 'info');
    setTimeout(() => {
      setSwipeDirection(null);
      nextMission();
    }, 300);
  };

  const handleSaveForLater = () => {
    const mission = missions[currentMission];
    setSavedMissions([...savedMissions, mission]);
    showToastMessage('Missão salva para depois 📌', 'info');
    nextMission();
  };

  const nextMission = () => {
    setCurrentMission((prev) => (prev + 1) % missions.length);
    setCardPosition({ x: 0, y: 0, rotation: 0 });
  };

  const mission = missions[currentMission];
  const IconComponent = mission.icon;

  // Enhanced Toast Component
  const Toast = ({ message, show }) => (
    <div className={`fixed top-20 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ${
      show ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-full opacity-0 scale-95'
    }`}>
      <div className={`px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border backdrop-blur-md ${
        message.type === 'success' ? 'bg-orange-500/20 dark:bg-orange-500/30 border-orange-300/30 text-orange-800 dark:text-orange-200' :
        message.type === 'info' ? 'bg-blue-500/20 dark:bg-blue-500/30 border-blue-300/30 text-blue-800 dark:text-blue-200' :
        'bg-white/20 dark:bg-black/30 border-gray-300/30 text-gray-800 dark:text-gray-200'
      }`}>
        {message.type === 'success' && <CheckCircle2 className="w-5 h-5 text-orange-600 dark:text-orange-400" />}
        {message.type === 'info' && <Eye className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
        <span className="font-medium">{message.text}</span>
      </div>
    </div>
  );

  // Quick Stats Component
  const QuickStats = () => (
    <div className="flex gap-4 mb-6">
      <div className="flex-1 bg-white/10 dark:bg-black/20 rounded-2xl p-4 backdrop-blur-md border border-white/20 dark:border-white/10">
        <div className="flex items-center gap-2 mb-1">
          <TrendingUp className="w-4 h-4 text-orange-300 dark:text-orange-400" />
          <span className="text-orange-100 dark:text-orange-200 text-sm font-medium">Match</span>
        </div>
        <p className="text-2xl font-bold text-white">{mission.matchScore}%</p>
      </div>
      <div className="flex-1 bg-white/10 dark:bg-black/20 rounded-2xl p-4 backdrop-blur-md border border-white/20 dark:border-white/10">
        <div className="flex items-center gap-2 mb-1">
          <Users className="w-4 h-4 text-orange-300 dark:text-orange-400" />
          <span className="text-orange-100 dark:text-orange-200 text-sm font-medium">Interessados</span>
        </div>
        <p className="text-2xl font-bold text-white">{mission.viewCount}</p>
      </div>
    </div>
  );

  // Details Modal Component
  const DetailsModal = () => (
    <div className={`fixed inset-0 z-50 transition-all duration-300 ${showDetails ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="absolute inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm" onClick={() => setShowDetails(false)} />
      <div className={`absolute bottom-0 left-0 right-0 bg-white/90 dark:bg-black/90 backdrop-blur-md rounded-t-3xl p-6 transition-transform duration-300 border-t border-white/20 dark:border-white/10 ${showDetails ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="w-12 h-1 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto mb-6" />
        <div className="max-h-96 overflow-y-auto">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Detalhes da Missão</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Descrição Completa</h4>
              <p className="text-gray-600 dark:text-gray-400">{mission.description}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Requisitos</h4>
              <ul className="text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Equipamento próprio necessário</li>
                <li>• Experiência mínima de 1 ano</li>
                <li>• Disponibilidade imediata</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Cliente</h4>
              <p className="text-gray-600 dark:text-gray-400">
                {mission.client.name} • {mission.client.rating} ⭐ • {mission.client.reviews} avaliações
              </p>
            </div>
          </div>
        </div>
        <button 
          onClick={() => setShowDetails(false)}
          className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-2xl font-semibold transition-colors"
        >
          Fechar
        </button>
      </div>
    </div>
  );

  // Filters Modal
  const FiltersModal = () => (
    <div className={`fixed inset-0 z-50 transition-all duration-300 ${showFilters ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="absolute inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm" onClick={() => setShowFilters(false)} />
      <div className={`absolute bottom-0 left-0 right-0 bg-white/90 dark:bg-black/90 backdrop-blur-md rounded-t-3xl p-6 transition-transform duration-300 border-t border-white/20 dark:border-white/10 ${showFilters ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="w-12 h-1 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto mb-6" />
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Filtros</h3>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Categoria</label>
            <div className="flex flex-wrap gap-2">
              {['all', 'Fotografia', 'Música', 'Tecnologia', 'Serviços', 'Educação'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilters({...filters, category: cat})}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    filters.category === cat 
                      ? 'bg-orange-500 text-white' 
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {cat === 'all' ? 'Todas' : cat}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex gap-4">
            <button 
              onClick={() => setShowFilters(false)}
              className="flex-1 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 rounded-2xl font-semibold transition-colors"
            >
              Cancelar
            </button>
            <button 
              onClick={() => setShowFilters(false)}
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-2xl font-semibold transition-colors"
            >
              Aplicar Filtros
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  if (showAccepted) {
    return (
      <div className="max-w-md mx-auto bg-gradient-to-br from-orange-50/50 to-red-50/50 dark:from-gray-900 dark:to-black min-h-screen">
        <div className="bg-gradient-to-r from-orange-500/90 to-red-500/90 dark:from-orange-600/90 dark:to-red-600/90 backdrop-blur-md p-6 pt-12 text-white border-b border-white/20 dark:border-white/10">
          <div className="flex items-center gap-4 mb-4">
            <button 
              onClick={() => setShowAccepted(false)}
              className="p-2 bg-white/10 dark:bg-black/20 hover:bg-white/20 dark:hover:bg-black/30 rounded-full transition-colors backdrop-blur-sm border border-white/20 dark:border-white/10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="flex-1">
              <h1 className="text-xl font-bold">Minhas Missões</h1>
              <p className="text-orange-100 dark:text-orange-200 text-sm">{acceptedMissions.length} missões aceitas</p>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-4 -mt-4">
          {acceptedMissions.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-100/50 to-red-100/50 dark:from-orange-500/20 dark:to-red-500/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border border-orange-200/30 dark:border-orange-500/30">
                <Heart className="w-8 h-8 text-orange-500 dark:text-orange-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Nenhuma missão ainda</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Aceite missões para começar a trabalhar</p>
            </div>
          ) : (
            acceptedMissions.map((acceptedMission, index) => (
              <div key={acceptedMission.id} className="bg-white/80 dark:bg-black/50 backdrop-blur-md rounded-3xl p-5 shadow-sm border border-gray-100/50 dark:border-white/10 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className={`p-3 ${acceptedMission.categoryColor} rounded-2xl shadow-lg`}>
                    <acceptedMission.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-gray-800 dark:text-white text-lg">{acceptedMission.title}</h3>
                      <span className="bg-orange-100/80 dark:bg-orange-500/20 text-orange-700 dark:text-orange-300 px-3 py-1 rounded-full text-xs font-medium">
                        Aceita
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                      <span className="text-gray-600 dark:text-gray-300 text-sm">{acceptedMission.location}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-orange-600 dark:text-orange-400 font-bold text-xl">{acceptedMission.price}</span>
                      <button className="text-orange-600 dark:text-orange-400 font-medium text-sm flex items-center gap-1 hover:text-orange-700 dark:hover:text-orange-300">
                        Ver detalhes <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }

  if (showSaved) {
    return (
      <div className="max-w-md mx-auto bg-gradient-to-br from-orange-50/50 to-red-50/50 dark:from-gray-900 dark:to-black min-h-screen">
        <div className="bg-gradient-to-r from-blue-500/90 to-purple-500/90 dark:from-blue-600/90 dark:to-purple-600/90 backdrop-blur-md p-6 pt-12 text-white border-b border-white/20 dark:border-white/10">
          <div className="flex items-center gap-4 mb-4">
            <button 
              onClick={() => setShowSaved(false)}
              className="p-2 bg-white/10 dark:bg-black/20 hover:bg-white/20 dark:hover:bg-black/30 rounded-full transition-colors backdrop-blur-sm border border-white/20 dark:border-white/10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="flex-1">
              <h1 className="text-xl font-bold">Salvas para Depois</h1>
              <p className="text-blue-100 dark:text-blue-200 text-sm">{savedMissions.length} missões salvas</p>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-4 -mt-4">
          {savedMissions.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100/50 to-purple-100/50 dark:from-blue-500/20 dark:to-purple-500/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-200/30 dark:border-blue-500/30">
                <Bookmark className="w-8 h-8 text-blue-500 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Nenhuma missão salva</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Deslize para baixo para salvar missões</p>
            </div>
          ) : (
            savedMissions.map((savedMission, index) => (
              <div key={savedMission.id} className="bg-white/80 dark:bg-black/50 backdrop-blur-md rounded-3xl p-5 shadow-sm border border-gray-100/50 dark:border-white/10 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className={`p-3 ${savedMission.categoryColor} rounded-2xl shadow-lg`}>
                    <savedMission.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-gray-800 dark:text-white text-lg">{savedMission.title}</h3>
                      <span className="bg-blue-100/80 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-medium">
                        Salva
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                      <span className="text-gray-600 dark:text-gray-300 text-sm">{savedMission.location}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-orange-600 dark:text-orange-400 font-bold text-xl">{savedMission.price}</span>
                      <button className="text-blue-600 dark:text-blue-400 font-medium text-sm flex items-center gap-1 hover:text-blue-700 dark:hover:text-blue-300">
                        Ver detalhes <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-gradient-to-br from-orange-50/50 to-red-50/50 dark:from-gray-900 dark:to-black min-h-screen relative overflow-hidden">
      <Toast message={toastMessage} show={showToast} />
      <FiltersModal />
      <DetailsModal />
      
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-orange-500/90 via-orange-600/90 to-red-500/90 dark:from-orange-600/90 dark:via-orange-700/90 dark:to-red-600/90 backdrop-blur-md p-6 pt-12 text-white relative overflow-hidden border-b border-white/20 dark:border-white/10">
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 dark:bg-white/10 rounded-full -translate-y-20 translate-x-20"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 dark:bg-white/10 rounded-full translate-y-16 -translate-x-16"></div>
        <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-white/20 dark:bg-white/30 rounded-full"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-white/30 dark:bg-white/50 rounded-full"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold mb-1">Bom dia! 🌅</h1>
              <p className="text-orange-100 dark:text-orange-200">Suas melhores oportunidades te esperam</p>
            </div>
            <div className="flex gap-2">
              <ThemeToggle />
              <button 
                onClick={() => setShowFilters(true)}
                className="p-3 bg-white/10 dark:bg-black/20 backdrop-blur-md rounded-full hover:bg-white/20 dark:hover:bg-black/30 transition-all duration-200 hover:scale-105 border border-white/20 dark:border-white/10"
              >
                <Filter className="w-5 h-5" />
              </button>
              <button className="p-3 bg-white/10 dark:bg-black/20 backdrop-blur-md rounded-full hover:bg-white/20 dark:hover:bg-black/30 transition-all duration-200 hover:scale-105 relative border border-white/20 dark:border-white/10">
                <Bell className="w-5 h-5" />
                <div className="absolute top-2 right-2 w-2 h-2 bg-red-400 rounded-full"></div>
              </button>
              <button 
                onClick={() => setShowAccepted(true)}
                className="p-3 bg-white/10 dark:bg-black/20 backdrop-blur-md rounded-full hover:bg-white/20 dark:hover:bg-black/30 transition-all duration-200 hover:scale-105 relative border border-white/20 dark:border-white/10"
              >
                <Heart className="w-5 h-5" />
                {acceptedMissions.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold animate-pulse">
                    {acceptedMissions.length}
                  </span>
                )}
              </button>
              <button 
                onClick={() => setShowSaved(true)}
                className="p-3 bg-white/10 dark:bg-black/20 backdrop-blur-md rounded-full hover:bg-white/20 dark:hover:bg-black/30 transition-all duration-200 hover:scale-105 relative border border-white/20 dark:border-white/10"
              >
                <Bookmark className="w-5 h-5" />
                {savedMissions.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold animate-pulse">
                    {savedMissions.length}
                  </span>
                )}
              </button>
            </div>
          </div>

          <QuickStats />

          {/* Enhanced Progress */}
          <div className="flex items-center gap-3 mb-2">
            <div className="flex-1 bg-white/10 dark:bg-black/20 rounded-full h-2 overflow-hidden backdrop-blur-sm border border-white/20 dark:border-white/10">
              <div 
                className="bg-white rounded-full h-2 transition-all duration-500 ease-out shadow-sm"
                style={{ width: `${((currentMission + 1) / missions.length) * 100}%` }}
              ></div>
            </div>
            <span className="text-orange-100 dark:text-orange-200 text-sm font-medium bg-white/10 dark:bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm border border-white/20 dark:border-white/10">
              {currentMission + 1}/{missions.length}
            </span>
          </div>
        </div>
      </div>

      {/* Enhanced Mission Card */}
      <div className="px-6 -mt-8 relative z-10">
        <div 
          ref={cardRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className={`bg-white/80 dark:bg-black/50 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-gray-100/50 dark:border-white/10 transition-all duration-300 ${
            swipeDirection === 'right' ? 'transform translate-x-full rotate-12 opacity-0' :
            swipeDirection === 'left' ? 'transform -translate-x-full -rotate-12 opacity-0' :
            'transform translate-x-0 rotate-0 opacity-100'
          }`}
          style={{
            transform: `translate(${cardPosition.x}px, ${cardPosition.y}px) rotate(${cardPosition.rotation}deg)`
          }}
        >
          
          {/* Card Header with Match Score */}
          <div className="relative">
            <div className="absolute top-4 right-4 z-10">
              <div className="bg-orange-500/90 dark:bg-orange-600/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 border border-orange-400/30">
                <Zap className="w-4 h-4" />
                {mission.matchScore}% match
              </div>
            </div>
            
            <div className="p-6 pb-4">
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-4 ${mission.categoryColor} rounded-2xl shadow-lg`}>
                  <IconComponent className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <span className={`px-3 py-1 ${mission.categoryColor} bg-opacity-15 text-gray-700 dark:text-gray-300 rounded-full text-sm font-semibold`}>
                    {mission.category}
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <Eye className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                    <span className="text-gray-500 dark:text-gray-400 text-sm">{mission.viewCount} interessados</span>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-3 leading-tight">{mission.title}</h2>
              
              {/* Enhanced Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {mission.tags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-gradient-to-r from-orange-100/80 to-red-100/80 dark:from-orange-500/20 dark:to-red-500/20 text-orange-700 dark:text-orange-300 rounded-xl text-sm font-medium border border-orange-200/50 dark:border-orange-500/30 backdrop-blur-sm">
                    {tag}
                  </span>
                ))}
              </div>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 text-base">
                {mission.description}
              </p>

              {/* Enhanced Info Grid */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-4 p-3 bg-gradient-to-r from-orange-50/80 to-red-50/80 dark:from-orange-500/10 dark:to-red-500/10 rounded-2xl border border-orange-100/50 dark:border-orange-500/20 backdrop-blur-sm">
                  <div className="p-2 bg-orange-100/80 dark:bg-orange-500/20 rounded-xl backdrop-blur-sm">
                    <MapPin className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div className="flex-1">
                    <span className="text-gray-800 dark:text-white font-semibold">{mission.location}</span>
                    <div className="text-gray-500 dark:text-gray-400 text-sm">{mission.distance} de distância</div>
                  </div>
                  <Navigation className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-3 p-3 bg-blue-50/80 dark:bg-blue-500/10 rounded-2xl backdrop-blur-sm border border-blue-100/50 dark:border-blue-500/20">
                    <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <div>
                      <div className="text-gray-800 dark:text-white font-semibold text-sm">{mission.time}</div>
                      <span className={`text-xs font-medium ${
                        mission.urgency === 'Urgente' ? 'text-red-600 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        {mission.urgency}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-orange-50/80 to-red-50/80 dark:from-orange-500/10 dark:to-red-500/10 rounded-2xl backdrop-blur-sm border border-orange-100/50 dark:border-orange-500/20">
                    <div className="text-orange-600 dark:text-orange-400 font-bold text-lg">R$</div>
                    <div>
                      <div className="text-xl font-bold text-gray-800 dark:text-white">{mission.price.replace('R$ ', '')}</div>
                      <span className={`text-xs font-medium ${
                        mission.difficulty === 'Fácil' ? 'text-green-600 dark:text-green-400' :
                        mission.difficulty === 'Médio' ? 'text-yellow-600 dark:text-yellow-400' :
                        'text-red-600 dark:text-red-400'
                      }`}>
                        {mission.difficulty}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Benefits Section */}
              {mission.benefits && (
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-1">
                    <Award className="w-4 h-4" />
                    Vantagens desta missão
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {mission.benefits.map((benefit, index) => (
                      <span key={index} className="px-2 py-1 bg-orange-50/80 dark:bg-orange-500/10 text-orange-700 dark:text-orange-300 rounded-lg text-xs font-medium backdrop-blur-sm border border-orange-200/50 dark:border-orange-500/30">
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Enhanced Client Info */}
              <div className="bg-gradient-to-r from-gray-50/80 to-gray-100/80 dark:from-gray-800/50 dark:to-gray-900/50 rounded-2xl p-4 border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-orange-200/80 to-red-200/80 dark:from-orange-500/30 dark:to-red-500/30 rounded-full flex items-center justify-center text-2xl backdrop-blur-sm border border-orange-300/30 dark:border-orange-500/30">
                      {mission.client.avatar}
                    </div>
                    {mission.client.verified && (
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-800">
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-bold text-gray-800 dark:text-white">{mission.client.name}</p>
                      {mission.client.verified && (
                        <span className="text-orange-500 dark:text-orange-400 text-xs font-medium">Verificado</span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold text-gray-700 dark:text-gray-300">{mission.client.rating}</span>
                        <span className="text-gray-500 dark:text-gray-400">({mission.client.reviews})</span>
                      </div>
                      <span className="text-gray-400 dark:text-gray-500">•</span>
                      <span className="text-orange-600 dark:text-orange-400 font-medium">Responde {mission.client.responseTime}</span>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-white/50 dark:hover:bg-black/30 rounded-full transition-colors backdrop-blur-sm">
                    <MessageCircle className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                  </button>
                </div>
              </div>
            </div>

            {/* Enhanced Action Buttons */}
            <div className="p-6 pt-0">
              <div className="flex gap-4">
                <button 
                  onClick={handleSkip}
                  className="flex-1 bg-white/80 dark:bg-black/30 hover:bg-white dark:hover:bg-black/50 transition-all duration-200 text-gray-700 dark:text-gray-300 rounded-2xl py-4 flex items-center justify-center gap-2 text-lg font-semibold border-2 border-gray-200/50 dark:border-gray-600/50 hover:border-gray-300 dark:hover:border-gray-500 hover:scale-105 transform backdrop-blur-sm"
                >
                  <X className="w-6 h-6" />
                  Pular
                </button>
                
                <button 
                  onClick={handleAccept}
                  disabled={isLoading}
                  className="flex-1 bg-gradient-to-r from-orange-500/90 to-red-500/90 dark:from-orange-600/90 dark:to-red-600/90 hover:from-orange-600 hover:to-red-600 dark:hover:from-orange-700 dark:hover:to-red-700 transition-all duration-200 text-white rounded-2xl py-4 flex items-center justify-center gap-2 text-lg font-bold shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 backdrop-blur-sm border border-orange-400/30 dark:border-orange-500/30"
                >
                  {isLoading ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Heart className="w-6 h-6" />
                  )}
                  {isLoading ? 'Conectando...' : 'Aceitar Missão'}
                </button>
              </div>
              
              {/* Enhanced Quick action hint */}
              <div className="text-center mt-4">
                <div className="flex justify-center gap-4 text-xs text-gray-400 dark:text-gray-500">
                  <div className="flex items-center gap-1">
                    <ChevronRight className="w-3 h-3" />
                    <span>aceitar</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ChevronLeft className="w-3 h-3" />
                    <span>pular</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ChevronUp className="w-3 h-3" />
                    <span>detalhes</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ChevronDown className="w-3 h-3" />
                    <span>salvar</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom spacing */}
      <div className="h-8"></div>
    </div>
  );
};

export default MissionsApp;
