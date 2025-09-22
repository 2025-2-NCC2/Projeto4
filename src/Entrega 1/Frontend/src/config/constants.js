// Lista de equipes padrão do sistema
export const EQUIPES_INICIAIS = [
    { nome: 'Equipe Esperança', mentorNome: 'João Silva', mentorRa: '12345678', mentorEmail: 'joao.silva@email.com', mentorTelefone: '11987654321', valor: 0, alimentos: 0 },
    { nome: 'Equipe União', mentorNome: 'Maria Oliveira', mentorRa: '87654321', mentorEmail: 'maria.oliveira@email.com', mentorTelefone: '11912345678', valor: 0, alimentos: 0 },
    { nome: 'Equipe Solidariedade', mentorNome: 'Carlos Pereira', mentorRa: '11223344', mentorEmail: 'carlos.pereira@email.com', mentorTelefone: '11955554444', valor: 0, alimentos: 0 },
  ];
  
  // Lista de alimentos padrão para o estoque inicial
  export const ALIMENTOS_INICIAIS = [
      { item: "Arroz (5kg)", categoria: "Grãos", qtd: 0 },
      { item: "Feijão (1kg)", categoria: "Grãos", qtd: 0 },
      { item: "Óleo (900ml)", categoria: "Óleos", qtd: 0 },
      { item: "Açúcar (1kg)", categoria: "Essenciais", qtd: 0 },
      { item: "Café (500g)", categoria: "Essenciais", qtd: 0 },
      { item: "Leite (1L)", categoria: "Laticínios", qtd: 0 },
      { item: "Macarrão (500g)", categoria: "Massas", qtd: 0 },
      { item: "Molho de Tomate (340g)", categoria: "Enlatados", qtd: 0 },
      { item: "Farinha de Trigo (1kg)", categoria: "Farináceos", qtd: 0 },
      { item: "Fubá (500g)", categoria: "Farináceos", qtd: 0 },
      { item: "Sal (1kg)", categoria: "Temperos", qtd: 0 },
  ];
  
  
  // Mapeamento de alimentos para o formulário
  export const ALIMENTOS_PREDEFINIDOS = {
    'Arroz (5kg)': { categoria: 'Grãos' },
    'Feijão (1kg)': { categoria: 'Grãos' },
    'Óleo (900ml)': { categoria: 'Óleos' },
    'Açúcar (1kg)': { categoria: 'Essenciais' },
    'Café (500g)': { categoria: 'Essenciais' },
    'Leite (1L)': { categoria: 'Laticínios' },
    'Macarrão (500g)': { categoria: 'Massas' },
    'Molho de Tomate (340g)': { categoria: 'Enlatados' },
    'Farinha de Trigo (1kg)': { categoria: 'Farináceos' },
    'Fubá (500g)': { categoria: 'Farináceos' },
    'Sal (1kg)': { categoria: 'Temperos' },
  };
  export const NOMES_ITENS = Object.keys(ALIMENTOS_PREDEFINIDOS);
  
  
  // Modelo da cesta básica
  export const CESTA_BASICA = [
      { nome: 'Arroz (5kg)', qtd: 1, categoria: 'Grãos' },
      { nome: 'Feijão (1kg)', qtd: 2, categoria: 'Grãos' },
      { nome: 'Óleo (900ml)', qtd: 1, categoria: 'Óleos' },
      { nome: 'Açúcar (1kg)', qtd: 1, categoria: 'Essenciais' },
      { nome: 'Café (500g)', qtd: 1, categoria: 'Essenciais' },
      { nome: 'Macarrão (500g)', qtd: 2, categoria: 'Massas' },
      { nome: 'Molho de Tomate (340g)', qtd: 1, categoria: 'Enlatados' },
      { nome: 'Sal (1kg)', qtd: 1, categoria: 'Temperos' },
  ];
  
  // Configurações gerais
  export const DADOS_INICIAIS_GRAFICO = [
      { mes: "jan" }, { mes: "fev" }, { mes: "mar" }, { mes: "abr" }, { mes: "mai" }, { mes: "jun" },
      { mes: "jul" }, { mes: "ago" }, { mes: "set" }, { mes: "out" }, { mes: "nov" }, { mes: "dez" }
  ];
  export const META_DINHEIRO = 10000;
  export const META_ALIMENTOS = 500;
  export const LIMITE_ESTOQUE_BAIXO = 10;
  export const REGIOES_SP = ["Zona Norte", "Zona Sul", "Zona Leste", "Zona Oeste", "Centro"];
  