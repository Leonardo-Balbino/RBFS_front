import React from 'react';

const RelatorioVacinacao = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Relatório de Vacinação do Animal
        </h1>
        <form className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Nome do Animal
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Digite o nome do animal"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Tipo de Vacina
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Digite o tipo de vacina"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Data da Vacinação
            </label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Observações
            </label>
            <textarea
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              rows="4"
              placeholder="Adicione observações adicionais"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white font-medium py-3 rounded-lg hover:bg-green-600 transition duration-300"
          >
            Gerar Relatório
          </button>
        </form>
      </div>
    </div>
  );
};

export default RelatorioVacinacao;