<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Inertia\Response
     */
    // public function index()
    // {
    //     // Using the 'tms' field for sorting as it corresponds to the `timestamp` in the table
    //     $categories = Category::orderBy('tms', 'desc')->paginate(5);

    //     // var_dump($categories);exit;
    //     return Inertia::render('categorie/index', [
    //         'categories' => $categories,
    //         'i' => (request()->input('page', 1) - 1) * 5,
    //     ]);
    // }

    public function index()
    {
        $user = Auth::user();

        try {
            // Fetch categories from Dolibarr
            $response = Http::withHeaders([
                'DOLAPIKEY' => $user->api_key, // Replace with your API key
            ])->get(config('services.dolibarr.base_url') . '/categories');
            $categories = [];
            if ($response->successful()) {
                $categories = $response->json();
            } else {
                $categories = [];
            }
            return Inertia::render('categorie/index', [

                'categories' => $categories,
            ]);
        } catch (\Exception $e) {
            // Handle the exception, e.g., log the error and return an error response
            $categories = [];
            // You might want to log the error here:
            redirect()->back()->withErrors(['message' => 'An error occurred while fetching categories from Dolibarr.']);
        }
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        return Inertia::render('Categories/Create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'description' => 'required',
        ]);

        $category = Category::create($request->all());

        // Example of interacting with Dolibarr API
        $this->createCategoryInDolibarr($category);

        return redirect()->route('categories.index')
            ->with('success', 'Category created successfully.');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Category  $category
     * @return \Inertia\Response
     */
    public function show(Category $category)
    {
        return Inertia::render('Categories/Show', [
            'category' => $category,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Category  $category
     * @return \Inertia\Response
     */
    public function edit(Category $category)
    {
        return Inertia::render('Categories/Edit', [
            'category' => $category,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, Category $category)
    {
        $request->validate([
            'name' => 'required',
            'description' => 'required',
        ]);

        $category->update($request->all());

        return redirect()->route('categories.index')
            ->with('success', 'Category updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Category $category)
    {
        $category->delete();

        return redirect()->route('categories.index')
            ->with('success', 'Category deleted successfully.');
    }

    /**
     * Example function to create a category in Dolibarr.
     *
     * @param  \App\Models\Category  $category
     * @return void
     */
    private function createCategoryInDolibarr(Category $category)
    {
        $client = new Client([
            'base_uri' => 'https://your-dolibarr-instance.com/api/index.php',
            'headers' => [
                'DOLAPIKEY' => 'your-dolibarr-api-key',
                'Content-Type' => 'application/json',
            ],
        ]);

        $response = $client->post('categories', [
            'json' => [
                'name' => $category->name,
                'description' => $category->description,
            ],
        ]);

        // Handle the response from Dolibarr if necessary
        if ($response->getStatusCode() != 201) {
            // Handle the error appropriately
        }
    }
}
