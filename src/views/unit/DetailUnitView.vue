<template>
    <div>
        <app-nav-bar />
        <app-side-bar />
        <div class="content-wrapper">
            <router-view />
            <section class="content">
                <div class="container-fluid pt-3">
                    <div class="row">
                        <div class="col">
                            <div class="card shadow-lg">
                                <div class="card-header">
									<h3 class="card-title">
									<i class="fas fa-solid fa-layer-group mr-3"></i>
									<b>Data Unit Detail</b>
									</h3>
								</div>
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-xs-12 col-sm-5 col-md-4 col-lg-3">
                                            <div class="row">
                                                <div class="col">
                                                    <img :src="`${gambarQR}`" class="shadow-sm" width="100%" />
                                                </div>
                                            </div>
                                            <div class="row mt-2 mb-2">
                                                <div class="col">
                                                    <button type="button" class="btn btn-sm btn-block btn-success" @click="generatePDF">
                                                        <i class="fas fa-solid fa-qrcode" style="color: white"></i>
                                                        Generate QR Code
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xs-12 col-sm-7 col-md-8 col-lg-9">
                                            <div class="row">
                                                <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                                                    Nomor Lambung : 
                                                </div>
                                                <div class="col-lg-9 col-md-8 col-sm-6 col-xs-12">
                                                    <b>{{ itemUnit.nomorLambung }}</b>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                                                    Jenis Alat : 
                                                </div>
                                                <div class="col-lg-9 col-md-8 col-sm-6 col-xs-12">
                                                    <b>{{ itemUnit.namaJenisAlat }}</b>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                                                    Merk : 
                                                </div>
                                                <div class="col-lg-9 col-md-8 col-sm-6 col-xs-12">
                                                    <b>{{ itemUnit.namaMerk }}</b>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                                                    Type : 
                                                </div>
                                                <div class="col-lg-9 col-md-8 col-sm-6 col-xs-12">
                                                    <b>{{ itemUnit.namaType }}</b>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                                                    Nomor Polisi : 
                                                </div>
                                                <div class="col-lg-9 col-md-8 col-sm-6 col-xs-12">
                                                    <b>{{ itemUnit.nomorPolisi }}</b>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                                                    Serial Number : 
                                                </div>
                                                <div class="col-lg-9 col-md-8 col-sm-6 col-xs-12">
                                                    <b>{{ itemUnit.serialNumber }}</b>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                                                    Equipment : 
                                                </div>
                                                <div class="col-lg-9 col-md-8 col-sm-6 col-xs-12">
                                                    <b>{{ itemUnit.equipment }}</b>
                                                </div>
                                            </div>
                                            <!-- <div class="row">
                                                <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                                                    Lokasi : 
                                                </div>
                                                <div class="col-lg-9 col-md-8 col-sm-6 col-xs-12">
                                                    <b>{{ itemUnit.namaLokasi }}</b>
                                                </div>
                                            </div> -->
                                            <!-- <div class="row">
                                                Serial Number : <b class="text-wrap">{{ itemUnit.serialNumber }}</b>
                                            </div> -->
                                            <!-- <div class="row">
                                                <b>{{ itemUnit.nomorLambung }}</b>
                                            </div> -->
                                        </div>
                                        <!-- <div class="col-md-2 ml-2">
                                            <div class="row mb-1" style="font-weight: 600">
                                                        Nomor Lambung
                                            </div>
                                            <div class="row mb-1" style="font-weight: 600">
                                                Jenis Alat
                                            </div>
                                            <div class="row mb-1" style="font-weight: 600">
                                                Merk
                                            </div>
                                            <div class="row mb-1" style="font-weight: 600">
                                                Type
                                            </div>
                                            <div class="row mb-1" style="font-weight: 600">
                                                Nomor Polisi
                                            </div>
                                            <div class="row mb-1" style="font-weight: 600">
                                                Serial Number
                                            </div>
                                            <div class="row mb-1" style="font-weight: 600">
                                                Equipment
                                            </div>
                                            <div class="row mb-1" style="font-weight: 600">
                                                Lokasi
                                            </div>
                                        </div>
                                        <div class="col-md-6 col-sm-4">
                                            <div class="row mb-1">
                                                <b>: {{ itemUnit.nomorLambung }}</b>
                                            </div>
                                            <div class="row mb-1">
                                                <b>: {{ itemUnit.namaJenisAlat }}</b>
                                            </div>
                                            <div class="row mb-1">
                                                <b>: {{ itemUnit.namaMerk }}</b>
                                            </div>
                                            <div class="row mb-1">
                                                <b>: {{ itemUnit.namaType }}</b>
                                            </div>
                                            <div class="row mb-1">
                                                <b>: {{ itemUnit.nomorPolisi }}</b>
                                            </div>
                                            <div class="row mb-1">
                                                <b>: {{ itemUnit.serialNumber }}</b>
                                            </div>
                                            <div class="row mb-1">
                                                <b>: {{ itemUnit.equipment }}</b>
                                            </div>
                                            <div class="row mb-1">
                                                <b>: {{ itemUnit.namaLokasi }}</b>
                                            </div>
                                        </div> -->
                                    </div>
                                    <div class="row mt-3">
                                        <div class="col">
                                            <ul class="nav nav-tabs" id="custom-content-below-tab" role="tablist">
                                                <li class="nav-item">
                                                    <a class="nav-link active text-secondary" id="custom-content-below-home-tab"
                                                        data-toggle="pill" href="#custom-content-below-home" role="tab"
                                                        aria-controls="custom-content-below-home" aria-selected="true"
                                                        style="font-weight: 600">History Pengisian Bahan Bakar</a>
                                                </li>
                                                <li class="nav-item">
                                                    <a class="nav-link text-secondary" id="custom-content-below-profile-tab"
                                                        data-toggle="pill" href="#custom-content-below-profile"
                                                        role="tab" aria-controls="custom-content-below-profile"
                                                        aria-selected="false" style="font-weight: 600">History Perbaikan
                                                        Unit</a>
                                                </li>
                                            </ul>
                                            <div class="tab-content" id="custom-content-below-tabContent">
                                                <div class="tab-pane fade show active" id="custom-content-below-home"
                                                    role="tabpanel" aria-labelledby="custom-content-below-home-tab">
                                                    <div class="table-responsive mt-2">
                                                        <table class="table table-head-fixed text-nowrap table-hover table-striped table-bordered">
                                                            <thead>
                                                                <tr>
                                                                    <th class="align-middle" scope="col"
                                                                        style="width: 5%">
                                                                        No
                                                                    </th>
                                                                    <th class="align-middle" scope="col">
                                                                        Tanggal Pengisian
                                                                    </th>
                                                                    <th class="align-middle" scope="col">
                                                                        Tanggal Sinkronisasi
                                                                    </th>
                                                                    <th class="align-middle" scope="col">
                                                                        Fuelman
                                                                    </th>
                                                                    <th class="align-middle" scope="col">
                                                                        Jumlah Pengisian
                                                                    </th>
                                                                    <th class="align-middle" scope="col">
                                                                        Foto Flowmeter
                                                                    </th>
                                                                    <th class="align-middle" scope="col">
                                                                        Hm
                                                                    </th>
                                                                    <th class="align-middle" scope="col">
                                                                        Foto Hm
                                                                    </th>
                                                                    <th class="align-middle" scope="col">
                                                                        Km
                                                                    </th>
                                                                    <th class="align-middle" scope="col">
                                                                        Foto Km
                                                                    </th>
                                                                    <th class="align-middle" scope="col">
                                                                        Operator
                                                                    </th>
                                                                    <th class="align-middle" scope="col">
                                                                        Lokasi
                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr v-for="itemFuel in itemFuelRefill"
                                                                    :key="itemFuel.fuelRefillId">
                                                                    <td>{{ itemFuel.no }}</td>
                                                                    <td>{{ itemFuel.tanggalPengisian }}</td>
                                                                    <td>{{ itemFuel.tanggalSinkronisasi }}</td>
                                                                    <td>{{ itemFuel.username }}</td>
                                                                    <td>{{ itemFuel.jumlahPengisian }}</td>
                                                                    <td>
                                                                        <img :src="path +
                                                                            '/uploads/' +
                                                                            itemFuel.fotoFlowmeter
                                                                            " alt="" width="120" />
                                                                    </td>
                                                                    <td>{{ itemFuel.hourMeter }}</td>
                                                                    <td>
                                                                        <img :src="path +
                                                                            '/uploads/' +
                                                                            itemFuel.fotoHourMeter
                                                                            " alt="" width="100" />
                                                                    </td>
                                                                    <td>{{ itemFuel.kiloMeter }}</td>
                                                                    <td>
                                                                        <img :src="path +
                                                                            '/uploads/' +
                                                                            itemFuel.fotoKiloMeter
                                                                            " alt="" width="100" />
                                                                    </td>
                                                                    <td>{{ itemFuel.operator }}</td>
                                                                    <td>{{ itemFuel.lokasi }}</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                                <div class="tab-pane fade" id="custom-content-below-profile" role="tabpanel" aria-labelledby="custom-content-below-profile-tab">
                                                    <div class="table-responsive mt-2">
                                                        <table class="table table-head-fixed text-nowrap table-hover table-striped table-bordered">
                                                            <thead>
                                                                <tr>
                                                                    <th class="align-middle" scope="col">No</th>
                                                                    <th class="align-middle" scope="col">
                                                                        Tanggal Masuk
                                                                    </th>
                                                                    <th class="align-middle" scope="col">
                                                                        Tanggal Selesai
                                                                    </th>
                                                                    <th class="align-middle" scope="col">
                                                                        Tanggal Sinkronisasi
                                                                    </th>
                                                                    <th class="align-middle" scope="col">
                                                                        Lokasi
                                                                    </th>
                                                                    <th class="align-middle" scope="col">
                                                                        Hm
                                                                    </th>
                                                                    <th class="align-middle" scope="col">
                                                                        Foto Hm
                                                                    </th>
                                                                    <th class="align-middle" scope="col">
                                                                        Km
                                                                    </th>
                                                                    <th class="align-middle" scope="col">
                                                                        Foto Km
                                                                    </th>
                                                                    <th class="align-middle" scope="col">
                                                                        Problem
                                                                    </th>
                                                                    <th class="align-middle" scope="col">
                                                                        Solusi
                                                                    </th>
                                                                    <th class="align-middle" scope="col">
                                                                        Mekanik
                                                                    </th>
                                                                    <th class="align-middle" scope="col">
                                                                        Status
                                                                    </th>
                                                                    <th class="align-middle" scope="col">
                                                                        Keterangan Pending
                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr v-for="itemRepair in itemRiwayatPerbaikan"
                                                                    :key="itemRepair.equipmentRepairId" class="isi-data">
                                                                    <td>{{ itemRepair.no }}</td>
                                                                    <td>{{ itemRepair.tanggalMulai }}</td>
                                                                    <td>{{ itemRepair.tanggalSelesai }}</td>
                                                                    <td>{{ itemRepair.tanggalSinkronisasi }}</td>
                                                                    <td>{{ itemRepair.lokasi }}</td>
                                                                    <td>{{ itemRepair.hourMeter }}</td>
                                                                    <td>
                                                                        <img :src="path +
                                                                            '/uploads/' +
                                                                            itemRepair.fotoHourMeter
                                                                            " alt="" width="100" />
                                                                    </td>
                                                                    <td>{{ itemRepair.kiloMeter }}</td>
                                                                    <td>
                                                                        <img :src="path +
                                                                            '/uploads/' +
                                                                            itemRepair.fotoKiloMeter
                                                                            " alt="" width="100" />
                                                                    </td>
                                                                    <td>{{ itemRepair.problem }}</td>
                                                                    <td class="isi-data-kolom">
                                                                        <ul v-for="itemMekanik of itemRepair.dataMekanik"
                                                                            :key="itemMekanik.karyawanId">
                                                                            <li>
                                                                                {{ itemMekanik.deskripsiTugas }}
                                                                            </li>
                                                                        </ul>
                                                                    </td>
                                                                    <td class="isi-data-kolom">
                                                                        <ul v-for="itemMekanik of itemRepair.dataMekanik"
                                                                            :key="itemMekanik.karyawanId">
                                                                            <li>
                                                                                {{ itemMekanik.namaManpower }}
                                                                            </li>
                                                                        </ul>
                                                                    </td>
                                                                    <td v-if="itemRepair.statusEquipment == 1"><span class="badge badge-success">RFU</span></td>
                                                                    <td v-if="itemRepair.statusEquipment == 2"><span class="badge badge-info">PENDING</span></td>
                                                                    <td>{{ itemRepair.keteranganPending }}</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        <app-footer />
        <control-side-bar />
    </div>
</template>


<script>
import { ipBackend } from "@/ipBackend";
import axios from "axios";
import moment from "moment";
import QrcodeVue from "qrcode.vue";
export default {
    props: ["img"],
    name: "DetailUnitView",
    data() {
        return {
            itemUnit: {},
            value: "",
            size: 0,
            gambarQR: "",
            itemRiwayatPerbaikan: [],
            itemFuelRefill: [],
            path: ipBackend,
            unitId: ''
        };
    },

    mounted() {
        this.getQrUnit();
    },

    created() {
        this.getUnitById();
        this.getQrUnit();
        this.getEquipmentRepairByUnitId();
        this.getFuelRefillByUnitId();
    },

    components: {
        QrcodeVue,
    },

    methods: {
        async getUnitById() {
            let dataToken = localStorage.getItem("token");
            try {
                const dataUnit = await axios.get(
                    `${ipBackend}/unit/detailsById/${this.$route.params.id}`,
                    {
                        headers: {
                            token: dataToken,
                        },
                    }
                );
                let result = dataUnit.data.data;
                this.itemUnit = result;
                this.value = result.namaUnit;
                this.size = 200;
            } catch (error) {
                console.log(error);
            }
        },

        async getQrUnit() {
            try {
                const dataUnit = await axios.get(
                    `${ipBackend}/unit/qrUnit/${this.$route.params.id}`
                );
                let result = dataUnit.data.data;
                this.gambarQR = result;
            } catch (error) {
                console.log(error);
            }
        },

        async deleteUnit(unitId) {
            try {
                let dataToken = localStorage.getItem("token");
                const dataUnit = await axios.get(
                    `${ipBackend}/unit/detailsById/${unitId}`,
                    {
                        headers: {
                            token: dataToken,
                        },
                    }
                );
                this.$swal({
                    title: "Peringatan !",
                    text:
                        "Apakah anda yakin akan menghapus data " +
                        dataUnit.data.data[0].namaUnit +
                        "?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Ya, hapus!",
                }).then(async (hasil) => {
                    if (hasil.isConfirmed == true) {
                        await axios.post(
                            `${ipBackend}/unit/delete`,
                            { unitId },
                            {
                                headers: {
                                    token: dataToken,
                                },
                            }
                        );
                        this.$swal({
                            icon: "success",
                            title: "Sukses",
                            text: "Data unit berhasil dihapus",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    }
                    this.getUnitById();
                });
            } catch (error) {
                console.log(error);
            }
        },

        async getEquipmentRepairByUnitId() {
            let dataToken = localStorage.getItem("token");
            try {
                const dataEquipmentRepair = await axios.post(
                    `${ipBackend}/equipment-repair/get-equipment-repair-by-unit-id`,
                    {
                        unitId: this.$route.params.id,
                    },
                    {
                        headers: {
                            token: dataToken,
                        },
                    }
                );
                let result = dataEquipmentRepair.data.data;
                for (let i = 0; i < result.length; i++) {
                    result[i].no = i + 1;
                    result[i].tanggalMulai = moment(result[i].tanggalMasuk).format(
                        "YYYY-MM-DD HH:mm:ss"
                    );
                    result[i].tanggalSelesai = moment(result[i].tanggalSelesai).format(
                        "YYYY-MM-DD HH:mm:ss"
                    );
                    result[i].tanggalSinkronisasi = moment(result[i].tanggalSinkronisasi).format(
                        "YYYY-MM-DD HH:mm:ss"
                    );
                }
                this.itemRiwayatPerbaikan = result;
            } catch (error) {
                console.log(error);
            }
        },

        async getFuelRefillByUnitId() {
            let dataToken = localStorage.getItem("token");
            try {
                const dataFuelRefill = await axios.post(
                    `${ipBackend}/fuel-refill/get-fuel-refill-by-unit-id`,
                    {
                        unitId: this.$route.params.id,
                    },
                    {
                        headers: {
                            token: dataToken,
                        },
                    }
                );
                let result = dataFuelRefill.data.data;
                for (let i = 0; i < result.length; i++) {
                    result[i].no = i + 1;
                    result[i].tanggalPengisian = moment(
                        result[i].tanggalPengisian
                    ).format("YYYY-MM-DD HH:mm:ss");
                    result[i].tanggalSinkronisasi = moment(
                        result[i].tanggalSinkronisasi
                    ).format("YYYY-MM-DD HH:mm:ss");
                }
                this.itemFuelRefill = result;
            } catch (error) {
                console.log(error);
            }
        },

        async generatePDF() {
			try {
                // const response = await axios.get(`${ipBackend}/unit/generate-qr-code`)
                let unitId = this.$route.params.id
				window.open(`${ipBackend}/unit/generate-qr-code-by-id?unitId=${unitId}`)
			} catch (error) {
				console.error('Error generating QR codes PDF:', error.message);
			}
		}
    },
};
</script>


<style>
/* .bg-unit {
  background-color: rgb(62, 173, 247);
  color: white;
  border-radius: 10px;
} */
</style>