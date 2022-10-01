<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WisataController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('wisatas', [WisataController::class, 'index']);
Route::post('wisatas', [WisataController::class, 'store']);
Route::get('wisatas/{id}/edit', [WisataController::class, 'edit']);
Route::put('wisatas/{id}', [WisataController::class, 'update']);
Route::delete('wisatas/{id}', [WisataController::class, 'destroy']);
Route::get('wisatas/{id}/detail', [WisataController::class, 'show']);
