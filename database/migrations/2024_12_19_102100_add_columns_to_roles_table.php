<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('roles', function (Blueprint $table) {
            // Adding new columns to the roles table
            $table->string('display_name')->nullable(); // e.g., 'Administrator'
            $table->boolean('is_active')->default(true); // true for active, false for inactive
            $table->text('description')->nullable(); // e.g., role description
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('roles', function (Blueprint $table) {
            // Dropping the new columns if migration is rolled back
            $table->dropColumn('display_name');
            $table->dropColumn('is_active');
            $table->dropColumn('description');
        });
    }
};
