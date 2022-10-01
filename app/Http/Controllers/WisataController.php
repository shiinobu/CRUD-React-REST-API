<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\WisataModel;
use App\Http\Resources\WisataResource as Data;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class WisataController extends Controller
{
    public function index()
    {
        return Data::collection(WisataModel::all());
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama_wisata' => ['required'],
            'deskripsi' => ['required'],
            'foto' => ['required', 'image', 'mimes:jpeg,png,jpg,gif', 'max:2048'],
        ]);

        if ($request->hasFile('foto')) {
            $file = $request->file('foto');
            $filename = Str::random() . '.' . $file->getClientOriginalExtension();
            $path = $file->move('images', $filename);

            WisataModel::create([
                'nama_wisata' => $request->nama_wisata,
                'deskripsi' => $request->deskripsi,
                'foto' => $path,
            ]);

            return response()->json([
                'success' => 'Berhasil Menambah Data!'
            ]);
        }

        return response()->json('Gagal Menambah Data!');
    }

    public function show($id)
    {
        $findData = WisataModel::find($id);

        if (!$findData) {
            return response()->json([
                'errors' => 'Data Wisata Tidak Ditemukan!'
            ]);
        }

        return new Data($findData);
    }

    public function edit($id)
    {
        $findData = WisataModel::find($id);

        if (!$findData) {
            return response()->json([
                'errors' => 'Data Wisata Tidak Ditemukan!'
            ]);
        }

        return new Data($findData);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'nama_wisata' => 'required',
            'deskripsi' => 'required',
            'foto' => 'nullable',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => 'Gagal Merubah Data!',
            ]);
        }

        $findData = WisataModel::find($id);

        if (!$findData) {
            return response()->json([
                'errors' => 'Data Wisata Tidak Ditemukan!'
            ]);
        }

        $findData->nama_wisata = $request->nama_wisata;
        $findData->deskripsi = $request->deskripsi;

        if ($request->hasFile('foto')) {
            $file = $request->file('foto');
            $filename = Str::random() . '.' . $file->getClientOriginalExtension();
            $path = $file->move('images', $filename);

            unlink($findData->foto); // Delete the old path image before update new path image.

            $findData->foto = $path;
        } else {
            $findData->foto = $findData->foto;
        }

        $findData->save();

        return response()->json([
            'success' => 'Berhasil Merubah Data!'
        ]);
    }

    public function destroy($id)
    {
        $findData = WisataModel::find($id);

        if (!$findData) {
            return response()->json([
                'errors' => 'Data Wisata Tidak Ditemukan!'
            ]);
        }

        unlink($findData->foto);
        $findData->delete();

        return response()->json([
            'success' => 'Berhasil Menghapus Data!'
        ]);
    }
}
