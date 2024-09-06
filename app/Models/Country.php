<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
    use HasFactory;

    // Nom de la table associé au modèle
    protected $table = 'llx_c_country';

    // Clé primaire de la table
    protected $primaryKey = 'rowid';

    // La clé primaire n'est pas auto-incrémentée
    public $incrementing = false;

    // Pas de timestamps (created_at, updated_at)
    public $timestamps = false;

    // Attributs qui peuvent être massivement assignés
    protected $fillable = [
        'rowid',
        'code',
        'code_iso',
        'numeric_code',
        'label',
        'eec',
        'active',
        'favorite'
    ];

}
