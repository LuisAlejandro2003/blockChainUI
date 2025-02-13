import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShieldCheck, BrainCircuit, Network, ArrowRight, Wallet, CheckCircle2 } from 'lucide-react';

const InformationTwo: React.FC = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const handleProceed = () => {
    const { seedWords } = location.state;
    navigate('/secondStep', { state: { seedWords } });
  };

  const steps = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-yellow-500" />,
      title: "Verificación de Seguridad",
      description: "Confirmaremos que has guardado correctamente tus palabras para garantizar el acceso futuro a tu cuenta CAFI."
    },
    {
      icon: <BrainCircuit className="w-6 h-6 text-yellow-500" />,
      title: "Proceso de Validación",
      description: "Te mostraremos algunas de tus palabras en orden aleatorio y deberás completar las faltantes."
    },
    {
      icon: <Network className="w-6 h-6 text-yellow-500" />,
      title: "Integración con CAFI",
      description: "Una vez verificada tu frase, se creará tu identidad única en la red blockchain de CAFI."
    },
    {
      icon: <Wallet className="w-6 h-6 text-yellow-500" />,
      title: "Activación de Cuenta",
      description: "Tu billetera CAFI quedará activada y lista para realizar operaciones en la red blockchain."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-yellow-500 px-8 py-12 text-center">
            <div className="inline-flex p-3 rounded-full bg-yellow-400/30 mb-6">
              <CheckCircle2 className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">
              Confirmación de tu Frase de Recuperación
            </h1>
            <p className="text-yellow-50 text-lg max-w-2xl mx-auto">
              El siguiente paso es verificar que has guardado correctamente tus palabras antes de activar tu cuenta en la red CAFI
            </p>
          </div>

          {/* Main Content */}
          <div className="p-8">
            {/* Process Steps */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {steps.map((step, index) => (
                <div key={index} className="flex gap-4 p-6 rounded-xl bg-gray-50 relative">
                  <div className="absolute -top-3 -left-3 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {index + 1}
                  </div>
                  <div className="flex-shrink-0 mt-2">
                    {step.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Important Information */}
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-8">
              <h3 className="font-semibold text-blue-800 mb-4">
                ¿Por qué es importante este paso?
              </h3>
              <div className="space-y-4 text-blue-700">
                <p>
                  • La verificación garantiza que has guardado correctamente tus palabras y podrás recuperar tu cuenta en el futuro.
                </p>
                <p>
                  • Este proceso es necesario para asegurar que mantendrás el control total de tus activos en la red CAFI.
                </p>
                <p>
                  • Una vez completada la verificación, tu cuenta quedará completamente activada y segura en la blockchain.
                </p>
              </div>
            </div>

            {/* Action Button */}
            <div className="text-center">
              <button
                onClick={handleProceed}
                className="inline-flex items-center gap-2 px-8 py-4 bg-yellow-500 text-white font-semibold rounded-lg
                  hover:bg-yellow-600 transition-all duration-200 shadow-lg hover:shadow-xl
                  focus:ring-4 focus:ring-yellow-500/50"
              >
                Comenzar Verificación
                <ArrowRight className="w-5 h-5" />
              </button>
              <p className="mt-4 text-sm text-gray-500">
                Al continuar, iniciarás el proceso de verificación de tu frase de recuperación
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformationTwo;