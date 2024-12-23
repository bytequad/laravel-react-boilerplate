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
        ];
        foreach ($permissions as $permission) {
            Permission::create(
                ['name' => $permission['name'], 'guard_name' => $permission['guard_name']],
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
