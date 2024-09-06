<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $table = 'llx_projet';
    protected $primaryKey = 'rowid';
    public $incrementing = true;
    public $timestamps = false;

    protected $fillable = [
        'fk_project',
        'fk_soc',
        'datec',
        'tms',
        'dateo',
        'datee',
        'ref',
        'ref_ext',
        'entity',
        'title',
        'description',
        'fk_user_creat',
        'fk_user_modif',
        'public',
        'fk_statut',
        'fk_opp_status',
        'opp_percent',
        'fk_opp_status_end',
        'date_close',
        'fk_user_close',
        'note_private',
        'note_public',
        'email_msgid',
        'email_date',
        'opp_amount',
        'budget_amount',
        'usage_opportunity',
        'usage_task',
        'usage_bill_time',
        'usage_organize_event',
        'date_start_event',
        'date_end_event',
        'location',
        'accept_conference_suggestions',
        'accept_booth_suggestions',
        'max_attendees',
        'price_registration',
        'price_booth',
        'model_pdf',
        'ip',
        'last_main_doc',
        'import_key',
        'extraparams'
    ];

    // Relationships
    public function company()
    {
        return $this->belongsTo(Society::class, 'fk_soc', 'rowid');
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'fk_user_creat', 'rowid');
    }

    public function modifier()
    {
        return $this->belongsTo(User::class, 'fk_user_modif', 'rowid');
    }

    public function closer()
    {
        return $this->belongsTo(User::class, 'fk_user_close', 'rowid');
    }
}
