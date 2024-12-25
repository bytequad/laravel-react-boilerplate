<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
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
        // Get all permissions and group by 'module_name'
        $permissions = Permission::all()->groupBy('module_name');
     
        // Return the    Inertia view with the grouped permissions data
        return inertia('Roles/create', [
            'permissions' => $permissions,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Log the incoming request for debugging
    
        // Validate the incoming request
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:roles,name',
            'display_name' => 'required|string|max:255',
            'description' => 'nullable|string|max:500',
            'is_active' => 'boolean',
            'permissions' => 'required|array',
            'permissions.*' => 'array', 
            'permissions.*.*' => 'int'
        ]);
    
        // Default the 'is_active' value if not set
        $validated['is_active'] = $validated['is_active'] ?? false;
    
        // Create the new role using Spatie's Role model
        $role = Role::create([
            'name' => $validated['name'],
            'display_name' => $validated['display_name'],
            'description' => $validated['description'],
            'is_active' => $validated['is_active'],
            'guard_name' => 'admin', 
        ]);
    
        // Prepare permissions for the role
        $permissions = [];
        foreach ($validated['permissions'] as $module => $permissionsArray) {
            foreach ($permissionsArray as $permission => $value) {

                // Only include the permission if it's true
                if  ($value) {
                    
                    $permissionModel = Permission::where('id', $value)
                    ->where('guard_name', 'admin')
                    ->first();

                    if($permissionModel) {
                        $permissions[] = $permissionModel;
                    }
                }
            }
        }
    
        // Assign permissions to the role using Spatie's `syncPermissions()` method
        if (!empty($permissions)) {
            $role->syncPermissions($permissions); // This syncs the permissions with the role
        }
        // Log role and permission data for debugging

        // Redirect back with success message
        return redirect('/admin/roles')->with('success', 'Role created successfully');
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
        $permissions = Permission::all()->groupBy('module_name');
        $role = Role::with('permissions')->findOrFail($id);
        return inertia('Roles/edit', [
            'role' => $role,
            'permissions' => $permissions,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // Validate the incoming request
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:roles,name,' . $id,
            'display_name' => 'required|string|max:255',
            'description' => 'nullable|string|max:500',
            'is_active' => 'boolean',
            'permissions' => 'required|array',
            'permissions.*' => 'array',
            'permissions.*.*' => 'int',
        ]);

        // Find the role or fail
        $role = Role::findOrFail($id);

        // Update the role's basic details
        $role->update([
            'name' => $validated['name'],
            'display_name' => $validated['display_name'],
            'description' => $validated['description'],
            'is_active' => $validated['is_active'] ?? false,
        ]);

        // Prepare permissions for the role
        $permissions = [];
        foreach ($validated['permissions'] as $module => $permissionsArray) {
            foreach ($permissionsArray as $permission => $value) {
                if ($value) {
                    $permissionModel = Permission::where('id', $value)
                        ->where('guard_name', 'admin')
                        ->first();

                    if ($permissionModel) {
                        $permissions[] = $permissionModel;
                    }
                }
            }
        }

        // Sync permissions with the role
        $role->syncPermissions($permissions);

        // Redirect back with success message
        return redirect('/admin/roles')->with('success', 'Role updated successfully');
    }

    public function destroy(string $id)
    {
        try {
            // Find the role or fail
            $role = Role::findOrFail($id);

            // Check if the role can be deleted (optional validation)
            if ($role->name === 'admin') {
                return redirect('/admin/roles')->with('error', 'The Admin role cannot be deleted.');
            }

            // Delete the role
            $role->delete();

            // Redirect back with success message
            return redirect('/admin/roles')->with('success', 'Role deleted successfully.');
        } catch (\Exception $e) {
            // Log the error for debugging
            Log::error('Error deleting role: ' . $e->getMessage());

            // Redirect back with error message
            return redirect('/admin/roles')->with('error', 'Failed to delete the role. Please try again.');
        }
    }
}
