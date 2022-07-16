<?php

namespace Database\Seeders;

use App\Models\Barang;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BarangSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        Barang::create([
            'suplier_id'=>'1',
            'nama_barang'=>'Sandal',
            'harga'=>10000,
            'stok'=>1,
            'keterangan'=>'mahal',
            'gambar'=>'1.jpg',
        ]);
    }
}
