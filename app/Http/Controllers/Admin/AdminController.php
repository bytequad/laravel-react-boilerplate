<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\AdminResource;
use App\Models\Admin;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Spatie\Permission\Models\Role;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // Retrieve query parameters for filtering and sorting
        $search = $request->input('search', '');  // Default is empty string
        $sortBy = $request->input('sort_by', 'name');  // Default sort by 'name'
        $sortDirection = $request->input('sort_direction', 'asc');  // Default sort direction is 'asc'

        // Build the query for filtering and sorting
        $admins = Admin::query()
        ->with('roles') // Eager load roles
        ->when($search, function ($query, $search) {
            return $query->where('name', 'like', "%$search%")
                ->orWhere('email', 'like', "%$search%");
        })
        ->orderBy($sortBy, $sortDirection)
        ->paginate(10);

        // Explicitly hide the password field
        $admins->getCollection()->transform(function ($admin) {
            $admin->makeHidden('password');
            return $admin;
        });

        $roles = Role::all();
     
        // Return paginated and filtered data to Inertia
        return inertia('Admin/Admins/index', [
            'admins' => $admins,
            'search' => $search,
            'sort_by' => $sortBy,
            'roles' => $roles,
            'sort_direction' => $sortDirection,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
      // Validate the incoming request data
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
            'role' => 'required|array', // Ensure roles are provided as an array
            'role.*' => 'exists:roles,id', // Ensure each role ID exists in the roles table
        ]);

        // Create the new user
        $user = Admin::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => bcrypt($validatedData['password']), // Encrypt the password
        ]);

        // Attach roles to the user
        $user->roles()->sync($validatedData['role']);
        return redirect()->back()->with('success', 'deleted');
    }

    /**
     * Display the specified resource.
     */
    public function show(Admin $admin)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Admin $admin)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // Find the user by ID
        
        $admin = Admin::findOrFail($id);

        // Validate the incoming request data
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $id, // Allow the same email if it's the user's own email
            'password' => 'nullable|string|min:8|confirmed', // Password is optional
            'role' => 'nullable|array', // Ensure role is an array if provided
            'role.*' => 'integer|exists:roles,id', // Each role ID must exist in the roles table
        ]);

        // Update the admin details
        $admin->update([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => $validatedData['password'] ? bcrypt($validatedData['password']) : $admin->password, // Only update if a new password is provided
        ]);

        // Update roles if provided
        if (isset($validatedData['role'])) {
            $admin->roles()->sync($validatedData['role']); // Sync roles in the pivot table
        }
        // Redirect back with a success message
        return redirect()->back()->with('success', 'User updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
         // Find the user by ID
         $user = Admin::findOrFail($id);

         // Delete the user
         $user->delete();
 
         // Fetch the updated list of users after deletion
         // $users = User::paginate(10);
 
         // // Return the updated users list to Inertia with a success message
         // return inertia('Users/index', [
         //     'users' => $users,
         //     'success' => 'User deleted successfully.',
         // ]);
         return redirect()->back()->with('success', 'deleted');
    }
}
