<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function index(Request $request)
    {

        $search = $request->input('search', '');  // Default is empty string
        $sortBy = $request->input('sort_by', 'display_name');  // Default sort by 'name'
        $sortDirection = $request->input('sort_direction', 'asc');  // Default sort direction is 'asc'

        // Build the query for filtering and sorting
        $roles = Role::query()
            ->when($search, function ($query, $search) {
                return $query->where('display_name', 'like', "%$search%")
                    ->orWhere('description', 'like', "%$search%");
            })
            ->orderBy($sortBy, $sortDirection)
            ->paginate(10);


        return Inertia::render('Admin/Roles/index', [
            'roles' => $roles,
            'search' => $search,
            'sort_by' => $sortBy,
            'sort_direction' => $sortDirection,
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Get all permissions
        $permissions = Permission::all();

        // Return the Inertia view with the permissions data
        return inertia('Roles/create', [
            'permissions' => $permissions,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
