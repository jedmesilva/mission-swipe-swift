
import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Clock, DollarSign, User, Heart, X, Star, Camera, Music, Code, Wrench, Book, Coffee, ChevronLeft, Share2, Bookmark, Navigation, MessageCircle, CheckCircle2, Filter, Search, Bell, TrendingUp, Zap, Award, Users, Eye, ChevronRight, ChevronUp } from 'lucide-react';

const MissionsApp = () => {
  const [currentMission, setCurrentMission] = useState(0);
  const [acceptedMissions, setAcceptedMissions] = useState([]);
  const [savedMissions, setSavedMissions] = useState([]);
  const [showAccepted, setShowAccepted] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
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
      benefits: ['Pagamento rápido', 'Cliente frequente', 'Avaliação garantida'],
      fullDescription: 'Estou organizando um evento na Praça da Liberdade e preciso de um profissional para gravar momentos importantes. O evento começou há pouco e precisamos de cobertura por aproximadamente 2 horas. Material próprio é um diferencial, mas temos equipamento disponível se necessário.',
      requirements: ['Experiência com eventos', 'Disponibilidade imediata', 'Portfolio de vídeos'],
      deliverables: ['Vídeo editado de 2 minutos', 'Material bruto', 'Entrega em 24h']
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
      benefits: ['Longo prazo', 'Flexibilidade de horário'],
      fullDescription: 'Sou completamente iniciante e gostaria de aprender violão do zero. Busco um professor paciente que possa me ensinar desde os fundamentos. Prefiro aulas presenciais em casa.',
      requirements: ['Paciência com iniciantes', 'Método de ensino', 'Violão próprio'],
      deliverables: ['Aula semanal de 1h', 'Material didático', 'Acompanhamento']
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
      benefits: ['Alto valor', 'Portfolio', 'Trabalho remoto'],
      fullDescription: 'Preciso de uma landing page moderna e responsiva para minha empresa de consultoria. O projeto inclui design, desenvolvimento e otimização para conversão.',
      requirements: ['React/HTML/CSS', 'Design responsivo', 'SEO básico'],
      deliverables: ['Landing page completa', 'Código fonte', 'Deploy']
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
      benefits: ['Pagamento na hora', 'Trabalho rápido'],
      fullDescription: 'Comprei móveis novos que chegaram hoje e preciso montar urgentemente. São um guarda-roupa de 6 portas e uma cômoda. Tenho todas as ferramentas necessárias.',
      requirements: ['Experiência com montagem', 'Ferramentas próprias', 'Disponibilidade hoje'],
      deliverables: ['Móveis montados', 'Limpeza do local', 'Garantia do serviço']
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
        // Horizontal swipe
        if (deltaX > threshold) {
          handleAccept(); // Swipe right - accept
        } else if (deltaX < -threshold) {
          handleSkip(); // Swipe left - skip
        }
      } else {
        // Vertical swipe
        if (deltaY < -threshold) {
          handleShowDetails(); // Swipe up - details
        } else if (deltaY > threshold) {
          handleSaveLater(); // Swipe down - save for later
        }
      }
    } else {
      // Return to center
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

  // Enhanced Toast Component
  const Toast = ({ message, show }) => (
    <div className={`fixed top-20 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ${
      show ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-full opacity-0 scale-95'
    }`}>
      <div className={`px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border backdrop-blur-sm ${
        message.type === 'success' ? 'bg-orange-50 border-orange-200 text-orange-800' :
        message.type === 'info' ? 'bg-blue-50 border-blue-200 text-blue-800' :
        'bg-white border-gray-200 text-gray-800'
      }`}>
        {message.type === 'success' && <CheckCircle2 className="w-5 h-5 text-orange-500" />}
        {message.type === 'info' && <Eye className="w-5 h-5 text-blue-500" />}
        <span className="font-medium">{message.text}</span>
      </div>
    </div>
  );

  // Quick Stats Component
  const QuickStats = () => (
    <div className="flex gap-4 mb-6">
      <div className="flex-1 bg-white bg-opacity-20 rounded-2xl p-4 backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-1">
          <TrendingUp className="w-4 h-4 text-white" />
          <span className="text-white text-sm font-medium">Match</span>
        </div>
        <p className="text-2xl font-bold text-white">{mission.matchScore}%</p>
      </div>
      <div className="flex-1 bg-white bg-opacity-20 rounded-2xl p-4 backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-1">
          <Users className="w-4 h-4 text-white" />
          <span className="text-white text-sm font-medium">Interessados</span>
        </div>
        <p className="text-2xl font-bold text-white">{mission.viewCount}</p>
      </div>
    </div>
  );

  // Details Modal
  const DetailsModal = () => (
    <div className={`fixed inset-0 z-50 transition-all duration-300 ${showDetails ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={() => setShowDetails(false)} />
      <div className={`absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl max-h-[85vh] overflow-y-auto transition-transform duration-300 ${showDetails ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="p-6">
          <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6" />
          
          <div className="flex items-center gap-4 mb-6">
            <div className={`p-3 ${mission.categoryColor} rounded-2xl`}>
              <IconComponent className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-800">{mission.title}</h2>
              <p className="text-gray-600">{mission.category}</p>
            </div>
            <button 
              onClick={() => setShowDetails(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Descrição Completa</h3>
              <p className="text-gray-600 leading-relaxed">{mission.fullDescription}</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Requisitos</h3>
              <div className="space-y-2">
                {mission.requirements.map((req, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-orange-500" />
                    <span className="text-gray-600 text-sm">{req}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Entregáveis</h3>
              <div className="space-y-2">
                {mission.deliverables.map((deliverable, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-orange-500" />
                    <span className="text-gray-600 text-sm">{deliverable}</span>
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
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-2xl font-semibold transition-colors"
              >
                Não Interessado
              </button>
              <button 
                onClick={() => {
                  setShowDetails(false);
                  handleAccept();
                }}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-2xl font-semibold transition-colors"
              >
                Aceitar Missão
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Filters Modal
  const FiltersModal = () => (
    <div className={`fixed inset-0 z-50 transition-all duration-300 ${showFilters ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={() => setShowFilters(false)} />
      <div className={`absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 transition-transform duration-300 ${showFilters ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6" />
        <h3 className="text-xl font-bold text-gray-800 mb-6">Filtros</h3>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Categoria</label>
            <div className="flex flex-wrap gap-2">
              {['all', 'Fotografia', 'Música', 'Tecnologia', 'Serviços', 'Educação'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilters({...filters, category: cat})}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    filters.category === cat 
                      ? 'bg-orange-500 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
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
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-2xl font-semibold transition-colors"
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

  // Gesture hint overlay
  const GestureHints = () => (
    <div className="absolute inset-0 pointer-events-none z-20">
      {/* Swipe indicators */}
      <div className={`absolute top-1/2 left-4 transform -translate-y-1/2 transition-opacity duration-300 ${
        cardPosition.x < -50 ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="bg-red-500 text-white px-3 py-2 rounded-full text-sm font-bold flex items-center gap-1">
          <X className="w-4 h-4" />
          Pular
        </div>
      </div>
      
      <div className={`absolute top-1/2 right-4 transform -translate-y-1/2 transition-opacity duration-300 ${
        cardPosition.x > 50 ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="bg-green-500 text-white px-3 py-2 rounded-full text-sm font-bold flex items-center gap-1">
          <Heart className="w-4 h-4" />
          Aceitar
        </div>
      </div>
      
      <div className={`absolute top-4 left-1/2 transform -translate-x-1/2 transition-opacity duration-300 ${
        cardPosition.y < -50 ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="bg-blue-500 text-white px-3 py-2 rounded-full text-sm font-bold flex items-center gap-1">
          <ChevronUp className="w-4 h-4" />
          Detalhes
        </div>
      </div>
      
      <div className={`absolute bottom-20 left-1/2 transform -translate-x-1/2 transition-opacity duration-300 ${
        cardPosition.y > 50 ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="bg-yellow-500 text-white px-3 py-2 rounded-full text-sm font-bold flex items-center gap-1">
          <Bookmark className="w-4 h-4" />
          Salvar
        </div>
      </div>
    </div>
  );

  if (showAccepted) {
    return (
      <div className="max-w-md mx-auto bg-gray-50 min-h-screen">
        <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 pt-12 text-white">
          <div className="flex items-center gap-4 mb-4">
            <button 
              onClick={() => setShowAccepted(false)}
              className="p-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="flex-1">
              <h1 className="text-xl font-bold">Minhas Missões</h1>
              <p className="text-orange-100 text-sm">{acceptedMissions.length} missões aceitas</p>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-4 -mt-4">
          {acceptedMissions.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Nenhuma missão ainda</h3>
              <p className="text-gray-500 text-sm">Aceite missões para começar a trabalhar</p>
            </div>
          ) : (
            acceptedMissions.map((acceptedMission, index) => (
              <div key={acceptedMission.id} className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className={`p-3 ${acceptedMission.categoryColor} rounded-2xl shadow-lg`}>
                    <acceptedMission.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-gray-800 text-lg">{acceptedMission.title}</h3>
                      <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-medium">
                        Aceita
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600 text-sm">{acceptedMission.location}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-orange-600 font-bold text-xl">{acceptedMission.price}</span>
                      <button className="text-orange-600 font-medium text-sm flex items-center gap-1 hover:text-orange-700">
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
    <div className="max-w-md mx-auto bg-gradient-to-br from-orange-50 to-red-50 min-h-screen relative overflow-hidden">
      <Toast message={toastMessage} show={showToast} />
      <FiltersModal />
      <DetailsModal />
      
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 p-6 pt-12 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white bg-opacity-10 rounded-full -translate-y-20 translate-x-20"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white bg-opacity-10 rounded-full translate-y-16 -translate-x-16"></div>
        <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-white bg-opacity-30 rounded-full"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-white bg-opacity-50 rounded-full"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold mb-1">Challenger 🚀</h1>
              <p className="text-orange-100">Suas melhores oportunidades te esperam</p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setShowFilters(true)}
                className="p-3 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all duration-200 hover:scale-105"
              >
                <Filter className="w-5 h-5" />
              </button>
              <button className="p-3 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all duration-200 hover:scale-105 relative">
                <Bell className="w-5 h-5" />
                <div className="absolute top-2 right-2 w-2 h-2 bg-red-400 rounded-full"></div>
              </button>
              <button 
                onClick={() => setShowAccepted(true)}
                className="p-3 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all duration-200 hover:scale-105 relative"
              >
                <Heart className="w-5 h-5" />
                {acceptedMissions.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold animate-pulse">
                    {acceptedMissions.length}
                  </span>
                )}
              </button>
            </div>
          </div>

          <QuickStats />

          <div className="flex items-center gap-3 mb-2">
            <div className="flex-1 bg-white bg-opacity-20 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-white rounded-full h-2 transition-all duration-500 ease-out shadow-sm"
                style={{ width: `${((currentMission + 1) / missions.length) * 100}%` }}
              ></div>
            </div>
            <span className="text-orange-100 text-sm font-medium bg-white bg-opacity-20 px-3 py-1 rounded-full">
              {currentMission + 1}/{missions.length}
            </span>
          </div>
        </div>
      </div>

      {/* Mission Card with Gesture Support */}
      <div className="px-6 -mt-8 relative z-10">
        <div 
          ref={cardRef}
          className={`bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 transition-all duration-300 cursor-grab active:cursor-grabbing select-none ${
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
              <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
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
                  <span className={`px-3 py-1 ${mission.categoryColor} bg-opacity-15 text-gray-700 rounded-full text-sm font-semibold`}>
                    {mission.category}
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <Eye className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-500 text-sm">{mission.viewCount} interessados</span>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mb-3 leading-tight">{mission.title}</h2>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {mission.tags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 rounded-xl text-sm font-medium border border-orange-200">
                    {tag}
                  </span>
                ))}
              </div>

              <p className="text-gray-600 leading-relaxed mb-6 text-base">
                {mission.description}
              </p>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-4 p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl border border-orange-100">
                  <div className="p-2 bg-orange-100 rounded-xl">
                    <MapPin className="w-5 h-5 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <span className="text-gray-800 font-semibold">{mission.location}</span>
                    <div className="text-gray-500 text-sm">{mission.distance} de distância</div>
                  </div>
                  <Navigation className="w-5 h-5 text-gray-400" />
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-2xl">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="text-gray-800 font-semibold text-sm">{mission.time}</div>
                      <span className={`text-xs font-medium ${
                        mission.urgency === 'Urgente' ? 'text-red-600' : 'text-gray-500'
                      }`}>
                        {mission.urgency}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl">
                    <div className="text-orange-600 font-bold text-lg">R$</div>
                    <div>
                      <div className="text-xl font-bold text-gray-800">{mission.price.replace('R$ ', '')}</div>
                      <span className={`text-xs font-medium ${
                        mission.difficulty === 'Fácil' ? 'text-green-600' :
                        mission.difficulty === 'Médio' ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {mission.difficulty}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {mission.benefits && (
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
                    <Award className="w-4 h-4" />
                    Vantagens desta missão
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {mission.benefits.map((benefit, index) => (
                      <span key={index} className="px-2 py-1 bg-orange-50 text-orange-700 rounded-lg text-xs font-medium">
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-4 border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-orange-200 to-red-200 rounded-full flex items-center justify-center text-2xl">
                      {mission.client.avatar}
                    </div>
                    {mission.client.verified && (
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center border-2 border-white">
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-bold text-gray-800">{mission.client.name}</p>
                      {mission.client.verified && (
                        <span className="text-orange-500 text-xs font-medium">Verificado</span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold text-gray-700">{mission.client.rating}</span>
                        <span className="text-gray-500">({mission.client.reviews})</span>
                      </div>
                      <span className="text-gray-400">•</span>
                      <span className="text-orange-600 font-medium">Responde {mission.client.responseTime}</span>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-white rounded-full transition-colors">
                    <MessageCircle className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0">
              <div className="flex gap-4">
                <button 
                  onClick={handleSkip}
                  className="flex-1 bg-white hover:bg-gray-50 transition-all duration-200 text-gray-700 rounded-2xl py-4 flex items-center justify-center gap-2 text-lg font-semibold border-2 border-gray-200 hover:border-gray-300 hover:scale-105 transform"
                >
                  <X className="w-6 h-6" />
                  Pular
                </button>
                
                <button 
                  onClick={handleAccept}
                  disabled={isLoading}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 transition-all duration-200 text-white rounded-2xl py-4 flex items-center justify-center gap-2 text-lg font-bold shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
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
                <p className="text-gray-400 text-sm">
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
