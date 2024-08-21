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
									<i class="fas fa-solid fa-wrench mr-3"></i>
									<b>Data Perbaikan Unit</b>
									</h3>
								</div>
                                <div class="card-body">
                                    <form class="form-inline">
                                        <div class="form-group mb-2">
                                            <label>Dari</label>
                                        </div>
                                        <div class="form-group mx-sm-3 mb-2">
                                            <div class="datetime-picker-container">
                                                <datetime-picker
                                                    v-model="tanggalAwal"
                                                    :config="options"
                                                    @dp-change="handleTanggalAwal"
                                                />
                                                <i class="fas fa-calendar calendar-icon"></i>
                                            </div>
                                        </div>
                                        <div class="form-group mb-2">
                                            <label>Sampai</label>
                                        </div>
                                        <div class="form-group mx-sm-3 mb-2">
                                            <div class="datetime-picker-container">
                                                <datetime-picker
                                                    v-model="tanggalAkhir"
                                                    :config="options"
                                                    @dp-change="handleTanggalAkhir"
                                                />
                                                <i class="fas fa-calendar calendar-icon"></i>
                                            </div>
                                        </div>
                                        <button @click="getAllEquipmentRepair" type="button" class="btn btn-primary mb-2">Search<i class="fas fa-solid fa-search ml-2"></i></button>
                                        <button @click="downloadLaporan" type="button" class="btn btn-success mb-2 ml-2">Export<i class="fas fa-solid fa-file-excel ml-2"></i></button>
                                    </form>

                                </div>
                            </div>

                            <div class="card shadow-lg">
                                
                                <div class="card-body table-responsive p-0">
                                    <table class="table table-hover table-striped" v-if="!loading">
                                        <thead>
                                            <tr>
                                                <th class="align-middle" scope="col">
                                                    No
                                                </th>
                                                <th class="align-middle" scope="col">Tanggal Masuk</th>
                                                <!-- <th class="align-middle" scope="col">Jam</th> -->
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
                                                <!-- <th class="align-middle" scope="col">Komponen</th>
                                                <th class="align-middle" scope="col">Pelumas</th> -->
                                                <th class="align-middle" scope="col"></th>
                                            </tr>
                                        </thead>
                                        <!-- <div v-if="loading" class="row justify-content-center">
											<div class="col">
												<img :src="loadingGif" alt="Loading..." />
											</div>
										</div> -->
                                        <tbody>
                                            <tr v-for="(item, index) in itemEquipmentRepair" :key="item.equipmentRepairId">
                                                <td>{{ (page - 1) * limit + index + 1 }}</td>
                                                <td>{{ item.tanggalMasuk }}</td>
                                                <!-- <td>{{ item.jam }}</td> -->
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

                                    <div v-else class="row muser">
										<div class="col text-center">
											<img :src="loadingGif" />
										</div>
									</div>
                                </div>

                                <div class="row p-3">
									<label for="agama" class="col-sm-3 col-form-label font-weight-normal">Jumlah item per halaman</label>
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
import DatetimePicker from 'vue-bootstrap-datetimepicker';
export default {
    name: "ListEquipmentRepairView",
    components: {
        DatetimePicker
    },
    data() {
        return {
            tanggalAwal: null,
            tanggalAkhir: null,
            loading: true,
            itemEquipmentRepair: [],
            path: ipBackend,
            page: 1,
			limit: 10,
			totalPages: 1,
			loadingGif: require('@/assets/rolling.gif'),
			shimmerDuration: 2000,

            options: {
				format: "YYYY-MM-DD",
				useCurrent: true,
			},
        };
    },

    mounted() {
        // this.getAllEquipmentRepair();
    },

    created() {
        this.getAllEquipmentRepair();
    },

    methods: {
        async getAllEquipmentRepair() {
            let dataToken = localStorage.getItem("token");
            this.loading = true;
            try {
                let timestamp = new Date().getTime()
                const dataEquipmentRepair = await axios.get(
                    `${ipBackend}/equipment-repair`,
                    {
                        headers: {
                            token: dataToken,
                        },
						params: {
							page: this.page,
							limit: this.limit,
                            tanggalAwal: this.tanggalAwal,
                            tanggalAkhir: this.tanggalAkhir,
							_ts: timestamp
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
            } finally {
                this.loading = false;
            }
        },

        changePages(newPage) {
			if (newPage >=1 && newPage <= this.totalPages) {
				this.page = newPage
				this.getAllEquipmentRepair();
			}
		},

        handleLimit(event) {
			this.limit = parseInt(event.target.value)
			
			this.getAllEquipmentRepair();
		},

        handleTanggalAwal() {
            this.tanggalAwal = moment(this.tanggalAwal).format("YYYY-MM-DD")
        },

        handleTanggalAkhir() {
            this.tanggalAkhir = moment(this.tanggalAkhir).format("YYYY-MM-DD")
        },

        downloadLaporan() {
			try {
                let filterTanggal = ''
				if (this.tanggalAwal && this.tanggalAkhir != null) {
					filterTanggal += `?tanggalAwal=${this.tanggalAwal}&&tanggalAkhir=${this.tanggalAkhir}`
				}
				window.open(`${ipBackend}/equipment-repair/getLaporanEquipmentRepairExcel${filterTanggal}`);
			} catch (error) {
				console.log(error);
			}
		},
    },
};
</script>


<style scoped>
.datetime-picker-container {
  position: relative;
  display: inline-block;
}

.datetime-picker-container .vue-bootstrap-datetimepicker {
  padding-right: 40px; /* Space for icon */
}

.datetime-picker-container .calendar-icon {
  position: absolute;
  top: 50%;
  right: 10px; /* Position from the right edge */
  transform: translateY(-50%);
  color: #6c757d; /* Adjust color as needed */
  pointer-events: none; /* Allow clicks to pass through */
}

/* button .tombol {
    margin-top: 5px;
} */

.row.align-items-center {
  display: flex;
  align-items: center;
}
.form-group {
  margin-bottom: 0; /* Remove bottom margin to align properly */
}
</style>