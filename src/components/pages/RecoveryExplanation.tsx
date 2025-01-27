import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Shield, 
  Key, 
  AlertTriangle, 
  ArrowRight, 
  Brain, 
  Lock,
  RefreshCw,
  FileKey,
  UserRoundSearch,
  Blocks,
  KeySquare,
  Fingerprint,
  Network
} from 'lucide-react';

function RecoveryExplanation() {
  const navigate = useNavigate();

  const blockchainConcepts = [
    {
      icon: <Blocks className="w-6 h-6 text-blue-500" />,
      title: "Tecnología Blockchain",
      description: "Tu cuenta está registrada en una red descentralizada donde cada transacción y acceso está protegido por criptografía avanzada."
    },
    {
      icon: <KeySquare className="w-6 h-6 text-blue-500" />,
      title: "Claves Criptográficas",
      description: "Las 12 palabras generan matemáticamente tus claves privadas, que son como tu firma digital única en la blockchain."
    },
    {
      icon: <Network className="w-6 h-6 text-blue-500" />,
      title: "Red Descentralizada",
      description: "A diferencia de la banca tradicional, no hay un servidor central. Tu acceso depende únicamente de estas palabras de recuperación."
    },
    {
      icon: <Fingerprint className="w-6 h-6 text-blue-500" />,
      title: "Identidad Digital",
      description: "Estas palabras son el único vínculo con tu identidad en la blockchain. Sin ellas, es matemáticamente imposible recuperar el acceso."
    }
  ];

  const steps = [
    {
      icon: <UserRoundSearch className="w-6 h-6 text-yellow-500" />,
      title: "Verificación de Identidad",
      description: "Ingresa tu correo electrónico registrado. Este paso ayuda a prevenir intentos de recuperación no autorizados."
    },
    {
      icon: <FileKey className="w-6 h-6 text-yellow-500" />,
      title: "Ingreso de Palabras Semilla",
      description: "Las 12 palabras deben ingresarse en el orden exacto. Estas generarán tus claves criptográficas originales."
    },
    {
      icon: <RefreshCw className="w-6 h-6 text-yellow-500" />,
      title: "Nueva Contraseña",
      description: "Crea una nueva contraseña para el acceso diario, mientras las palabras semilla permanecen como tu respaldo de seguridad máxima."
    }
  ];

  const features = [
    {
      icon: <Key className="w-6 h-6 text-yellow-500" />,
      title: "Tu Llave Digital",
      description: "Las 12 palabras son una representación de tu clave privada maestra, que genera matemáticamente todas tus direcciones y claves en la blockchain."
    },
    {
      icon: <Shield className="w-6 h-6 text-yellow-500" />,
      title: "Seguridad Criptográfica",
      description: "La seguridad se basa en matemáticas avanzadas. Es prácticamente imposible acceder a una cuenta sin las palabras exactas en el orden correcto."
    },
    {
      icon: <Brain className="w-6 h-6 text-yellow-500" />,
      title: "Recuperación Universal",
      description: "Este método funciona en cualquier dispositivo y momento, ya que las claves se derivan matemáticamente de estas palabras siguiendo estándares blockchain."
    },
    {
      icon: <Lock className="w-6 h-6 text-yellow-500" />,
      title: "Control Total y Responsabilidad",
      description: "En la blockchain, tú eres tu propio banco. No hay autoridad central que pueda recuperar tu acceso si pierdes estas palabras."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 px-8 py-12 text-center">
            <h1 className="text-3xl font-bold text-white mb-4">
              Recuperación de Cuenta en la Blockchain
            </h1>
            <p className="text-yellow-50 text-lg max-w-2xl mx-auto">
              Entendamos cómo funciona la recuperación de cuenta en la tecnología blockchain
              y por qué las 12 palabras son fundamentales para tu seguridad
            </p>
          </div>

          {/* Blockchain Explanation */}
          <div className="p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
              Fundamentos de la Blockchain
            </h2>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {blockchainConcepts.map((concept, index) => (
                <div key={index} className="flex gap-4 p-6 rounded-xl bg-blue-50 border border-blue-100">
                  <div className="flex-shrink-0">
                    {concept.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {concept.title}
                    </h3>
                    <p className="text-gray-600">
                      {concept.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Process Steps */}
            <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
              Proceso de Recuperación
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {steps.map((step, index) => (
                <div key={index} className="relative flex flex-col items-center text-center p-6 rounded-xl bg-gray-50 border border-gray-200">
                  <div className="w-12 h-12 flex items-center justify-center bg-yellow-100 rounded-full mb-4">
                    {step.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">
                    {step.description}
                  </p>
                  {index < steps.length - 1 && (
                    <ArrowRight className="absolute -right-6 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400 hidden md:block" />
                  )}
                </div>
              ))}
            </div>

            {/* Features Grid */}
            <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
              Importancia de las Palabras Semilla
            </h2>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-4 p-6 rounded-xl bg-gray-50 border border-gray-200">
                  <div className="flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Technical Details 
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 mb-8 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">
                Detalles Técnicos
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 mt-2"></div>
                  <span>Las palabras semilla siguen el estándar BIP-39, generando una semilla criptográfica de 256 bits.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 mt-2"></div>
                  <span>Esta semilla deriva jerárquicamente todas tus claves privadas usando BIP-32/44.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 mt-2"></div>
                  <span>El proceso es determinístico: las mismas palabras siempre generan las mismas claves.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 mt-2"></div>
                  <span>La seguridad se basa en la imposibilidad computacional de adivinar o forzar las palabras correctas.</span>
                </li>
              </ul>
            </div>*/}

            {/* Warning Section */}
            <div className="bg-red-50 border border-red-100 rounded-xl p-6 mb-8">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-red-700 mb-2">
                    ¡Advertencia Crítica de Seguridad!
                  </h3>
                  <ul className="text-red-600 space-y-2">
                    <li>• Nunca compartas tus palabras semilla con nadie, ni siquiera con soporte técnico</li>
                    <li>• No las guardes en formato digital: computadoras, teléfonos o servicios en la nube</li>
                    <li>• No tomes capturas de pantalla ni las envíes por correo o mensajería</li>
                    <li>• Guárdalas en papel, en un lugar seguro y protegido de daños físicos</li>
                    <li>• Si alguien obtiene acceso a estas palabras, tendrá control total de tus activos</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="text-center">
              <button
                onClick={() => navigate('/recovery')}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-semibold rounded-lg
                  hover:from-yellow-600 hover:to-yellow-700 transition-all duration-200 shadow-lg hover:shadow-xl
                  focus:ring-4 focus:ring-yellow-500/50"
              >
                Comenzar Proceso de Recuperación
                <ArrowRight className="w-5 h-5" />
              </button>
              <p className="mt-4 text-sm text-gray-500">
                Al continuar, confirmas que entiendes el proceso de recuperación blockchain y la importancia crítica de las palabras semilla
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecoveryExplanation;