<?php

namespace Tests\Feature\Http\Controllers;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;

class ProjectControllerTest extends TestCase
{
    /**
     * Test project creation with valid data.
     *
     * @return void
     */
    public function testCreateProjectWithValidData()
    {
        // Mock the HTTP request to the Dolibarr API
        Http::fake([
            env('DOLIBARR_API_URL') . '/projects' => Http::response(['success' => true], 200),
        ]);

        // Data for the request
        $data = [
            'ref' => 'TEST001',
            'title' => 'Test Project',
            'description' => 'This is a test project.',
            'fk_soc' => null,
            'fk_user_creat' => 1,
            'fk_statut' => null,
            'fk_opp_status' => null,
            'opp_percent' => null,
            'public' => 0,
            'date_start' => '2024-01-15',
            'date_end' => '2024-02-15',
            'opp_amount' => 1000.00,
            'budget_amount' => 1000.00,
            'usage_opportunity' => 0,
            'usage_task' => 0,
            'usage_bill_time' => 0,
            'usage_organize_event' => 0,
            'accept_conference_suggestions' => 0,
            'accept_booth_suggestions' => 0,
            'price_registration' => null,
            'price_booth' => null,
            'max_attendees' => null,
            'date_start_event' => null,
            'date_end_event' => null,
            'location' => null,
            'email_msgid' => null,
            'note_private' => 'Private note',
            'note_public' => 'Public note',
            'entity' => 1,
            'ip' => '127.0.0.1',
        ];

        // Send the request and assert the response
        $response = $this->post('/projects/create', $data);
        $response->assertRedirect('/projects');
        $response->assertSessionHas('success', 'Projet créé avec succès!');
    }

    /**
     * Test project creation with invalid data.
     *
     * @return void
     */
    public function testCreateProjectWithInvalidData()
    {
        // Data for the request with missing required fields
        $data = [
            'title' => 'Test Project',
        ];

        // Send the request and assert the response
        $response = $this->post('/projects/create', $data);
        $response->assertRedirect();
        $response->assertSessionHasErrors(['ref', 'fk_user_creat', 'entity']);
    }

    /**
     * Test project creation with Dolibarr API error.
     *
     * @return void
     */
    public function testCreateProjectWithDolibarrAPIError()
    {
        // Mock the HTTP request to the Dolibarr API with an error response
        Http::fake([
            env('DOLIBARR_API_URL') . '/projects' => Http::response(['error' => 'An error occurred.'], 500),
        ]);

        // Data for the request
        $data = [
            'ref' => 'TEST001',
            'title' => 'Test Project',
            'description' => 'This is a test project.',
            'fk_soc' => null,
            'fk_user_creat' => 1,
            'fk_statut' => null,
            'fk_opp_status' => null,
            'opp_percent' => null,
            'public' => 0,
            'date_start' => '2024-01-15',
            'date_end' => '2024-02-15',
            'opp_amount' => 1000.00,
            'budget_amount' => 1000.00,
            'usage_opportunity' => 0,
            'usage_task' => 0,
            'usage_bill_time' => 0,
            'usage_organize_event' => 0,
            'accept_conference_suggestions' => 0,
            'accept_booth_suggestions' => 0,
            'price_registration' => null,
            'price_booth' => null,
            'max_attendees' => null,
            'date_start_event' => null,
            'date_end_event' => null,
            'location' => null,
            'email_msgid' => null,
            'note_private' => 'Private note',
            'note_public' => 'Public note',
            'entity' => 1,
            'ip' => '127.0.0.1',
        ];

        // Send the request and assert the response
        $response = $this->post('/projects/create', $data);
        $response->assertRedirect();
        $response->assertSessionHas('error', 'Erreur lors de la création du projet via l\'API Dolibarr.');
    }
}
