'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Shield, CreditCard, Lock, CheckCircle, Star, Users, Building2, Award,
  Phone, Mail, MapPin, Package, Palette, FileText, X, Calendar,
  Calculator, Euro, Info, AlertTriangle
} from 'lucide-react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

interface Plan {
  id: string;
  title: string;
  price: number;
  color: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  menores: string;
  features: string[];
}

interface StripeCheckoutProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan?: Plan | null;
}

export default function StripeCheckout({ isOpen, onClose, selectedPlan }: StripeCheckoutProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [currentStep, setCurrentStep] = useState(1);
  const [clientSecret, setClientSecret] = useState<string>('');
  const [paymentIntentId, setPaymentIntentId] = useState<string>('');
  const [formData, setFormData] = useState({
    // Información de la entidad
    nombreEntidad: '',
    tipoEntidad: '',
    nif: '',
    direccion: '',
    codigoPostal: '',
    ciudad: '',
    provincia: '',
    telefono: '',
    email: '',

    // Información del responsable
    nombreResponsable: '',
    cargoResponsable: '',
    telefonoResponsable: '',
    emailResponsable: '',

    // Kit de comunicación
    kitComunicacion: false,
    colorPrimario: '#EA580C',
    colorSecundario: '#DC2626',
    logoPersonalizado: false,
    materialesPersonalizados: false,

    // Información de pago
    nombreTarjeta: '',
    numeroTarjeta: '',
    fechaExpiracion: '',
    cvv: '',

    // Términos
    terminosAceptados: false,
    politicaPrivacidad: false,
    comunicacionesComerciales: false
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

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
    }
  ];

  const currentPlan = selectedPlan || plans[0];
  const kitPrice = formData.kitComunicacion ? 49.00 : 0;
  const subtotal = currentPlan.price + kitPrice;
  const iva = subtotal * 0.21;
  const total = subtotal + iva;

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Limpiar error del campo si existe
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.nombreEntidad) newErrors.nombreEntidad = 'Nombre de entidad requerido';
      if (!formData.tipoEntidad) newErrors.tipoEntidad = 'Tipo de entidad requerido';
      if (!formData.nif) newErrors.nif = 'NIF/CIF requerido';
      if (!formData.email) newErrors.email = 'Email requerido';
      if (!formData.telefono) newErrors.telefono = 'Teléfono requerido';
    }

    if (step === 2) {
      if (!formData.nombreResponsable) newErrors.nombreResponsable = 'Nombre del responsable requerido';
      if (!formData.cargoResponsable) newErrors.cargoResponsable = 'Cargo requerido';
      if (!formData.emailResponsable) newErrors.emailResponsable = 'Email del responsable requerido';
    }

    if (step === 4) {
      if (!formData.nombreTarjeta) newErrors.nombreTarjeta = 'Nombre en la tarjeta requerido';
      if (!formData.numeroTarjeta) newErrors.numeroTarjeta = 'Número de tarjeta requerido';
      if (!formData.fechaExpiracion) newErrors.fechaExpiracion = 'Fecha de expiración requerida';
      if (!formData.cvv) newErrors.cvv = 'CVV requerido';
      if (!formData.terminosAceptados) newErrors.terminosAceptados = 'Debe aceptar los términos y condiciones';
      if (!formData.politicaPrivacidad) newErrors.politicaPrivacidad = 'Debe aceptar la política de privacidad';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) return;

    setIsProcessing(true);

    // Simular procesamiento de pago
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Aquí iría la integración real con Stripe
      alert(`¡Pago procesado exitosamente!\n\nPlan: ${currentPlan.title}\nTotal: ${total.toFixed(2)}€ (primer pago)\nKit de comunicación: ${formData.kitComunicacion ? 'Sí' : 'No'}\n\nRecibirás un email con los próximos pasos en breve.`);

      onClose();
      setCurrentStep(1);
      setFormData({
        nombreEntidad: '',
        tipoEntidad: '',
        nif: '',
        direccion: '',
        codigoPostal: '',
        ciudad: '',
        provincia: '',
        telefono: '',
        email: '',
        nombreResponsable: '',
        cargoResponsable: '',
        telefonoResponsable: '',
        emailResponsable: '',
        kitComunicacion: false,
        colorPrimario: '#EA580C',
        colorSecundario: '#DC2626',
        logoPersonalizado: false,
        materialesPersonalizados: false,
        nombreTarjeta: '',
        numeroTarjeta: '',
        fechaExpiracion: '',
        cvv: '',
        terminosAceptados: false,
        politicaPrivacidad: false,
        comunicacionesComerciales: false
      });
    } catch (error) {
      alert('Error al procesar el pago. Por favor, intente de nuevo.');
    } finally {
      setIsProcessing(false);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Información de la Entidad</h3>
        <p className="text-gray-600">Datos básicos de su organización</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="nombreEntidad">Nombre de la Entidad *</Label>
          <Input
            id="nombreEntidad"
            value={formData.nombreEntidad}
            onChange={(e) => handleInputChange('nombreEntidad', e.target.value)}
            placeholder="Ej: Centro Deportivo Los Pinos"
            className={errors.nombreEntidad ? 'border-red-500' : ''}
          />
          {errors.nombreEntidad && <p className="text-red-500 text-sm mt-1">{errors.nombreEntidad}</p>}
        </div>

        <div>
          <Label htmlFor="tipoEntidad">Tipo de Entidad *</Label>
          <Select value={formData.tipoEntidad} onValueChange={(value) => handleInputChange('tipoEntidad', value)}>
            <SelectTrigger className={errors.tipoEntidad ? 'border-red-500' : ''}>
              <SelectValue placeholder="Seleccionar tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="centro-deportivo">Centro Deportivo</SelectItem>
              <SelectItem value="centro-educativo">Centro Educativo</SelectItem>
              <SelectItem value="academia">Academia</SelectItem>
              <SelectItem value="club">Club</SelectItem>
              <SelectItem value="campamento">Campamento</SelectItem>
              <SelectItem value="centro-cultural">Centro Cultural</SelectItem>
              <SelectItem value="asociacion">Asociación</SelectItem>
              <SelectItem value="fundacion">Fundación</SelectItem>
              <SelectItem value="otro">Otro</SelectItem>
            </SelectContent>
          </Select>
          {errors.tipoEntidad && <p className="text-red-500 text-sm mt-1">{errors.tipoEntidad}</p>}
        </div>

        <div>
          <Label htmlFor="nif">NIF/CIF *</Label>
          <Input
            id="nif"
            value={formData.nif}
            onChange={(e) => handleInputChange('nif', e.target.value)}
            placeholder="12345678Z"
            className={errors.nif ? 'border-red-500' : ''}
          />
          {errors.nif && <p className="text-red-500 text-sm mt-1">{errors.nif}</p>}
        </div>

        <div>
          <Label htmlFor="telefono">Teléfono *</Label>
          <Input
            id="telefono"
            value={formData.telefono}
            onChange={(e) => handleInputChange('telefono', e.target.value)}
            placeholder="678 771 198"
            className={errors.telefono ? 'border-red-500' : ''}
          />
          {errors.telefono && <p className="text-red-500 text-sm mt-1">{errors.telefono}</p>}
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="contacto@entidad.com"
            className={errors.email ? 'border-red-500' : ''}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="direccion">Dirección</Label>
          <Input
            id="direccion"
            value={formData.direccion}
            onChange={(e) => handleInputChange('direccion', e.target.value)}
            placeholder="Calle Principal 123"
          />
        </div>

        <div>
          <Label htmlFor="codigoPostal">Código Postal</Label>
          <Input
            id="codigoPostal"
            value={formData.codigoPostal}
            onChange={(e) => handleInputChange('codigoPostal', e.target.value)}
            placeholder="28001"
          />
        </div>

        <div>
          <Label htmlFor="ciudad">Ciudad</Label>
          <Input
            id="ciudad"
            value={formData.ciudad}
            onChange={(e) => handleInputChange('ciudad', e.target.value)}
            placeholder="Madrid"
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Responsable/Delegado</h3>
        <p className="text-gray-600">Persona responsable de la implementación LOPIVI</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="nombreResponsable">Nombre Completo *</Label>
          <Input
            id="nombreResponsable"
            value={formData.nombreResponsable}
            onChange={(e) => handleInputChange('nombreResponsable', e.target.value)}
            placeholder="María García López"
            className={errors.nombreResponsable ? 'border-red-500' : ''}
          />
          {errors.nombreResponsable && <p className="text-red-500 text-sm mt-1">{errors.nombreResponsable}</p>}
        </div>

        <div>
          <Label htmlFor="cargoResponsable">Cargo/Posición *</Label>
          <Select value={formData.cargoResponsable} onValueChange={(value) => handleInputChange('cargoResponsable', value)}>
            <SelectTrigger className={errors.cargoResponsable ? 'border-red-500' : ''}>
              <SelectValue placeholder="Seleccionar cargo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="director">Director/a</SelectItem>
              <SelectItem value="gerente">Gerente</SelectItem>
              <SelectItem value="coordinador">Coordinador/a</SelectItem>
              <SelectItem value="responsable-proteccion">Responsable de Protección</SelectItem>
              <SelectItem value="secretario">Secretario/a</SelectItem>
              <SelectItem value="presidente">Presidente/a</SelectItem>
              <SelectItem value="propietario">Propietario/a</SelectItem>
              <SelectItem value="otro">Otro</SelectItem>
            </SelectContent>
          </Select>
          {errors.cargoResponsable && <p className="text-red-500 text-sm mt-1">{errors.cargoResponsable}</p>}
        </div>

        <div>
          <Label htmlFor="telefonoResponsable">Teléfono de Contacto</Label>
          <Input
            id="telefonoResponsable"
            value={formData.telefonoResponsable}
            onChange={(e) => handleInputChange('telefonoResponsable', e.target.value)}
            placeholder="678 771 198"
          />
        </div>

        <div>
          <Label htmlFor="emailResponsable">Email *</Label>
          <Input
            id="emailResponsable"
            type="email"
            value={formData.emailResponsable}
            onChange={(e) => handleInputChange('emailResponsable', e.target.value)}
            placeholder="maria.garcia@entidad.com"
            className={errors.emailResponsable ? 'border-red-500' : ''}
          />
          {errors.emailResponsable && <p className="text-red-500 text-sm mt-1">{errors.emailResponsable}</p>}
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start">
          <Info className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
          <div>
            <p className="text-blue-800 font-medium text-sm">¿Quién será el Delegado de Protección?</p>
            <p className="text-blue-700 text-sm mt-1">
              Esta persona recibirá formación especializada y será el responsable oficial de la protección LOPIVI en su entidad.
              Puede ser la misma persona que está comprando o alguien diferente.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Kit de Comunicación</h3>
        <p className="text-gray-600">Personaliza los materiales de tu entidad</p>
      </div>

      {/* Checkbox principal del kit */}
      <div className="border-2 border-orange-200 rounded-lg p-6 bg-orange-50">
        <div className="flex items-start space-x-3">
          <Checkbox
            id="kitComunicacion"
            checked={formData.kitComunicacion}
            onCheckedChange={(checked) => handleInputChange('kitComunicacion', checked)}
            className="mt-1"
          />
          <div className="flex-1">
            <Label htmlFor="kitComunicacion" className="text-lg font-semibold text-gray-900 cursor-pointer">
              Añadir Kit de Comunicación (+49,00€)
            </Label>
            <p className="text-gray-600 mt-1">
              Materiales personalizados con la imagen de tu entidad para comunicar la protección LOPIVI
            </p>
          </div>
          <Package className="h-8 w-8 text-orange-600" />
        </div>
      </div>

      {/* Detalles del kit cuando está seleccionado */}
      {formData.kitComunicacion && (
        <div className="space-y-6 bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="font-semibold text-gray-900 mb-4">¿Qué incluye tu Kit de Comunicación?</h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h5 className="font-medium text-gray-900 mb-3">Materiales Incluidos:</h5>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  Cartel informativo personalizado
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  Certificado de cumplimiento con logo
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  Material informativo para familias
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  Pegatinas identificativas
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  Plantillas para redes sociales
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-medium text-gray-900 mb-3">Personalización:</h5>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="colorPrimario">Color Primario</Label>
                  <div className="flex items-center space-x-2 mt-1">
                    <input
                      type="color"
                      id="colorPrimario"
                      value={formData.colorPrimario}
                      onChange={(e) => handleInputChange('colorPrimario', e.target.value)}
                      className="w-12 h-8 rounded border"
                    />
                    <Input
                      value={formData.colorPrimario}
                      onChange={(e) => handleInputChange('colorPrimario', e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="logoPersonalizado"
                    checked={formData.logoPersonalizado}
                    onCheckedChange={(checked) => handleInputChange('logoPersonalizado', checked)}
                  />
                  <Label htmlFor="logoPersonalizado" className="text-sm cursor-pointer">
                    Incluir logo de la entidad
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="materialesPersonalizados"
                    checked={formData.materialesPersonalizados}
                    onCheckedChange={(checked) => handleInputChange('materialesPersonalizados', checked)}
                  />
                  <Label htmlFor="materialesPersonalizados" className="text-sm cursor-pointer">
                    Materiales completamente personalizados
                  </Label>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start">
              <Calendar className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
              <div>
                <p className="text-yellow-800 font-medium text-sm">Tiempo de entrega:</p>
                <p className="text-yellow-700 text-sm mt-1">
                  Los materiales personalizados estarán listos en 3-5 días laborables después de la implementación LOPIVI.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Información sin kit */}
      {!formData.kitComunicacion && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h4 className="font-semibold text-gray-900 mb-3">Sin Kit de Comunicación</h4>
          <p className="text-gray-600 mb-4">
            Recibirás los materiales estándar de custodia360 sin personalización:
          </p>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-center">
              <CheckCircle className="h-4 w-4 text-gray-500 mr-2" />
              Certificado de cumplimiento estándar
            </li>
            <li className="flex items-center">
              <CheckCircle className="h-4 w-4 text-gray-500 mr-2" />
              Material informativo genérico
            </li>
            <li className="flex items-center">
              <CheckCircle className="h-4 w-4 text-gray-500 mr-2" />
              Acceso al dashboard de gestión
            </li>
          </ul>
        </div>
      )}
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Información de Pago</h3>
        <p className="text-gray-600">Proceso seguro con encriptación SSL</p>
      </div>

      {/* Resumen del pedido */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Resumen del Pedido</h4>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span>Plan {currentPlan.title}</span>
            <span>{currentPlan.price.toFixed(2)}€</span>
          </div>
          {formData.kitComunicacion && (
            <div className="flex justify-between">
              <span>Kit de Comunicación</span>
              <span>49.00€</span>
            </div>
          )}
          <hr className="border-gray-300" />
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{subtotal.toFixed(2)}€</span>
          </div>
          <div className="flex justify-between">
            <span>IVA (21%)</span>
            <span>{iva.toFixed(2)}€</span>
          </div>
          <hr className="border-gray-300" />
          <div className="flex justify-between font-bold text-lg">
            <span>Total (Primer Pago)</span>
            <span>{total.toFixed(2)}€</span>
          </div>
          <div className="text-sm text-gray-600 mt-2">
            Segundo pago de {total.toFixed(2)}€ en 6 meses
          </div>
        </div>
      </div>

      {/* Formulario de tarjeta */}
      <div className="space-y-4">
        <div>
          <Label htmlFor="nombreTarjeta">Nombre en la Tarjeta *</Label>
          <Input
            id="nombreTarjeta"
            value={formData.nombreTarjeta}
            onChange={(e) => handleInputChange('nombreTarjeta', e.target.value)}
            placeholder="María García López"
            className={errors.nombreTarjeta ? 'border-red-500' : ''}
          />
          {errors.nombreTarjeta && <p className="text-red-500 text-sm mt-1">{errors.nombreTarjeta}</p>}
        </div>

        <div>
          <Label htmlFor="numeroTarjeta">Número de Tarjeta *</Label>
          <div className="relative">
            <Input
              id="numeroTarjeta"
              value={formData.numeroTarjeta}
              onChange={(e) => handleInputChange('numeroTarjeta', e.target.value)}
              placeholder="1234 5678 9012 3456"
              className={`pl-10 ${errors.numeroTarjeta ? 'border-red-500' : ''}`}
            />
            <CreditCard className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
          </div>
          {errors.numeroTarjeta && <p className="text-red-500 text-sm mt-1">{errors.numeroTarjeta}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="fechaExpiracion">Fecha Expiración *</Label>
            <Input
              id="fechaExpiracion"
              value={formData.fechaExpiracion}
              onChange={(e) => handleInputChange('fechaExpiracion', e.target.value)}
              placeholder="MM/AA"
              className={errors.fechaExpiracion ? 'border-red-500' : ''}
            />
            {errors.fechaExpiracion && <p className="text-red-500 text-sm mt-1">{errors.fechaExpiracion}</p>}
          </div>

          <div>
            <Label htmlFor="cvv">CVV *</Label>
            <Input
              id="cvv"
              value={formData.cvv}
              onChange={(e) => handleInputChange('cvv', e.target.value)}
              placeholder="123"
              className={errors.cvv ? 'border-red-500' : ''}
            />
            {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
          </div>
        </div>
      </div>

      {/* Términos y condiciones */}
      <div className="space-y-3">
        <div className="flex items-start space-x-2">
          <Checkbox
            id="terminosAceptados"
            checked={formData.terminosAceptados}
            onCheckedChange={(checked) => handleInputChange('terminosAceptados', checked)}
            className="mt-1"
          />
          <Label htmlFor="terminosAceptados" className="text-sm cursor-pointer">
            Acepto los <span className="text-blue-600 underline">términos y condiciones</span> de custodia360 *
          </Label>
        </div>
        {errors.terminosAceptados && <p className="text-red-500 text-sm">{errors.terminosAceptados}</p>}

        <div className="flex items-start space-x-2">
          <Checkbox
            id="politicaPrivacidad"
            checked={formData.politicaPrivacidad}
            onCheckedChange={(checked) => handleInputChange('politicaPrivacidad', checked)}
            className="mt-1"
          />
          <Label htmlFor="politicaPrivacidad" className="text-sm cursor-pointer">
            Acepto la <span className="text-blue-600 underline">política de privacidad</span> *
          </Label>
        </div>
        {errors.politicaPrivacidad && <p className="text-red-500 text-sm">{errors.politicaPrivacidad}</p>}

        <div className="flex items-start space-x-2">
          <Checkbox
            id="comunicacionesComerciales"
            checked={formData.comunicacionesComerciales}
            onCheckedChange={(checked) => handleInputChange('comunicacionesComerciales', checked)}
            className="mt-1"
          />
          <Label htmlFor="comunicacionesComerciales" className="text-sm cursor-pointer">
            Acepto recibir comunicaciones comerciales de custodia360
          </Label>
        </div>
      </div>

      {/* Seguridad */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center">
          <Lock className="h-5 w-5 text-green-600 mr-2" />
          <span className="text-green-800 font-medium text-sm">
            Pago 100% seguro con encriptación SSL
          </span>
        </div>
      </div>
    </div>
  );

  const getStepTitle = (step: number) => {
    switch (step) {
      case 1: return "Información de la Entidad";
      case 2: return "Responsable/Delegado";
      case 3: return "Kit de Comunicación";
      case 4: return "Pago";
      default: return "";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl font-bold">
                Contratar Plan {currentPlan.title}
              </DialogTitle>
              <DialogDescription>
                Implementación LOPIVI completa en 24 horas
              </DialogDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className={`flex items-center ${step < 4 ? 'flex-1' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step <= currentStep
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {step}
                </div>
                {step < 4 && (
                  <div className={`flex-1 h-1 mx-2 ${
                    step < currentStep ? 'bg-orange-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="text-center text-sm text-gray-600">
            Paso {currentStep} de 4: {getStepTitle(currentStep)}
          </div>
        </div>

        {/* Step content */}
        <div className="mb-6">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevStep}
            disabled={currentStep === 1}
          >
            Anterior
          </Button>

          {currentStep < 4 ? (
            <Button
              onClick={handleNextStep}
              className="bg-orange-600 hover:bg-orange-700"
            >
              Siguiente
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={isProcessing}
              className="bg-green-600 hover:bg-green-700"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Procesando...
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4 mr-2" />
                  Pagar {total.toFixed(2)}€
                </>
              )}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
