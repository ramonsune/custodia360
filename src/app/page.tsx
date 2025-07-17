'use client';

import { CheckCircle, Shield, Award, Clock, Phone, Mail, MapPin, FileText, HelpCircle, Star, Users, Building2, Calendar, Trophy, Zap, ArrowRight, Calculator, Euro, TrendingUp, ChevronDown, ChevronUp, AlertTriangle, Target, Lightbulb, Compass, Umbrella, Brain, Heart, Activity, Monitor, Bell, RefreshCw, UserCheck, Settings, Smartphone, BarChart3, Database, Layers, BookOpen, Eye, Download, DollarSign, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEntranceAnimation, pageAnimations, cardClasses, iconClasses } from '@/lib/animations';
import Link from 'next/link';
import StripeCheckout from '@/components/StripeCheckoutReal';

interface Plan {
  id: string;
  title: string;
  price: number;
  color: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  menores: string;
  features: string[];
}

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isStripeOpen, setIsStripeOpen] = useState(false);
  const [selectedPlanForCheckout, setSelectedPlanForCheckout] = useState<Plan | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const plans = [
    {
      id: "small",
      title: "1-50 menores",
      price: 18.44,
      color: "blue",
      icon: Building2,
      menores: "1-50",
      features: [
        "Implementación completa en 24h",
        "Verificación de personal",
        "Delegado de protección certificado",
        "Protocolos claros",
        "Formación del equipo",
        "Documentación completa",
        "Mantenimiento incluido"
      ]
    },
    {
      id: "medium",
      title: "51-200 menores",
      price: 48.94,
      color: "green",
      icon: Users,
      menores: "51-200",
      features: [
        "Implementación completa en 24h",
        "Verificación de personal",
        "Delegado de protección certificado",
        "Protocolos claros",
        "Formación del equipo",
        "Documentación completa",
        "Mantenimiento incluido",
        "Soporte prioritario"
      ]
    },
    {
      id: "large",
      title: "+200 menores",
      price: 107.44,
      color: "purple",
      icon: Award,
      menores: "+200",
      features: [
        "Implementación completa en 24h",
        "Verificación de personal",
        "Delegado de protección certificado",
        "Protocolos claros",
        "Formación del equipo",
        "Documentación completa",
        "Mantenimiento incluido",
        "Soporte prioritario",
        "Gestor dedicado"
      ]
    },
    {
      id: "temporal",
      title: "Custodia Temporal",
      price: 39.00,
      color: "yellow",
      icon: Calendar,
      menores: "Temporal",
      features: [
        "Protección hasta 60 días",
        "Implementación inmediata",
        "Documentación básica",
        "Soporte durante el período"
      ]
    }
  ];

  const handleContractPlan = (planId: string) => {
    const plan = plans.find(p => p.id === planId);
    if (plan) {
      setSelectedPlanForCheckout(plan);
      setIsStripeOpen(true);
      setShowDropdown(false);
    }
  };

  const faqs = [
    {
      question: "¿Qué entidades están obligadas a cumplir la LOPIVI?",
      answer: "Todas las entidades que desarrollen actividades con menores de edad: centros educativos, deportivos, culturales, de ocio, sanitarios, religiosos, academias, campamentos, etc. No importa si son públicos o privados."
    },
    {
      question: "¿Cómo sabe custodia360 qué tiene que hacer cada persona?",
      answer: "Nuestro sistema automatizado identifica el rol de cada persona en tu entidad y le asigna automáticamente las tareas específicas que debe cumplir según LOPIVI. El delegado gestiona más tareas, los directivos menos, y cada tipo de personal recibe solo lo que necesita."
    },
    {
      question: "¿Qué incluye exactamente custodia360?",
      answer: "Implementación completa en 24h: verificación de personal, protocolos claros, delegado de protección formado, formación de personal por roles, y mantenimiento continuo para mantener el cumplimiento actualizado."
    },
    {
      question: "¿Por qué el delegado tiene más responsabilidades?",
      answer: "El delegado de protección es la figura clave según LOPIVI. Debe coordinar toda la implementación, gestionar al personal, y ser el punto de contacto oficial. custodia360 le proporciona formación especializada y herramientas para gestionar eficientemente a toda la entidad."
    },
    {
      question: "¿Las familias también reciben formación?",
      answer: "Sí, las familias reciben el protocolo específico para conocer exactamente qué medidas protegen a sus hijos. Los menores de 16 años reciben material educativo adaptado a su edad, siempre con supervisión de padres/tutores."
    },
    {
      question: "¿Cuáles son las sanciones por incumplir la LOPIVI?",
      answer: "Las multas van desde 30.000€ hasta 600.000€ según el tamaño de la entidad. Además puede haber clausura del centro, inhabilitación del personal, responsabilidades civiles y penales."
    },
    {
      question: "¿Puedo implementar la LOPIVI por mi cuenta?",
      answer: "Es posible, pero muy complejo y con alto riesgo de errores. Requiere conocimiento legal especializado, formación específica por roles y mantenimiento continuo. custodia360 automatiza todo el proceso y garantiza el cumplimiento."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 md:h-10 md:w-10 text-orange-600" />
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-gray-900">custodia360</h1>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/servicios" className="text-gray-600 hover:text-gray-900 transition-colors">Servicios</Link>
              <Link href="/planes" className="text-gray-600 hover:text-gray-900 transition-colors">Planes</Link>
              <Link href="/demo" className="text-gray-600 hover:text-gray-900 transition-colors">Demo</Link>
              <Link href="/lopivi" className="text-gray-600 hover:text-gray-900 transition-colors">LOPIVI</Link>
              <Link href="/guia-custodia360" className="text-gray-600 hover:text-gray-900 transition-colors">Guía custodia360</Link>
              <Link href="/nosotros" className="text-gray-600 hover:text-gray-900 transition-colors">Nosotros</Link>
              <Link href="/contacto" className="text-red-600 hover:text-red-700 font-medium transition-colors">Contacto</Link>
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="h-10 w-10 p-0"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t bg-white">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link
                  href="/servicios"
                  className="block px-3 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  🏢 Servicios
                </Link>
                <Link
                  href="/planes"
                  className="block px-3 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  💰 Planes
                </Link>
                <Link
                  href="/demo"
                  className="block px-3 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  🖥️ Demo
                </Link>
                <Link
                  href="/lopivi"
                  className="block px-3 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  📋 LOPIVI
                </Link>
                <Link
                  href="/guia-custodia360"
                  className="block px-3 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  📚 Guía custodia360
                </Link>
                <Link
                  href="/nosotros"
                  className="block px-3 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  👥 Nosotros
                </Link>
                <Link
                  href="/contacto"
                  className="block px-3 py-3 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md font-medium transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  📞 Contacto
                </Link>

                {/* Quick Action Mobile */}
                <div className="border-t pt-3 mt-3">
                  <Button
                    className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 mb-2"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      handleContractPlan('medium'); // Plan por defecto para móvil
                    }}
                  >
                    <Smartphone className="h-4 w-4 mr-2" />
                    💳 Contratar Ahora
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-orange-600 text-orange-600 hover:bg-orange-50"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      window.open('tel:+34678771198', '_blank');
                    }}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    📞 678 771 198
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 md:py-16 lg:py-24 bg-gradient-to-br from-blue-50 via-orange-50 to-purple-50 relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-30 hidden md:block overflow-hidden">
          <div className="absolute top-20 left-10 w-20 h-20 bg-orange-200 rounded-full animate-float gpu-accelerated"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-blue-200 rounded-full animate-float gpu-accelerated" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-purple-200 rounded-full animate-float gpu-accelerated" style={{animationDelay: '4s'}}></div>
          <div className="absolute top-60 right-1/4 w-8 h-8 bg-green-200 rounded-full animate-float gpu-accelerated" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-40 right-10 w-14 h-14 bg-pink-200 rounded-full animate-float gpu-accelerated" style={{animationDelay: '3s'}}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <Badge className="mb-4 md:mb-6 bg-orange-100 text-orange-800 hover:bg-orange-100 text-sm md:text-base px-4 md:px-6 py-2 animate-bounce-in">
                🚀 Implementación LOPIVI Garantizada en 24h
              </Badge>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 md:mb-8 leading-tight px-2 animate-fade-in-up stagger-delay-2 animate-element">
                ¿Cumples la <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-red-500 to-orange-600 animate-gradient text-glow gpu-accelerated">LOPIVI</span>? ¿Tienes protocolo de protección?
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-gray-700 mb-8 md:mb-10 max-w-4xl mx-auto leading-relaxed px-4 animate-fade-in-up stagger-delay-3">
                <strong className="text-red-600">Evita multas de hasta 600.000€, cierres y responsabilidad penal.</strong> Primera empresa automatizada de España. Te implementamos toda la normativa LOPIVI y planes de protección en <strong className="text-orange-600">24 horas</strong> con mantenimiento continuo.
              </p>

              {/* Mobile-First CTAs with Plan Selector */}
              <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center mb-8 md:mb-12 px-4 animate-fade-in-up stagger-delay-4">
                <div className="relative">
                  <Button
                    size="lg"
                    onClick={() => setShowDropdown(!showDropdown)}
                    onMouseEnter={() => setShowDropdown(true)}
                    className="btn-primary-glow text-white text-base md:text-lg px-6 md:px-8 py-3 md:py-4 h-auto w-full sm:w-auto btn-animated hover-lift animate-pulse-gentle hover:animate-none transition-smooth focus-ring gpu-accelerated"
                  >
                    <Smartphone className="h-5 w-5 md:hidden" />
                    <Target className="h-5 w-5 md:h-6 md:w-6 mr-3" />
                    Contratar Ahora
                    <ChevronDown className={`h-4 w-4 ml-2 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} />
                  </Button>

                  {/* Dropdown Menu */}
                  {showDropdown && (
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white rounded-xl shadow-2xl border-2 border-gray-300 z-[99999] w-80 animate-dropdown">
                      <div className="p-3">
                        <button
                          onClick={() => handleContractPlan('small')}
                          className="w-full text-left px-4 py-3 rounded-lg hover:bg-blue-50 border border-transparent hover:border-blue-200 transition-bounce mb-1 hover-lift group"
                        >
                          <div className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">1-50 menores</div>
                          <div className="text-sm text-gray-600 group-hover:text-blue-600 transition-colors">18,44€ (+IVA) inicial + 18,44€ a los 6 meses</div>
                        </button>
                        <button
                          onClick={() => handleContractPlan('medium')}
                          className="w-full text-left px-4 py-3 rounded-lg hover:bg-green-50 border border-transparent hover:border-green-200 transition-bounce mb-1 hover-lift group"
                        >
                          <div className="font-semibold text-gray-900 group-hover:text-green-700 transition-colors">51-200 menores</div>
                          <div className="text-sm text-gray-600 group-hover:text-green-600 transition-colors">48,94€ (+IVA) inicial + 48,94€ a los 6 meses</div>
                        </button>
                        <button
                          onClick={() => handleContractPlan('large')}
                          className="w-full text-left px-4 py-3 rounded-lg hover:bg-purple-50 border border-transparent hover:border-purple-200 transition-bounce mb-1 hover-lift group"
                        >
                          <div className="font-semibold text-gray-900 group-hover:text-purple-700 transition-colors">+200 menores</div>
                          <div className="text-sm text-gray-600 group-hover:text-purple-600 transition-colors">107,44€ (+IVA) inicial + 107,44€ a los 6 meses</div>
                        </button>
                        <hr className="my-2 border-gray-200" />
                        <button
                          onClick={() => handleContractPlan('temporal')}
                          className="w-full text-left px-4 py-3 rounded-lg hover:bg-yellow-50 border border-transparent hover:border-yellow-200 transition-bounce hover-lift group"
                        >
                          <div className="font-semibold text-gray-900 group-hover:text-yellow-700 transition-colors">Custodia Temporal</div>
                          <div className="text-sm text-gray-600 group-hover:text-yellow-600 transition-colors">39€ (+IVA) hasta 60 días</div>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Backdrop para cerrar dropdown en móvil */}
                  {showDropdown && (
                    <div
                      className="fixed inset-0 z-[99998]"
                      onClick={() => setShowDropdown(false)}
                    />
                  )}
                </div>
              </div>

              {/* Cuadro de Sanciones LOPIVI */}
              <div className="max-w-4xl mx-auto mb-8 md:mb-12 animate-fade-in-up stagger-delay-5">
                <div className="bg-gradient-to-r from-red-50 via-red-100 to-red-50 border-2 border-red-300 rounded-xl p-6 md:p-8 shadow-lg hover-lift transition-smooth">
                  <div className="text-center mb-6">
                    <div className="flex items-center justify-center mb-3">
                      <AlertTriangle className="h-8 w-8 text-red-600 mr-3" />
                      <h3 className="text-xl md:text-2xl font-bold text-red-900">
                        ⚠️ Sanciones por Incumplir LOPIVI
                      </h3>
                    </div>
                    <p className="text-red-800 text-base md:text-lg font-medium">
                      Si tu entidad trabaja con menores y NO cumple LOPIVI, te expones a:
                    </p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 md:gap-6 mb-6">
                    <div className="bg-white rounded-lg p-4 md:p-6 border border-red-200 text-center card-hover animate-fade-in-up stagger-delay-1">
                      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3 transition-bounce">
                        <Euro className="h-6 w-6 text-red-600 icon-bounce" />
                      </div>
                      <h4 className="font-bold text-red-900 text-lg mb-2">Multas Económicas</h4>
                      <p className="text-red-700 text-sm mb-2">Desde <strong>30.000€</strong> hasta <strong>600.000€</strong></p>
                      <p className="text-red-600 text-xs">Según el tamaño de la entidad</p>
                    </div>

                    <div className="bg-white rounded-lg p-4 md:p-6 border border-red-200 text-center card-hover animate-fade-in-up stagger-delay-2">
                      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3 transition-bounce">
                        <X className="h-6 w-6 text-red-600 icon-bounce" />
                      </div>
                      <h4 className="font-bold text-red-900 text-lg mb-2">Cierre de Centro</h4>
                      <p className="text-red-700 text-sm mb-2">Clausura <strong>temporal o definitiva</strong></p>
                      <p className="text-red-600 text-xs">Pérdida total de la actividad</p>
                    </div>

                    <div className="bg-white rounded-lg p-4 md:p-6 border border-red-200 text-center card-hover animate-fade-in-up stagger-delay-3">
                      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3 transition-bounce">
                        <Shield className="h-6 w-6 text-red-600 icon-bounce" />
                      </div>
                      <h4 className="font-bold text-red-900 text-lg mb-2">Responsabilidad Penal</h4>
                      <p className="text-red-700 text-sm mb-2"><strong>Inhabilitación</strong> del personal</p>
                      <p className="text-red-600 text-xs">Responsabilidades civiles y penales</p>
                    </div>
                  </div>

                  <div className="bg-red-200 border border-red-400 rounded-lg p-4 text-center">
                    <p className="text-red-900 font-bold text-base md:text-lg mb-2">
                      🚨 La LOPIVI está en vigor desde Junio 2021
                    </p>
                    <p className="text-red-800 text-sm md:text-base">
                      Si aún no la has implementado, <strong>estás en incumplimiento legal</strong> y puedes ser sancionado en cualquier momento
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección específica para Entidades */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-white via-orange-50 to-orange-100">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-orange-100 text-orange-800 hover:bg-orange-100 text-base px-6 py-2 animate-bounce-in">
                🏢 Para Entidades Responsables
              </Badge>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 animate-fade-in-up stagger-delay-1">
                Tranquilidad para tu Entidad
              </h2>
              <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto animate-fade-in-up stagger-delay-2">
                Como propietario, directivo o responsable, necesitas garantizar la protección total de los menores bajo tu cuidado. custodia360 te ofrece la tranquilidad de cumplir con la LOPIVI sin complicaciones.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-16 items-center mb-16">
              <div>
                <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900 mb-8 flex items-center">
                  <Building2 className="h-8 w-8 text-orange-600 mr-3" />
                  ¿Por qué elegir custodia360 para tu entidad?
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start p-6 bg-white rounded-xl shadow-md border border-orange-100 card-hover animate-fade-in-left stagger-delay-1">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0 transition-bounce">
                      <Shield className="h-6 w-6 text-orange-600 icon-bounce" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2 text-lg">Protección Legal Avanzada</h4>
                      <p className="text-gray-600">Reduces significativamente el riesgo de multas de hasta 600.000€ y facilitas el cumplimiento normativo.</p>
                    </div>
                  </div>

                  <div className="flex items-start p-6 bg-white rounded-xl shadow-md border border-blue-100 card-hover animate-fade-in-left stagger-delay-2">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0 transition-bounce">
                      <Clock className="h-6 w-6 text-blue-600 icon-bounce" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2 text-lg">Implementación en 24 Horas</h4>
                      <p className="text-gray-600">Sin esperas, sin complicaciones. En 24 horas tienes toda la protección LOPIVI implementada y operativa.</p>
                    </div>
                  </div>

                  <div className="flex items-start p-6 bg-white rounded-xl shadow-md border border-green-100 card-hover animate-fade-in-left stagger-delay-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0 transition-bounce">
                      <DollarSign className="h-6 w-6 text-green-600 icon-bounce" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2 text-lg">Ahorro del 97%</h4>
                      <p className="text-gray-600">Desde 18,44€ inicial vs 7.000€+ de una consultoría tradicional. La protección más avanzada al precio más justo.</p>
                    </div>
                  </div>

                  <div className="flex items-start p-6 bg-white rounded-xl shadow-md border border-purple-100 card-hover animate-fade-in-left stagger-delay-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0 transition-bounce">
                      <RefreshCw className="h-6 w-6 text-purple-600 icon-bounce" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2 text-lg">Mantenimiento Incluido</h4>
                      <p className="text-gray-600">Olvídate de renovaciones y actualizaciones. Nuestro sistema mantiene automáticamente el cumplimiento al día.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8 border border-gray-100">
                  <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Building2 className="h-12 w-12 text-white" />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-4">Máxima Tranquilidad</h4>
                  <p className="text-gray-600 mb-6 text-lg">
                    Tu entidad está protegida legalmente, con la documentación al día
                  </p>
                  <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
                    <div className="flex items-center justify-center mb-3">
                      <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
                      <span className="text-green-800 font-bold text-lg">Entidad Protegida LOPIVI</span>
                    </div>
                    <p className="text-green-700 text-sm">Certificación y cumplimiento</p>
                  </div>
                </div>

                <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-6">
                  <h5 className="font-bold text-orange-900 mb-3 text-lg">¿Aún no tienes protección?</h5>
                  <p className="text-orange-700 mb-4">
                    Cada día sin protección LOPIVI es un día de riesgo legal y económico
                  </p>
                  <Button className="bg-orange-600 hover:bg-orange-700 text-white" asChild>
                    <Link href="/planes">
                      <Target className="h-5 w-5 mr-2" />
                      Proteger mi Entidad Ahora
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección para Padres */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-purple-100 text-purple-800 hover:bg-purple-100 text-base px-6 py-2">
                👨‍👩‍👧‍👦 Para Padres y Familias
              </Badge>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Tranquilidad Total para las Familias
              </h2>
              <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto">
                Como padre, madre y tutores, tienes derecho a saber que la entidad donde está tu hijo cumple con todas las medidas de protección. custodia360 te da esa tranquilidad.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-16 items-center mb-16">
              <div>
                <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900 mb-8 flex items-center">
                  <Heart className="h-8 w-8 text-purple-600 mr-3" />
                  ¿Cómo saber si la entidad de tu hijo está protegida?
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start p-6 bg-white rounded-xl shadow-md border border-purple-100">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <Eye className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2 text-lg">Verificación Visible</h4>
                      <p className="text-gray-600">Las entidades protegidas con custodia360 muestran claramente su certificación LOPIVI.</p>
                    </div>
                  </div>

                  <div className="flex items-start p-6 bg-white rounded-xl shadow-md border border-blue-100">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <FileText className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2 text-lg">Documentación Completa</h4>
                      <p className="text-gray-600">Puedes solicitar ver los certificados y protocolos de protección implementados.</p>
                    </div>
                  </div>

                  <div className="flex items-start p-6 bg-white rounded-xl shadow-md border border-green-100">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <UserCheck className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2 text-lg">Personal Verificado</h4>
                      <p className="text-gray-600">Todo el personal ha pasado por verificación de antecedentes y formación especializada.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8 border border-gray-100">
                  <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Heart className="h-12 w-12 text-white" />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-4">Tu Hijo Está Protegido</h4>
                  <p className="text-gray-600 mb-6 text-lg">
                    Las entidades con custodia360 cumplen con la normativa LOPIVI
                  </p>
                  <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
                    <div className="flex items-center justify-center mb-3">
                      <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
                      <span className="text-green-800 font-bold text-lg">Entidad Verificada custodia360</span>
                    </div>
                    <p className="text-green-700 text-sm">Protección infantil</p>
                  </div>
                </div>

                <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-6">
                  <h5 className="font-bold text-purple-900 mb-3 text-lg">¿Tu entidad no está protegida?</h5>
                  <p className="text-purple-700 mb-4">
                    Recomiéndales custodia360 para garantizar la protección de todos los menores
                  </p>
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white" asChild>
                    <Link href="/contacto">
                      <Phone className="h-5 w-5 mr-2" />
                      Recomendar custodia360
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Planes Principales */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-gray-50 to-blue-50" id="planes">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-blue-100 text-blue-800 hover:bg-blue-100 text-base px-6 py-2">
                💰 Planes Transparentes
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Planes Flexibles: Paga en 2 Cómodos Tramos
              </h2>
              <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto">
                Todos los planes incluyen exactamente lo mismo: solo varía el número de menores protegidos y la tarifa.
                Pago cómodo: 50% inicial + 50% a los 6 meses.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-8">
              <Card className="border-2 border-blue-300 bg-blue-50 hover:shadow-xl transition-smooth transform hover:scale-105 hover-lift group card-hover animate-fade-in-up stagger-delay-1">
                <CardContent className="p-6 md:p-8 text-center">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 transition-bounce group-hover:scale-110 group-hover:rotate-12">
                    <Building2 className="h-6 w-6 md:h-8 md:w-8 text-white transition-smooth group-hover:scale-110 icon-bounce" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">1-50 menores</h3>
                  <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">18,44€</div>
                  <div className="text-gray-600 mb-4">(+IVA) Pago inicial</div>
                  <div className="bg-blue-100 border border-blue-300 rounded-lg p-3 md:p-4 mb-4 md:mb-6">
                    <div className="text-blue-800 font-bold text-base md:text-lg mb-2 md:mb-3">+ 18,44€ a los 6 meses (+IVA)</div>
                    <div className="text-blue-700 text-sm space-y-1">
                      <div>• Implementación completa en 24h</div>
                      <div>• Todos los servicios incluidos</div>
                      <div>• Sin pagos mensuales</div>
                    </div>
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 mb-3 md:mb-4 text-white text-sm md:text-base py-2 md:py-3 h-auto btn-animated transition-smooth hover:shadow-lg focus-ring">
                    💳 Contratar Ahora
                  </Button>
                  <div className="text-xs text-gray-500">Implementación completa • Pago en 2 tramos</div>
                </CardContent>
              </Card>

              <Card className="border-2 border-green-300 bg-green-50 hover:shadow-xl transition-smooth transform hover:scale-105 hover-lift group card-hover animate-fade-in-up stagger-delay-2">
                <CardContent className="p-6 md:p-8 text-center">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 transition-bounce group-hover:scale-110 group-hover:rotate-12">
                    <Users className="h-6 w-6 md:h-8 md:w-8 text-white transition-smooth group-hover:scale-110 icon-bounce" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">51-200 menores</h3>
                  <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">48,94€</div>
                  <div className="text-gray-600 mb-4">(+IVA) Pago inicial</div>
                  <div className="bg-green-100 border border-green-300 rounded-lg p-3 md:p-4 mb-4 md:mb-6">
                    <div className="text-green-800 font-bold text-base md:text-lg mb-2 md:mb-3">+ 48,94€ a los 6 meses (+IVA)</div>
                    <div className="text-green-700 text-sm space-y-1">
                      <div>• Implementación completa en 24h</div>
                      <div>• Todos los servicios incluidos</div>
                      <div>• Sin pagos mensuales</div>
                    </div>
                  </div>
                  <Button className="w-full bg-green-600 hover:bg-green-700 mb-3 md:mb-4 text-white text-sm md:text-base py-2 md:py-3 h-auto btn-animated transition-smooth hover:shadow-lg focus-ring">
                    💳 Contratar Ahora
                  </Button>
                  <div className="text-xs text-gray-500">Implementación completa • Pago en 2 tramos</div>
                </CardContent>
              </Card>

              <Card className="border-2 border-purple-300 bg-purple-50 hover:shadow-xl transition-smooth transform hover:scale-105 hover-lift group card-hover animate-fade-in-up stagger-delay-3">
                <CardContent className="p-6 md:p-8 text-center">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 transition-bounce group-hover:scale-110 group-hover:rotate-12">
                    <Award className="h-6 w-6 md:h-8 md:w-8 text-white transition-smooth group-hover:scale-110 icon-bounce" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">+200 menores</h3>
                  <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">107,44€</div>
                  <div className="text-gray-600 mb-4">(+IVA) Pago inicial</div>
                  <div className="bg-purple-100 border border-purple-300 rounded-lg p-3 md:p-4 mb-4 md:mb-6">
                    <div className="text-purple-800 font-bold text-base md:text-lg mb-2 md:mb-3">+ 107,44€ a los 6 meses (+IVA)</div>
                    <div className="text-purple-700 text-sm space-y-1">
                      <div>• Implementación completa en 24h</div>
                      <div>• Todos los servicios incluidos</div>
                      <div>• Sin pagos mensuales</div>
                    </div>
                  </div>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 mb-3 md:mb-4 text-white text-sm md:text-base py-2 md:py-3 h-auto btn-animated transition-smooth hover:shadow-lg focus-ring">
                    💳 Contratar Ahora
                  </Button>
                  <div className="text-xs text-gray-500">Implementación completa • Pago en 2 tramos</div>
                </CardContent>
              </Card>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg md:rounded-xl p-4 md:p-8 border-2 border-blue-200">
              <h4 className="text-lg md:text-xl font-bold text-center text-gray-900 mb-4 md:mb-6">
                ✅ Todos los Planes Incluyen Exactamente lo Mismo:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
                <div className="space-y-2 md:space-y-3">
                  <div className="flex items-center text-sm md:text-base">
                    <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-600 mr-2 md:mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Verificación de personal</span>
                  </div>
                  <div className="flex items-center text-sm md:text-base">
                    <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-600 mr-2 md:mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Delegado de protección certificado</span>
                  </div>
                  <div className="flex items-center text-sm md:text-base">
                    <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-600 mr-2 md:mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Protocolos claros</span>
                  </div>
                  <div className="flex items-center text-sm md:text-base">
                    <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-600 mr-2 md:mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Formación del equipo</span>
                  </div>
                </div>
                <div className="space-y-2 md:space-y-3">
                  <div className="flex items-center text-sm md:text-base">
                    <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-600 mr-2 md:mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Implementación en 24 horas</span>
                  </div>
                  <div className="flex items-center text-sm md:text-base">
                    <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-600 mr-2 md:mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Documentación completa</span>
                  </div>
                  <div className="flex items-center text-sm md:text-base">
                    <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-600 mr-2 md:mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Mantenimiento incluido</span>
                  </div>
                  <div className="flex items-center text-sm md:text-base">
                    <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-600 mr-2 md:mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Cumplimiento</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección ¿Por qué custodia360? */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-orange-100 text-orange-800 hover:bg-orange-100 text-base px-6 py-2">
                🎯 La Diferencia custodia360
              </Badge>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                ¿Por qué custodia360 es Diferente?
              </h2>
              <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto">
                Somos la primera empresa en España que automatiza completamente la protección LOPIVI,
                ofreciendo lo que ninguna consultoría tradicional puede igualar.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              <div className="text-center p-8 bg-white rounded-2xl shadow-lg border border-gray-100 card-hover animate-fade-in-up stagger-delay-1">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 transition-bounce hover:rotate-12">
                  <Zap className="h-10 w-10 text-white icon-bounce" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Implementación Ultra-Rápida</h3>
                <p className="text-gray-600 mb-6">
                  24 horas vs 3-6 meses de las consultorías tradicionales.
                  Tu entidad protegida desde el primer día.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="text-blue-800 font-bold text-lg">24 horas</div>
                  <div className="text-blue-600 text-sm">Implementación completa</div>
                </div>
              </div>

              <div className="text-center p-8 bg-white rounded-2xl shadow-lg border border-gray-100 card-hover animate-fade-in-up stagger-delay-2">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 transition-bounce hover:rotate-12">
                  <DollarSign className="h-10 w-10 text-white icon-bounce" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Precio Revolucionario</h3>
                <p className="text-gray-600 mb-6">
                  Desde 18,44€ inicial vs 7.000€+ de consultorías tradicionales.
                  Mismos resultados, 97% menos coste.
                </p>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="text-green-800 font-bold text-lg">97% ahorro</div>
                  <div className="text-green-600 text-sm">vs consultoría tradicional</div>
                </div>
              </div>

              <div className="text-center p-8 bg-white rounded-2xl shadow-lg border border-gray-100 card-hover animate-fade-in-up stagger-delay-3">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 transition-bounce hover:rotate-12">
                  <RefreshCw className="h-10 w-10 text-white icon-bounce" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Mantenimiento Incluido</h3>
                <p className="text-gray-600 mb-6">
                  Mantenimiento automático vs renovaciones manuales caras.
                  Siempre actualizado sin esfuerzo.
                </p>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <div className="text-purple-800 font-bold text-lg">Sin coste adicional</div>
                  <div className="text-purple-600 text-sm">Todo incluido</div>
                </div>
              </div>

              <div className="text-center p-8 bg-white rounded-2xl shadow-lg border border-gray-100 card-hover animate-fade-in-up stagger-delay-4">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6 transition-bounce hover:rotate-12">
                  <Settings className="h-10 w-10 text-white icon-bounce" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">100% Automatizado</h3>
                <p className="text-gray-600 mb-6">
                  Proceso digitalizado vs gestión manual propensa a errores.
                  Tecnología que garantiza precisión.
                </p>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <div className="text-orange-800 font-bold text-lg">0 errores</div>
                  <div className="text-orange-600 text-sm">Proceso automatizado</div>
                </div>
              </div>

              <div className="text-center p-8 bg-white rounded-2xl shadow-lg border border-gray-100 card-hover animate-fade-in-up stagger-delay-5">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 transition-bounce hover:rotate-12">
                  <Monitor className="h-10 w-10 text-white icon-bounce" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Dashboard Inteligente</h3>
                <p className="text-gray-600 mb-6">
                  Visibilidad total del cumplimiento vs informes manuales.
                  Control en tiempo real.
                </p>
                <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4">
                  <div className="text-cyan-800 font-bold text-lg">24/7</div>
                  <div className="text-cyan-600 text-sm">Monitorización continua</div>
                </div>
              </div>

              <div className="text-center p-8 bg-white rounded-2xl shadow-lg border border-gray-100 card-hover animate-fade-in-up stagger-delay-6">
                <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 transition-bounce hover:rotate-12">
                  <Shield className="h-10 w-10 text-white icon-bounce" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Garantía Total</h3>
                <p className="text-gray-600 mb-6">
                  Cumplimiento vs responsabilidad limitada.
                  Respaldamos nuestro trabajo.
                </p>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="text-red-800 font-bold text-lg">Cumpliendo</div>
                  <div className="text-red-600 text-sm">Cumplimiento</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-100 via-red-50 to-orange-100 rounded-2xl border-2 border-orange-200 p-8 md:p-12">
              <div className="text-center mb-8">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  La Revolución en Protección LOPIVI
                </h3>
                <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
                  Mientras las consultorías tradicionales siguen con métodos del siglo pasado,
                  custodia360 lidera la automatización de la protección infantil en España.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h4 className="font-bold text-red-600 text-lg mb-3 flex items-center">
                    <X className="h-5 w-5 mr-2" />
                    Consultorías Tradicionales
                  </h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• 3-6 meses de implementación</li>
                    <li>• 7.000€+ en costes iniciales</li>
                    <li>• Renovaciones manuales caras</li>
                    <li>• Propensas a errores humanos</li>
                    <li>• Sin garantías de cumplimiento</li>
                    <li>• Documentación en papel</li>
                  </ul>
                </div>

                <div className="bg-white rounded-xl p-6 border border-orange-200 shadow-lg">
                  <h4 className="font-bold text-green-600 text-lg mb-3 flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    custodia360 Automatizado
                  </h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• 24 horas de implementación</li>
                    <li>• Desde 18,44€ inicial</li>
                    <li>• Mantenimiento automático incluido</li>
                    <li>• Tecnología sin errores</li>
                    <li>• Cumplimiento</li>
                    <li>• Dashboard digital en tiempo real</li>
                  </ul>
                </div>
              </div>

              <div className="text-center mt-8">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-8 py-4 text-lg"
                  asChild
                >
                  <Link href="/planes">
                    <Target className="h-6 w-6 mr-3" />
                    Únete a la Revolución
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Roles y Responsabilidades Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-gray-50 via-blue-50 to-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge className={`mb-6 bg-blue-100 text-blue-800 hover:bg-blue-100 text-base px-6 py-2 ${useEntranceAnimation(0)}`}>
                👥 Roles y Responsabilidades LOPIVI
              </Badge>
              <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 ${useEntranceAnimation(1)}`}>
                ¿Qué tiene que hacer cada persona en tu entidad?
              </h2>
              <p className={`text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto ${useEntranceAnimation(2)}`}>
                custodia360 asigna automáticamente las tareas específicas según el rol de cada persona.
                Cada uno recibe exactamente lo que necesita hacer para cumplir LOPIVI.
              </p>
            </div>

            {/* Roles Grid */}
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 ${pageAnimations.animatedGrid}`}>

              {/* Delegado de Protección */}
              <Card className={`${cardClasses} border-2 border-red-300 bg-red-50`}>
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className={`h-8 w-8 text-white ${iconClasses}`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Delegado de Protección</h3>
                  <div className="text-left space-y-3 text-sm">
                    <div className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Cumplimentar datos de la entidad</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Leer protocolo específico para delegado</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Realizar y aprobar test</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Recibir certificado oficial</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Rellenar Excel con todo el personal</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Enviar documentación por roles</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Directivos/Propietarios */}
              <Card className={`${cardClasses} border-2 border-orange-300 bg-orange-50`}>
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Building2 className={`h-8 w-8 text-white ${iconClasses}`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Directivos / Propietarios</h3>
                  <div className="text-left space-y-3 text-sm">
                    <div className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-orange-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Leer protocolo para directivos</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-orange-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Realizar y aprobar test</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-orange-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Recibir certificado oficial</span>
                    </div>
                    <div className="bg-orange-100 rounded-lg p-3 mt-4">
                      <p className="text-orange-800 text-xs font-medium">
                        ✅ Sin gestión de personal - más simple que el delegado
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Personal con Contacto */}
              <Card className={`${cardClasses} border-2 border-blue-300 bg-blue-50`}>
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className={`h-8 w-8 text-white ${iconClasses}`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Personal con Contacto</h3>
                  <div className="text-left space-y-3 text-sm">
                    <div className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Leer protocolo para personal</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Realizar y aprobar test</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Recibir certificado personal</span>
                    </div>
                    <div className="bg-blue-100 rounded-lg p-3 mt-4">
                      <p className="text-blue-800 text-xs font-medium">
                        ⚡ Formación enfocada en contacto directo con menores
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Personal sin Contacto */}
              <Card className={`${cardClasses} border-2 border-green-300 bg-green-50`}>
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className={`h-8 w-8 text-white ${iconClasses}`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Personal sin Contacto</h3>
                  <div className="text-left space-y-3 text-sm">
                    <div className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Leer protocolo básico</span>
                    </div>
                    <div className="bg-green-100 rounded-lg p-4 mt-4">
                      <p className="text-green-800 text-xs font-medium mb-2">
                        ✅ Proceso más simple
                      </p>
                      <p className="text-green-700 text-xs">
                        Solo necesitan conocer el protocolo básico de la entidad para estar informados.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Familias */}
              <Card className={`${cardClasses} border-2 border-purple-300 bg-purple-50`}>
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className={`h-8 w-8 text-white ${iconClasses}`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Familias</h3>
                  <div className="text-left space-y-3 text-sm">
                    <div className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Recibir protocolo familiar</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Leer y conocer las medidas</span>
                    </div>
                    <div className="bg-purple-100 rounded-lg p-4 mt-4">
                      <p className="text-purple-800 text-xs font-medium mb-2">
                        👨‍👩‍👧‍👦 Tranquilidad familiar
                      </p>
                      <p className="text-purple-700 text-xs">
                        Conocen exactamente qué medidas protegen a su hijo en la entidad.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Menores */}
              <Card className={`${cardClasses} border-2 border-pink-300 bg-pink-50`}>
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className={`h-8 w-8 text-white ${iconClasses}`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Menores</h3>
                  <div className="text-left space-y-3 text-sm">
                    <div className="bg-cyan-100 rounded-lg p-3 mb-3">
                      <p className="text-cyan-800 text-xs font-bold">👦 Mayores de 16 años</p>
                      <p className="text-cyan-700 text-xs mt-1">Igual que familias: reciben y leen protocolo</p>
                    </div>
                    <div className="bg-pink-100 rounded-lg p-3">
                      <p className="text-pink-800 text-xs font-bold">👶 Menores de 16 años</p>
                      <p className="text-pink-700 text-xs mt-1">
                        Video educativo o documento especial diseñado para su edad,
                        siempre acompañados de padres/tutores.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

            </div>

            {/* Proceso Automatizado */}
            <div className={`bg-gradient-to-r from-blue-100 via-green-50 to-purple-100 rounded-2xl border-2 border-blue-200 p-8 md:p-12 ${useEntranceAnimation(3)}`}>
              <div className="text-center mb-8">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  🤖 custodia360 Automatiza Todo Este Proceso
                </h3>
                <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
                  No tienes que gestionar manualmente quién debe hacer qué. Nuestro sistema identifica automáticamente
                  el rol de cada persona y le envía exactamente lo que necesita.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-6 text-center shadow-md">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <UserCheck className="h-6 w-6 text-blue-600" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">Identificación Automática</h4>
                  <p className="text-gray-600 text-sm">
                    El sistema detecta el rol de cada persona según su función en la entidad
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 text-center shadow-md">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Bell className="h-6 w-6 text-green-600" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">Envío Personalizado</h4>
                  <p className="text-gray-600 text-sm">
                    Cada persona recibe solo la documentación y tareas específicas de su rol
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 text-center shadow-md">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Activity className="h-6 w-6 text-purple-600" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">Seguimiento Completo</h4>
                  <p className="text-gray-600 text-sm">
                    Monitorizamos el progreso de cada persona y certificamos el cumplimiento
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-gray-100 text-gray-800 hover:bg-gray-100 text-base px-6 py-2">
                ❓ Preguntas Frecuentes
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Resolvemos tus Dudas sobre LOPIVI
              </h2>
              <p className="text-xl md:text-2xl text-gray-600">
                Las preguntas más frecuentes de nuestros clientes resueltas
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white border-2 border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-shadow card-hover animate-fade-in-up" style={{animationDelay: `${index * 0.1}s`}}>
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full p-6 text-left flex items-center justify-between transition-smooth focus-ring"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</h3>
                    {openFaq === index ? (
                      <ChevronUp className="h-6 w-6 text-orange-600 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-6 w-6 text-orange-600 flex-shrink-0" />
                    )}
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-6">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-lg text-gray-600 mb-6">
                ¿Tienes más preguntas? Nuestros expertos están aquí para ayudarte
              </p>
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white" asChild>
                <Link href="/contacto">
                  <Phone className="h-6 w-6 mr-3" />
                  Consulta Gratuita: 678 771 198
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-slate-800 via-gray-800 to-slate-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
              <div className="md:col-span-2">
                <div className="flex items-center space-x-2 mb-6">
                  <Shield className="h-8 w-8 text-orange-600" />
                  <span className="text-2xl font-bold">custodia360</span>
                </div>
                <p className="text-gray-400 mb-6 max-w-md">
                  Primera empresa automatizada de España especializada en cumplimiento LOPIVI.
                  Protegemos entidades que trabajan con menores con implementación en 24h y mantenimiento continuo.
                </p>
                <div className="space-y-2 text-gray-400">
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-3" />
                    <span>678 771 198</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-3" />
                    <span>info@custodia360.es</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-3" />
                    <span>Barcelona, España</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-6">Servicios</h3>
                <ul className="space-y-3 text-gray-400">
                  <li><Link href="/servicios" className="hover:text-white transition-colors">Servicios</Link></li>
                  <li><Link href="/planes" className="hover:text-white transition-colors">Planes</Link></li>
                  <li><Link href="/demo" className="hover:text-white transition-colors">Demo</Link></li>
                  <li><Link href="/guia-custodia360" className="hover:text-white transition-colors">Guía custodia360</Link></li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-6">Recursos</h3>
                <ul className="space-y-3 text-gray-400">
                  <li><Link href="/lopivi" className="hover:text-white transition-colors">LOPIVI</Link></li>
                  <li><Link href="/nosotros" className="hover:text-white transition-colors">Sobre Nosotros</Link></li>
                  <li><Link href="/contacto" className="hover:text-white transition-colors">Contacto</Link></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="text-gray-400 text-sm mb-4 md:mb-0">
                  © 2025 custodia360. Todos los derechos reservados. custodia360 es propiedad de Sportsmotherland.
                </p>
                <div className="flex space-x-6 text-sm text-gray-400">
                  <Link href="/terminos-condiciones" className="hover:text-white transition-colors">Términos</Link>
                  <Link href="/politica-privacidad" className="hover:text-white transition-colors">Privacidad</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Stripe Checkout Modal */}
      <StripeCheckout
        isOpen={isStripeOpen}
        onClose={() => setIsStripeOpen(false)}
        selectedPlan={selectedPlanForCheckout}
      />
    </div>
  );
}
