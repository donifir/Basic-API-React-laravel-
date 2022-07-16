<?php

namespace App\Http\Controllers;

use App\Http\Resources\BarangResource;
use App\Models\Barang;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Str;

class BarangController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $barangs = Barang::all();
        $response = [
            'success' => true,
            'message' => 'list suplier',
            'data' => BarangResource::collection($barangs)
        ];
        return response()->json($response, Response::HTTP_OK);
    }


    public function store(Request $request)
    {
        //
        $validator = Validator::make($request->all(), [
            'nama_barang' => ['required'],
            'harga' => ['required', 'numeric'],
            'stok'  => ['required', 'numeric'],
            'keterangan' => ['required'],
            'gambar' => ['required'],
            'suplier' => ['required'],
        ]);
        if ($validator->fails()) {
            $response = [
                'success' => false,
                'message' => $validator->errors(),
                'data' => ''
            ];
            return response()->json($response, Response::HTTP_UNPROCESSABLE_ENTITY);
        } else {
            $file = $request->file('gambar');
            $imageName = Str::random() . '-' . time() . '.' . $request->gambar->extension();
            $file->move(public_path('image'), $imageName);


            $barang = Barang::create([
                'nama_barang' => $request->nama_barang,
                'harga' => $request->harga,
                'stok' => $request->stok,
                'keterangan' => $request->keterangan,
                'suplier_id' => $request->suplier,
                'gambar' => $imageName,
            ]);
            $response    = [
                'success' => true,
                'message' => 'Transaksi Berhasil',
                'data'    => new BarangResource($barang)
            ];
            return response()->json($response, Response::HTTP_OK);
        }
    }


    public function show($id)
    {
        //
        $barang = Barang::find($id);
        $response = [
            'success' => true,
            'message' => 'barang detail',
            'data' => new BarangResource($barang)
        ];
        return response()->json($response, Response::HTTP_OK);
    }


    public function update(Request $request, $id)
    {
        //
        $validator = Validator::make($request->all(), [
            'nama_barang' => ['required'],
            'harga' => ['required', 'numeric'],
            'stok'  => ['required', 'numeric'],
            'keterangan' => ['required'],
            'gambar' => ['required'],
            'suplier' => ['required'],
        ]);
        if ($validator->fails()) {
            $response = [
                'success' => false,
                'message' => $validator->errors(),
                'data' => ''
            ];
            return response()->json($response, Response::HTTP_UNPROCESSABLE_ENTITY);
        }else {
            $file = $request->file('gambar');
            $imageName = Str::random() . '-' . time() . '.' . $request->gambar->extension();
            $file->move(public_path('image'), $imageName);

            $barang = Barang::find($id);
            $barang->update([
                'nama_barang' => $request->nama_barang,
                'harga' => $request->harga,
                'stok' => $request->stok,
                'keterangan' => $request->keterangan,
                'suplier_id' => $request->suplier,
                'gambar' => $imageName,
            ]);
            $response    = [
                'success' => true,
                'message' => 'Data barang berhasil diubah',
                'data'    => new BarangResource($barang)
            ];
            return response()->json($response, Response::HTTP_OK);
        }
    }


    public function destroy($id)
    {
        //
        Barang::find($id)->delete();
        $response = [
            'success' => true,
            'message' => 'data berhasil dihapus',
            'data' => ''
        ];
        return response()->json($response, Response::HTTP_OK);
    }
}
