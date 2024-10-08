<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\LeadStatus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;



class ProjectController extends Controller
{
    /**
     * Store a newly created project using Dolibarr API.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */

    public function create()
    {
        $leadStatus = LeadStatus::all();
        $categories = Category::all();
        // dd($categories);
        // exit;
        // Passer les données à la vue
        return Inertia::render('Project/add', [
            'leadStatus' => $leadStatus,
            'categories' => $categories,
        ]);
    }

    public  function store(Request $request,)
    {


        // dd($request->all());
        // Validation des données d'entrée
        $validator = Validator::make($request->all(), [
            'ref' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'fk_soc' => 'nullable|integer',
            'fk_user_creat' => 'required|integer',
            'fk_statut' => 'nullable|integer',
            'fk_opp_status' => 'nullable|integer',
            'opp_percent' => 'nullable|integer',
            'public' => 'nullable|boolean',
            'dateo' => 'nullable|date',
            'datee' => 'nullable|date',
            'opp_amount' => 'nullable|numeric',
            'budget_amount' => 'nullable|numeric',
            'usage_opportunity' => 'nullable|boolean',
            'usage_task' => 'nullable|boolean',
            'usage_bill_time' => 'nullable|boolean',
            'usage_organize_event' => 'nullable|boolean',
            'accept_conference_suggestions' => 'nullable|boolean',
            'accept_booth_suggestions' => 'nullable|boolean',
            'price_registration' => 'nullable|numeric',
            'price_booth' => 'nullable|numeric',
            'max_attendees' => 'nullable|integer',
            'date_start_event' => 'nullable|date',
            'date_end_event' => 'nullable|date',
            'location' => 'nullable|string|max:255',
            'email_msgid' => 'nullable|string|max:255',
            'note_private' => 'nullable|string',
            'note_public' => 'nullable|string',
            'entity' => 'required|integer',
            'ip' => 'nullable|ip',
        ]);

        // Vérifier si la validation échoue
        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        // Préparation des données pour l'API Dolibarr
        $data = [
            'ref' => $request->ref,
            'title' => $request->title,
            'description' => $request->description,
            'fk_soc' => $request->fk_soc,
            'fk_user_creat' => $request->fk_user_creat,
            'fk_statut' => $request->fk_statut,
            'fk_opp_status' => $request->fk_opp_status,
            'opp_percent' => $request->opp_percent,
            'public' => $request->public ? 1 : 0,
            'dateo' => $request->dateo,
            'datee' => $request->datee,
            'opp_amount' => $request->opp_amount,
            'budget_amount' => $request->budget_amount,
            'usage_opportunity' => $request->usage_opportunity ? 1 : 0,
            'usage_task' => $request->usage_task ? 1 : 0,
            'usage_bill_time' => $request->usage_bill_time ? 1 : 0,
            'usage_organize_event' => $request->usage_organize_event ? 1 : 0,
            'accept_conference_suggestions' => $request->accept_conference_suggestions ? 1 : 0,
            'accept_booth_suggestions' => $request->accept_booth_suggestions ? 1 : 0,
            'price_registration' => $request->price_registration,
            'price_booth' => $request->price_booth,
            'max_attendees' => $request->max_attendees,
            'date_start_event' => $request->date_start_event,
            'date_end_event' => $request->date_end_event,
            'location' => $request->location,
            'email_msgid' => $request->email_msgid,
            'note_private' => $request->note_private,
            'note_public' => $request->note_public,
            'entity' => $request->entity,
            'ip' => $request->ip,
            "categories" => $request->categories,
        ];
        $dataJson = json_encode(
            $data
        );
        // dd($data);
        // exit;
        try {
            $user = Auth::user();
            // Envoi de la requête à l'API Dolibarr
            $response = Http::withHeaders([
                'DOLAPIKEY' => $user->api_key,
                'Content-Type' => 'application/json',
            ])->post(config('services.dolibarr.base_url') . '/projects', [$dataJson]);

            // Vérification de la réponse de l'API
            if ($response->successful()) {
                // var_dump($response->body());
                // exit;
                session()->flash('success', 'Projet créé avec succès!');

                // Redirection avec un message de succès
                return redirect()->route('projects.index');
            } else {
                // var_dump($response->body());
                // exit;
                // Redirection avec un message d'erreur si l'API retourne une erreur
                $response = json_decode($response->body());
                var_dump($response);
                exit;
                session()->flash('error', 'Erreur lors de la création du projet via l\'API Dolibarr. <br>');
                return redirect()->back();
            }
        } catch (\Exception $e) {

            // Gestion des exceptions
            return redirect()->back()->with('error', 'Erreur lors de la communication avec l\'API Dolibarr: ' . $e->getMessage())->withInput();
        }
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = Auth::user();
        $projects = [];
        try {
            $response = Http::withHeaders([
                'DOLAPIKEY' => $user->api_key,
            ])->get(config('services.dolibarr.base_url') . '/projects');
            if ($response->successful()) {
                $projects = $response->json();
            } else {
                // Handle error response here
                $projects = []; // Or any default value
            }
        } catch (\Exception $e) {
            // echo "Error: " . $e->getMessage();exit;
            // Handle exceptions here
            $projects = []; // Or any default value
        }

        // var_dump( $projects);exit;
        return Inertia::render('Project/index', [
            'projects' => $projects
        ]);
    }

    /**
     * Show the form for creating
     * Display the specified project.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $user = Auth::user();
            $response = Http::withHeaders([
                'DOLAPIKEY' => $user->api_key,
                'Content-Type' => 'application/json',
            ])->get(config('services.dolibarr.base_url') . '/projects/' . $id);
            if ($response->successful()) {
                $project = $response->json();
                return Inertia::render('Project/show', [
                    'project' => $project
                ]);
            } else {
                return redirect()->back()->with('error', 'Erreur lors de la récupération du projet.')->withInput();
            }
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Erreur lors de la communication avec l\'API Dolibarr: ' . $e->getMessage())->withInput();
        }
    }


    /**
     * Update the specified project in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'ref' => 'string|max:255',
            'title' => 'string|max:255',
            'socid' => 'integer',
            'description' => 'string',
            'public' => 'integer',
            'datec' => 'date',
            'dateo' => 'date',
            'datee' => 'date',

            'opp_status' => 'integer',
            'statut' => 'integer',
            'userdontid' => 'integer',
            'userownerid' => 'integer',
            'fk_project_parent' => 'integer',
            'budget_time' => 'numeric',
            'factid' => 'integer',
            'bill_time' => 'integer',
            'typeaffaire' => 'integer',
        ]);


        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        $data = $request->except(['_token', '_method']);

        try {
            $response = Http::withHeaders([
                'DOLAPIKEY' => env('DOLIBARR_API_KEY'),
                'Accept' => 'application/json',
            ])->put(env('DOLIBARR_API_URL') . '/projects/' . $id, [
                'request_data' => $data
            ]);

            if ($response->successful()) {
                return redirect()->route('projects.index')->with('success', 'Projet mis à jour avec succès!');
            } else {
                return redirect()->back()->with('error', 'Erreur lors de la mise à jour du projet.')->withInput();
            }
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Erreur lors de la communication avec l\'API Dolibarr: ' . $e->getMessage())->withInput();
        }
    }

    /**
     * Remove the specified project from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            // $response = Http::withHeaders([
            //     'DOLAPIKEY' => env('DOLIBARR_API_KEY'),
            //     'Accept' => 'application/json',
            // ])->delete(env('DOLIBARR_API_URL') . '/projects/' . $id);
            $user = Auth::user();
            $response = Http::withHeaders([
                'DOLAPIKEY' => $user->api_key,
                'Content-Type' => 'application/json',
            ])->delete(config('services.dolibarr.base_url') . '/projects/' . $id);
            if ($response->successful()) {
                return redirect()->route('projects.index')->with('success', 'Projet supprimé avec succès!');
            } else {
                return redirect()->back()->with('error', 'Erreur lors de la suppression du projet.')->withInput();
            }
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Erreur lors de la communication avec l\'API Dolibarr: ' . $e->getMessage())->withInput();
        }
    }
}
