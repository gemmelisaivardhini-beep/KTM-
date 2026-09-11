<?php
require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../config/cors.php';

jsonResponse(true, 'KTM 390 Adventure specifications.', [
    'model' => 'KTM 390 Adventure',
    'engine' => '349.32 cc, 4-stroke single-cylinder DOHC',
    'power' => '41.5 PS @ 8600 rpm',
    'torque' => '33.5 Nm @ 7000 rpm',
    'front_travel' => '200 mm',
    'rear_travel' => '205 mm',
    'wheelbase' => '1470 mm',
    'ground_clearance' => '228 mm',
    'saddle_height' => '825 mm',
    'kerb_weight' => '181 kg',
    'fuel_tank' => '14.5 L',
    'front_tyre' => '100/90 x 19',
    'rear_tyre' => '130/80 x 17',
    'front_brake' => '320 mm',
    'rear_brake' => '240 mm',
    'display' => '5-inch TFT'
]);
