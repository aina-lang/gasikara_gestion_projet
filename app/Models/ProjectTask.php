<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectTask extends Model
{
    use HasFactory;

    protected $table = 'llx_projet_task';
    protected $primaryKey = 'rowid';
    public $incrementing = true;
    public $timestamps = false;

    protected $fillable = [
        'ref', 'entity', 'fk_projet', 'fk_task_parent', 'datec', 'tms', 'dateo', 'datee',
        'datev', 'label', 'description', 'duration_effective', 'planned_workload', 
        'progress', 'priority', 'budget_amount', 'fk_user_creat', 'fk_user_modif',
        'fk_user_valid', 'fk_statut', 'note_private', 'note_public', 'rang', 'model_pdf',
        'import_key', 'billable'
    ];

    // Relationships
    public function project()
    {
        return $this->belongsTo(Project::class, 'fk_projet', 'rowid');
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'fk_user_creat', 'rowid');
    }

    public function modifier()
    {
        return $this->belongsTo(User::class, 'fk_user_modif', 'rowid');
    }

    public function validator()
    {
        return $this->belongsTo(User::class, 'fk_user_valid', 'rowid');
    }
}
