$(document).ready(function () {

    const url = 'backend/model/autorModel.php'

    $('.btn-login').click(function (e) {
        e.preventDefault()
        // alert('vontade de me matar hj as 16:37 horario de brasilia');
        let dados = $('#form-login').serialize()
        dados += `&operacao=login`
        $.ajax({
            type: 'POST',
            dataType: 'JSON',
            assync: true,
            data: dados,
            url: url,
            success: function (dados) {
                if (dados.type === 'success') {
                    $(location).attr('href', 'dashboard.html')
                } else {
                    Swal.fire({
                        icon: dados.type,
                        title: 'Jornal Etec',
                        text: dados.message
                    })
                }
            }
        })
    })

    $('.logout').click(function (e) {
        e.preventDefault()
        let dados = 'operacao=logout'
        $.ajax({
            type: 'POST',
            dataType: 'JSON',
            assync: true,
            data: dados,
            url: url,
            success: function (dados) {
                if (dados.type === 'success') {
                    $(location).attr('href', 'login.html')
                } else {
                    Swal.fire({
                        icon: dados.type,
                        title: 'Jornal Etec',
                        text: dados.message
                    })
                }
            }
        })
    })
})