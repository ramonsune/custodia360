'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Shield, CheckCircle, Clock, Users, Building2, FileText, Award,
  Target, Phone, Mail, Settings, Monitor, BarChart3, Download,
  UserCheck, Bell, Activity, Database, Eye, RefreshCw, Zap,
  Heart, AlertTriangle, ArrowRight, Star, Menu, X, Smartphone
} from 'lucide-react';
import Link from 'next/link';
import {
  useEntranceAnimation,
  pageAnimations,
  cardClasses,
  primaryButtonClasses,
  iconClasses
} from '@/lib/animations';

export default function ServiciosPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const servicios = [
    {
      id: 'implementacion',
      title: 'Implementación Completa en 24h',
      description: 'Setup completo de toda la normativa LOPIVI para tu entidad',
      icon: Clock,
      color: 'blue',
      features: [
        'Análisis inicial de tu entidad',
        'Configuración del sistema',
        'Asignación del delegado de protección',
        'Verificación de personal existente',
        'Protocolo personalizado',
        'Documentación completa'
      ]
    },
    {
      id: 'verificacion',
      title: 'Verificación de Personal',
      description: 'Revisión completa de antecedentes de todo el personal',
      icon: UserCheck,
      color: 'green',
      features: [
        'Verificación de antecedentes penales',
        'Comprobación de inhabilitaciones',
        'Revisión de certificados profesionales',
        'Validación de identidad',
        'Historial laboral',
        'Referencias profesionales'
      ]
    },
    {
      id: 'delegado',
      title: 'Delegado de Protección Certificado',
      description: 'Formación y certificación de tu delegado de protección',
      icon: Shield,
      color: 'red',
      features: [
        'Formación especializada LOPIVI',
        'Certificación oficial',
        'Herramientas de gestión',
        'Protocolos de actuación',
        'Comunicación con autoridades',
        'Seguimiento continuo'
      ]
    },
    {
      id: 'protocolos',
      title: 'Protocolos Claros y Actualizados',
      description: 'Documentación completa adaptada a tu tipo de entidad',
      icon: FileText,
      color: 'purple',
      features: [
        'Protocolo de protección específico',
        'Procedimientos de emergencia',
        'Comunicación con familias',
        'Gestión de incidencias',
        'Documentación legal',
        'Formularios oficiales'
      ]
    },
    {
      id: 'formacion',
      title: 'Formación del Equipo',
      description: 'Capacitación personalizada por roles y responsabilidades',
      icon: Users,
      color: 'orange',
      features: [
        'Formación por roles específicos',
        'Material educativo adaptado',
        'Tests de conocimientos',
        'Certificados personales',
        'Actualizaciones periódicas',
        'Soporte continuo'
      ]
    },
    {
      id: 'dashboard',
      title: 'Dashboard de Gestión',
      description: 'Sistema digital para monitorizar el cumplimiento',
      icon: Monitor,
      color: 'cyan',
      features: [
        'Panel de control intuitivo',
        'Seguimiento en tiempo real',
        'Reportes automáticos',
        'Alertas y notificaciones',
        'Gestión de personal',
        'Exportación de datos'
      ]
    },
    {
      id: 'mantenimiento',
      title: 'Mantenimiento Continuo',
      description: 'Actualizaciones automáticas y soporte permanente',
      icon: RefreshCw,
      color: 'green',
      features: [
        'Actualizaciones normativas',
        'Revisiones periódicas',
        'Soporte técnico',
        'Nuevas funcionalidades',
        'Backup de datos',
        'Garantía de cumplimiento'
      ]
    },
    {
      id: 'familias',
      title: 'Información para Familias',
      description: 'Transparencia total con padres y tutores',
      icon: Heart,
      color: 'pink',
      features: [
        'Protocolo familiar',
        'Material educativo para menores',
        'Canales de comunicación',
        'Información de contacto',
        'Procedimientos de quejas',
        'Certificados de la entidad'
      ]
    }
  ];

  const procesoImplementacion = [
    {
      step: 1,
      title: 'Análisis Inicial',
      description: 'Evaluamos tu entidad y identificamos necesidades específicas',
      icon: Target,
      duration: '2 horas'
    },
    {
      step: 2,
      title: 'Configuración',
      description: 'Configuramos el sistema y asignamos roles',
      icon: Settings,
      duration: '4 horas'
    },
    {
      step: 3,
      title: 'Verificación',
      description: 'Verificamos al personal y asignamos formación',
      icon: UserCheck,
      duration: '8 horas'
    },
    {
      step: 4,
      title: 'Implementación',
      description: 'Activamos protocolos y certificamos cumplimiento',
      icon: CheckCircle,
      duration: '4 horas'
    },
    {
      step: 5,
      title: 'Entrega',
      description: 'Entregamos dashboard completo y documentación',
      icon: Award,
      duration: '2 horas'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link href="/" className="flex items-center space-x-2">
              <Shield className="h-8 w-8 md:h-10 md:w-10 text-orange-600" />
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-gray-900">custodia360</h1>
              </div>
            </Link>

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
                    asChild
                  >
                    <Link href="/planes">
                      <Smartphone className="h-4 w-4 mr-2" />
                      💳 Contratar Ahora
                    </Link>
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
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className={`mb-6 bg-blue-100 text-blue-800 text-base px-6 py-2 ${useEntranceAnimation(0)}`}>
              🏢 Servicios Completos
            </Badge>
            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 ${useEntranceAnimation(1)}`}>
              Todo lo que Necesitas para Cumplir <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">LOPIVI</span>
            </h1>
            <p className={`text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8 ${useEntranceAnimation(2)}`}>
              Servicios completos automatizados para garantizar el cumplimiento LOPIVI en tu entidad.
              Todo incluido: implementación, verificación, formación y mantenimiento.
            </p>

            <div className={`flex flex-col sm:flex-row gap-4 justify-center ${useEntranceAnimation(3)}`}>
              <Button size="lg" className={primaryButtonClasses} asChild>
                <Link href="/demo">
                  <Monitor className="h-5 w-5 mr-2" />
                  Ver Demo del Sistema
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contacto">
                  <Phone className="h-5 w-5 mr-2" />
                  Consulta Gratuita
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Proceso de Implementación */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className={`text-3xl md:text-4xl font-bold text-gray-900 mb-6 ${useEntranceAnimation(0)}`}>
                Proceso de Implementación en 24 Horas
              </h2>
              <p className={`text-xl text-gray-600 max-w-3xl mx-auto ${useEntranceAnimation(1)}`}>
                Nuestro proceso automatizado garantiza una implementación rápida y eficiente
              </p>
            </div>

            <div className={`grid grid-cols-1 md:grid-cols-5 gap-6 ${pageAnimations.animatedGrid}`}>
              {procesoImplementacion.map((paso, index) => {
                const Icon = paso.icon;
                return (
                  <div key={paso.step} className={`text-center ${cardClasses}`}>
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                      <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <div className="text-orange-600 font-bold text-lg mb-2">
                        Paso {paso.step}
                      </div>
                      <h3 className="font-bold text-gray-900 mb-3">{paso.title}</h3>
                      <p className="text-gray-600 text-sm mb-4">{paso.description}</p>
                      <Badge className="bg-orange-100 text-orange-800">
                        {paso.duration}
                      </Badge>
                    </div>
                    {index < procesoImplementacion.length - 1 && (
                      <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                        <ArrowRight className="h-6 w-6 text-gray-400" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="text-center mt-12">
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-8">
                <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-green-900 mb-4">
                  ¡Tu entidad protegida en 24 horas!
                </h3>
                <p className="text-green-700 max-w-2xl mx-auto">
                  Al finalizar el proceso, tu entidad cumple completamente con LOPIVI y
                  tienes acceso al dashboard de gestión para monitorizar todo el sistema.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios Detallados */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className={`text-3xl md:text-4xl font-bold text-gray-900 mb-6 ${useEntranceAnimation(0)}`}>
                Servicios Incluidos en Todos los Planes
              </h2>
              <p className={`text-xl text-gray-600 max-w-3xl mx-auto ${useEntranceAnimation(1)}`}>
                Cada plan incluye exactamente los mismos servicios, solo varía el número de menores
              </p>
            </div>

            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${pageAnimations.animatedGrid}`}>
              {servicios.slice(0, 6).map((servicio, index) => {
                const Icon = servicio.icon;
                return (
                  <Card key={servicio.id} className={`${cardClasses} border-2 border-gray-200 hover:border-orange-300`}>
                    <CardContent className="p-6">
                      <div className={`w-12 h-12 bg-${servicio.color}-100 rounded-full flex items-center justify-center mb-4`}>
                        <Icon className={`h-6 w-6 text-${servicio.color}-600 ${iconClasses}`} />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{servicio.title}</h3>
                      <p className="text-gray-600 mb-4">{servicio.description}</p>
                      <ul className="space-y-2">
                        {servicio.features.slice(0, 4).map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-sm">
                            <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                        {servicio.features.length > 4 && (
                          <li className="text-sm text-gray-500">
                            + {servicio.features.length - 4} características más
                          </li>
                        )}
                      </ul>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Servicios adicionales en segunda fila */}
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 ${pageAnimations.animatedGrid}`}>
              {servicios.slice(6).map((servicio, index) => {
                const Icon = servicio.icon;
                return (
                  <Card key={servicio.id} className={`${cardClasses} border-2 border-gray-200 hover:border-orange-300`}>
                    <CardContent className="p-6">
                      <div className={`w-12 h-12 bg-${servicio.color}-100 rounded-full flex items-center justify-center mb-4`}>
                        <Icon className={`h-6 w-6 text-${servicio.color}-600 ${iconClasses}`} />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{servicio.title}</h3>
                      <p className="text-gray-600 mb-4">{servicio.description}</p>
                      <ul className="space-y-2">
                        {servicio.features.slice(0, 4).map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-sm">
                            <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                        {servicio.features.length > 4 && (
                          <li className="text-sm text-gray-500">
                            + {servicio.features.length - 4} características más
                          </li>
                        )}
                      </ul>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Ventajas Competitivas */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className={`text-3xl md:text-4xl font-bold text-gray-900 mb-6 ${useEntranceAnimation(0)}`}>
                ¿Por qué custodia360 vs Consultorías Tradicionales?
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div className={`${useEntranceAnimation(1)}`}>
                <h3 className="text-2xl font-bold text-red-600 mb-6 flex items-center">
                  <AlertTriangle className="h-6 w-6 mr-2" />
                  Consultorías Tradicionales
                </h3>
                <div className="space-y-4">
                  {[
                    '3-6 meses de implementación',
                    '7.000€+ en costes iniciales',
                    'Renovaciones manuales caras',
                    'Propensas a errores humanos',
                    'Sin garantías de cumplimiento',
                    'Documentación en papel',
                    'Sin seguimiento continuo',
                    'Soporte limitado'
                  ].map((item, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`${useEntranceAnimation(2)}`}>
                <h3 className="text-2xl font-bold text-green-600 mb-6 flex items-center">
                  <CheckCircle className="h-6 w-6 mr-2" />
                  custodia360 Automatizado
                </h3>
                <div className="space-y-4">
                  {[
                    '24 horas de implementación',
                    'Desde 18,44€ inicial',
                    'Mantenimiento automático incluido',
                    'Tecnología sin errores',
                    'Cumplimiento garantizado',
                    'Dashboard digital en tiempo real',
                    'Seguimiento 24/7',
                    'Soporte técnico continuo'
                  ].map((item, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-2xl p-8 border-2 border-orange-200">
                <Star className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  97% de Ahorro vs Consultorías Tradicionales
                </h3>
                <p className="text-gray-700 max-w-2xl mx-auto">
                  Mismo resultado, tecnología superior, garantía de cumplimiento y
                  un precio que democratiza el acceso a la protección LOPIVI.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-red-600">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className={`text-3xl md:text-4xl font-bold text-white mb-6 ${useEntranceAnimation(0)}`}>
              ¿Listo para Proteger tu Entidad?
            </h2>
            <p className={`text-xl text-orange-100 mb-8 ${useEntranceAnimation(1)}`}>
              Implementa todos estos servicios en 24 horas y obtén la tranquilidad del cumplimiento LOPIVI
            </p>
            <div className={`flex flex-col sm:flex-row gap-4 justify-center ${useEntranceAnimation(2)}`}>
              <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50" asChild>
                <Link href="/planes">
                  <Target className="h-5 w-5 mr-2" />
                  Ver Planes y Precios
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600" asChild>
                <Link href="/demo">
                  <Monitor className="h-5 w-5 mr-2" />
                  Probar Demo Interactivo
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}
