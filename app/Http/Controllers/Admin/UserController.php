<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
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
        $per_page = $request->input('per_page', 10); 
        
        // Build the query for filtering and sorting
        $users = User::query()
            ->when($search, function ($query, $search) {
                return $query->where('name', 'like', "%$search%")
                    ->orWhere('email', 'like', "%$search%");
            })
            ->orderBy($sortBy, $sortDirection)
            ->paginate($per_page);
  
        // Return paginated and filtered data to Inertia
        return inertia('Admin/Users/index', [
            'users' => $users,
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
        ]);

        // Create the new user
        $user = User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => bcrypt($validatedData['password']), // Encrypt the password
        ]);
        return redirect()->back()->with('success', 'deleted');
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
        // Find the user by ID
        $user = User::findOrFail($id);

        // Validate the incoming request data
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $id, // Allow the same email if it's the user's own email
            'password' => 'nullable|string|min:8|confirmed', // Password is optional
        ]);

        // Update the user details
        $user->update([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => $validatedData['password'] ? bcrypt($validatedData['password']) : $user->password, // Only update if a new password is provided
        ]);

        // Redirect back with a success message
        return redirect()->back()->with('success', 'User updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // Find the user by ID
        $user = User::findOrFail($id);

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
