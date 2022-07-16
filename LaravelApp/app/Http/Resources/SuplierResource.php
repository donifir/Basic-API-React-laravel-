<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class SuplierResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'nama_suplier' => $this->nama_suplier,
            'alamat_suplier' => $this->alamat_suplier,
            'telp_suplier' => $this->telp_suplier,
            'value' => $this->id,
            'label' => $this->nama_suplier,
        ];
    }
}
