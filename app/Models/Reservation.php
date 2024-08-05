<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;

    protected $fillable = [
        'date_column', 
        'time_column', 
        'firstName_column', 
        'lastName_column', 
        'phone_column', 
        'email_column', 
        'request_column'
    ];
}
