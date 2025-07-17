'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Building2, Users, Award, Calculator, Phone, Mail, Shield, Clock, DollarSign, Menu, X, Smartphone } from 'lucide-react';
import Link from 'next/link';
import StripeCheckout from '@/components/StripeCheckoutReal';
import {
  animationClasses,
  pageAnimations,
  useEntranceAnimation,
  cardClasses,
  primaryButtonClasses,
  iconClasses
} from '@/lib/animations';

interface Plan {
  id: string;
  title: string;
  price: number;
  color: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  menores: string;
  popular?: boolean;
  features: string[];
}

export default function PlanesPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isStripeOpen, setIsStripeOpen] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<Plan | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const plans: Plan[] = [
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
      popular: true,
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
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
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
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setCurrentPlan(plans[1]); // Plan medio por defecto
                      setIsStripeOpen(true);
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
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className={`mb-6 bg-blue-100 text-blue-800 text-base px-6 py-2 ${useEntranceAnimation(0)}`}>
              💰 Planes Transparentes
            </Badge>
            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 ${useEntranceAnimation(1)}`}>
              Elige tu Plan de <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">Protección LOPIVI</span>
            </h1>
            <p className={`text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8 ${useEntranceAnimation(2)}`}>
              Todos los planes incluyen exactamente lo mismo: solo varía el número de menores protegidos.
              Pago cómodo: <strong>50% inicial + 50% a los 6 meses</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* Plans Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto ${pageAnimations.animatedGrid}`}>
            {plans.map((plan, index) => {
              const Icon = plan.icon;
              const colorClasses = {
                blue: "border-blue-300 bg-blue-50 text-blue-600",
                green: "border-green-300 bg-green-50 text-green-600",
                purple: "border-purple-300 bg-purple-50 text-purple-600"
              };

              return (
                <Card key={plan.id} className={`border-2 ${colorClasses[plan.color as keyof typeof colorClasses]} ${cardClasses} relative`}>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-orange-600 text-white px-4 py-1">
                        Más Popular
                      </Badge>
                    </div>
                  )}

                  <CardContent className="p-6 md:p-8 text-center">
                    <div className={`w-16 h-16 bg-${plan.color}-600 rounded-full flex items-center justify-center mx-auto mb-6 ${animationClasses.smooth} group-hover:scale-110 group-hover:rotate-12`}>
                      <Icon className={`h-8 w-8 text-white ${iconClasses}`} />
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{plan.title}</h3>
                    <div className={`text-4xl font-bold text-${plan.color}-600 mb-2`}>{plan.price.toFixed(2)}€</div>
                    <div className="text-gray-600 mb-4">(+IVA) Pago inicial</div>

                    <div className={`bg-${plan.color}-100 border border-${plan.color}-300 rounded-lg p-4 mb-6`}>
                      <div className={`text-${plan.color}-800 font-bold text-lg mb-3`}>
                        + {plan.price.toFixed(2)}€ a los 6 meses (+IVA)
                      </div>
                      <div className={`text-${plan.color}-700 text-sm`}>
                        Sin pagos mensuales
                      </div>
                    </div>

                    <div className="space-y-3 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 text-green-600 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Button
                      className={`w-full bg-${plan.color}-600 hover:bg-${plan.color}-700 text-white mb-4 ${primaryButtonClasses}`}
                      onClick={() => {
                        setCurrentPlan(plan);
                        setIsStripeOpen(true);
                      }}
                    >
                      💳 Contratar {plan.title}
                    </Button>

                    <div className="text-xs text-gray-500">
                      Implementación completa • Pago en 2 tramos
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className={`text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8 ${useEntranceAnimation(0)}`}>
              ✅ Todos los Planes Incluyen lo Mismo
            </h2>
            <p className={`text-xl text-center text-gray-600 mb-12 ${useEntranceAnimation(1)}`}>
              La única diferencia es el número de menores protegidos y la tarifa correspondiente.
            </p>

            <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${pageAnimations.animatedGrid}`}>
              {[
                { icon: Shield, title: "Verificación de personal", desc: "Revisión completa de antecedentes" },
                { icon: Award, title: "Delegado certificado", desc: "Profesional especializado en protección" },
                { icon: CheckCircle, title: "Protocolos claros", desc: "Documentación completa y actualizada" },
                { icon: Clock, title: "Implementación 24h", desc: "Setup completo en un día" },
                { icon: Users, title: "Formación del equipo", desc: "Capacitación para todo el personal" },
                { icon: DollarSign, title: "Mantenimiento incluido", desc: "Actualizaciones y soporte continuo" }
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className={`flex items-start p-6 bg-gray-50 rounded-xl ${cardClasses}`}>
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <Icon className={`h-6 w-6 text-orange-600 ${iconClasses}`} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-red-600">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className={`text-3xl md:text-4xl font-bold text-white mb-6 ${useEntranceAnimation(0)}`}>
              ¿Necesitas ayuda para elegir?
            </h2>
            <p className={`text-xl text-orange-100 mb-8 ${useEntranceAnimation(1)}`}>
              Nuestros expertos te ayudan a encontrar el plan perfecto para tu entidad
            </p>
            <div className={`flex flex-col sm:flex-row gap-4 justify-center ${useEntranceAnimation(2)}`}>
              <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50" asChild>
                <Link href="/contacto">
                  <Phone className="h-5 w-5 mr-2" />
                  Consulta Gratuita
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600" asChild>
                <Link href="tel:+34678771198">
                  📞 678 771 198
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stripe Checkout Modal - Solo del lado del cliente */}
      {isClient && (
        <StripeCheckout
          isOpen={isStripeOpen}
          onClose={() => setIsStripeOpen(false)}
          selectedPlan={currentPlan}
        />
      )}
    </div>
  );
}
