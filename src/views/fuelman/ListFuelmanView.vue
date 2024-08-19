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
							<button type="button" class="btn btn-info" @click="toggleComponentTambahFuelman">
								<i class="fas fa-solid fa-plus-circle"></i>
								Tambah Data Fuelman
							</button>
						</div>
					</div>
					<div class="row mt-3 mb-4">
						<div class="col">
							<div class="card shadow-lg">
								<div class="card-header">
									<h3 class="card-title">
									<i class="fas fa-solid fa-user-tie mr-3"></i>
									<b>Data Fuelman</b>
									</h3>
								</div>
								<form>
									<div v-if="showComponentTambahFuelman">
										<div class="row mt-3 mb-3 ml-2">
											<div class="col-md-2">
												<label for="namaFuelman" class="col-form-label">Nama Fuelman<span class="text-danger"> *</span></label>
											</div>
											<div class="col-md-5">
												<input type="text" class="form-control" id="namaFuelman" v-model.trim="$v.itemFuelman.namaFuelman.$model" :class="{'is-invalid': validationStatus($v.itemFuelman.namaFuelman)}" />
												<div v-if="!$v.itemFuelman.namaFuelman.required"
													class="invalid-feedback">
													Nama Fuelman harus diisi
												</div>
											</div>
											<div class="col-md-3">
												<button type="button" class="btn btn-primary mr-2" @click="saveFuelman">
													<i class="fas fa-save"></i>
													Simpan
												</button>
												<button type="button" class="btn btn-secondary" @click="tutupFormFuelman">
													<i class="fas fa-undo"></i>
													Tutup
												</button>
											</div>
										</div>
									</div>
									<div v-if="showComponentEditFuelman">
										<div class="row mt-3 mb-3 ml-2">
											<div class="col-md-3">
												<label for="namaFuelman" class="col-form-label">Nama Fuelman<span class="text-danger"> *</span></label>
											</div>
											<div class="col-md-5">
												<input type="text" class="form-control" id="namaFuelman" v-model="itemFuelman.namaFuelman" :class="{'is-invalid': validationStatus($v.itemFuelman.namaFuelman)}" />
												<div v-if="!$v.itemFuelman.namaFuelman.required"
													class="invalid-feedback">
													Nama Fuelman harus diisi
												</div>
											</div>
											<div class="col-md-3">
												<button type="button" class="btn btn-primary mr-2" @click="updateFuelman">
													<i class="fas fa-save"></i>
													Update
												</button>
												<button type="button" class="btn btn-secondary" @click="tutupFormEditFuelman">
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
												<th class="align-middle" scope="col">Nama Fuelman</th>
												<th class="align-middle" scope="col"></th>
											</tr>
										</thead>
										<tbody>
											<tr v-for="fuelman in dataFuelman" :key="fuelman.id">
												<td>{{ fuelman.no }}</td>
												<td>{{ fuelman.namaFuelman }}</td>
												<td class="tombol">
													<div @click="toggleComponentEditFuelman(fuelman.id, fuelman.namaFuelman)" class="action-icon mr-2">
														<i class="fas fa-solid fa-pen" style="color: #ffb703"></i>
													</div>
													<div @click="deleteFuelman(fuelman.id)" class="action-icon">
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
	name: "ListFuelmanView",
	data() {
		return {
			showComponentTambahFuelman: false,
			showComponentEditFuelman: false,
			itemFuelman: {
				namaFuelman: '',
				id: '',
			},
			dataFuelman: [],
		};
	},

	validations: {
		itemFuelman: {
			namaFuelman: { required },
		}, 
	},

	mounted() {
		this.getAllFuelman();
	},

	created() {
		this.getAllFuelman();
	},

	methods: {
		validationStatus: function (validation) {
			return typeof validation != "undefined" ? validation.$error : false;
		},

		async saveFuelman() {
			try {
				this.$v.$touch();
				if (this.$v.$invalid) {
					return;
				}
				let dataToken = localStorage.getItem('token')
				let response = await axios.post(`${ipBackend}/fuelman/create`, this.itemFuelman, {
					headers: {
						token: dataToken
					}
				});

				if (response.data.message == "sukses") {
					iziToast.success({
						title: 'Success',
						message: 'Data Fuelman berhasil disimpan',
						position: 'topRight', 
						timeout: 2000 
					});
					await this.getAllFuelman();
					this.$nextTick(() => { this.$v.$reset() })
					this.itemFuelman.namaFuelman = ''
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

		async getAllFuelman() {
			let dataToken = localStorage.getItem('token')
			try {
				const dataFuelman = await axios.get(
					`${ipBackend}/fuelman/list`, {
					headers: {
						token: dataToken
					}
				}
				);
				let result = dataFuelman.data.data;
				for (let i = 0; i < result.length; i++) {
					result[i].no = i + 1
				}
				this.dataFuelman = result
			} catch (error) {
				console.log(error);
			}
		},

		async deleteFuelman(id) {
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
					await axios.post(`${ipBackend}/fuelman/delete`, { id }, {
						headers: {
							token: dataToken
						}
					});
					await this.getAllFuelman();
					iziToast.success({
						title: 'Success',
						message: 'Data fuelman berhasil dihapus',
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

		toggleComponentTambahFuelman() {
			this.showComponentTambahFuelman = !this.showComponentTambahFuelman;
		},

		tutupFormFuelman() {
			this.showComponentTambahFuelman = false
		},

		toggleComponentEditFuelman(id, namaFuelman) {
			this.showComponentEditFuelman = !this.showComponentEditFuelman;
			this.itemFuelman.namaFuelman = namaFuelman
			this.itemFuelman.id = id
		},

		tutupFormEditFuelman() {
			this.showComponentEditFuelman = false
		},

		async updateFuelman() {
			try {
				let dataToken = localStorage.getItem('token')
				await axios.post(`${ipBackend}/fuelman/update`, {
					id: this.itemFuelman.id,
					namaFuelman: this.itemFuelman.namaFuelman,
				}, {
					headers: {
						token: dataToken
					}
				});
				
				iziToast.success({
					title: 'Success',
					message: 'Data fuelman berhasil diupdate',
					position: 'topRight', 
					timeout: 2000 
				});
				await this.getAllFuelman();
				this.itemFuelman.namaFuelman = ''
				this.$nextTick(() => { this.$v.$reset() })
				this.showComponentEditFuelman = false
				
			} catch (error) {
				console.log(error);
			}
		},
	},
};
</script>


<style></style>