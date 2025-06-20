<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    
    public function up(): void
    {
        Schema::create('pizzas', function (Blueprint $table) {
            $table->id(); 
            $table->string('nome'); 
            $table->text('ingredientes'); 
            $table->float('preco', 8, 2); 
            $table->string('tamanho'); 
            $table->timestamp('data_criacao')->useCurrent(); 
            $table->boolean('disponivel')->default(true); 
            $table->integer('tempo_preparo_min'); 
            $table->timestamps(); 
        });
    }

    
    public function down(): void
    {
        Schema::dropIfExists('pizzas');
    }
};