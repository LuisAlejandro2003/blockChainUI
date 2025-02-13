import { Shield, Key, AlertTriangle, ArrowRight, Brain, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function InformationOne() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Key className="w-6 h-6 text-yellow-500" />,
      title: "Tu Llave Digital",
      description: "Las 12 palabras funcionan como la llave maestra de tu billetera digital, permitiéndote acceder a tus activos en la blockchain."
    },
    {
      icon: <Shield className="w-6 h-6 text-yellow-500" />,
      title: "Seguridad Máxima",
      description: "Esta frase es única y personal. Mantenerla segura es crucial para proteger tus activos digitales."
    },
    {
      icon: <Brain className="w-6 h-6 text-yellow-500" />,
      title: "Recuperación Garantizada",
      description: "Con estas palabras podrás recuperar tu cuenta desde cualquier dispositivo, incluso si pierdes acceso al original."
    },
    {
      icon: <Lock className="w-6 h-6 text-yellow-500" />,
      title: "Control Total",
      description: "Tú eres el único responsable de tu frase semilla. Ningún tercero puede ayudarte a recuperarla si la pierdes."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-yellow-500 px-8 py-12 text-center">
            <h1 className="text-3xl font-bold text-white mb-4">
              Frase de Recuperación: Tu Llave al Mundo Blockchain
            </h1>
            <p className="text-yellow-50 text-lg max-w-2xl mx-auto">
              Antes de mostrarte tus 12 palabras de recuperación, es importante que entiendas su valor y cómo protegerlas.
            </p>
          </div>

          {/* Main Content */}
          <div className="p-8">
            {/* Features Grid */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-4 p-6 rounded-xl bg-gray-50">
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

            {/* Warning Section */}
            <div className="bg-red-50 border border-red-100 rounded-xl p-6 mb-8">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-red-700 mb-2">
                    ¡Advertencia Importante!
                  </h3>
                  <ul className="text-red-600 space-y-2">
                    <li>• Nunca compartas tu frase de recuperación con nadie</li>
                    <li>• No la guardes en archivos digitales o en la nube</li>
                    <li>• No tomes capturas de pantalla</li>
                    <li>• Si alguien obtiene acceso a estas palabras, podrá controlar todos tus activos</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="text-center">
              <button
                onClick={() => navigate('/firstStep')}
                className="inline-flex items-center gap-2 px-8 py-4 bg-yellow-500 text-white font-semibold rounded-lg
                  hover:bg-yellow-600 transition-all duration-200 shadow-lg hover:shadow-xl
                  focus:ring-4 focus:ring-yellow-500/50"
              >
                Mostrar mis 12 palabras
                <ArrowRight className="w-5 h-5" />
              </button>
              <p className="mt-4 text-sm text-gray-500">
                Al continuar, confirmas que entiendes la importancia de mantener segura tu frase de recuperación
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InformationOne;