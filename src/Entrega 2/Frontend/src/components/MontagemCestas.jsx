import React from 'react';
import { useData } from '../context/DataContext';
import { CESTA_BASICA } from '../config/constants';

export default function MontagemCestas() {
  const { estoque } = useData();

  const cestasPossiveis = CESTA_BASICA.reduce((minCestas, itemCesta) => {
    const itemEstoque = estoque.find(e => e.item === itemCesta.nome);
    const qtdEstoque = itemEstoque ? itemEstoque.qtd : 0;
    const cestasDoItem = Math.floor(qtdEstoque / itemCesta.qtd);
    return Math.min(minCestas, cestasDoItem);
  }, Infinity);

  const cestasMontaveis = cestasPossiveis === Infinity ? 0 : cestasPossiveis;

  const itensFaltantes = CESTA_BASICA.map(itemCesta => {
      const itemEstoque = estoque.find(e => e.item === itemCesta.nome);
      const qtdEstoque = itemEstoque ? itemEstoque.qtd : 0;
      const qtdNecessariaProx = (cestasMontaveis + 1) * itemCesta.qtd;
      const faltante = qtdNecessariaProx - qtdEstoque;
      return { ...itemCesta, faltante };
  }).filter(item => item.faltante > 0);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
      <h2 className="font-bold mb-4 text-gray-800 dark:text-white">Calculadora de Cestas Básicas</h2>
      <div className="text-center mb-6">
        <p className="text-gray-600 dark:text-gray-300">Com o estoque atual, é possível montar:</p>
        <p className="text-6xl font-bold text-green-600 dark:text-green-400 my-2">{cestasMontaveis}</p>
        <p className="text-gray-600 dark:text-gray-300">cestas completas.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Coluna 1: Composição da Cesta */}
        <div>
          <h3 className="font-semibold mb-2 text-gray-700 dark:text-gray-200">Composição da Cesta Padrão</h3>
          <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
            {CESTA_BASICA.map(item => (
              <li key={item.nome} className="flex justify-between">
                <span>{item.nome}</span>
                <span className="font-medium">{item.qtd} un.</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Coluna 2: Itens Faltantes */}
        <div>
           <h3 className="font-semibold mb-2 text-gray-700 dark:text-gray-200">Itens Faltantes para a Próxima Cesta</h3>
           {itensFaltantes.length > 0 ? (
                <ul className="text-sm space-y-1">
                    {itensFaltantes.map(item => (
                        <li key={item.nome} className="flex justify-between p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded">
                           <span className="text-gray-800 dark:text-yellow-200">{item.nome}</span>
                           <span className="font-bold text-yellow-600 dark:text-yellow-300">Faltam {item.faltante} un.</span>
                        </li>
                    ))}
                </ul>
           ) : (
             <p className="text-sm text-gray-500 dark:text-gray-400">Nenhum item em falta para a próxima cesta. Parabéns!</p>
           )}
        </div>
      </div>
    </div>
  );
}