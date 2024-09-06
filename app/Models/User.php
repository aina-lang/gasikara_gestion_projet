<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    // Spécifier la table associée au modèle
    protected $table = 'llx_user';

    protected $primaryKey = 'rowid';

    // Désactiver les timestamps Laravel si la table n'a pas de colonnes created_at et updated_at
    public $timestamps = false;

    // Définir les champs qui peuvent être assignés en masse
    protected $fillable = [
        'entity',
        'ref_employee',
        'ref_ext',
        'admin',
        'employee',
        'fk_establishment',
        'datec',
        'tms',
        'fk_user_creat',
        'fk_user_modif',
        'login',
        'pass_encoding',
        'pass',
        'pass_crypted',
        'pass_temp',
        'api_key',
        'gender',
        'civility',
        'lastname',
        'firstname',
        'address',
        'zip',
        'town',
        'fk_state',
        'fk_country',
        'birth',
        'birth_place',
        'job',
        'office_phone',
        'office_fax',
        'user_mobile',
        'personal_mobile',
        'email',
        'personal_email',
        'email_oauth2',
        'signature',
        'socialnetworks',
        'fk_soc',
        'fk_socpeople',
        'fk_member',
        'fk_user',
        'fk_user_expense_validator',
        'fk_user_holiday_validator',
        'idpers1',
        'idpers2',
        'idpers3',
        'note_public',
        'note_private',
        'model_pdf',
        'last_main_doc',
        'datelastlogin',
        'datepreviouslogin',
        'datelastpassvalidation',
        'datestartvalidity',
        'dateendvalidity',
        'flagdelsessionsbefore',
        'iplastlogin',
        'ippreviouslogin',
        'ldap_sid',
        'openid',
        'statut',
        'photo',
        'lang',
        'color',
        'barcode',
        'fk_barcode_type',
        'accountancy_code',
        'nb_holiday',
        'thm',
        'tjm',
        'salary',
        'salaryextra',
        'dateemployment',
        'dateemploymentend',
        'weeklyhours',
        'import_key',
        'default_range',
        'default_c_exp_tax_cat',
        'national_registration_number',
        'fk_warehouse',
    ];

    // Définir les champs qui doivent être castés en types natifs
    protected $casts = [
        'datec' => 'datetime',
        'tms' => 'datetime',
        'birth' => 'date',
        'datelastlogin' => 'datetime',
        'datepreviouslogin' => 'datetime',
        'datelastpassvalidation' => 'datetime',
        'datestartvalidity' => 'datetime',
        'dateendvalidity' => 'datetime',
        'flagdelsessionsbefore' => 'datetime',
        'dateemployment' => 'date',
        'dateemploymentend' => 'date',
    ];
}
