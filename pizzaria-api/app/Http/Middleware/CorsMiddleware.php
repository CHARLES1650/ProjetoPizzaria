<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response; 
use Illuminate\Support\Facades\Config; 

class CorsMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function handle(Request $request, Closure $next): Response
    {

        $allowedOrigins = Config::get('cors.allowed_origins', []);
        $allowedMethods = Config::get('cors.allowed_methods', ['*']);
        $allowedHeaders = Config::get('cors.allowed_headers', ['*']);
        $supportsCredentials = Config::get('cors.supports_credentials', false);
        $maxAge = Config::get('cors.max_age', 0);

        $origin = $request->headers->get('Origin');


        $isOriginAllowed = in_array('*', $allowedOrigins) || in_array($origin, $allowedOrigins);


        if ($request->isMethod('OPTIONS')) {
            $response = new Response('', 204); 
        } else {

            $response = $next($request);
        }


        if ($isOriginAllowed) {
            $response->headers->set('Access-Control-Allow-Origin', $origin);
            $response->headers->set('Access-Control-Allow-Methods', implode(', ', $allowedMethods));
            $response->headers->set('Access-Control-Allow-Headers', implode(', ', $allowedHeaders));
            $response->headers->set('Access-Control-Allow-Credentials', $supportsCredentials ? 'true' : 'false');
            $response->headers->set('Access-Control-Max-Age', $maxAge);
        }

        return $response;
    }
}