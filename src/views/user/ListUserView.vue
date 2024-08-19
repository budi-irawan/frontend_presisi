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
							<button type="button" class="btn btn-info" @click="toggleComponentTambahUser">
								<i class="fas fa-solid fa-plus-circle"></i>
								Tambah Data User
							</button>
						</div>
					</div>
					<div class="row mt-3 mb-4">
						<div class="col">
							<div class="card shadow-lg">
								<div class="card-header">
									<h3 class="card-title">
									<i class="fas fa-solid fa-user-tie mr-3"></i>
									<b>Data User</b>
									</h3>
								</div>
								<div v-if="showComponentTambahUser">
									<form-tambah-user />
								</div>
								<div v-if="showComponentEditUser">
									
									<div class="row mt-3 mb-3 ml-2">
										<div class="col">
											<div class="row mb-3">
												<div class="col-md-2">
													<label for="username" class="col-form-label">Username<span class="text-danger"> *</span></label>
												</div>
												<div class="col-md-5">
													<input type="text" class="form-control" id="username" v-model="itemUser.username" :class="{'is-invalid': validationStatus($v.itemUser.username)}" />
													<div v-if="!$v.itemUser.username.required"
														class="invalid-feedback">
														Username harus diisi
													</div>
												</div>
											</div>
											<div class="row mb-3">
												<div class="col-md-2">
													<label for="password" class="col-form-label">Password<span class="text-danger"> *</span></label>
												</div>
												<div class="col-md-5">
													<input type="text" class="form-control" id="password" v-model="itemUser.password" :class="{'is-invalid': validationStatus($v.itemUser.password)}" />
													<div v-if="!$v.itemUser.password.required"
														class="invalid-feedback">
														Password harus diisi
													</div>
												</div>
											</div>
											<div class="row">
												<div class="col">
													<button type="button" class="btn btn-primary mr-2" @click="updateUser">
														<i class="fas fa-save"></i>
														Update
													</button>
													<button type="button" class="btn btn-secondary" @click="tutupFormEditUser">
														<i class="fas fa-undo"></i>
														Tutup
													</button>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="card-body table-responsive p-0">
									<table class="table table-hover table-striped text-nowrap">
										<thead>
											<tr>
												<th class="align-middle" scope="col" style="width: 5%">No</th>
												<th class="align-middle" scope="col">Username</th>
												<!-- <th class="align-middle" scope="col">Role</th> -->
												<th class="align-middle" scope="col">Manpower</th>
												<th class="align-middle" scope="col">Fuelman</th>
												<th class="align-middle" scope="col"></th>
											</tr>
										</thead>
										<tbody>
											<tr v-for="du in dataUser" :key="du.userId">
												<td>{{ du.no }}</td>
												<td>{{ du.username }}</td>
												<!-- <td>{{ du.role }}</td> -->
												<td>{{ du.namaManpower }}</td>
												<td>{{ du.namaFuelman }}</td>
												<td class="tombol">
													<div @click="toggleComponentEditUser(du.userId, du.username, du.password, du.karyawanId, du.fuelmanId)" class="action-icon mr-2">
														<i class="fas fa-solid fa-pen" style="color: #ffb703"></i>
													</div>
													<div @click="deleteUser(du.userId)" class="action-icon">
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
import { bus } from '../../components/event-bus.js';
import FormTambahUser from '@/components/FormTambahUser.vue';
import UpdateUser from '@/components/UpdateUser.vue';
export default {
	components: { FormTambahUser, UpdateUser },
	name: "ListUserView",
	data() {
		return {
			selectedRole: '',
			showComponentTambahUser: false,
			showComponentEditUser: false,
			isManpower: false,
			isFuelman: false,
			itemUser: {
				username: '',
				password: '',
				karyawanId: null,
				fuelmanId: null,
				id: ''
			},
			dataFuelman: [],
			dataManpower: [],
			dataUser: [],
			karyawanId: '',
			fuelmanId: ''
		};
	},

	validations() {
		let obj = {
			itemUser: {}
		}
		if (this.selectedRole == 'fuelman') {
			obj.itemUser.username = { required }
			obj.itemUser.password = { required }
			obj.itemUser.fuelmanId = { required }
		} else {
			obj.itemUser.username = { required }
			obj.itemUser.password = { required }
			obj.itemUser.karyawanId = { required }
		}
		return obj;
	},

	mounted() {
		this.getAllKaryawanBelumPunyaUser();
		this.getAllFuelmanBelumPunyaUser();
		this.getAllUser();
	},

	created() {
		this.getAllKaryawanBelumPunyaUser();
		this.getAllFuelmanBelumPunyaUser();
		this.$eventBus.$on("dataUser", async (payload) => {
			await this.getAllUser();
		});
	},

	methods: {
		validationStatus: function (validation) {
			return typeof validation != "undefined" ? validation.$error : false;
		},

		async getKaryawanById() {
			try {
				let dataToken = localStorage.getItem('token')
				const response = await axios.get(
					`${ipBackend}/karyawan/detailsById/${this.itemUser.karyawanId}`, {
					headers: {
						token: dataToken
					}
				});
				// console.log(response);

				// this.itemKaryawan = response.data.data[0];
			} catch (error) {
				console.log(error);
			}
		},

		async saveUser() {
			try {
				this.$v.$touch();
				if (this.$v.$invalid) {
					return;
				}
				
				let dataToken = localStorage.getItem('token')
				let response = await axios.post(`${ipBackend}/user/add-user`, this.itemUser, {
					headers: {
						token: dataToken
					}
				});

				if (response.data.message == "sukses") {
					iziToast.success({
						title: 'Success',
						message: 'Data user berhasil disimpan',
						position: 'topRight', 
						timeout: 2000 
					});
				} else {
					iziToast.info({
						title: 'Informasi',
						message: response.data.message,
						position: 'topCenter', 
						timeout: 3000 
					});
				}
				this.itemUser.username = ''
				this.itemUser.password = ''
				this.itemUser.karyawanId = null
				this.itemUser.fuelmanId = null
				
				await this.getAllUser();
				await this.getAllKaryawanBelumPunyaUser();
				await this.getAllFuelmanBelumPunyaUser();
				this.$nextTick(() => { this.$v.$reset() })
				
			} catch (error) {
				console.log(error);
			}
		},

		async getAllKaryawanBelumPunyaUser() {
			let dataToken = localStorage.getItem('token')
			try {
				const response = await axios.get(
					`${ipBackend}/karyawan/listKaryawanBelumPunyaUser`, {
					headers: {
						token: dataToken
					}
				}
				);
				let result = response.data.data;
				for (let i = 0; i < result.length; i++) {
					result[i].no = i + 1
				}
				this.dataManpower = result
			} catch (error) {
				console.log(error);
			}
		},

		async getAllFuelmanBelumPunyaUser() {
			let dataToken = localStorage.getItem('token')
			try {
				const response = await axios.get(
					`${ipBackend}/fuelman/listFuelmanBelumPunyaUser`, {
					headers: {
						token: dataToken
					}
				}
				);
				let result = response.data.data;
				for (let i = 0; i < result.length; i++) {
					result[i].no = i + 1
				}
				this.dataFuelman = result
			} catch (error) {
				console.log(error);
			}
		},

		async getAllUser() {
			let dataToken = localStorage.getItem('token')
			try {
				const response = await axios.get(
					`${ipBackend}/user/list`, {
					headers: {
						token: dataToken
					}
				}
				);
				let result = response.data.data;
				for (let i = 0; i < result.length; i++) {
					result[i].no = i + 1
				}
				this.dataUser = result
			} catch (error) {
				console.log(error);
			}
		},

		async deleteUser(id) {
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
					await axios.post(`${ipBackend}/user/delete`, { userId: id }, {
						headers: {
							token: dataToken
						}
					});
					await this.getAllUser();
					iziToast.success({
						title: 'Success',
						message: 'Data user berhasil dihapus',
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

		async updateUser() {
			try {
				console.log(this.itemUser);
				this.$v.$touch();
				if (this.$v.$invalid) {
					return;
				}

				let dataToken = localStorage.getItem('token')
				let response = await axios.post(`${ipBackend}/user/update`, this.itemUser, {
					headers: {
						token: dataToken
					}
				});

				if (response.data.message == "sukses") {
					iziToast.success({
						title: 'Success',
						message: 'Data user berhasil disimpan',
						position: 'topRight', 
						timeout: 2000 
					});
				} else {
					iziToast.info({
						title: 'Informasi',
						message: response.data.message,
						position: 'topCenter', 
						timeout: 3000 
					});
                }

                await this.getAllUser();
                
				this.itemUser.username = ''
				this.itemUser.password = ''
				
				this.$nextTick(() => { this.$v.$reset() })
				
			} catch (error) {
				console.log(error);
			}
        },

		toggleComponentTambahUser() {
			this.showComponentTambahUser = !this.showComponentTambahUser;
		},

		tutupFormUser() {
			this.showComponentTambahUser = false
		},

		toggleComponentEditUser(id, username, password, karyawanId, fuelmanId) {
			this.showComponentEditUser = !this.showComponentEditUser;
			this.itemUser.username = username
			this.itemUser.password = password
			this.itemUser.karyawanId = karyawanId
			this.itemUser.fuelmanId = fuelmanId
			this.itemUser.id = id
		},

		tutupFormEditUser() {
			this.showComponentEditUser = false
		},

		async updateFuelman() {
			try {
				let dataToken = localStorage.getItem('token')
				await axios.post(`${ipBackend}/fuelman/update`, {
					id: this.itemUser.id,
					namaFuelman: this.itemUser.namaFuelman,
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
				await this.getAllKaryawanBelumPunyaUser();
				this.itemUser.namaFuelman = ''
				this.$nextTick(() => { this.$v.$reset() })
				this.showComponentEditUser = false
				
			} catch (error) {
				console.log(error);
			}
		},
	},
};
</script>


<style></style>