<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Middleware;

use Illuminate\Support\Facades\Auth;


class DolibarrAuthMiddleware extends Middleware
{


    public function __construct() {}

    /**
     * Gérer une requête entrante.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {

        function extractLogin($customId, $size)
        {
            $prefixLength = 5;
            $suffixLength = 5;
            $middleLength = 5;

            if (strlen($customId) < $prefixLength + $suffixLength + $middleLength) {
                return null;
            }


            $loginHalf1 = substr($customId, $suffixLength, $size);

            $loginHalf1 = substr($loginHalf1, 0, $size);
            $loginHalf2 = substr($customId, $prefixLength + $size, strlen($customId));
            $loginHalf2 = substr($loginHalf2, $middleLength, strlen($loginHalf2));
            $loginHalf2 = substr($loginHalf2, 0, -$suffixLength);

            return $loginHalf1 . $loginHalf2;
        }

        try {
            $dolLoginNotExtracted = $request->query('dol_login');
            $size = $request->query('size');
            $dolLogin = extractLogin($dolLoginNotExtracted, $size);
            $user = $request->user();

            if ($dolLogin) {
                if (!$user || !$user->api_key) {
                    $userTemp = User::where("login", $dolLogin)->first();
                    // var_dump($userTemp);exit;
                    if ($userTemp) {
                        // $apiKey = Str::random(60);
                        // $userTemp->update(["api_key"=>$apiKey]);
                        Auth::login($userTemp);
                        return redirect()->route("home");
                    } else {

                        return redirect()->back()->withErrors(['login' => 'Invalid credentials or Dolibarr authentication failed.']);
                    }
                }
                return $next($request);
            }
            if ($user && $user->api_key) {
                $response = Http::withHeaders([
                    'DOLAPIKEY' => $user->api_key,
                ])->get(config('services.dolibarr.base_url') . '/users/info');

                if ($response->failed()) {
                    return redirect()->route('login')->withErrors(['message' => 'Dolibarr authentication failed.']);
                }

                if ($request->routeIs('login') || $request->routeIs('login.get')) {
                    return redirect()->route('home');
                }
            } else {
                if (!$request->routeIs('login') && !$request->routeIs('login.get')) {
                    return redirect()->route('login')->withErrors(['message' => 'Dolibarr authentication failed.']);
                }
            }
            // Session::forget('success');
            // Session::forget('error');
            return $next($request);
        } catch (\Exception $e) {


            return redirect()->route('login')->withErrors(['message' => 'An error occurred while verifying Dolibarr authentication.']);
        }
    }

    /**
     * Partager des données globales avec les vues.
     *
     * @param \Illuminate\Http\Request $request
     * @return array<string, mixed>
     */


    public function share(Request $request): array
    {
        // Nettoyer les messages flash après les avoir partagés
        // Session::forget('success');
        // Session::forget('error');
        return array_merge(
            parent::share($request),
            [
                'auth' => [
                    'user' => $request->user(),
                ],
                'flash' => fn() => [
                    'success' => session('success'),
                    'error' => session('error'),
                ],
            ]
        );
    }
}
