$(document).ready(function(){

    //constante do arquivo
    const url = 'backend/model/eventoModel.php'

    // criar funcionalidade pra abrir modal de novo registor
    $('.btn-new').click(function(e){
        e.preventDefault()
        //alterando o cabeçalho o modal
        $('.modal-title').empty().append('Cadastro de novo evento')
        //abrindo modal
        $('#modal-evento').modal('show')
        //inclui propriedade data no botão de salvar
        $('.btn-save').empty().append('Salvar').attr('data-operation', 'create').show()
        //removendo os dados que ficam "salvos" quando vc clicar pra criar
        $('input[type="text"]').val('').attr('disabled', false)
        $('input[type="date"]').val('').attr('disabled', false)
        $('input[type="text"]').val('').attr('disabled', false)
        $('input[type="time"]').val('').attr('disabled', false)
        $('input[type="text"]').val('').attr('disabled', false)
        $('input[type="text"]').val('').attr('disabled', false)
        $('input[type="number"]').val('').attr('disabled', false)
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
                        <td class="text-center">${dado.DATA}</td>
                        <td class="text-center">${dado.LOCAL}</td>
                        <td class="text-center">${dado.HORARIO}</td>
                        <td class="text-center">${dado.RESUMO}</td>
                        <td class="text-center">${dado.CORPO}</td>
                        <td class="text-center">${dado.AUTOR_ID}</td>
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
                        $('#data').val(dados[0].DATA).attr('disabled', true)
                        $('#local').val(dados[0].LOCAL).attr('disabled', true)
                        $('#horario').val(dados[0].HORARIO).attr('disabled', true)
                        $('#resumo').val(dados[0].RESUMO).attr('disabled', true)
                        $('#corpo').val(dados[0].CORPO).attr('disabled', true)
                        $('#autor_id').val(dados[0].AUTOR_ID).attr('disabled', true)
                        $('.btn-save').hide()
                        //alterando o cabeçalho o modal
                        $('.modal-title').empty().append('Visualização do evento')
                        //abrindo modal
                        $('#modal-evento').modal('show')
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
                        $('#data').val(dados[0].DATA).attr('disabled', false)
                        $('#local').val(dados[0].LOCAL).attr('disabled', false)
                        $('#horario').val(dados[0].HORARIO).attr('disabled', false)
                        $('#resumo').val(dados[0].RESUMO).attr('disabled', false)
                        $('#corpo').val(dados[0].CORPO).attr('disabled', false)
                        $('#autor_id').val(dados[0].AUTOR_ID).attr('disabled', false)
                        $('#id').val(dados[0].ID)
                        $('.btn-save').empty().append('Alterar evento').attr('data-operation', 'update').show()
                        //alterando o cabeçalho o modal
                        $('.modal-title').empty().append('Edição do evento')
                        //abrindo modal
                        $('#modal-evento').modal('show')
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
                        $('#main').empty().load('frontend/screens/views/controllerEvento.html')
                    }

                })
            })     

        }
    })

    //criando a funcionalidade pra salvar novos registros no BD
    $('.btn-save').click(function(e){
        e.preventDefault()
        let dados = $('#form-evento').serialize()
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
                $('#modal-evento').modal('hide')
                $('#main').empty().load('frontend/screens/views/controllerEvento.html')
            }

        })
    })

})