<?php

include ('../connection/conn.php');

//request mesma função do post e get, mas ele ouve os dois
if($_POST['operacao'] == 'create'){

    if(empty($_POST['autor_id']) || 
       empty($_POST['noticia_id'])){

        $dados = [
            'type' => 'error',
            'message' => 'Existem campos obrigatórios vazios.'
        ];
    }else{

        try{
            $sql = "INSERT INTO AUTORES (AUTOR_ID, NOTICIA_ID) VALUES (?,?)";
            $stmt /*statement*/ = $pdo->prepare($sql); //prepare testa o sql conferindo se não há nenhum codigo malicioso
            $stmt -> execute([ //executa sql
                $_POST['autor_id'],
                $_POST['noticia_id']
            ]);
            $dados = [
                'type' => 'success',
                'message' => 'Ligação entre autor e notícia salva com sucesso'
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

        $sql = "SELECT * FROM AUTORES";
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

if($_POST['operacao'] == 'delete'){

    if(empty($_POST['noticia_id'])){

        $dados = [
            'type' => 'error',
            'message' => 'ID da notícia não reconhecido ou inexistente'
        ];
    }else{

        try{
            $sql = "DELETE FROM AUTORES WHERE NOTICIA_ID = ?";
            $stmt /*statement*/ = $pdo->prepare($sql); //prepare testa o sql conferindo se não há nenhum codigo malicioso
            $stmt -> execute([ //executa sql
                $_POST['noticia_id']
            ]);
            $dados = [
                'type' => 'success',
                'message' => 'A notícia digitada foi deletada com sucesso'
            ];
        }catch(PDOException $e){
            $dados = [
                'type' => 'error',
                'message' => 'Erro: ' . $e -> getMessage()
            ];
        }

    }
} 


// echo json_encode($dados);

?>