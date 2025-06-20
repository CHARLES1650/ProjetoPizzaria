<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pizza extends Model
{
    use HasFactory;

    protected $fillable = [
        'nome',
        'ingredientes',
        'preco',
        'tamanho',
        'data_criacao', 
        'disponivel',
        'tempo_preparo_min',
    ];


}