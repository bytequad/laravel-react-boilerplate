<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $isLoginRoute = $request->is('admin/login');
        $isRegisterRoute = $request->is('admin/register');
        Log::info("Calling code");

        if (!Auth::guard('admin')->check() && !$isLoginRoute && !$isRegisterRoute) {
            return redirect('/admin/login');
        }

        return $next($request);
    }
}
