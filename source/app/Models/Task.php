<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Enums\StatusEnum;

class Task extends Model
{
    protected $fillable = [
        'title',
        'description',
    ];

    protected $casts = [
        'status' => StatusEnum::class
    ];
}