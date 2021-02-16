import React from 'react'
import currencyFormatter from 'currency-formatter'

// eslint-disable-next-line import/no-anonymous-default-export
export default props => {

    const rows = props.lancamentos.map( lancamento => {
        return (
            <tr key={lancamento.id}>
                <td>{lancamento.description}</td>
                <td>{ currencyFormatter.format(lancamento.value, { locale: 'pt-BR'}) }</td>
                <td>{lancamento.EntriesType}</td>
                <td>{lancamento.mount}</td>
                <td>{lancamento.EntriesStatus}</td>
                <td>
                    <button className="btn btn-success" title="Efetivar"
                            disabled={ lancamento.EntriesStatus !== 'PENDENTE' }
                            onClick={e => props.alterarStatus(lancamento, 'EFETIVADO')} 
                            type="button">
                            <i className="pi pi-check"></i>
                    </button>
                    <button className="btn btn-warning"  title="Cancelar"
                            disabled={ lancamento.EntriesStatus !== 'PENDENTE' }
                            onClick={e => props.alterarStatus(lancamento, 'CANCELADO')} 
                            type="button">
                            <i className="pi pi-times"></i>
                    </button>
                    <button type="button"   title="Editar"
                            className="btn btn-primary"
                            onClick={e => props.editAction(lancamento.id)}>
                            <i className="pi pi-pencil"></i>
                    </button>
                    <button type="button"  title="Excluir"
                            className="btn btn-danger" 
                            onClick={ e => props.deleteAction(lancamento)}>
                            <i className="pi pi-trash"></i>
                    </button>
                </td>
            </tr>
        )
    } )

    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Descrição</th>
                    <th scope="col">Valor</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Mês</th>
                    <th scope="col">Situação</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}