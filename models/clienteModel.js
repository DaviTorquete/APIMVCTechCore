// models/clienteModel.js
// Model: guarda os dados e realiza as operações da lista de clientes.
// O CNPJ é o identificador de cada cliente, como na API original.

const clientes = [
    { fornecedor: 'joão e filhos cia ltda', cnpj: '12456789000102', grupo: 'F1', vcompras: 345000.00 },
    { fornecedor: 'maria luíza cia ltda', cnpj: '13456789000203', grupo: 'F2', vcompras: 200000.00 },
    { fornecedor: 'rogério souza cia ltda', cnpj: '14456789000304', grupo: 'F3', vcompras: 560000.00 },
    { fornecedor: 'murilo pedro cia ltda', cnpj: '15456789000405', grupo: 'F4', vcompras: 650000.00 },
    { fornecedor: 'samara cia ltda', cnpj: '16456789000506', grupo: 'F5', vcompras: 190000.00 }
];

// Retorna todos os clientes.
export const listarTodos = () => clientes;

// Filtra clientes pelo grupo, sem diferenciar maiúsculas e minúsculas.
export const buscarPorGrupo = (grupo) => {
    return clientes.filter(
        cliente => cliente.grupo.toLowerCase() === grupo.toLowerCase()
    );
};

// Busca um cliente pelo CNPJ.
export const buscarPorCnpj = (cnpj) => {
    return clientes.find(cliente => cliente.cnpj === String(cnpj));
};

// Retorna o maior valor de compras registrado.
export const maiorValorDeCompras = () => {
    return Math.max(...clientes.map(cliente => cliente.vcompras));
};

// Cria e adiciona um cliente.
export const criar = ({ fornecedor, cnpj, grupo, vcompras }) => {
    const novoCliente = {
        fornecedor,
        cnpj: String(cnpj),
        grupo,
        vcompras: parseFloat(vcompras)
    };

    clientes.push(novoCliente);
    return novoCliente;
};

// Atualiza o cliente identificado pelo CNPJ atual.
export const atualizar = (cnpjAntigo, { fornecedor, cnpj, grupo, vcompras }) => {
    const index = clientes.findIndex(
        cliente => cliente.cnpj === String(cnpjAntigo)
    );

    if (index === -1) return null;

    clientes[index] = {
        fornecedor,
        cnpj: String(cnpj),
        grupo,
        vcompras: parseFloat(vcompras)
    };

    return clientes[index];
};

// Remove um cliente e retorna o registro removido.
export const remover = (cnpj) => {
    const index = clientes.findIndex(
        cliente => cliente.cnpj === String(cnpj)
    );

    if (index === -1) return null;

    const [clienteRemovido] = clientes.splice(index, 1);
    return clienteRemovido;
};
