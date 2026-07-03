<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class Project extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'name', 'slug'];

    protected static function booted(): void
    {
        static::creating(function (Project $project) {
            $base = Str::slug($project->name);
            $slug = $base . '-' . Str::lower(Str::random(5));

            // Extremely unlikely to collide, but guard anyway
            while (static::where('slug', $slug)->exists()) {
                $slug = $base . '-' . Str::lower(Str::random(5));
            }

            $project->slug = $slug;
        });
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}
