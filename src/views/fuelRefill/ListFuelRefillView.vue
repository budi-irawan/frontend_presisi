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
									<i class="fas fa-solid fa-gas-pump mr-3"></i>
									<b>Data Pengisian Bahan Bakar</b>
									</h3>
									<div class="card-tools">
										
									</div>
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
                                        <button @click="getAllFuelRefill" type="button" class="btn btn-primary mb-2">Search<i class="fas fa-solid fa-search ml-2"></i></button>
                                        <button @click="downloadLaporan" type="button" class="btn btn-success mb-2 ml-2">Export<i class="fas fa-solid fa-file-excel ml-2"></i></button>
                                    </form>
								</div>
							</div>

							<div class="card shadow-lg">
								<div class="card-body table-responsive p-0">
									<table class="table table-hover table-striped text-nowrap" v-if="!loading">
										<thead>
											<tr>
												<th class="align-middle" scope="col" style="width: 5%">No</th>
												<th class="align-middle" scope="col">Tanggal Pengisian</th>
												<!-- <th class="align-middle" scope="col">Jam</th> -->
												<th class="align-middle" scope="col">Tanggal Sinkronisasi</th>
												<th class="align-middle" scope="col">Unit</th>
												<th class="align-middle" scope="col">Jenis Alat</th>
												<th class="align-middle" scope="col">Fuelman</th>
												<th class="align-middle" scope="col">Jumlah Pengisian</th>
												<th class="align-middle" scope="col">Foto Flowmeter</th>
												<th class="align-middle" scope="col">Km</th>
												<th class="align-middle" scope="col">Foto Km</th>
												<th class="align-middle" scope="col">Hm</th>
												<th class="align-middle" scope="col">Foto Hm</th>
												<th class="align-middle" scope="col"></th>
											</tr>
										</thead>
										
										<tbody>
											<tr v-for="itemFuel in itemFuelRefill" :key="itemFuel.fuelRefillId">
												<td>{{ itemFuel.no }}</td>
												<td>{{ itemFuel.tanggalPengisian }}</td>
												<!-- <td>{{ itemFuel.jam }}</td> -->
												<td>{{ itemFuel.tanggalSinkronisasi }}</td>
												<td>{{ itemFuel.namaMerk }}-{{ itemFuel.namaType }}-{{ itemFuel.nomorLambung }}</td>
												<td>{{ itemFuel.namaJenisAlat }}</td>
												<td>{{ itemFuel.namaFuelman }}</td>
												<td>{{ itemFuel.jumlahPengisian }}</td>
												<td><img :src="path+'/uploads/'+itemFuel.fotoFlowmeter" alt="" width="100"></td>
												<td>{{ itemFuel.hourMeter }}</td>
												<td><img :src="path+'/uploads/'+itemFuel.fotoHourMeter" alt="" width="100"></td>
												<td>{{ itemFuel.kiloMeter }}</td>
												<td><img :src="path+'/uploads/'+itemFuel.fotoKiloMeter" alt="" width="100"></td>
												<td class="tombol">
													
												</td>
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
import { ipBackend } from '@/ipBackend';
import axios from "axios";
import moment from 'moment';
import Shimmer from '@/components/Shimmer.vue';
import DatetimePicker from 'vue-bootstrap-datetimepicker';
export default {
	components: { Shimmer, DatetimePicker },
	name: "ListFuelRefillView",
	data() {
		return {
			tanggalAwal: null,
            tanggalAkhir: null,
			loading: true,
			itemFuelRefill: [],
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
		// this.getAllFuelRefill();
	},

	async created() {
		this.itemFuelRefill = await this.getAllFuelRefill();
		this.loading = false 
	},

	methods: {
		async getAllFuelRefill() {
			try {
				let dataToken = localStorage.getItem('token')
				this.loading = true;
				let timestamp = new Date().getTime()
				const response = await axios.get(
						`${ipBackend}/fuel-refill`, {
						headers: {
							token: dataToken
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
				let result = response.data.data;
				for (let i = 0; i < result.length; i++) {
					result[i].no = i + 1
					result[i].tanggalPengisian = moment(result[i].tanggalPengisian).subtract(7, 'hour').format("YYYY-MM-DD HH:mm:ss")
					// result[i].jam = moment(result[i].tanggalPengisian).format("HH:mm:ss")
					result[i].tanggalSinkronisasi = moment(result[i].tanggalSinkronisasi).format("YYYY-MM-DD HH:mm:ss")
				}
				// this.itemFuelRefill = result
				
				this.totalPages = response.data.totalPages
				this.loading = false;
				return result;
			} catch (error) {
				console.log(error);
			} finally {
				this.loading = false;
			}
		},

		changePages(newPage) {
			if (newPage >=1 && newPage <= this.totalPages) {
				this.page = newPage
				this.getAllFuelRefill();
			}
		},

		handleLimit(event) {
			this.limit = parseInt(event.target.value)
			
			this.getAllFuelRefill();
		},

		downloadLaporan() {
			try {
				let filterTanggal = ''
				if (this.tanggalAwal && this.tanggalAkhir != null) {
					filterTanggal += `?tanggalAwal=${this.tanggalAwal}&&tanggalAkhir=${this.tanggalAkhir}`
				}
				window.open(`${ipBackend}/fuel-refill/getLaporanFuelRefillExcel${filterTanggal}`);
			} catch (error) {
				console.log(error);
			}
		},

		handleTanggalAwal() {
            this.tanggalAwal = moment(this.tanggalAwal).format("YYYY-MM-DD")
        },

        handleTanggalAkhir() {
            this.tanggalAkhir = moment(this.tanggalAkhir).format("YYYY-MM-DD")
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

/* .row.align-items-center {
  display: flex;
  align-items: center;
} */
.form-group {
  margin-bottom: 0; /* Remove bottom margin to align properly */
}
</style>