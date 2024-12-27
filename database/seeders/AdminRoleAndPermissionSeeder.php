<?php

namespace Database\Seeders;

use App\Models\Admin;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class AdminRoleAndPermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        // Ensure the 'Admin' role exists or create it
        DB::table('admins')->truncate();
        Admin::create([
            'name' => 'Super Admin',
            'email' => 'admin@admin.com',
            'password' => bcrypt('123456'), // Always hash passwords!
        ]);
        DB::table('roles')->truncate();
        DB::table('permissions')->truncate();

        $adminRole = Role::create(
            ['name' => 'admin', 'guard_name' => 'admin', 'display_name' => 'Super Admin', 'description' => 'Super Admin'],
        );

        $permissions = [
            [
                'name' => 'read_users',
                'display_name' => 'read Users',
                'description' => 'Ability to read user accounts',
                'module_name' => 'Users',
                'guard_name' => 'admin',
            ],
            [
                'name' => 'create_users',
                'display_name' => 'create Users',
                'description' => 'Ability to create user accounts',
                'module_name' => 'Users',
                'guard_name' => 'admin',
            ],
            [
                'name' => 'update_users',
                'display_name' => 'Manage Users',
                'description' => 'Ability to update user accounts',
                'module_name' => 'Users',
                'guard_name' => 'admin',
            ],
            [
                'name' => 'delete_users',
                'display_name' => 'Manage Users',
                'description' => 'Ability to delete user accounts',
                'module_name' => 'Users',
                'guard_name' => 'admin',
            ],

            // permissions for Roles module
            [
                'name' => 'read_roles',
                'display_name' => 'Read Roles',
                'description' => 'Ability to view role details',
                'module_name' => 'Roles',
                'guard_name' => 'admin',
            ],
            [
                'name' => 'create_roles',
                'display_name' => 'Create Roles',
                'description' => 'Ability to create new roles',
                'module_name' => 'Roles',
                'guard_name' => 'admin',
            ],
            [
                'name' => 'update_roles',
                'display_name' => 'Update Roles',
                'description' => 'Ability to update role details',
                'module_name' => 'Roles',
                'guard_name' => 'admin',
            ],
            [
                'name' => 'delete_roles',
                'display_name' => 'Delete Roles',
                'description' => 'Ability to delete roles',
                'module_name' => 'Roles',
                'guard_name' => 'admin',
            ],

            // permissions for Admins module
            [
                'name' => 'read_admins',
                'display_name' => 'Read Admins',
                'description' => 'Ability to view role details',
                'module_name' => 'Admins',
                'guard_name' => 'admin',
            ],
            [
                'name' => 'create_admins',
                'display_name' => 'Create Admins',
                'description' => 'Ability to create new admins',
                'module_name' => 'Admins',
                'guard_name' => 'admin',
            ],
            [
                'name' => 'update_admins',
                'display_name' => 'Update Admins',
                'description' => 'Ability to update role details',
                'module_name' => 'Admins',
                'guard_name' => 'admin',
            ],
            [
                'name' => 'delete_admins',
                'display_name' => 'Delete Admins',
                'description' => 'Ability to delete admins',
                'module_name' => 'Admins',
                'guard_name' => 'admin',
            ]
            
        ];
        foreach ($permissions as $permission) {
            Permission::create(
                $permission
            );
        }

        // Fetch all permissions
        $allPermissions = Permission::all();

        // Assign all permissions to the Admin role
        $adminRole->syncPermissions($allPermissions);

        // Assign the Admin role to the user with ID 1
        $adminUser = Admin::find(1);

        if ($adminUser) {
            $adminUser->assignRole($adminRole);
        } else {
            $this->command->info('User with ID 1 not found. Please create a user with ID 1 first.');
        }
    }
}
