<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Reservation;

class ReservationController extends Controller
{
    public function store(Request $request)
    {
        $reservation = new Reservation();
        $reservation->date_column = $request->input('date');
        $reservation->time_column = $request->input('time');
        $reservation->firstName_column = $request->input('firstName');
        $reservation->lastName_column = $request->input('lastName');
        $reservation->phone_column = $request->input('phone');
        $reservation->email_column = $request->input('email');
        $reservation->request_column = $request->input('request');
        $reservation->save();

        return response()->json(['message' => 'Reservation successfully made.']);
    }
}
