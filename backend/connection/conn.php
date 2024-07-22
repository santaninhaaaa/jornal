<?php

$hostname = 'localhost';
$dbname = 'jornal';
$username = 'root';
$password = 'usbw';

try {
    $pdo = new PDO('mysql:host='.$hostname.';dbname='.$dbname, $username, $password);
    $pdo -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $return = [
        'type' => 'success',
        'message' => 'A conexão com o banco de dados ' . $dbname . ', foi realizado com sucesso!'
    ];
} catch (PDOException $e){
    $return = [
        'type' => 'error',
        'message' => 'Erro ao conectar com o banco:' . $e -> getMessage()
    ];
}

// echo json_encode($return);