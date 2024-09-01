<template>
    <div>
		<form>
			<div class="row mt-3">
				<div class="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-2 d-sm-block mb-1">
					<button type="button" class="btn btn-info btn-block" @click="toggleComponentTambahUnit">
						<i class="fas fa-solid fa-plus-circle"></i>
						Tambah Data Unit
					</button>
				</div>
				<div class="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-2 d-sm-block mb-1">
					<button type="button" @click="generatePDF" class="btn btn-success btn-block">
						<i class="fas fa-solid fa-qrcode"></i>
						Generate QR Code
					</button>
				</div>
			</div>

			<div v-if="showComponentTambahUnit">
				<div class="row mt-3 mb-3">
					<div class="col">
						<div class="row mb-3">
							<label for="nomorLambung" class="col-sm-3 col-form-label">Nomor Lambung<span class="text-danger"> *</span></label>
							<div class="col-sm-6">
								<input type="text" class="form-control" id="nomorLambung" v-model="itemUnit.nomorLambung" :class="{'is-invalid': validationStatus($v.itemUnit.nomorLambung)}" />
								<div v-if="!$v.itemUnit.nomorLambung.required"
									class="invalid-feedback">
									Nomor Lambung harus diisi
								</div>
							</div>
						</div>

						<div class="row mb-3">
							<label for="jenisAlatId" class="col-sm-3 col-form-label">Nama Jenis Alat<span class="text-danger"> *</span></label>
							<div class="col-sm-6">
								<select class="form-control select2" aria-label="Default select example"
									v-model="itemUnit.jenisAlatId" :class="{
										'is-invalid': validationStatus(
											$v.itemUnit.jenisAlatId
										),
									}">
									<option v-for="dja in dataJenisAlat" :key="dja.id" :value="dja.id">
										{{ dja.namaJenisAlat }}
									</option>
								</select>
								<div v-if="!$v.itemUnit.jenisAlatId.required" class="invalid-feedback">
									Nama Jenis Alat harus diisi
								</div>
							</div>
						</div>

						<div class="row mb-3">
							<label for="typeId" class="col-sm-3 col-form-label">Type<span class="text-danger"> *</span></label>
							<div class="col-sm-6">
								<select class="form-control select2" aria-label="Default select example"
									v-model="itemUnit.typeId" :class="{
										'is-invalid': validationStatus(
											$v.itemUnit.typeId
										),
									}">
									<option v-for="dt in dataType" :key="dt.id" :value="dt.id">
										{{ dt.namaType }}
									</option>
								</select>
								<div v-if="!$v.itemUnit.typeId.required" class="invalid-feedback">
									Type harus diisi
								</div>
							</div>
						</div>

						<div class="row mb-3">
							<label for="merkId" class="col-sm-3 col-form-label">Merk<span class="text-danger"> *</span></label>
							<div class="col-sm-6">
								<select class="form-control select2" aria-label="Default select example"
									v-model="itemUnit.merkId" :class="{
										'is-invalid': validationStatus(
											$v.itemUnit.merkId
										),
									}">
									<option v-for="dm in dataMerk" :key="dm.id" :value="dm.id">
										{{ dm.namaMerk }}
									</option>
								</select>
								<div v-if="!$v.itemUnit.merkId.required" class="invalid-feedback">
									Merk harus diisi
								</div>
							</div>
						</div>

						<div class="row mb-3">
							<label for="lokasiId" class="col-sm-3 col-form-label">Lokasi<span class="text-danger"> *</span></label>
							<div class="col-sm-6">
								<select class="form-control select2" aria-label="Default select example"
									v-model="itemUnit.lokasiId" :class="{
										'is-invalid': validationStatus(
											$v.itemUnit.lokasiId
										),
									}">
									<option v-for="dl in dataLokasi" :key="dl.id" :value="dl.id">
										{{ dl.namaLokasi }}
									</option>
								</select>
								<div v-if="!$v.itemUnit.lokasiId.required" class="invalid-feedback">
									Lokasi harus diisi
								</div>
							</div>
						</div>

						<div class="row mb-3">
							<label for="proyekId" class="col-sm-3 col-form-label">Proyek<span class="text-danger"> *</span></label>
							<div class="col-sm-6">
								<select class="form-control select2" aria-label="Default select example"
									v-model="itemUnit.proyekId" :class="{
										'is-invalid': validationStatus(
											$v.itemUnit.proyekId
										),
									}">
									<option v-for="dp in dataProyek" :key="dp.id" :value="dp.id">
										{{ dp.namaProyek }}
									</option>
								</select>
								<div v-if="!$v.itemUnit.proyekId.required" class="invalid-feedback">
									Proyek harus diisi
								</div>
							</div>
						</div>

						<div class="row mb-3">
							<label for="tahunAlat" class="col-sm-3 col-form-label">Tahun Alat<span class="text-danger"> *</span></label>
							<div class="col-sm-6">
								<input type="text" class="form-control" id="tahunAlat" v-model="itemUnit.tahunAlat" :class="{'is-invalid': validationStatus($v.itemUnit.tahunAlat)}" />
								<div v-if="!$v.itemUnit.tahunAlat.required"
									class="invalid-feedback">
									Tahun alat harus diisi
								</div>
							</div>
						</div>

						<div class="row mb-3">
							<label for="equipment" class="col-sm-3 col-form-label">Equipment</label>
							<div class="col-sm-6">
								<input type="text" class="form-control" id="equipment" v-model="itemUnit.equipment" />
							</div>
						</div>

						<div class="row mb-3">
							<label for="serialNumber" class="col-sm-3 col-form-label">Serial Number</label>
							<div class="col-sm-6">
								<input type="text" class="form-control" id="serialNumber" v-model="itemUnit.serialNumber" />
							</div>
						</div>

						<div class="row mb-3">
							<label for="nomorPolisi" class="col-sm-3 col-form-label">No.Polisi</label>
							<div class="col-sm-6">
								<input type="text" class="form-control" id="nomorPolisi" v-model="itemUnit.nomorPolisi" />
							</div>
						</div>

                        <!-- <div class="row mb-3">
							<label for="statusUnit" class="col-sm-3 col-form-label">Status Unit<span class="text-danger"> *</span></label>
							<div class="col-sm-6">
								<select class="form-control select2" style="width: 100%;" v-model.trim="$v.itemUnit.statusUnit.$model" :class="{
										'is-invalid': validationStatus($v.itemUnit.statusUnit),
									}">
									<option selected="selected">RFU</option>
									<option>BD</option>
								</select>
								<div v-if="!$v.itemUnit.statusUnit.required"
									class="invalid-feedback">
									Status Unit harus diisi
								</div>
							</div>
						</div> -->
						<div class="row">
							<div class="col">
								<button type="button" class="btn btn-primary mr-2" @click="saveUnit">
									<i class="fas fa-save"></i>
									Simpan
								</button>
								<button type="button" class="btn btn-secondary" @click="tutupFormTambahUnit">
									<i class="fas fa-undo"></i>
									Tutup
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div v-if="showComponentEditUnit">
				<div class="row mt-3 mb-3">
					<div class="col">
						
                        <div class="row mb-3">
							<label for="nomorLambung" class="col-sm-3 col-form-label">Nomor Lambung<span class="text-danger"> *</span></label>
							<div class="col-sm-6">
								<input type="text" class="form-control" id="nomorLambung" v-model="itemUnit.nomorLambung" :class="{'is-invalid': validationStatus($v.itemUnit.nomorLambung)}" />
								<div v-if="!$v.itemUnit.nomorLambung.required"
									class="invalid-feedback">
									Nomor Lambung harus diisi
								</div>
							</div>
						</div>

						<div class="row mb-3">
							<label for="jenisAlatId" class="col-sm-3 col-form-label">Nama Jenis Alat<span class="text-danger"> *</span></label>
							<div class="col-sm-6">
								<select class="form-control select2" aria-label="Default select example"
									v-model="itemUnit.jenisAlatId" :class="{
										'is-invalid': validationStatus(
											$v.itemUnit.jenisAlatId
										),
									}">
									<option v-for="dja in dataJenisAlat" :key="dja.id" :value="dja.id">
										{{ dja.namaJenisAlat }}
									</option>
								</select>
								<div v-if="!$v.itemUnit.jenisAlatId.required" class="invalid-feedback">
									Nama Jenis Alat harus diisi
								</div>
							</div>
						</div>

						<div class="row mb-3">
							<label for="typeId" class="col-sm-3 col-form-label">Type<span class="text-danger"> *</span></label>
							<div class="col-sm-6">
								<select class="form-control select2" aria-label="Default select example"
									v-model="itemUnit.typeId" :class="{
										'is-invalid': validationStatus(
											$v.itemUnit.typeId
										),
									}">
									<option v-for="dt in dataType" :key="dt.id" :value="dt.id">
										{{ dt.namaType }}
									</option>
								</select>
								<div v-if="!$v.itemUnit.typeId.required" class="invalid-feedback">
									Type harus diisi
								</div>
							</div>
						</div>

						<div class="row mb-3">
							<label for="merkId" class="col-sm-3 col-form-label">Merk<span class="text-danger"> *</span></label>
							<div class="col-sm-6">
								<select class="form-control select2" aria-label="Default select example"
									v-model="itemUnit.merkId" :class="{
										'is-invalid': validationStatus(
											$v.itemUnit.merkId
										),
									}">
									<option v-for="dm in dataMerk" :key="dm.id" :value="dm.id">
										{{ dm.namaMerk }}
									</option>
								</select>
								<div v-if="!$v.itemUnit.merkId.required" class="invalid-feedback">
									Merk harus diisi
								</div>
							</div>
						</div>

						<div class="row mb-3">
							<label for="lokasiId" class="col-sm-3 col-form-label">Lokasi<span class="text-danger"> *</span></label>
							<div class="col-sm-6">
								<select class="form-control select2" aria-label="Default select example"
									v-model="itemUnit.lokasiId" :class="{
										'is-invalid': validationStatus(
											$v.itemUnit.lokasiId
										),
									}">
									<option v-for="dl in dataLokasi" :key="dl.id" :value="dl.id">
										{{ dl.namaLokasi }}
									</option>
								</select>
								<div v-if="!$v.itemUnit.lokasiId.required" class="invalid-feedback">
									Lokasi harus diisi
								</div>
							</div>
						</div>

						<div class="row mb-3">
							<label for="proyek" class="col-sm-3 col-form-label">Proyek<span class="text-danger"> *</span></label>
							<div class="col-sm-6">
								<input type="text" class="form-control" id="proyek" v-model="itemUnit.proyek" :class="{'is-invalid': validationStatus($v.itemUnit.proyek)}" />
								<div v-if="!$v.itemUnit.proyek.required"
									class="invalid-feedback">
									Proyek harus diisi
								</div>
							</div>
						</div>

						<div class="row mb-3">
							<label for="tahunAlat" class="col-sm-3 col-form-label">Tahun Alat<span class="text-danger"> *</span></label>
							<div class="col-sm-6">
								<input type="text" class="form-control" id="tahunAlat" v-model="itemUnit.tahunAlat" :class="{'is-invalid': validationStatus($v.itemUnit.tahunAlat)}" />
								<div v-if="!$v.itemUnit.tahunAlat.required"
									class="invalid-feedback">
									Tahun alat harus diisi
								</div>
							</div>
						</div>

						<div class="row mb-3">
							<label for="equipment" class="col-sm-3 col-form-label">Equipment<span class="text-danger"> *</span></label>
							<div class="col-sm-6">
								<input type="text" class="form-control" id="equipment" v-model="itemUnit.equipment" />
							</div>
						</div>

						<div class="row mb-3">
							<label for="serialNumber" class="col-sm-3 col-form-label">Serial Number<span class="text-danger"> *</span></label>
							<div class="col-sm-6">
								<input type="text" class="form-control" id="serialNumber" v-model="itemUnit.serialNumber" />
							</div>
						</div>

						<div class="row mb-3">
							<label for="nomorPolisi" class="col-sm-3 col-form-label">No.Polisi<span class="text-danger"> *</span></label>
							<div class="col-sm-6">
								<input type="text" class="form-control" id="nomorPolisi" v-model="itemUnit.nomorPolisi" />
							</div>
						</div>

                        <!-- <div class="row mb-3">
							<label for="statusUnit" class="col-sm-3 col-form-label">Status Unit<span class="text-danger"> *</span></label>
							<div class="col-sm-6">
								<select class="form-control select2" style="width: 100%;" v-model.trim="$v.itemUnit.statusUnit.$model" :class="{
										'is-invalid': validationStatus($v.itemUnit.statusUnit),
									}">
									<option selected="selected">RFU</option>
									<option>BD</option>
								</select>
								<div v-if="!$v.itemUnit.statusUnit.required"
									class="invalid-feedback">
									Status Unit harus diisi
								</div>
							</div>
						</div> -->
						
						<div class="row">
							<div class="col">
								<button type="button" class="btn btn-primary mr-2" @click="updateUnit" >
									<i class="fas fa-save"></i>
									Update
								</button>
								<button type="button" class="btn btn-secondary" @click="tutupFormEditUnit">
									<i class="fas fa-undo"></i>
									Tutup
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</form>
		<div class="table-responsive mt-2">
			<table class="table table-striped table-hover table-bordered" v-if="!loading">
				<thead>
					<tr>
						<th class="align-middle" scope="col">No</th>
						<th class="align-middle" scope="col">Nomor Lambung</th>
						<th class="align-middle" scope="col">Merk</th>
						<th class="align-middle" scope="col">Type</th>
						<th class="align-middle" scope="col">Jenis Alat</th>
						<th class="align-middle" scope="col">Serial Number</th>
						<th class="align-middle" scope="col">Nomor Polisi</th>
						<th class="align-middle" scope="col">Equipment</th>
						<th class="align-middle" scope="col">Lokasi</th>
						<th class="align-middle" scope="col">Proyek</th>
						<th class="align-middle" scope="col">Tahun Alat</th>
						<!-- <th class="align-middle" scope="col">Status Unit</th> -->
						<th class="align-middle" scope="col"></th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(du, index) in dataUnit" :key="du.unitId">
						<td>{{ (page - 1) * limit + index + 1}}</td>
						<td>{{ du.nomorLambung }}</td>
						<td>{{ du.namaMerk }}</td>
						<td>{{ du.namaType }}</td>
						<td>{{ du.namaJenisAlat }}</td>
						<td>{{ du.serialNumber }}</td>
						<td>{{ du.nomorPolisi }}</td>
						<td>{{ du.equipment }}</td>
						<td>{{ du.namaLokasi }}</td>
						<td>{{ du.namaProyek }}</td>
						<td>{{ du.tahunAlat }}</td>
						<!-- <td>
							<span v-if="du.statusUnit == 'RFU'" class="badge bg-success">{{ du.statusUnit }}</span>
							<span v-if="du.statusUnit == 'BD'" class="badge bg-danger">{{ du.statusUnit }}</span>
						</td> -->
						<td>
							<div @click="toggleComponentEditUnit(du.unitId, du.nomorLambung, du.statusUnit, du.jenisAlatId, du.typeId, du.merkId, du.lokasiId, du.proyek, du.serialNumber, du.nomorPolisi, du.equipment, du.tahunAlat)" class="action-icon mr-2">
								<i class="fas fa-solid fa-pen" style="color: #ffb703"></i>
							</div>
							<div @click="deleteUnit(du.unitId)" class="action-icon mr-2">
								<i class="fas fa-trash" style="color: red"></i>
							</div>
							<div class="action-icon">
								<router-link :to="{
									name: 'detail-unit',
									params: { id: du.unitId }
								}">
								<i class="fas fa-eye" style="color: blue"></i>
								</router-link>
							</div>
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
		
		<div class="row mt-2">
			<label for="pagination" class="col-sm-3 col-form-label font-weight-normal">Jumlah item per halaman</label>
			<div class="col-sm-1 mb-2">
				<select class="form-control select2" @change="handleLimit($event)">
					<option>Pilih</option>
					<option value="10">10</option>
					<option value="20">20</option>
					<option value="30">30</option>
				</select>
			</div>
		</div>
		<div class="row mt-2">
			<div class="col">
				<ul class="pagination pagination-sm m-0 float-right">
					<li class="page-item">
						<button @click="changePages(page - 1)" :disabled="page <= 1 || loading" class="page-link">Sebelumnya</button>
					</li>
					<li class="page-item">
						<button v-for="n in totalPages" :key="n" @click="changePages(n)" class="page-link btn-primary">{{ n }}</button>
					</li>
					<li class="page-item">
						<button @click="changePages(page + 1)" :disabled="page >= totalPages || loading" class="page-link">Selanjutnya</button>
					</li>
            	</ul>
			</div>
		</div>
	</div>
</template>


<script>
import { ipBackend } from '@/ipBackend';
import axios from "axios";
import { required } from "vuelidate/lib/validators";
import 'izitoast/dist/css/iziToast.css';
import iziToast from 'izitoast';

export default {
	name: "TambahUnit",
	data() {
		return {
			showComponentTambahUnit: false,
			showComponentEditUnit: false,

			itemUnit: {
				unitId: '',
				nomorLambung: '',
				// statusUnit: '',
				jenisAlatId: '',
				typeId: '',
				merkId: '',
				lokasiId: '',
				proyekId: '',
				nomorPolisi: '',
				serialNumber: '',
				tahunAlat: '',
				equipment: '',
				tahunAlat: '',
			},

			dataUnit: [],
            dataJenisAlat: [],
            dataType: [],
            dataMerk: [],
            dataLokasi: [],
            dataProyek: [],
			page: 1,
			limit: 10,
			totalPages: 1,
			loading: true,
			loadingGif: require('@/assets/rolling.gif'),
		};
	},

	validations: {
		itemUnit: {
			nomorLambung: { required },
			// statusUnit: { required },
			jenisAlatId: { required },
			typeId: { required },
			merkId: { required },
			lokasiId: { required },
			proyekId: { required },
			tahunAlat: { required },
		}, 
	},

	mounted() {
		// this.getAllJenisAlat();
		// this.getAllUnit();
		// this.getAllType();
		// this.getAllMerk();
		// this.getAllLokasi();
	},

	async created() {
		this.getAllJenisAlat();
		this.getAllType();
		this.getAllMerk();
		this.getAllLokasi();
		this.getAllProyek();
		this.getAllUnit();
		// this.dataUnit = await this.getAllUnit();
		// this.loading = false
	},

	methods: {
		validationStatus: function (validation) {
			return typeof validation != "undefined" ? validation.$error : false;
		},

		async getAllJenisAlat() {
			let dataToken = localStorage.getItem('token')
			try {
				const response = await axios.get(
					`${ipBackend}/jenis-alat/list`, {
					headers: {
						token: dataToken
					}
				}
				);
				let result = response.data.data;
				for (let i = 0; i < result.length; i++) {
					result[i].no = i + 1
				}
				this.dataJenisAlat = result
			} catch (error) {
				console.log(error);
			}
		},

		async getAllType() {
			let dataToken = localStorage.getItem('token')
			try {
				const response = await axios.get(
					`${ipBackend}/type`, {
					headers: {
						token: dataToken
					}
				}
				);
				let result = response.data.data;
				for (let i = 0; i < result.length; i++) {
					result[i].no = i + 1
				}
				this.dataType = result
			} catch (error) {
				console.log(error);
			}
		},

		async getAllMerk() {
			let dataToken = localStorage.getItem('token')
			try {
				const response = await axios.get(
					`${ipBackend}/merk`, {
					headers: {
						token: dataToken
					}
				}
				);
				let result = response.data.data;
				for (let i = 0; i < result.length; i++) {
					result[i].no = i + 1
				}
				this.dataMerk = result
			} catch (error) {
				console.log(error);
			}
		},

		async getAllLokasi() {
			let dataToken = localStorage.getItem('token')
			try {
				const response = await axios.get(
					`${ipBackend}/lokasi`, {
					headers: {
						token: dataToken
					}
				}
				);
				let result = response.data.data;
				for (let i = 0; i < result.length; i++) {
					result[i].no = i + 1
				}
				this.dataLokasi = result
			} catch (error) {
				console.log(error);
			}
		},

		async getAllProyek() {
			let dataToken = localStorage.getItem('token')
			try {
				const response = await axios.get(
					`${ipBackend}/proyek`, {
					headers: {
						token: dataToken
					}
				}
				);
				let result = response.data.data;
				this.dataProyek = result
			} catch (error) {
				console.log(error);
			}
		},

		toggleComponentTambahUnit() {
			this.showComponentTambahUnit = !this.showComponentTambahUnit;
			this.getAllJenisAlat();
		},

		tutupFormTambahUnit() {
			this.showComponentTambahUnit = false
		},

		async saveUnit() {
			try {
				this.$v.$touch();
				if (this.$v.$pendding || this.$v.$error) return;
				
				let dataToken = localStorage.getItem('token')
				let response = await axios.post(`${ipBackend}/unit/create`, this.itemUnit, {
					headers: {
						token: dataToken
					}
				});

				if (response.data.message == "sukses") {
					iziToast.success({
						title: 'Success',
						message: 'Data unit berhasil disimpan',
						position: 'topRight', 
						timeout: 2000 
					});
					await this.getAllUnit();
					this.itemUnit.namaUnit = null
					this.itemUnit.nomorLambung = null
					this.itemUnit.statusUnit = null
					this.itemUnit.jenisAlatId = null
					this.itemUnit.typeId = null
					this.itemUnit.merkId = null
					this.itemUnit.lokasiId = null
					this.itemUnit.serialNumber = null
					this.itemUnit.proyekId = null
					this.itemUnit.tahunAlat = null
					this.itemUnit.equipment = null
					this.$nextTick(() => { this.$v.$reset() })
				} else {
					iziToast.info({
                        title: 'Informasi',
                        message: response.data.message,
                        position: 'topRight',
                        timeout: 3000,
                    })
				}
			} catch (error) {
				console.log(error);
			}
		},

		async getAllUnit() {
			this.loading = true;
			let dataToken = localStorage.getItem('token')
			try {
				let timestamp = new Date().getTime()
				const response = await axios.get(
                        `${ipBackend}/unit`, {
                        headers: {
                            token: dataToken
						},
						params: {
							page: this.page,
							limit: this.limit,
							_ts: timestamp
						}
                    }
				);
				
				let result = response.data.data;
				for (let i = 0; i < result.length; i++) {
					result[i].no = i + 1
				}
				this.dataUnit = result
				this.totalPages = response.data.totalPages
				this.loading = false 
				// return result;
			} catch (error) {
				console.log(error);
			} finally {
				this.loading = false;
			}
		},

		changePages(newPage) {
			if (newPage >=1 && newPage <= this.totalPages) {
				this.page = newPage
				this.getAllUnit();
			}
		},

		handleLimit(event) {
			this.limit = parseInt(event.target.value)
			
			this.getAllUnit();
		},

		deleteUnit(id) {
			iziToast.show({
				theme: 'warning',
				icon: 'fas fa-exclamation-triangle',
				overlay: true,
				close: false,
				timeout: false,
				title: 'Konfirmasi',
				message: 'Apakah anda yakin akan menghapus data ?',
				position: 'center',
				buttons: [
					['<button><b>Ya</b></button>', async (instance, toast) => {
					let dataToken = localStorage.getItem('token')
					await axios.post(`${ipBackend}/unit/delete`, { unitId: id }, {
						headers: {
							token: dataToken
						}
					});
					await this.getAllUnit();
					iziToast.success({
						title: 'Success',
						message: 'Data unit berhasil dihapus',
						position: 'topRight', 
						timeout: 2000 
					});
					instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
				}, true],
				['<button>Batal</button>', (instance, toast) => {
					instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
				}]
				]
			});
		},

		toggleComponentEditUnit(unitId, nomorLambung, statusUnit, jenisAlatId, typeId, merkId, lokasiId, proyekId, serialNumber, nomorPolisi, equipment, tahunAlat) {
			this.getAllJenisAlat()
			this.showComponentEditUnit = !this.showComponentEditUnit;
			this.itemUnit.nomorLambung = nomorLambung
			this.itemUnit.statusUnit = statusUnit
			this.itemUnit.jenisAlatId = jenisAlatId
			this.itemUnit.unitId = unitId
			this.itemUnit.typeId = typeId
			this.itemUnit.merkId = merkId
			this.itemUnit.lokasiId = lokasiId
			this.itemUnit.proyekId = proyekId
			this.itemUnit.serialNumber = serialNumber
			this.itemUnit.nomorPolisi = nomorPolisi
			this.itemUnit.equipment = equipment
			this.itemUnit.tahunAlat = tahunAlat
		},

		tutupFormEditUnit() {
			this.showComponentEditUnit = false
		},

		async updateUnit() {
			try {
				let dataToken = localStorage.getItem('token')
				await axios.post(`${ipBackend}/unit/update`, {
					nomorLambung: this.itemUnit.nomorLambung,
					statusUnit: this.itemUnit.statusUnit,
					jenisAlatId: this.itemUnit.jenisAlatId,
					unitId: this.itemUnit.unitId,
					typeId: this.itemUnit.typeId,
					merkId: this.itemUnit.merkId,
					lokasiId: this.itemUnit.lokasiId,
					proyekId: this.itemUnit.proyekId,
					serialNumber: this.itemUnit.serialNumber,
					nomorPolisi: this.itemUnit.nomorPolisi,
					equipment: this.itemUnit.equipment,
					tahunAlat: this.itemUnit.tahunAlat,
				}, {
					headers: {
						token: dataToken
					}
				});
				
				iziToast.success({
					title: 'Success',
					message: 'Data unit berhasil diupdate',
					position: 'topRight', 
					timeout: 2000 
				});
				await this.getAllUnit();
				this.itemUnit.namaUnit = null
				this.itemUnit.nomorLambung = null
				this.itemUnit.statusUnit = null
				this.itemUnit.jenisAlatId = null
				this.itemUnit.unitId = null
				this.$nextTick(() => { this.$v.$reset() })
				this.showComponentEditUnit = false
				
			} catch (error) {
				console.log(error);
			}
		},

		async generatePDF() {
			try {
				// const response = await axios.get(`${ipBackend}/unit/generate-qr-code`)
				window.open(`${ipBackend}/unit/generate-qr-code`)
			} catch (error) {
				console.error('Error generating QR codes PDF:', error.message);
			}
		}
	},
};
</script>

<style>
/* .active {
  font-weight: bold;
} */
</style>