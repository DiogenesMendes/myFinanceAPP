import ApiService from '../apiservice'

import ErroValidacao from '../exception/ErroValidacao'

export default class LancamentoService extends ApiService {

    constructor(){
        super('/api/entries')
    }

    obterListaMeses(){
        return  [
            { label: 'Selecione...', value: '' },
            { label: 'Janeiro', value: 1 },
            { label: 'Fevereiro', value: 2 },
            { label: 'Março', value: 3 },
            { label: 'Abril', value: 4 },
            { label: 'Maio', value: 5 },
            { label: 'Junho', value: 6 },
            { label: 'Julho', value: 7 },
            { label: 'Agosto', value: 8 },
            { label: 'Setembro', value: 9 },
            { label: 'Outubro', value: 10 },
            { label: 'Novembro', value: 11 },
            { label: 'Dezembro', value: 12 },
        ]
    }

    obterListaTipos(){
        return  [
            { label: 'Selecione...', value: '' },
            { label: 'Despesa' , value : 'EXPENSE' },
            { label: 'Receita' , value : 'REVENUE' }
        ]

    }

    obterPorId(id){
        return this.get(`/${id}`);
    }

    alterarStatus(id, status){
        return this.put(`/${id}/update-status`, { status })
    }

    validar(lancamento){
        const erros = [];

        if(!lancamento.year){
            erros.push("Informe o Ano.")
        }

        if(!lancamento.month){
            erros.push("Informe o Mês.")
        }

        if(!lancamento.description){
            erros.push("Informe a Descrição.")
        }

        if(!lancamento.value){
            erros.push("Informe o Valor.")
        }

        if(!lancamento.entriesType){
            erros.push("Informe o Tipo.")
        }

        if(erros && erros.length > 0){
            throw new ErroValidacao(erros);
        }
    }

    salvar(lancamento){
        return this.post('/', lancamento);
    }

    atualizar(lancamento){
        return this.put(`/${lancamento.id}`, lancamento);
    }

    consultar(lancamentoFiltro){
        let params = `?year=${lancamentoFiltro.ano}`

        if(lancamentoFiltro.month){
            params = `${params}&month=${lancamentoFiltro.month}`
        }

        if(lancamentoFiltro.entriesType){
            params = `${params}&entriesType=${lancamentoFiltro.entriesType}`
        }

        if(lancamentoFiltro.entriesStatus){
            params = `${params}&entriesStatus=${lancamentoFiltro.entriesStatus}`
        }

        if(lancamentoFiltro.userId){
            params = `${params}&userId=${lancamentoFiltro.userId}`
        }

        if(lancamentoFiltro.description){
            params = `${params}&description=${lancamentoFiltro.description}`
        }

        return this.get(params);
    }

    deletar(id){
        return this.delete(`/${id}`)
    }
}