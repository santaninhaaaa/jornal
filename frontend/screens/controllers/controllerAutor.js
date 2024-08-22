$(document).ready(function(){

    //constante do arquivo
    const url = 'backend/model/autorModel.php'

    // criar funcionalidade pra abrir modal de novo registor
    $('.btn-new').click(function(e){
        e.preventDefault()
        //alterando o cabeçalho o modal
        $('.modal-title').empty().append('Cadastro de novo autor')
        //abrindo modal
        $('#modal-autor').modal('show')
        //inclui propriedade data no botão de salvar
        $('.btn-save').empty().append('Salvar registro').show()
        $('.btn-save').attr('data-operation', 'create')
        //removendo os dados que ficam "salvos" quando vc clicar pra criar
        $('input[type="text"]').val('').attr('disabled', false)
        $('input[type="password"]').val('').attr('disabled', false)
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
                        <td class="text-center">${dado.NOME}</td>
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
                        $('#nome').val(dados[0].NOME).attr('disabled', true)
                        $('#login').val(dados[0].LOGIN).attr('disabled', true)
                        $('#senha').val(dados[0].SENHA).attr('disabled', true)
                        $('.btn-save').hide()
                        //alterando o cabeçalho o modal
                        $('.modal-title').empty().append('Visualização do autor')
                        //abrindo modal
                        $('#modal-autor').modal('show')
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
                        $('#nome').val(dados[0].NOME).attr('disabled', false)
                        $('#login').val(dados[0].LOGIN).attr('disabled', false)
                        $('#senha').val(dados[0].SENHA).attr('disabled', false)
                        $('#id').val(dados[0].ID)
                        $('.btn-save').empty().append('Alterar registro').attr('data-operation', 'update').show()
                        //alterando o cabeçalho o modal
                        $('.modal-title').empty().append('Edição do autor')
                        //abrindo modal
                        $('#modal-autor').modal('show')
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
                        $('#main').empty().load('frontend/screens/views/controllerAutor.html')
                    }

                })
            })

        }
    })

    //criando a funcionalidade pra salvar novos registros no BD
    $('.btn-save').click(function(e){
        e.preventDefault()
        let dados = $('#form-autor').serialize()
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
                $('#modal-autor').modal('hide')
                $('#main').empty().load('frontend/screens/views/controllerAutor.html')
            }

        })
    })




})