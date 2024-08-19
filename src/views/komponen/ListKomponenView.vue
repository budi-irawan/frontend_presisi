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
							<button type="button" class="btn btn-info" @click="toggleComponentTambahKomponen">
								<i class="fas fa-solid fa-plus-circle"></i>
								Tambah Data Komponen
							</button>
						</div>
					</div>
					<div class="row mt-3 mb-4">
						<div class="col">
							<div class="card shadow-lg">
								<div class="card-header">
									<h3 class="card-title">
									<i class="fas fa-solid fa-toolbox mr-3"></i>
									<b>Data Komponen</b>
									</h3>
								</div>
								<form>
									<div v-if="showComponentTambahKomponen">
										<div class="row mt-3 mb-3 ml-2">
											<div class="col-md-2">
												<label for="namaKomponen" class="col-form-label">Nama Komponen<span class="text-danger"> *</span></label>
											</div>
											<div class="col-md-5">
												<input type="text" class="form-control" id="namaKomponen" v-model.trim="$v.itemKomponen.namaKomponen.$model" :class="{'is-invalid': validationStatus($v.itemKomponen.namaKomponen)}" />
												<div v-if="!$v.itemKomponen.namaKomponen.required"
													class="invalid-feedback">
													Nama Komponen harus diisi
												</div>
											</div>
											<div class="col-md-3">
												<button type="button" class="btn btn-primary mr-2" @click="saveKomponen">
													<i class="fas fa-save"></i>
													Simpan
												</button>
												<button type="button" class="btn btn-secondary" @click="tutupFormKomponen">
													<i class="fas fa-undo"></i>
													Tutup
												</button>
											</div>
										</div>
									</div>
									<div v-if="showComponentEditKomponen">
										<div class="row mt-3 mb-3 ml-2">
											<div class="col-md-3">
												<label for="namaKomponen" class="col-form-label">Nama Komponen<span class="text-danger"> *</span></label>
											</div>
											<div class="col-md-5">
												<input type="text" class="form-control" id="namaKomponen" v-model="itemKomponen.namaKomponen" :class="{'is-invalid': validationStatus($v.itemKomponen.namaKomponen)}" />
												<div v-if="!$v.itemKomponen.namaKomponen.required"
													class="invalid-feedback">
													Nama Komponen harus diisi
												</div>
											</div>
											<div class="col-md-3">
												<button type="button" class="btn btn-primary mr-2" @click="updateKomponen">
													<i class="fas fa-save"></i>
													Update
												</button>
												<button type="button" class="btn btn-secondary" @click="tutupFormEditKomponen">
													<i class="fas fa-undo"></i>
													Batal
												</button>
											</div>
										</div>
									</div>
								</form>
								<div class="card-body table-responsive p-0">
									<table class="table table-hover table-striped text-nowrap">
										<thead>
											<tr>
												<th class="align-middle" scope="col" style="width: 5%">No</th>
												<th class="align-middle" scope="col">Nama Komponen</th>
												<th class="align-middle" scope="col"></th>
											</tr>
										</thead>
										<tbody>
											<tr v-for="komponen in dataKomponen" :key="komponen.id">
												<td>{{ komponen.no }}</td>
												<td>{{ komponen.namaKomponen }}</td>
												<td class="tombol">
													<div @click="toggleComponentEditKomponen(komponen.id, komponen.namaKomponen)" class="action-icon mr-2">
														<i class="fas fa-solid fa-pen" style="color: #ffb703"></i>
													</div>
													<div @click="deleteKomponen(komponen.id)" class="action-icon">
														<i class="fas fa-trash" style="color: red"></i>
													</div>
												</td>
											</tr>
										</tbody>
									</table>
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
import { required } from "vuelidate/lib/validators";
import 'izitoast/dist/css/iziToast.css';
import iziToast from 'izitoast';
export default {
	name: "ListKomponenView",
	data() {
		return {
			showComponentTambahKomponen: false,
			showComponentEditKomponen: false,
			itemKomponen: {
				namaKomponen: '',
				id: '',
			},
			dataKomponen: [],
		};
	},

	validations: {
		itemKomponen: {
			namaKomponen: { required },
		}, 
	},

	mounted() {
		this.getAllKomponen();
	},

	created() {
		this.getAllKomponen();
	},

	methods: {
		validationStatus: function (validation) {
			return typeof validation != "undefined" ? validation.$error : false;
		},

		async saveKomponen() {
			try {
				this.$v.$touch();
				if (this.$v.$invalid) {
					return;
				}
				let dataToken = localStorage.getItem('token')
				await axios.post(`${ipBackend}/komponen/create`, this.itemKomponen, {
					headers: {
						token: dataToken
					}
				});
				
				iziToast.success({
					title: 'Success',
					message: 'Data komponen berhasil disimpan',
					position: 'topRight', 
					timeout: 2000 
				});
				await this.getAllKomponen();
				this.$nextTick(() => { this.$v.$reset() })
				this.itemKomponen.namaKomponen = ''
				
			} catch (error) {
				console.log(error);
			}
		},

		async getAllKomponen() {
			let dataToken = localStorage.getItem('token')
			try {
				const response = await axios.get(
					`${ipBackend}/komponen/list`, {
					headers: {
						token: dataToken
					}
				}
				);
				let result = response.data.data;
				for (let i = 0; i < result.length; i++) {
					result[i].no = i + 1
				}
				this.dataKomponen = result
			} catch (error) {
				console.log(error);
			}
		},

		async deleteKomponen(id) {
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
					await axios.post(`${ipBackend}/komponen/delete`, { id }, {
						headers: {
							token: dataToken
						}
					});
					await this.getAllKomponen();
					iziToast.success({
						title: 'Success',
						message: 'Data komponen berhasil dihapus',
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

		toggleComponentTambahKomponen() {
			this.showComponentTambahKomponen = !this.showComponentTambahKomponen;
		},

		tutupFormKomponen() {
			this.showComponentTambahKomponen = false
		},

		toggleComponentEditKomponen(id, namaKomponen) {
			this.showComponentEditKomponen = !this.showComponentEditKomponen;
			this.itemKomponen.namaKomponen = namaKomponen
			this.itemKomponen.id = id
		},

		tutupFormEditKomponen() {
			this.showComponentEditKomponen = false
		},

		async updateKomponen() {
			try {
				let dataToken = localStorage.getItem('token')
				await axios.post(`${ipBackend}/komponen/update`, {
					id: this.itemKomponen.id,
					namaKomponen: this.itemKomponen.namaKomponen,
				}, {
					headers: {
						token: dataToken
					}
				});
				
				iziToast.success({
					title: 'Success',
					message: 'Data komponen berhasil diupdate',
					position: 'topRight', 
					timeout: 2000 
				});
				await this.getAllKomponen();
				this.itemKomponen.namaKomponen = ''
				this.$nextTick(() => { this.$v.$reset() })
				this.showComponentEditKomponen = false
				
			} catch (error) {
				console.log(error);
			}
		},
	},
};
</script>


<style></style>