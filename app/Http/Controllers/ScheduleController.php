<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Schedule;
use Symfony\Component\CssSelector\Node\FunctionNode;

class ScheduleController extends Controller
{
    public function index()
    {
        return view('calendar');
    }
    
    public function getSchedule(Request $request)
    {
        $date = $request->input('date');
        $schedules = Schedule::whereDate('date_column', $date)->get();
        return response()->json($schedules);
    }
}

// namespace App\Http\Controllers;

// use Illuminate\Http\Request;
// use App\Models\Schedule;

// class ScheduleController extends Controller
// {
//     public function getSchedule(Request $request)
//     {
//         $date = $request->input('date');
//         $schedules = Schedule::whereDate('date_column', $date)->get();
//         return response()->json($schedules);
//     }
// }