// controllers/clienteController.js
import * as ClienteModel from '../models/clienteModel.js';

// GET /clientes
export const getClientes = (req, res) => {
    res.status(200).json(ClienteModel.listarTodos());
};

// GET /clientes/Vcompra/maior
export const getMaiorCompra = (req, res) => {
    res.status(200).json(ClienteModel.maiorValorDeCompras());
};

// GET /clientes/grupo/:grupo
export const getClientesPorGrupo = (req, res) => {
    const grupo = req.params.grupo.trim();
    const clientesGrupo = ClienteModel.buscarPorGrupo(grupo);

    if (clientesGrupo.length > 0) {
        return res.status(200).json(clientesGrupo);
    }

    return res.status(404).json({
        mensagem: `Nenhum cliente encontrado no grupo ${grupo}`
    });
};

// GET /clientes/:cnpj
export const getClientePorCnpj = (req, res) => {
    const cnpj = String(req.params.cnpj);
    const cliente = ClienteModel.buscarPorCnpj(cnpj);

    if (cliente) {
        return res.status(200).json(cliente);
    }

    return res.status(404).json({
        mensagem: `Cliente não encontrado com CNPJ ${cnpj}`
    });
};

// POST /clientes
export const postCliente = (req, res) => {
    const { fornecedor, cnpj, grupo, vcompras } = req.body ?? {};

    if (!fornecedor || !cnpj || !grupo || vcompras === undefined || vcompras === null || !Number.isFinite(Number(vcompras))) {
        return res.status(400).json({
            mensagem: 'Informe fornecedor, cnpj, grupo e um valor numérico para vcompras.'
        });
    }

    const novoCliente = ClienteModel.criar({ fornecedor, cnpj, grupo, vcompras });
    return res.status(201).json(novoCliente);
};

// PUT /clientes/:cnpj
export const putCliente = (req, res) => {
    const cnpjAntigo = String(req.params.cnpj);
    const { fornecedor, cnpj, grupo, vcompras } = req.body ?? {};

    // Primeiro confirma se o cliente existe, como na API original.
    if (!ClienteModel.buscarPorCnpj(cnpjAntigo)) {
        return res.status(404).json({
            mensagem: `Cliente com CNPJ ${cnpjAntigo} não encontrado para atualização.`
        });
    }

    if (!fornecedor || !cnpj || !grupo || vcompras === undefined || vcompras === null || !Number.isFinite(Number(vcompras))) {
        return res.status(400).json({
            mensagem: 'Informe fornecedor, cnpj, grupo e um valor numérico para vcompras.'
        });
    }

    const clienteAtualizado = ClienteModel.atualizar(cnpjAntigo, {
        fornecedor,
        cnpj,
        grupo,
        vcompras
    });

    return res.status(200).json(clienteAtualizado);
};

// DELETE /clientes/:cnpj
export const deleteCliente = (req, res) => {
    const cnpj = String(req.params.cnpj);
    const clienteRemovido = ClienteModel.remover(cnpj);

    if (!clienteRemovido) {
        return res.status(404).json({
            mensagem: `Cliente com CNPJ ${cnpj} não encontrado para exclusão.`
        });
    }

    return res.status(200).json({
        mensagem: `Cliente com CNPJ ${cnpj} removido com sucesso.`
    });
};
