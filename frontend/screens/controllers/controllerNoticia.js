$(document).ready(function(){

    //constante do arquivo
    const url = 'backend/model/noticiaModel.php'

    // criar funcionalidade pra abrir modal de novo registor
    $('.btn-new').click(function(e){
        e.preventDefault()
        //alterando o cabeçalho o modal
        $('.modal-title').empty().append('Cadastro de nova notícia')
        //abrindo modal
        $('#modal-noticia').modal('show')
        //inclui propriedade data no botão de salvar
        $('.btn-save').empty().append('Salvar').attr('data-operation', 'create').show()
        //removendo os dados que ficam "salvos" quando vc clicar pra criar
        $('input[type="text"]').val('').attr('disabled', false)
        $('input[type="text"]').val('').attr('disabled', false)
        $('input[type="text"]').val('').attr('disabled', false)
        $('input[type="hidden"]').val('')
    })

    //criando funcionalidade para preencher a tabela com as info do BD
    let dados = 'operacao=read'
    $.ajax({
        type: 'POST',
        dataType: 'JSON',
        assync: true,
        data: dados,
        url: url,
        success: function(dados){
            $('tbody').empty()
            
            for(const dado of dados){
                $('tbody').append(`
                    <tr>
                        <td class="text-center">${dado.ID}</td>
                        <td class="text-center">${dado.TITULO}</td>
                        <td class="text-center">${dado.RESUMO}</td>
                        <td class="text-center">${dado.CORPO}</td>
                        <td class="text-center">${dado.DATA}</td>
                        <td class="text-center">
                            <button id="${dado.ID}" class="btn btn-info btn-view"><i class="fa-solid fa-eye"></i></button>
                            <button id="${dado.ID}" class="btn btn-warning btn-edit"><i class="fa-solid fa-pen-to-square"></i></button>
                            <button id="${dado.ID}" class="btn btn-danger btn-delete"><i class="fa-solid fa-trash-can"></i></button>
                        </td>
                    </tr>
                `)
            }

            //criando a funcionalidade pra visualisar os registro no BD
            $('.btn-view').click(function(e){
                e.preventDefault()
                let dados = `ID=${$(this).attr('id')}&operacao=view`
                $.ajax({
                    type: 'POST',
                    dataType: 'JSON',
                    assync: true,
                    data: dados,
                    url: url,
                    success: function(dados){
                        $('#titulo').val(dados[0].TITULO).attr('disabled', true)
                        $('#resumo').val(dados[0].RESUMO).attr('disabled', true)
                        $('#corpo').val(dados[0].CORPO).attr('disabled', true)
                        $('.btn-save').hide()
                        //alterando o cabeçalho o modal
                        $('.modal-title').empty().append('Visualização da notícia')
                        //abrindo modal
                        $('#modal-noticia').modal('show')
                    }

                })
            })

            //criando a funcionalidade pra editar os registro no BD
            $('.btn-edit').click(function(e){
                e.preventDefault()
                let dados = `ID=${$(this).attr('id')}&operacao=view`
                $.ajax({
                    type: 'POST',
                    dataType: 'JSON',
                    assync: true,
                    data: dados,
                    url: url,
                    success: function(dados){
                        $('#titulo').val(dados[0].TITULO).attr('disabled', false)
                        $('#resumo').val(dados[0].RESUMO).attr('disabled', false)
                        $('#corpo').val(dados[0].CORPO).attr('disabled', false)
                        $('#data').val(dados[0].DATA)
                        $('#id').val(dados[0].ID)
                        $('.btn-save').empty().append('Alterar notícia').attr('data-operation', 'update').show()
                        //alterando o cabeçalho o modal
                        $('.modal-title').empty().append('Edição da noticia')
                        //abrindo modal
                        $('#modal-noticia').modal('show')
                    }

                })
            })

            //criando a funcionalidade pra excluir os registro no BD
            $('.btn-delete').click(function(e){
                e.preventDefault()
                let dados = `id=${$(this).attr('id')}&operacao=delete`
                $.ajax({
                    type: 'POST',
                    dataType: 'JSON',
                    assync: true,
                    data: dados,
                    url: url,
                    success: function(dados){
                        Swal.fire({
                            icon: dados.type,
                            title: 'Jornal Etec',
                            text: dados.message
                        })
                        $('#main').empty().load('frontend/screens/views/controllerNoticia.html')
                    }

                })
            })

        }
    })

    //criando a funcionalidade pra salvar novos registros no BD
    $('.btn-save').click(function(e){
        e.preventDefault()
        let dados = $('#form-noticia').serialize()
        dados += `&operacao=${$(this).attr('data-operation')}`
        $.ajax({
            type: 'POST',
            dataType: 'JSON',
            assync: true,
            data: dados,
            url: url,
            success: function(dados){
                Swal.fire({
                    icon: dados.type,
                    title: 'Jornal Etec',
                    text: dados.message
                })
                $('#modal-noticia').modal('hide')
                $('#main').empty().load('frontend/screens/views/controllerNoticia.html')
            }

        })
    })

})