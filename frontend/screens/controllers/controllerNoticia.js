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
        $('.btn-save').attr('data-operation', 'create')
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
            }

        })
    })

})