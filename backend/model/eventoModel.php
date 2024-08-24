<?php

include ('../connection/conn.php');

//request mesma função do post e get, mas ele ouve os dois
if($_POST['operacao'] == 'create'){

    if(empty($_POST['titulo']) ||
       empty($_POST['data']) ||
       empty($_POST['local']) ||
       empty($_POST['horario']) ||
       empty($_POST['resumo']) || 
       empty($_POST['corpo']) ||
       empty($_POST['autor_id'])){

        $dados = [
            'type' => 'error',
            'message' => 'Existem campos obrigatórios vazios.'
        ];
    }else{

        try{
            $sql = "INSERT INTO EVENTO (TITULO, DATA, LOCAL, HORARIO, RESUMO, CORPO, AUTOR_ID) VALUES (?,?,?,?,?,?,?)";
            $stmt /*statement*/ = $pdo->prepare($sql); //prepare testa o sql conferindo se não há nenhum codigo malicioso
            $stmt -> execute([ //executa sql
                $_POST['titulo'],
                $_POST['data'],
                $_POST['local'],
                $_POST['horario'],
                $_POST['resumo'],
                $_POST['corpo'],
                $_POST['autor_id']
            ]);
            $dados = [
                'type' => 'success',
                'message' => 'Evento salvo com sucesso'
            ];
        }catch(PDOException $e){
            $dados = [
                'type' => 'error',
                'message' => 'Erro: ' . $e -> getMessage()
            ];
        }

    }
}

if($_POST['operacao'] == 'read'){
    try{

        $sql = "SELECT * FROM EVENTO";
        $resultado = $pdo->query($sql); //recebe a query dos valores do banco
        while($row = $resultado->fetch(PDO::FETCH_ASSOC)){ //while pra varrer o banco linha por linha usando o FETCH e o row vai ler linha por linha do banco
            $dados[] = array_map(null, $row); //array pra mapear os dados, recebe 2 parametros
        }

    }catch(PDOException $e){
        $dados = [
            'type' => 'error',
            'message' => 'Erro de consulta: ' . $e -> getMessage()
        ];
    }
}

if($_POST['operacao'] == 'update'){

    if(empty($_POST['titulo']) ||
       empty($_POST['data']) ||
       empty($_POST['local']) ||
       empty($_POST['horario']) ||
       empty($_POST['resumo']) || 
       empty($_POST['corpo']) ||
       empty($_POST['autor_id'])||
       empty($_POST['id'])){

        $dados = [
            'type' => 'error',
            'message' => 'Existem campos para alterar vazios.'
        ];
    }else{

        try{
            $sql = "UPDATE EVENTO SET TITULO = ?, DATA = ?, LOCAL = ?, HORARIO = ? RESUMO = ?, CORPO = ?, AUTOR_ID = ? WHERE ID = ?";
            $stmt /*statement*/ = $pdo->prepare($sql); //prepare testa o sql conferindo se não há nenhum codigo malicioso
            $stmt -> execute([ //executa sql
                $_POST['titulo'],
                $_POST['data'],
                $_POST['local'],
                $_POST['horario'],
                $_POST['resumo'],
                $_POST['corpo'],
                $_POST['autor_id'],
                $_POST['id']
            ]);
            $dados = [
                'type' => 'success',
                'message' => 'Evento atualizado com sucesso'
            ];
        }catch(PDOException $e){
            $dados = [
                'type' => 'error',
                'message' => 'Erro: ' . $e -> getMessage()
            ];
        }

    }
}

if($_POST['operacao'] == 'delete'){

    if(empty($_POST['id'])){

        $dados = [
            'type' => 'error',
            'message' => 'ID do evento não reconhecido ou inexistente'
        ];
    }else{

        try{
            $sql = "DELETE FROM EVENTO WHERE ID = ?";
            $stmt /*statement*/ = $pdo->prepare($sql); //prepare testa o sql conferindo se não há nenhum codigo malicioso
            $stmt -> execute([ //executa sql
                $_POST['id']
            ]);
            $dados = [
                'type' => 'success',
                'message' => 'Evento deletado com sucesso'
            ];
        }catch(PDOException $e){
            $dados = [
                'type' => 'error',
                'message' => 'Erro: ' . $e -> getMessage()
            ];
        }

    }
} 

if($_POST['operacao'] == 'view'){
    try{

        $sql = "SELECT *, DATE_FORMAT(DATA, '%d/%m/%Y') FROM EVENTO WHERE ID = ".$_POST['ID']."";
        $resultado = $pdo->query($sql); //recebe a query dos valores do banco
        while($row = $resultado->fetch(PDO::FETCH_ASSOC)){ //while pra varrer o banco linha por linha usando o FETCH e o row vai ler linha por linha do banco
            $dados[] = array_map(null, $row); //array pra mapear os dados, recebe 2 parametros
        }

    }catch(PDOException $e){
        $dados = [
            'type' => 'error',
            'message' => 'Erro de consulta: ' . $e -> getMessage()
        ];
    }
}

echo json_encode($dados);

?>