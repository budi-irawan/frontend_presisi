<template>
    <div>
        <app-nav-bar />
        <app-side-bar />
        <div class="content-wrapper">
            <router-view />
            <section class="content">
                <div class="container-fluid pt-3">
                    <div class="row">
                        <div class="col-12">
                            <div class="card">
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

                            <div class="card">
                                <div class="card-body">
                                    <div class="table-responsive" v-if="!loading">
                                        <table class="table table-hover table-striped table-bordered">
                                        <thead>
                                            <tr>
                                                <th rowspan="2" class="align-middle" scope="col">
                                                    No
                                                </th>
                                                <th rowspan="2" class="align-middle" scope="col">Tanggal Masuk</th>
                                                <th rowspan="2" class="align-middle" scope="col">Tanggal Sinkronisasi</th>
                                                <th rowspan="2" class="align-middle" scope="col">Unit</th>
                                                <th rowspan="2" class="align-middle" scope="col">Km</th>
                                                <th rowspan="2" class="align-middle" scope="col">Foto Km</th>
                                                <th rowspan="2" class="align-middle" scope="col">Hm</th>
                                                <th rowspan="2" class="align-middle" scope="col">Foto Hm</th>
                                                <th rowspan="2" class="align-middle" scope="col">Mekanik</th>
                                                <th colspan="4" class="align-middle" scope="col">Backlog</th>
                                            </tr>
                                            <tr>
                                                <th class="align-middle" scope="col">Part Number</th>
                                                <th class="align-middle" scope="col">Part Name</th>
                                                <th class="align-middle" scope="col">Quantity</th>
                                                <th class="align-middle" scope="col">Foto Kerusakan</th>
                                            </tr>
                                        </thead>
                                        
                                        <tbody>
                                            <tr v-for="(item, index) in itemEquipmentRepair" :key="item.equipmentRepairId">
                                                <td>{{ (page - 1) * limit + index + 1 }}</td>
                                                <td>{{ item.tanggalMasuk }}</td>
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
                                                <td>{{ item.namaManpower }}</td>
                                                <td class="isi-data-kolom">
                                                    <ul v-for="itemMekanik of item.dataMekanik"
                                                        :key="itemMekanik.backLogId">
                                                        <li>
                                                            {{ itemMekanik.nomorPartNumber }}  
                                                        </li>
                                                    </ul>
                                                </td>
                                                <td class="isi-data-kolom">
                                                    <ul v-for="itemMekanik of item.dataMekanik"
                                                        :key="itemMekanik.backLogId">
                                                        <li>
                                                            {{ itemMekanik.namaPartName }}
                                                        </li>
                                                    </ul>
                                                </td>
                                                <td class="isi-data-kolom">
                                                    <ul v-for="itemMekanik of item.dataMekanik"
                                                        :key="itemMekanik.backLogId">
                                                        <li>
                                                            {{ itemMekanik.jumlahPart }}
                                                        </li>
                                                    </ul>
                                                </td>
                                                <td class="isi-data-kolom">
                                                    <ul v-for="itemMekanik of item.dataMekanik"
                                                        :key="itemMekanik.backLogId">
                                                        <li>
                                                            <img :src="path + '/uploads/' + itemMekanik.fotoKerusakan" alt="" width="100" /> 
                                                        </li>
                                                    </ul>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    </div>

                                    <div v-else class="row muser">
										<div class="col text-center">
											<img :src="loadingGif" />
										</div>
									</div>
                                </div>

                                <div class="row p-2 ml-2">
									<label for="agama" class="col-sm-3 col-form-label font-weight-normal">Jumlah item per halaman</label>
									<div class="col-sm-1">
										<select class="form-control select2" @change="handleLimit($event)">
											<option>Pilih</option>
											<option value="10">10</option>
                                            <option value="25">25</option>
                                            <option value="50">50</option>
										</select>
									</div>
								</div>
                                <div class="row p-2">
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