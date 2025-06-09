
import React from 'react';
import { ArrowRight, Smartphone, Zap, Users, Star, CheckCircle2, Camera, Music, Code, Wrench, Book } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Landing = () => {
  const features = [
    {
      icon: Zap,
      title: 'Encontre rapidamente',
      description: 'Sistema de match inteligente que conecta você com as melhores oportunidades baseado no seu perfil.',
      gradient: 'from-orange-500 to-black'
    },
    {
      icon: Smartphone,
      title: 'Interface intuitiva',
      description: 'Navegação por gestos simples - deslize para aceitar, pular ou salvar missões para depois.',
      gradient: 'from-orange-600 to-black'
    },
    {
      icon: Users,
      title: 'Comunidade ativa',
      description: 'Junte-se a milhares de profissionais que já estão ganhando dinheiro com suas habilidades.',
      gradient: 'from-orange-500 to-black'
    }
  ];

  const categories = [
    { icon: Camera, name: 'Fotografia', color: 'bg-orange-500' },
    { icon: Music, name: 'Música', color: 'bg-orange-400' },
    { icon: Code, name: 'Tecnologia', color: 'bg-orange-600' },
    { icon: Wrench, name: 'Serviços', color: 'bg-orange-500' },
    { icon: Book, name: 'Educação', color: 'bg-orange-400' }
  ];

  const testimonials = [
    {
      name: 'Maria Silva',
      role: 'Fotógrafa',
      content: 'Consegui 3 trabalhos na primeira semana! O app é incrível para encontrar clientes próximos.',
      rating: 5,
      avatar: '👩‍📷'
    },
    {
      name: 'João Santos',
      role: 'Desenvolvedor',
      content: 'Interface muito intuitiva e o sistema de match funciona perfeitamente. Recomendo!',
      rating: 5,
      avatar: '👨‍💻'
    },
    {
      name: 'Ana Costa',
      role: 'Professora',
      content: 'Encontrei vários alunos para aulas particulares. O app facilitou muito minha vida!',
      rating: 5,
      avatar: '👩‍🏫'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/50 to-black/5 dark:from-gray-900 dark:to-black">
      {/* Header */}
      <header className="bg-gradient-to-r from-orange-500/90 to-black/80 dark:from-orange-600/90 dark:to-black/90 backdrop-blur-md border-b border-white/20 dark:border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-black rounded-2xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">MissionSwipe</h1>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Button 
                className="bg-white/10 dark:bg-black/20 hover:bg-white/20 dark:hover:bg-black/30 text-white border border-white/20 dark:border-white/10 backdrop-blur-sm"
                variant="outline"
              >
                Entrar
              </Button>
              <Button className="bg-white hover:bg-gray-100 text-gray-900 font-semibold">
                Começar Agora
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-orange-500/20 to-black/10 dark:from-orange-500/30 dark:to-black/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-orange-400/20 to-black/10 dark:from-orange-400/30 dark:to-black/20 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Transforme suas{' '}
              <span className="bg-gradient-to-r from-orange-500 to-black bg-clip-text text-transparent">
                habilidades
              </span>
              {' '}em renda
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Conecte-se com pessoas que precisam dos seus talentos. Sistema de match inteligente 
              que encontra as melhores oportunidades na sua região.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-orange-500 to-black dark:from-orange-600 dark:to-black hover:from-orange-600 hover:to-black dark:hover:from-orange-700 dark:hover:to-black text-white font-semibold px-8 py-4 text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
              >
                Baixar o App
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-gray-300 dark:border-gray-600 hover:border-orange-500 dark:hover:border-orange-400 text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 px-8 py-4 text-lg backdrop-blur-sm bg-white/50 dark:bg-black/20"
              >
                Ver Demo
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">10k+</div>
                <div className="text-gray-600 dark:text-gray-300">Usuários ativos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">500+</div>
                <div className="text-gray-600 dark:text-gray-300">Missões por dia</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">95%</div>
                <div className="text-gray-600 dark:text-gray-300">Satisfação</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/30 dark:bg-black/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Como funciona?
            </h3>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Três passos simples para começar a ganhar dinheiro com suas habilidades
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white/80 dark:bg-black/50 backdrop-blur-md border border-gray-100/50 dark:border-white/10 hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 dark:text-gray-300 text-center text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Categorias populares
            </h3>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Encontre oportunidades na sua área de expertise
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {categories.map((category, index) => (
              <div
                key={index}
                className="bg-white/80 dark:bg-black/50 backdrop-blur-md rounded-3xl p-6 text-center hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100/50 dark:border-white/10 cursor-pointer group"
              >
                <div className={`w-16 h-16 ${category.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  <category.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white">{category.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white/30 dark:bg-black/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              O que nossos usuários dizem
            </h3>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Histórias reais de sucesso
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white/80 dark:bg-black/50 backdrop-blur-md border border-gray-100/50 dark:border-white/10 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-200/80 to-black/20 dark:from-orange-500/30 dark:to-black/40 rounded-full flex items-center justify-center text-xl mr-4 border border-orange-300/30 dark:border-orange-500/30">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/90 to-black/80 dark:from-orange-600/90 dark:to-black/90"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 dark:bg-white/20 rounded-full -translate-y-48 translate-x-48"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/10 dark:bg-white/20 rounded-full translate-y-36 -translate-x-36"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Pronto para começar?
          </h3>
          <p className="text-xl text-orange-100 dark:text-orange-200 mb-8 leading-relaxed">
            Junte-se a milhares de profissionais que já estão transformando suas habilidades em renda extra.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-white hover:bg-gray-100 text-gray-900 font-semibold px-8 py-4 text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
            >
              Baixar Grátis
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-white/50 hover:border-white text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 text-lg"
            >
              Saber Mais
            </Button>
          </div>
          
          {/* Features list */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="flex items-center justify-center gap-2 text-orange-100 dark:text-orange-200">
              <CheckCircle2 className="w-5 h-5" />
              <span>Gratuito para começar</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-orange-100 dark:text-orange-200">
              <CheckCircle2 className="w-5 h-5" />
              <span>Sem taxas escondidas</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-orange-100 dark:text-orange-200">
              <CheckCircle2 className="w-5 h-5" />
              <span>Suporte 24/7</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/50 dark:bg-black/50 backdrop-blur-md border-t border-gray-200/50 dark:border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-black rounded-xl flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white">MissionSwipe</h4>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Conectando talentos com oportunidades desde 2024.
              </p>
            </div>
            
            <div>
              <h5 className="font-semibold text-gray-900 dark:text-white mb-4">Produto</h5>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li><a href="#" className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors">Recursos</a></li>
                <li><a href="#" className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors">Preços</a></li>
                <li><a href="#" className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold text-gray-900 dark:text-white mb-4">Suporte</h5>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li><a href="#" className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors">Centro de Ajuda</a></li>
                <li><a href="#" className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors">Contato</a></li>
                <li><a href="#" className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors">Status</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold text-gray-900 dark:text-white mb-4">Legal</h5>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li><a href="#" className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors">Privacidade</a></li>
                <li><a href="#" className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors">Termos</a></li>
                <li><a href="#" className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200/50 dark:border-white/10 mt-8 pt-8 text-center">
            <p className="text-gray-600 dark:text-gray-300">
              © 2024 MissionSwipe. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
