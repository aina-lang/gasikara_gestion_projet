<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Society extends Model
{
    use HasFactory;

    // Nom de la table associé au modèle
    protected $table = 'llx_societe';

    // Clé primaire de la table
    protected $primaryKey = 'rowid';

    // La clé primaire est auto-incrémentée
    public $incrementing = true;

    // Pas de timestamps (created_at, updated_at)
    public $timestamps = false;

    // Attributs qui peuvent être massivement assignés
    protected $fillable = [
        'rowid',
        'nom',
        'name_alias',
        'entity',
        'ref_ext',
        'statut',
        'parent',
        'status',
        'code_client',
        'code_fournisseur',
        'code_compta',
        'code_compta_fournisseur',
        'address',
        'zip',
        'town',
        'fk_departement',
        'fk_pays',
        'geolat',
        'geolong',
        'geopoint',
        'georesultcode',
        'phone',
        'phone_mobile',
        'fax',
        'url',
        'email',
        'fk_account',
        'socialnetworks',
        'fk_effectif',
        'fk_typent',
        'fk_forme_juridique',
        'fk_currency',
        'siren',
        'siret',
        'ape',
        'idprof4',
        'idprof5',
        'idprof6',
        'tva_intra',
        'capital',
        'fk_stcomm',
        'note_private',
        'note_public',
        'model_pdf',
        'last_main_doc',
        'prefix_comm',
        'client',
        'fournisseur',
        'supplier_account',
        'fk_prospectlevel',
        'fk_incoterms',
        'location_incoterms',
        'customer_bad',
        'customer_rate',
        'supplier_rate',
        'remise_client',
        'remise_supplier',
        'mode_reglement',
        'cond_reglement',
        'deposit_percent',
        'transport_mode',
        'mode_reglement_supplier',
        'cond_reglement_supplier',
        'transport_mode_supplier',
        'fk_shipping_method',
        'tva_assuj',
        'vat_reverse_charge',
        'localtax1_assuj',
        'localtax1_value',
        'localtax2_assuj',
        'localtax2_value',
        'barcode',
        'fk_barcode_type',
        'price_level',
        'outstanding_limit',
        'order_min_amount',
        'supplier_order_min_amount',
        'default_lang',
        'logo',
        'logo_squarred',
        'canvas',
        'fk_warehouse',
        'webservices_url',
        'webservices_key',
        'accountancy_code_sell',
        'accountancy_code_buy',
        'tms',
        'datec',
        'fk_user_creat',
        'fk_user_modif',
        'fk_multicurrency',
        'multicurrency_code',
        'import_key'
    ];
}
