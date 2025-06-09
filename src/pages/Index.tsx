import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Clock, DollarSign, User, Heart, X, Star, Camera, Music, Code, Wrench, Book, Coffee, ChevronLeft, Share2, Bookmark, Navigation, MessageCircle, CheckCircle2, Filter, Search, Bell, TrendingUp, Zap, Award, Users, Eye, ChevronRight, ChevronUp } from 'lucide-react';

const MissionsApp = () => {
  const [currentMission, setCurrentMission] = useState(0);
  const [acceptedMissions, setAcceptedMissions] = useState([]);
  const [savedMissions, setSavedMissions] = useState([]);
  const [showAccepted, setShowAccepted] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState({ text: '', type: 'success' });
  const [isLoading, setIsLoading] = useState(false);
  const [cardPosition, setCardPosition] = useState({ x: 0, y: 0, rotation: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);
  const [filters, setFilters] = useState({
    category: 'all',
    distance: 'all',
    price: 'all'
  });
  
  const missions = [
    {
      id: 1,
      category: 'Fotografia',
      categoryColor: 'bg-gradient-to-br from-orange-500 to-orange-600',
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
      benefits: ['Pagamento rápido', 'Cliente frequente', 'Avaliação garantida'],
      fullDescription: 'Estou organizando um evento na Praça da Liberdade e preciso de um profissional para gravar momentos importantes. O evento começou há pouco e precisamos de cobertura por aproximadamente 2 horas. Material próprio é um diferencial, mas temos equipamento disponível se necessário.',
      requirements: ['Experiência com eventos', 'Disponibilidade imediata', 'Portfolio de vídeos'],
      deliverables: ['Vídeo editado de 2 minutos', 'Material bruto', 'Entrega em 24h']
    },
    {
      id: 2,
      category: 'Música',
      categoryColor: 'bg-gradient-to-br from-orange-400 to-orange-500',
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
      benefits: ['Longo prazo', 'Flexibilidade de horário'],
      fullDescription: 'Sou completamente iniciante e gostaria de aprender violão do zero. Busco um professor paciente que possa me ensinar desde os fundamentos. Prefiro aulas presenciais em casa.',
      requirements: ['Paciência com iniciantes', 'Método de ensino', 'Violão próprio'],
      deliverables: ['Aula semanal de 1h', 'Material didático', 'Acompanhamento']
    },
    {
      id: 3,
      category: 'Tecnologia',
      categoryColor: 'bg-gradient-to-br from-orange-600 to-orange-700',
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
      benefits: ['Alto valor', 'Portfolio', 'Trabalho remoto'],
      fullDescription: 'Preciso de uma landing page moderna e responsiva para minha empresa de consultoria. O projeto inclui design, desenvolvimento e otimização para conversão.',
      requirements: ['React/HTML/CSS', 'Design responsivo', 'SEO básico'],
      deliverables: ['Landing page completa', 'Código fonte', 'Deploy']
    },
    {
      id: 4,
      category: 'Serviços',
      categoryColor: 'bg-gradient-to-br from-orange-500 to-red-600',
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
      benefits: ['Pagamento na hora', 'Trabalho rápido'],
      fullDescription: 'Comprei móveis novos que chegaram hoje e preciso montar urgentemente. São um guarda-roupa de 6 portas e uma cômoda. Tenho todas as ferramentas necessárias.',
      requirements: ['Experiência com montagem', 'Ferramentas próprias', 'Disponibilidade hoje'],
      deliverables: ['Móveis montados', 'Limpeza do local', 'Garantia do serviço']
    },
    {
      id: 5,
      category: 'Educação',
      categoryColor: 'bg-gradient-to-br from-orange-400 to-orange-600',
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
      benefits: ['Recorrente', 'Impacto social', 'Horário flexível'],
      fullDescription: 'Meu filho está no 2º ano do ensino médio e precisa de reforço em matemática. Busco um professor que possa ajudá-lo com álgebra e geometria.',
      requirements: ['Formação em matemática', 'Experiência com adolescentes', 'Paciência'],
      deliverables: ['2 aulas semanais', 'Exercícios extras', 'Relatórios de progresso']
    }
  ];

  // Gesture handling functions
  const handleTouchStart = (e) => {
    if (!isDragging) {
      const touch = e.touches[0];
      setDragStart({ x: touch.clientX, y: touch.clientY });
      setIsDragging(true);
    }
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    
    e.preventDefault();
    const touch = e.touches[0];
    const deltaX = touch.clientX - dragStart.x;
    const deltaY = touch.clientY - dragStart.y;
    
    const rotation = deltaX * 0.1;
    
    setCardPosition({
      x: deltaX,
      y: deltaY,
      rotation: Math.max(-15, Math.min(15, rotation))
    });
  };

  const handleTouchEnd = (e) => {
    if (!isDragging) return;
    
    setIsDragging(false);
    const deltaX = cardPosition.x;
    const deltaY = cardPosition.y;
    const threshold = 100;
    
    if (Math.abs(deltaX) > threshold || Math.abs(deltaY) > threshold) {
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > threshold) {
          handleAccept();
        } else if (deltaX < -threshold) {
          handleSkip();
        }
      } else {
        if (deltaY < -threshold) {
          handleShowDetails();
        } else if (deltaY > threshold) {
          handleSaveLater();
        }
      }
    } else {
      setCardPosition({ x: 0, y: 0, rotation: 0 });
    }
  };

  const handleMouseDown = (e) => {
    setDragStart({ x: e.clientX, y: e.clientY });
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;
    
    const rotation = deltaX * 0.1;
    
    setCardPosition({
      x: deltaX,
      y: deltaY,
      rotation: Math.max(-15, Math.min(15, rotation))
    });
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    
    setIsDragging(false);
    const deltaX = cardPosition.x;
    const deltaY = cardPosition.y;
    const threshold = 100;
    
    if (Math.abs(deltaX) > threshold || Math.abs(deltaY) > threshold) {
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > threshold) {
          handleAccept();
        } else if (deltaX < -threshold) {
          handleSkip();
        }
      } else {
        if (deltaY < -threshold) {
          handleShowDetails();
        } else if (deltaY > threshold) {
          handleSaveLater();
        }
      }
    } else {
      setCardPosition({ x: 0, y: 0, rotation: 0 });
    }
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragStart]);

  const showToastMessage = (message, type = 'success') => {
    setToastMessage({ text: message, type });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
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

  const handleShowDetails = () => {
    setShowDetails(true);
    showToastMessage('Visualizando detalhes completos', 'info');
  };

  const handleSaveLater = () => {
    const mission = missions[currentMission];
    setSavedMissions([...savedMissions, mission]);
    setSwipeDirection('down');
    showToastMessage('Missão salva para depois! 📌', 'success');
    setTimeout(() => {
      setSwipeDirection(null);
      nextMission();
    }, 300);
  };

  const nextMission = () => {
    setCurrentMission((prev) => (prev + 1) % missions.length);
    setCardPosition({ x: 0, y: 0, rotation: 0 });
  };

  const mission = missions[currentMission];
  const IconComponent = mission.icon;

  // Enhanced Glass Morphism Toast Component
  const Toast = ({ message, show }) => (
    <div className={`fixed top-20 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ${
      show ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-full opacity-0 scale-95'
    }`}>
      <div className={`px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border backdrop-blur-xl ${
        message.type === 'success' ? 'bg-orange-500/20 border-orange-300/30 text-white' :
        message.type === 'info' ? 'bg-black/30 border-white/20 text-white' :
        'bg-black/30 border-white/20 text-white'
      }`}>
        {message.type === 'success' && <CheckCircle2 className="w-5 h-5 text-orange-300" />}
        {message.type === 'info' && <Eye className="w-5 h-5 text-white/80" />}
        <span className="font-medium">{message.text}</span>
      </div>
    </div>
  );

  // Glass Morphism Stats Component
  const QuickStats = () => (
    <div className="flex gap-4 mb-6">
      <div className="flex-1 bg-black/20 rounded-2xl p-4 backdrop-blur-xl border border-white/10">
        <div className="flex items-center gap-2 mb-1">
          <TrendingUp className="w-4 h-4 text-orange-400" />
          <span className="text-white/90 text-sm font-medium">Match</span>
        </div>
        <p className="text-2xl font-bold text-white">{mission.matchScore}%</p>
      </div>
      <div className="flex-1 bg-black/20 rounded-2xl p-4 backdrop-blur-xl border border-white/10">
        <div className="flex items-center gap-2 mb-1">
          <Users className="w-4 h-4 text-orange-400" />
          <span className="text-white/90 text-sm font-medium">Interessados</span>
        </div>
        <p className="text-2xl font-bold text-white">{mission.viewCount}</p>
      </div>
    </div>
  );

  // Enhanced Glass Details Modal
  const DetailsModal = () => (
    <div className={`fixed inset-0 z-50 transition-all duration-300 ${showDetails ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowDetails(false)} />
      <div className={`absolute bottom-0 left-0 right-0 bg-black/30 backdrop-blur-2xl border-t border-white/20 rounded-t-3xl max-h-[85vh] overflow-y-auto transition-transform duration-300 ${showDetails ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="p-6">
          <div className="w-12 h-1 bg-white/30 rounded-full mx-auto mb-6" />
          
          <div className="flex items-center gap-4 mb-6">
            <div className={`p-3 ${mission.categoryColor} rounded-2xl backdrop-blur-xl`}>
              <IconComponent className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-white">{mission.title}</h2>
              <p className="text-white/70">{mission.category}</p>
            </div>
            <button 
              onClick={() => setShowDetails(false)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-white/60" />
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-white mb-2">Descrição Completa</h3>
              <p className="text-white/80 leading-relaxed">{mission.fullDescription}</p>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-3">Requisitos</h3>
              <div className="space-y-2">
                {mission.requirements.map((req, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-orange-400" />
                    <span className="text-white/80 text-sm">{req}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-3">Entregáveis</h3>
              <div className="space-y-2">
                {mission.deliverables.map((deliverable, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-orange-400" />
                    <span className="text-white/80 text-sm">{deliverable}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button 
                onClick={() => {
                  setShowDetails(false);
                  handleSkip();
                }}
                className="flex-1 bg-black/30 hover:bg-black/50 backdrop-blur-xl border border-white/20 text-white py-3 rounded-2xl font-semibold transition-all"
              >
                Não Interessado
              </button>
              <button 
                onClick={() => {
                  setShowDetails(false);
                  handleAccept();
                }}
                className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 rounded-2xl font-semibold transition-all shadow-lg"
              >
                Aceitar Missão
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Enhanced Glass Filters Modal
  const FiltersModal = () => (
    <div className={`fixed inset-0 z-50 transition-all duration-300 ${showFilters ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowFilters(false)} />
      <div className={`absolute bottom-0 left-0 right-0 bg-black/30 backdrop-blur-2xl border-t border-white/20 rounded-t-3xl p-6 transition-transform duration-300 ${showFilters ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="w-12 h-1 bg-white/30 rounded-full mx-auto mb-6" />
        <h3 className="text-xl font-bold text-white mb-6">Filtros</h3>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-white/80 mb-3">Categoria</label>
            <div className="flex flex-wrap gap-2">
              {['all', 'Fotografia', 'Música', 'Tecnologia', 'Serviços', 'Educação'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilters({...filters, category: cat})}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all backdrop-blur-xl border ${
                    filters.category === cat 
                      ? 'bg-orange-500/50 text-white border-orange-400/50' 
                      : 'bg-black/20 text-white/70 hover:bg-black/30 border-white/20'
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
              className="flex-1 bg-black/30 hover:bg-black/50 backdrop-blur-xl border border-white/20 text-white py-3 rounded-2xl font-semibold transition-all"
            >
              Cancelar
            </button>
            <button 
              onClick={() => setShowFilters(false)}
              className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 rounded-2xl font-semibold transition-all shadow-lg"
            >
              Aplicar Filtros
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Gesture hint overlay with glass effect
  const GestureHints = () => (
    <div className="absolute inset-0 pointer-events-none z-20">
      <div className={`absolute top-1/2 left-4 transform -translate-y-1/2 transition-opacity duration-300 ${
        cardPosition.x < -50 ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="bg-red-500/30 backdrop-blur-xl border border-red-400/30 text-white px-3 py-2 rounded-full text-sm font-bold flex items-center gap-1">
          <X className="w-4 h-4" />
          Pular
        </div>
      </div>
      
      <div className={`absolute top-1/2 right-4 transform -translate-y-1/2 transition-opacity duration-300 ${
        cardPosition.x > 50 ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="bg-green-500/30 backdrop-blur-xl border border-green-400/30 text-white px-3 py-2 rounded-full text-sm font-bold flex items-center gap-1">
          <Heart className="w-4 h-4" />
          Aceitar
        </div>
      </div>
      
      <div className={`absolute top-4 left-1/2 transform -translate-x-1/2 transition-opacity duration-300 ${
        cardPosition.y < -50 ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="bg-blue-500/30 backdrop-blur-xl border border-blue-400/30 text-white px-3 py-2 rounded-full text-sm font-bold flex items-center gap-1">
          <ChevronUp className="w-4 h-4" />
          Detalhes
        </div>
      </div>
      
      <div className={`absolute bottom-20 left-1/2 transform -translate-x-1/2 transition-opacity duration-300 ${
        cardPosition.y > 50 ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="bg-yellow-500/30 backdrop-blur-xl border border-yellow-400/30 text-white px-3 py-2 rounded-full text-sm font-bold flex items-center gap-1">
          <Bookmark className="w-4 h-4" />
          Salvar
        </div>
      </div>
    </div>
  );

  if (showAccepted) {
    return (
      <div className="max-w-md mx-auto bg-gradient-to-br from-black via-gray-900 to-black min-h-screen">
        <div className="bg-gradient-to-br from-orange-500/80 via-orange-600/80 to-black/80 backdrop-blur-xl p-6 pt-12 text-white border-b border-white/10">
          <div className="flex items-center gap-4 mb-4">
            <button 
              onClick={() => setShowAccepted(false)}
              className="p-2 bg-black/20 hover:bg-black/30 backdrop-blur-xl rounded-full transition-colors border border-white/20"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="flex-1">
              <h1 className="text-xl font-bold">Minhas Missões</h1>
              <p className="text-white/80 text-sm">{acceptedMissions.length} missões aceitas</p>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-4 -mt-4">
          {acceptedMissions.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500/20 to-orange-600/20 backdrop-blur-xl rounded-full flex items-center justify-center mx-auto mb-4 border border-orange-400/30">
                <Heart className="w-8 h-8 text-orange-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Nenhuma missão ainda</h3>
              <p className="text-white/60 text-sm">Aceite missões para começar a trabalhar</p>
            </div>
          ) : (
            acceptedMissions.map((acceptedMission, index) => (
              <div key={acceptedMission.id} className="bg-black/30 backdrop-blur-xl rounded-3xl p-5 border border-white/10 hover:border-orange-400/30 transition-all">
                <div className="flex items-start gap-4">
                  <div className={`p-3 ${acceptedMission.categoryColor} rounded-2xl shadow-lg backdrop-blur-xl`}>
                    <acceptedMission.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-white text-lg">{acceptedMission.title}</h3>
                      <span className="bg-orange-500/20 text-orange-300 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-xl border border-orange-400/30">
                        Aceita
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-white/60" />
                      <span className="text-white/80 text-sm">{acceptedMission.location}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-orange-400 font-bold text-xl">{acceptedMission.price}</span>
                      <button className="text-orange-400 font-medium text-sm flex items-center gap-1 hover:text-orange-300 transition-colors">
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
    <div className="max-w-md mx-auto bg-gradient-to-br from-black via-gray-900 to-black min-h-screen relative overflow-hidden">
      <Toast message={toastMessage} show={showToast} />
      <FiltersModal />
      <DetailsModal />
      
      {/* Enhanced Glass Header with Gradient Background */}
      <div className="bg-gradient-to-br from-orange-500/80 via-orange-600/80 to-black/80 backdrop-blur-xl p-6 pt-12 text-white relative overflow-hidden border-b border-white/10">
        <div className="absolute top-0 right-0 w-40 h-40 bg-orange-400/10 rounded-full -translate-y-20 translate-x-20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-500/10 rounded-full translate-y-16 -translate-x-16 blur-2xl"></div>
        <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-orange-300/50 rounded-full"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-orange-200/60 rounded-full"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold mb-1">Challenger 🚀</h1>
              <p className="text-white/80">Suas melhores oportunidades te esperam</p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setShowFilters(true)}
                className="p-3 bg-black/20 backdrop-blur-xl rounded-full hover:bg-black/30 transition-all duration-200 hover:scale-105 border border-white/20"
              >
                <Filter className="w-5 h-5" />
              </button>
              <button className="p-3 bg-black/20 backdrop-blur-xl rounded-full hover:bg-black/30 transition-all duration-200 hover:scale-105 border border-white/20 relative">
                <Bell className="w-5 h-5" />
                <div className="absolute top-2 right-2 w-2 h-2 bg-orange-400 rounded-full"></div>
              </button>
              <button 
                onClick={() => setShowAccepted(true)}
                className="p-3 bg-black/20 backdrop-blur-xl rounded-full hover:bg-black/30 transition-all duration-200 hover:scale-105 border border-white/20 relative"
              >
                <Heart className="w-5 h-5" />
                {acceptedMissions.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold animate-pulse">
                    {acceptedMissions.length}
                  </span>
                )}
              </button>
            </div>
          </div>

          <QuickStats />

          <div className="flex items-center gap-3 mb-2">
            <div className="flex-1 bg-black/20 backdrop-blur-xl rounded-full h-2 overflow-hidden border border-white/10">
              <div 
                className="bg-gradient-to-r from-orange-400 to-orange-500 rounded-full h-2 transition-all duration-500 ease-out shadow-sm"
                style={{ width: `${((currentMission + 1) / missions.length) * 100}%` }}
              ></div>
            </div>
            <span className="text-white/90 text-sm font-medium bg-black/20 backdrop-blur-xl px-3 py-1 rounded-full border border-white/10">
              {currentMission + 1}/{missions.length}
            </span>
          </div>
        </div>
      </div>

      {/* Enhanced Glass Mission Card */}
      <div className="px-6 -mt-8 relative z-10">
        <div 
          ref={cardRef}
          className={`bg-black/20 backdrop-blur-2xl rounded-3xl shadow-2xl overflow-hidden border border-white/10 transition-all duration-300 cursor-grab active:cursor-grabbing select-none ${
            swipeDirection === 'right' ? 'transform translate-x-full rotate-12 opacity-0' :
            swipeDirection === 'left' ? 'transform -translate-x-full -rotate-12 opacity-0' :
            swipeDirection === 'down' ? 'transform translate-y-full opacity-0' :
            'transform opacity-100'
          }`}
          style={{
            transform: swipeDirection ? undefined : `translate(${cardPosition.x}px, ${cardPosition.y}px) rotate(${cardPosition.rotation}deg)`,
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
        >
          <GestureHints />
          
          <div className="relative">
            <div className="absolute top-4 right-4 z-10">
              <div className="bg-orange-500/30 backdrop-blur-xl text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 border border-orange-400/30">
                <Zap className="w-4 h-4" />
                {mission.matchScore}% match
              </div>
            </div>
            
            <div className="p-6 pb-4">
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-4 ${mission.categoryColor} rounded-2xl shadow-lg backdrop-blur-xl`}>
                  <IconComponent className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <span className="px-3 py-1 bg-orange-500/20 backdrop-blur-xl text-orange-300 rounded-full text-sm font-semibold border border-orange-400/30">
                    {mission.category}
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <Eye className="w-4 h-4 text-white/60" />
                    <span className="text-white/70 text-sm">{mission.viewCount} interessados</span>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-white mb-3 leading-tight">{mission.title}</h2>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {mission.tags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-orange-500/20 backdrop-blur-xl text-orange-300 rounded-xl text-sm font-medium border border-orange-400/30">
                    {tag}
                  </span>
                ))}
              </div>

              <p className="text-white/80 leading-relaxed mb-6 text-base">
                {mission.description}
              </p>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-4 p-3 bg-orange-500/10 backdrop-blur-xl rounded-2xl border border-orange-400/20">
                  <div className="p-2 bg-orange-500/20 backdrop-blur-xl rounded-xl">
                    <MapPin className="w-5 h-5 text-orange-400" />
                  </div>
                  <div className="flex-1">
                    <span className="text-white font-semibold">{mission.location}</span>
                    <div className="text-white/70 text-sm">{mission.distance} de distância</div>
                  </div>
                  <Navigation className="w-5 h-5 text-white/60" />
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-3 p-3 bg-blue-500/10 backdrop-blur-xl rounded-2xl border border-blue-400/20">
                    <Clock className="w-5 h-5 text-blue-400" />
                    <div>
                      <div className="text-white font-semibold text-sm">{mission.time}</div>
                      <span className={`text-xs font-medium ${
                        mission.urgency === 'Urgente' ? 'text-red-400' : 'text-white/70'
                      }`}>
                        {mission.urgency}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-orange-500/10 backdrop-blur-xl rounded-2xl border border-orange-400/20">
                    <div className="text-orange-400 font-bold text-lg">R$</div>
                    <div>
                      <div className="text-xl font-bold text-white">{mission.price.replace('R$ ', '')}</div>
                      <span className={`text-xs font-medium ${
                        mission.difficulty === 'Fácil' ? 'text-green-400' :
                        mission.difficulty === 'Médio' ? 'text-yellow-400' :
                        'text-red-400'
                      }`}>
                        {mission.difficulty}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {mission.benefits && (
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-white/90 mb-2 flex items-center gap-1">
                    <Award className="w-4 h-4" />
                    Vantagens desta missão
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {mission.benefits.map((benefit, index) => (
                      <span key={index} className="px-2 py-1 bg-orange-500/10 backdrop-blur-xl text-orange-300 rounded-lg text-xs font-medium border border-orange-400/20">
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-4 border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-orange-400/30 to-orange-600/30 backdrop-blur-xl rounded-full flex items-center justify-center text-2xl border border-orange-400/30">
                      {mission.client.avatar}
                    </div>
                    {mission.client.verified && (
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center border-2 border-black">
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-bold text-white">{mission.client.name}</p>
                      {mission.client.verified && (
                        <span className="text-orange-400 text-xs font-medium">Verificado</span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold text-white/90">{mission.client.rating}</span>
                        <span className="text-white/60">({mission.client.reviews})</span>
                      </div>
                      <span className="text-white/40">•</span>
                      <span className="text-orange-400 font-medium">Responde {mission.client.responseTime}</span>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                    <MessageCircle className="w-5 h-5 text-white/60" />
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0">
              <div className="flex gap-4">
                <button 
                  onClick={handleSkip}
                  className="flex-1 bg-black/30 hover:bg-black/50 backdrop-blur-xl transition-all duration-200 text-white rounded-2xl py-4 flex items-center justify-center gap-2 text-lg font-semibold border border-white/20 hover:border-white/30 hover:scale-105 transform"
                >
                  <X className="w-6 h-6" />
                  Pular
                </button>
                
                <button 
                  onClick={handleAccept}
                  disabled={isLoading}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transition-all duration-200 text-white rounded-2xl py-4 flex items-center justify-center gap-2 text-lg font-bold shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                >
                  {isLoading ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Heart className="w-6 h-6" />
                  )}
                  {isLoading ? 'Conectando...' : 'Aceitar'}
                </button>
              </div>
              
              <div className="text-center mt-4">
                <p className="text-white/60 text-sm">
                  👆 Detalhes • 👉 Aceitar • 👈 Pular • 👇 Salvar
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-8"></div>
    </div>
  );
};

export default MissionsApp;
