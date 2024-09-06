<?php

namespace App\Http\Controllers;

use Flasher\Prime\FlasherInterface;

abstract class Controller
{
    protected $baseUrl;
    private $flasher;
    
    public function __construct(FlasherInterface $flasher)
    {
        $this->baseUrl = config('services.dolibarr.base_url');
        $this->flasher = $flasher;
    }

    
}
