<?php
session_start();

define('DS', DIRECTORY_SEPARATOR);
define('WWW_ROOT', __DIR__ . DS);

$routes = array(
    'home' => array(
        'controller' => 'Whiteboards',
        'action' => 'index'
    ),
    'useroverview' => array(
        'controller' => 'Users',
        'action' => 'view'
    ),
    'addBoard' => array(
        'controller' => 'Whiteboards',
        'action' => 'addBoard'
    ),
    'canvaspage' => array(
        'controller' => 'Whiteboards',
        'action' => 'canvas'
    ),
    'search' => array(
        'controller' => 'Users',
        'action' => 'search'
    ),
    'register' => array(
        'controller' => 'Users',
        'action' => 'Register'
    ),
    'login' => array(
        'controller' => 'Users',
        'action' => 'login'
    ),
    'logout' => array(
        'controller' => 'Users',
        'action' => 'logout'
    ),
    'userdetail' => array(
        'controller' => 'Users',
        'action' => 'viewDetail'
    ),
    'boarddetail' => array(
        'controller' => 'Whiteboards',
        'action' => 'detail'
    ),
    'canvas' => array(
        'controller' => 'Whiteboards',
        'action' => 'canvas'
    ),
);

if(empty($_GET['page'])) {
    $_GET['page'] = 'home';
}
if(empty($routes[$_GET['page']])) {
    header('Location: index.php');
    exit();
}

$route = $routes[$_GET['page']];
$controllerName = $route['controller'] . 'Controller';

require_once WWW_ROOT . 'controller' . DS . $controllerName . ".php";

$controllerObj = new $controllerName();
$controllerObj->route = $route;
$controllerObj->filter();
$controllerObj->render();