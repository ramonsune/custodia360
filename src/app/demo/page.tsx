'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Shield, Users, Building2, FileText, Heart, CheckCircle, Clock, AlertCircle,
  User, Phone, Mail, MapPin, Monitor, BarChart3, Target, Award, Eye, Download,
  Calendar, Settings, Bell, UserCheck, Activity, TrendingUp, Database,
  ChevronRight, PlayCircle, PauseCircle, CheckCircle2, XCircle, Menu, X, Smartphone
} from 'lucide-react';
import Link from 'next/link';
import {
  useEntranceAnimation,
  pageAnimations,
  cardClasses,
  primaryButtonClasses,
  iconClasses
} from '@/lib/animations';

export default function DemoPage() {
  const [selectedRole, setSelectedRole] = useState('delegado');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Datos simulados de una entidad
  const entidadData = {
    nombre: "Centro Deportivo Los Pinos",
    tipo: "Centro Deportivo",
    menores: 127,
    personal: 12,
    delegado: "María García López",
    fechaImplementacion: "15 Marzo 2024",
    progreso: 85
  };

  // Personal simulado con sus estados
  const personalData = [
    { id: 1, nombre: "María García", rol: "Delegado", progreso: 100, estado: "completado", certificado: true },
    { id: 2, nombre: "Carlos Ruiz", rol: "Director", progreso: 100, estado: "completado", certificado: true },
    { id: 3, nombre: "Ana Martín", rol: "Entrenadora", progreso: 90, estado: "en_progreso", certificado: false },
    { id: 4, nombre: "Luis Santos", rol: "Entrenador", progreso: 100, estado: "completado", certificado: true },
    { id: 5, nombre: "Elena Vega", rol: "Monitora", progreso: 75, estado: "en_progreso", certificado: false },
    { id: 6, nombre: "Pedro López", rol: "Mantenimiento", progreso: 100, estado: "completado", certificado: true },
    { id: 7, nombre: "Carmen Díaz", rol: "Recepción", progreso: 45, estado: "pendiente", certificado: false },
    { id: 8, nombre: "Miguel Torres", rol: "Entrenador", progreso: 100, estado: "completado", certificado: true }
  ];

  const roles = [
    {
      id: 'delegado',
      name: 'Delegado de Protección',
      icon: Shield,
      color: 'red',
      description: 'Vista completa de gestión y supervisión'
    },
    {
      id: 'directivo',
      name: 'Directivo',
      icon: Building2,
      color: 'orange',
      description: 'Vista ejecutiva simplificada'
    },
    {
      id: 'personal_contacto',
      name: 'Personal con Contacto',
      icon: Users,
      color: 'blue',
      description: 'Vista personal y formación especializada'
    },
    {
      id: 'personal_sin_contacto',
      name: 'Personal sin Contacto',
      icon: FileText,
      color: 'green',
      description: 'Vista básica informativa'
    },
    {
      id: 'familia',
      name: 'Familia',
      icon: Heart,
      color: 'purple',
      description: 'Vista informativa para padres'
    }
  ];

  const getProgressColor = (progreso: number) => {
    if (progreso >= 90) return 'text-green-600 bg-green-100';
    if (progreso >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getEstadoIcon = (estado: string) => {
    switch (estado) {
      case 'completado': return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case 'en_progreso': return <Clock className="h-5 w-5 text-yellow-600" />;
      case 'pendiente': return <XCircle className="h-5 w-5 text-red-600" />;
      default: return <AlertCircle className="h-5 w-5 text-gray-600" />;
    }
  };

  const renderDashboardContent = () => {
    switch (selectedRole) {
      case 'delegado':
        return (
          <div className="space-y-6">
            {/* Vista Delegado - Gestión Completa */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-green-200 bg-green-50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-800 font-medium">Personal Certificado</p>
                      <p className="text-3xl font-bold text-green-600">6/8</p>
                    </div>
                    <UserCheck className="h-10 w-10 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-yellow-200 bg-yellow-50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-yellow-800 font-medium">En Progreso</p>
                      <p className="text-3xl font-bold text-yellow-600">2</p>
                    </div>
                    <Clock className="h-10 w-10 text-yellow-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-800 font-medium">Cumplimiento Global</p>
                      <p className="text-3xl font-bold text-blue-600">85%</p>
                    </div>
                    <TrendingUp className="h-10 w-10 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Lista de Personal */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-6 w-6 mr-2" />
                  Gestión de Personal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {personalData.map((persona) => (
                    <div key={persona.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        {getEstadoIcon(persona.estado)}
                        <div>
                          <p className="font-semibold">{persona.nombre}</p>
                          <p className="text-sm text-gray-600">{persona.rol}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className={`text-sm font-medium px-2 py-1 rounded ${getProgressColor(persona.progreso)}`}>
                            {persona.progreso}%
                          </p>
                        </div>
                        {persona.certificado && (
                          <Badge className="bg-green-100 text-green-800">
                            Certificado
                          </Badge>
                        )}
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-1" />
                          Ver
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Acciones del Delegado */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Tareas Pendientes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                      <span>Revisar formación de Elena Vega</span>
                      <Button size="sm">Revisar</Button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                      <span>Enviar recordatorio a Carmen Díaz</span>
                      <Button size="sm">Enviar</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Reportes y Certificados</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button className="w-full justify-start" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Descargar Certificado Entidad
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Generar Reporte de Cumplimiento
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Database className="h-4 w-4 mr-2" />
                      Exportar Datos de Personal
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 'directivo':
        return (
          <div className="space-y-6">
            {/* Vista Directivo - Resumen Ejecutivo */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-green-200 bg-green-50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-800 font-medium">Estado del Cumplimiento</p>
                      <p className="text-3xl font-bold text-green-600">85%</p>
                      <p className="text-sm text-green-700">En proceso de finalización</p>
                    </div>
                    <Shield className="h-12 w-12 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-800 font-medium">Mi Certificación</p>
                      <p className="text-2xl font-bold text-blue-600">Completada</p>
                      <p className="text-sm text-blue-700">Válida hasta 2025</p>
                    </div>
                    <Award className="h-12 w-12 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Panel del Directivo */}
            <Card>
              <CardHeader>
                <CardTitle>Panel Ejecutivo - Carlos Ruiz (Director)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Mi Progreso Personal</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Protocolo para Directivos</span>
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Test de Conocimientos</span>
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Certificado Recibido</span>
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Estado de la Entidad</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Personal Certificado</span>
                        <span className="text-sm font-medium">6 de 8</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Delegado Asignado</span>
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Protocolos Activos</span>
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Acciones Disponibles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button className="justify-start" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Descargar Mi Certificado
                  </Button>
                  <Button className="justify-start" variant="outline">
                    <Eye className="h-4 w-4 mr-2" />
                    Ver Reporte de Cumplimiento
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'personal_contacto':
        return (
          <div className="space-y-6">
            {/* Vista Personal con Contacto */}
            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="p-6">
                <div className="text-center">
                  <User className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-blue-900 mb-2">Ana Martín - Entrenadora</h3>
                  <p className="text-blue-700">Personal con Contacto Directo con Menores</p>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Mi Progreso de Formación</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                        <span>Protocolo para Personal</span>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Completado</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                        <span>Test de Conocimientos</span>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Aprobado: 95%</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 text-yellow-600 mr-3" />
                        <span>Certificado Personal</span>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-800">En revisión</Badge>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Progreso Total</span>
                      <span className="font-bold text-blue-600">90%</span>
                    </div>
                    <div className="w-full bg-blue-200 rounded-full h-3">
                      <div className="bg-blue-600 h-3 rounded-full" style={{width: '90%'}}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Formación Especializada</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <h4 className="font-medium mb-2">Módulos Completados</h4>
                      <ul className="text-sm space-y-1">
                        <li>✅ Identificación de situaciones de riesgo</li>
                        <li>✅ Protocolos de actuación con menores</li>
                        <li>✅ Comunicación con familias</li>
                        <li>✅ Procedimientos de emergencia</li>
                      </ul>
                    </div>

                    <Button className="w-full" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Descargar Material de Apoyo
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Próximos Pasos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-blue-800 mb-3">
                    <strong>Acción Requerida:</strong> Tu test ha sido aprobado.
                    El delegado está revisando tu certificado personal.
                  </p>
                  <p className="text-blue-700 text-sm">
                    Recibirás una notificación cuando esté listo para descargar.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'personal_sin_contacto':
        return (
          <div className="space-y-6">
            {/* Vista Personal sin Contacto */}
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-6">
                <div className="text-center">
                  <FileText className="h-16 w-16 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-green-900 mb-2">Pedro López - Mantenimiento</h3>
                  <p className="text-green-700">Personal sin Contacto Directo con Menores</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Mi Formación Básica</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center">
                      <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
                      <div>
                        <p className="font-medium">Protocolo Básico de la Entidad</p>
                        <p className="text-sm text-gray-600">Completado el 10 de Marzo</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Completado</Badge>
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-medium mb-3 text-green-800">¿Qué incluía mi formación?</h4>
                    <ul className="text-sm space-y-1 text-green-700">
                      <li>✅ Conocimiento del protocolo de protección</li>
                      <li>✅ Procedimientos básicos de seguridad</li>
                      <li>✅ A quién contactar en caso de emergencia</li>
                      <li>✅ Mis responsabilidades como personal</li>
                    </ul>
                  </div>

                  <div className="text-center p-6 bg-white border-2 border-green-200 rounded-lg">
                    <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-3" />
                    <h3 className="text-lg font-bold text-green-800 mb-2">¡Formación Completada!</h3>
                    <p className="text-green-700">
                      Ya estás al día con todos los requisitos LOPIVI para tu puesto.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recursos Disponibles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Descargar Protocolo de la Entidad
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Phone className="h-4 w-4 mr-2" />
                    Contactos de Emergencia
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'familia':
        return (
          <div className="space-y-6">
            {/* Vista Familia */}
            <Card className="border-purple-200 bg-purple-50">
              <CardContent className="p-6">
                <div className="text-center">
                  <Heart className="h-16 w-16 text-purple-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-purple-900 mb-2">Familia Martínez</h3>
                  <p className="text-purple-700">Padres de Sofía Martínez (12 años)</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Información del Centro</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Estado de Protección</h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                        <span className="text-sm">Centro certificado LOPIVI</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                        <span className="text-sm">Personal formado y verificado</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                        <span className="text-sm">Protocolos activos</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                        <span className="text-sm">Delegado de protección asignado</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3">Contactos Importantes</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <p className="font-medium">Delegado de Protección</p>
                        <p className="text-gray-600">María García López</p>
                        <p className="text-gray-600">📧 delegado@centrolospinos.es</p>
                      </div>
                      <div>
                        <p className="font-medium">Director del Centro</p>
                        <p className="text-gray-600">Carlos Ruiz</p>
                        <p className="text-gray-600">📞 678 771 198</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Protocolo para Familias</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-medium mb-2 text-purple-800">¿Qué medidas protegen a tu hijo?</h4>
                    <ul className="text-sm space-y-1 text-purple-700">
                      <li>• Todo el personal ha sido verificado y formado</li>
                      <li>• Existen protocolos claros de actuación</li>
                      <li>• Hay un delegado especializado en protección</li>
                      <li>• Se realizan evaluaciones continuas</li>
                      <li>• Los espacios están diseñados para la seguridad</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-white border-2 border-purple-200 rounded-lg">
                    <h4 className="font-medium mb-2">¿Cómo reportar una preocupación?</h4>
                    <ol className="text-sm space-y-1 text-gray-700">
                      <li>1. Contacta inmediatamente al delegado de protección</li>
                      <li>2. O habla con el director del centro</li>
                      <li>3. Todas las comunicaciones son confidenciales</li>
                      <li>4. Se investigará cualquier preocupación</li>
                    </ol>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recursos para Familias</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Descargar Protocolo Familiar
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Phone className="h-4 w-4 mr-2" />
                    Contactos de Emergencia
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Mail className="h-4 w-4 mr-2" />
                    Enviar Consulta al Delegado
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return <div>Selecciona un rol para ver su dashboard</div>;
    }
  };

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
              🖥️ Demo Interactivo
            </Badge>
            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 ${useEntranceAnimation(1)}`}>
              Simulador del <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">Dashboard custodia360</span>
            </h1>
            <p className={`text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8 ${useEntranceAnimation(2)}`}>
              Descubre cómo cada rol ve su progreso y gestiona sus responsabilidades LOPIVI.
              Cambia entre diferentes usuarios para explorar todas las funcionalidades.
            </p>
          </div>
        </div>
      </section>

      {/* Selector de Roles */}
      <section className="py-8 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className={`text-2xl font-bold text-center text-gray-900 mb-8 ${useEntranceAnimation(0)}`}>
              Selecciona un Rol para Explorar su Dashboard
            </h2>
            <div className={`grid grid-cols-1 md:grid-cols-5 gap-4 ${pageAnimations.animatedGrid}`}>
              {roles.map((role) => {
                const Icon = role.icon;
                const isSelected = selectedRole === role.id;
                return (
                  <Button
                    key={role.id}
                    onClick={() => setSelectedRole(role.id)}
                    className={`p-4 h-auto flex-col space-y-2 transition-all ${
                      isSelected
                        ? `bg-${role.color}-600 text-white hover:bg-${role.color}-700`
                        : 'bg-white border-2 text-gray-700 hover:bg-gray-50'
                    }`}
                    variant={isSelected ? "default" : "outline"}
                  >
                    <Icon className="h-8 w-8" />
                    <div className="text-center">
                      <div className="font-semibold text-sm">{role.name}</div>
                      <div className="text-xs opacity-80">{role.description}</div>
                    </div>
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Simulator */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Información de la Entidad */}
            <Card className={`mb-8 ${useEntranceAnimation(0)}`}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building2 className="h-6 w-6 mr-2" />
                  {entidadData.nombre}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Tipo de Entidad</p>
                    <p className="font-semibold">{entidadData.tipo}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Menores Atendidos</p>
                    <p className="font-semibold">{entidadData.menores}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Personal Total</p>
                    <p className="font-semibold">{entidadData.personal}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Implementación</p>
                    <p className="font-semibold">{entidadData.fechaImplementacion}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Dashboard Content */}
            <div className={useEntranceAnimation(1)}>
              {renderDashboardContent()}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-red-600">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className={`text-3xl md:text-4xl font-bold text-white mb-6 ${useEntranceAnimation(0)}`}>
              ¿Quieres este dashboard para tu entidad?
            </h2>
            <p className={`text-xl text-orange-100 mb-8 ${useEntranceAnimation(1)}`}>
              Implementa custodia360 en 24 horas y obtén un sistema completo de gestión LOPIVI
            </p>
            <div className={`flex flex-col sm:flex-row gap-4 justify-center ${useEntranceAnimation(2)}`}>
              <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50" asChild>
                <Link href="/planes">
                  <Target className="h-5 w-5 mr-2" />
                  Ver Planes y Precios
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600" asChild>
                <Link href="/contacto">
                  <Phone className="h-5 w-5 mr-2" />
                  Consulta Gratuita
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}
