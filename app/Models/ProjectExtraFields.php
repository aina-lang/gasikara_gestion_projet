<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectExtraFields extends Model
{
    use HasFactory;

    protected $table = 'llx_projet_extrafields';
    protected $primaryKey = 'rowid';
    public $incrementing = true;
    public $timestamps = false;

    protected $fillable = [
        'fk_object', 'import_key'
    ];

    // Relationships
    public function project()
    {
        return $this->belongsTo(Project::class, 'fk_object', 'rowid');
    }
}
