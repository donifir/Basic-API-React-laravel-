<?php

namespace App\Http\Controllers;

use App\Http\Resources\SuplierResource;
use App\Models\Suplier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

class SuplierController extends Controller
{

    public function index()
    {
        //
        $supliers = Suplier::all();
        $response = [
            'success' => true,
            'message' => 'list suplier',
            'response' => SuplierResource::collection($supliers)
        ];
        return response()->json($response, Response::HTTP_OK);
        //BarangResource::collection($barangs)
    }


    public function store(Request $request)
    {

        $request->validate([
            'namasuplier'=>'required',
            'alamatsuplier'=> 'required',
            'telpsuplier'=> 'required',
        ]);
        $suplier =Suplier::create([
            'nama_suplier' => $request->namasuplier,
            'alamat_suplier' => $request->alamatsuplier,
            'telp_suplier' => $request->telpsuplier,
        ]);
        $response    = [
            'success' => true,
            'message' => 'Request Berhasil',
            'data'    =>$suplier
        ];
        return response()->json($response, Response::HTTP_OK);
    }

    public function show($id)
    {
        //
        $suplier=Suplier::find($id);
        $response    = [
            'success' => true,
            'message' => 'Request Berhasil',
            'data'    =>$suplier
        ];
        return response()->json($response, Response::HTTP_OK);
    }


    public function update(Request $request, $id)
    {
        //
        $request->validate([
            'namasuplier'=>'required',
            'alamatsuplier'=> 'required',
            'telpsuplier'=> 'required',
        ]);
        $suplier =Suplier::find($id)->update([
            'nama_suplier' => $request->namasuplier,
            'alamat_suplier' => $request->alamatsuplier,
            'telp_suplier' => $request->telpsuplier,
        ]);
        $response    = [
            'success' => true,
            'message' => 'Request Berhasil',
            'data'    => $request->all(),
        ];
        return response()->json($response, Response::HTTP_OK);
    }


    public function destroy($id)
    {
        //
        Suplier::find($id)->delete();
        $response    = [
            'success' => true,
            'message' => 'Request Berhasil',
            'data'    => 'deleted',
        ];
        return response()->json($response, Response::HTTP_OK);
    }
}
