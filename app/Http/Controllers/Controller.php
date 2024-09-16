<?php

namespace App\Http\Controllers;



abstract class Controller
{
    protected $baseUrl;
    private $flasher;
    
    public function __construct()
    {
        $this->baseUrl = config('services.dolibarr.base_url');
    
    }

    
}
