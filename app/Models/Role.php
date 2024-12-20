<?php


namespace App\Models;

use Spatie\Permission\Models\Role as SpatieRole;

class Role extends SpatieRole
{
    protected $fillable = [
        'name', 
        'display_name',  
        'is_active',
        'guard_name',     
        'description',   
    ];
}

$role = Role::create([
    'name' => 'manager',
    'display_name' => 'Manager',
    'is_active' => true,
   
]);