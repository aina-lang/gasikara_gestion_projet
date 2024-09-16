<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;
use App\Models\User;


class LoginController extends Controller
{
    private $flasher;

    public function __construct() {}

    /**
     * Show the login form.
     *
     * @return \Inertia\Response
     */
    public function showLoginForm()
    {
        return Inertia::render('Auth/Login');
    }

    /**
     * Authenticate the user.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function login(Request $request)
    {
        $request->validate([
            'login' => 'required|string',
            'password' => 'required|string',
        ]);

        try {
            $response = Http::post(config('services.dolibarr.base_url') . '/login', [
                'login' => $request->login,
                'password' => $request->password,
            ]);

            if ($response->successful()) {
                $responseDecoded = $response->json();

                if (isset($responseDecoded["success"]["token"])) {
                    $token = $responseDecoded["success"]["token"];
                    $user = User::where("login", $request->login)->first();

                    if ($user) {
                        $user->update(["api_key" => $token]);
                        Auth::login($user);
                        session()->put('api_key', $token);
                        session()->flash('success', 'Connexion réussie !');

                        return redirect()->route("home");
                    } else {
                        session()->flash('error', 'Utilisateur non trouvé.');
                        return redirect()->back();
                    }
                }
            } else {
                session()->flash('error', 'Identifiants invalides ou échec de l\'authentification Dolibarr.');
                return redirect()->back();
            }
        } catch (\Exception $e) {
            session()->flash('error', 'Une erreur est survenue : ' . $e->getMessage());
            return redirect()->back();
        }
    }

    /**
     * Log the user out.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function logout(Request $request)
    {
        Auth::logout();
        session()->flash('success', 'Déconnexion réussie.');

        $request->session()->invalidate();
        $request->session()->regenerateToken();

      
        return redirect('/');
    }
}
