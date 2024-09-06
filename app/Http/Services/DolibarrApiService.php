<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class DolibarrApiService
{
    protected $baseUrl;

    public function __construct()
    {
        $this->baseUrl = config('services.dolibarr.base_url');
    }

    public function login($login, $password)
    {

        $response = Http::post("{$this->baseUrl}/login", [
            'login' => $login,
            'password' => $password,
        ]);

        if ($response->successful()) {
            return $response->json();
        }

        return ['error' => 'Failed to authenticate with Dolibarr API.'];
    }
}
