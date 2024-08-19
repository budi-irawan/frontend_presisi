<template>
    <div>
        <div class="card shadow-lg">
            <div class="card-header">
				<h3 class="card-title">
				<i class="fas fa-solid fa-wrench mr-3"></i>
				<b>Riwayat Pengerjaan Unit</b>
				</h3>
			</div>
            <div class="card-body table-responsive p-0">
                <table class="table table-hover table-striped">
                    <thead>
                        <tr>
                            <th class="align-middle" scope="col">No</th>
                            <th class="align-middle" scope="col">Tanggal Masuk</th>
                            <th class="align-middle" scope="col">Tanggal Selesai</th>
                            <th class="align-middle" scope="col">Tanggal Sinkronisasi</th>
                            <th class="align-middle" scope="col">Unit</th>
                            <th class="align-middle" scope="col">Km</th>
                            <th class="align-middle" scope="col">Foto Km</th>
                            <th class="align-middle" scope="col">Hm</th>
                            <th class="align-middle" scope="col">Foto Hm</th>
                            <th class="align-middle" scope="col">User</th>
                            <th class="align-middle" scope="col">Lokasi</th>
                            <th class="align-middle" scope="col">Problem</th>
                            <th class="align-middle" scope="col">Solusi</th>
                            <th class="align-middle" scope="col">Status</th>
                            <th class="align-middle" scope="col">Keterangan Pending</th>
                            <th class="align-middle" scope="col">Mekanik</th>
                            <th class="align-middle" scope="col"></th>
                        </tr>
                    </thead>
                    <div v-if="loading" class="row justify-content-center">
						<div class="col">
							<img :src="loadingGif" alt="Loading..." />
						</div>
					</div>
                    <tbody v-else>
                        <tr v-for="item in itemEquipmentRepair" :key="item.equipmentRepairId">
                            <td>{{ item.no }}</td>
                            <td>{{ item.tanggalMasuk }}</td>
                            <td>{{ item.tanggalSelesai }}</td>
                            <td>{{ item.tanggalSinkronisasi }}</td>
                            <td>{{ item.namaMerk }}-{{ item.namaType }}-{{ item.nomorLambung }}</td>
                            <td>{{ item.hourMeter }}</td>
                            <td>
                                <img :src="path + '/uploads/' + item.fotoHourMeter" alt=""
                                    width="100" />
                            </td>
                            <td>{{ item.kiloMeter }}</td>
                            <td>
                                <img :src="path + '/uploads/' + item.fotoKiloMeter" alt=""
                                    width="100" />
                            </td>
                            <td>{{ item.username }}</td>
                            <td>{{ item.lokasi }}</td>
                            <td class="text-wrap">{{ item.problem }}</td>
                            <td class="isi-data-kolom">
                                <ul v-for="itemMekanik of item.dataMekanik"
                                    :key="itemMekanik.karyawanId">
                                    <li>
                                        {{ itemMekanik.deskripsiTugas }}
                                    </li>
                                </ul>
                            </td>
                            <td v-if="item.statusEquipment == 1"><span class="badge badge-success">RFU</span></td>
                            <td v-if="item.statusEquipment == 2"><span class="badge badge-info">PENDING</span></td>
                            <td>{{ item.keteranganPending }}</td>
                            <td class="isi-data-kolom">
                                <ul v-for="itemMekanik of item.dataMekanik"
                                    :key="itemMekanik.karyawanId">
                                    <li>
                                        {{ itemMekanik.namaManpower }}
                                    </li>
                                </ul>
                            </td>
                            <td class="tombol"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="row p-3">
				<label class="col-sm-3 col-form-label font-weight-normal">Jumlah item per halaman</label>
				<div class="col-sm-1">
					<select class="form-control select2" @change="handleLimit($event)">
						<option>Pilih</option>
						<option value="5">5</option>
						<option value="10">10</option>
					</select>
				</div>

				<div class="col">
					<ul class="pagination pagination-sm m-0 float-right">
						<li class="page-item"><button @click="changePages(page - 1)" :disabled="page <= 1" class="page-link">Sebelumnya</button></li>
						<li class="page-item"><button v-for="n in totalPages" :key="n" @click="changePages(n)" :class=" 'page-link' ">{{ n }}</button></li>
						<li class="page-item"><button @click="changePages(page + 1)" :disabled="page >= totalPages" class="page-link">Selanjutnya</button></li>
					</ul>
				</div>
			</div>
        </div>
    </div>
</template>


<script>
import { ipBackend } from "@/ipBackend";
import axios from "axios";
import moment from "moment";
export default {
    name: "RiwayatPengerjaanUnit",
    data() {
        return {
            loading: false,
            itemEquipmentRepair: [],
            path: ipBackend,
            page: 1,
			limit: 10,
			totalPages: 1,
			loadingGif: require('@/assets/rolling.gif'),
			shimmerDuration: 2000,
        };
    },

    mounted() {
        this.getEquipmentRepairByKaryawanId();
    },

    created() {
        this.getEquipmentRepairByKaryawanId();
    },

    methods: {
        async getEquipmentRepairByKaryawanId() {
            let dataToken = localStorage.getItem("token");
            try {
                const dataEquipmentRepair = await axios.get(
                    `${ipBackend}/equipment-repair/getEquipmentRepairByKaryawanId`,
                    {
                        headers: {
                            token: dataToken,
                        },
						params: {
							page: this.page,
							limit: this.limit,
						}
                    }
                );
                let result = dataEquipmentRepair.data.data;
                for (let i = 0; i < result.length; i++) {
                    result[i].no = i + 1;
                    result[i].tanggal = moment(result[i].tanggalMasuk).format(
                        "YYYY-MM-DD"
                    );
                    result[i].jam = moment(result[i].tanggalMasuk).format("HH:mm:ss");
                    result[i].tanggalMasuk = moment(result[i].tanggalMasuk).format("YYYY-MM-DD HH:mm:ss");
                    result[i].tanggalSelesai = moment(result[i].tanggalSelesai).format("YYYY-MM-DD HH:mm:ss");
                    result[i].tanggalSinkronisasi = moment(result[i].tanggalSinkronisasi).format("YYYY-MM-DD HH:mm:ss");
                }
                this.itemEquipmentRepair = result;
                this.totalPages = dataEquipmentRepair.data.totalPages
				this.loading = false;
            } catch (error) {
                console.log(error);
            }
        },

        changePages(newPage) {
			if (newPage >=1 && newPage <= this.totalPages) {
				this.page = newPage
				this.getEquipmentRepairByKaryawanId();
			}
		},

        handleLimit(event) {
			this.limit = parseInt(event.target.value)
			
			this.getEquipmentRepairByKaryawanId();
		},

    },
};
</script>


<style scoped>

</style>