import React from 'react';

const RelatorioEstadoSaude = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Relatório de Estado de Saúde do Animal
        </h1>
        <form className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Nome do Animal
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite o nome do animal"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Espécie
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite a espécie do animal"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Condições Clínicas
            </label>
            <textarea
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              placeholder="Descreva as condições clínicas"
            ></textarea>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Observações
            </label>
            <textarea
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              placeholder="Adicione observações adicionais"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-medium py-3 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Gerar Relatório
          </button>
        </form>
      </div>
    </div>
  );
};

export default RelatorioEstadoSaude;