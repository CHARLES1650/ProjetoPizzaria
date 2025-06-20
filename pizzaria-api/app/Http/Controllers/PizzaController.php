<?php

namespace App\Http\Controllers;

use App\Models\Pizza; 
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator; 

class PizzaController extends Controller
{
    
    public function index()
    {
        $pizzas = Pizza::all();
        return response()->json($pizzas, 200); 
    }

    
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nome' => 'required|string|max:255',
            'ingredientes' => 'required|string',
            'preco' => 'required|numeric|between:0,999999.99',
            'tamanho' => 'required|string|in:Pequena,Média,Grande,Família', 
            'disponivel' => 'boolean',
            'tempo_preparo_min' => 'required|integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Erro de validação.',
                'errors' => $validator->errors()
            ], 422); 
        }

        $pizza = Pizza::create($request->all());
        return response()->json([
            'message' => 'Pizza criada com sucesso!',
            'pizza' => $pizza
        ], 201); 
    }

   
    public function show(string $id)
    {
        $pizza = Pizza::find($id);

        if (!$pizza) {
            return response()->json(['message' => 'Pizza não encontrada.'], 404); 
        }

        return response()->json($pizza, 200); 
    }

    
    public function update(Request $request, string $id)
    {
        $pizza = Pizza::find($id);

        if (!$pizza) {
            return response()->json(['message' => 'Pizza não encontrada.'], 404);
        }

        $validator = Validator::make($request->all(), [
            'nome' => 'sometimes|required|string|max:255',
            'ingredientes' => 'sometimes|required|string',
            'preco' => 'sometimes|required|numeric|between:0,999999.99',
            'tamanho' => 'sometimes|required|string|in:Pequena,Média,Grande,Família',
            'disponivel' => 'sometimes|boolean',
            'tempo_preparo_min' => 'sometimes|required|integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Erro de validação.',
                'errors' => $validator->errors()
            ], 422);
        }

        $pizza->update($request->all());
        return response()->json([
            'message' => 'Pizza atualizada com sucesso!',
            'pizza' => $pizza
        ], 200); 
    }

  
    public function destroy(string $id)
    {
        $pizza = Pizza::find($id);

        if (!$pizza) {
            return response()->json(['message' => 'Pizza não encontrada.'], 404);
        }

        $pizza->delete();
        return response()->json(['message' => 'Pizza deletada com sucesso!'], 200); 
    }
}