<template>
	<div>
		<app-nav-bar />
		<app-side-bar />
		<div class="content-wrapper">
			<router-view />
			<section class="content">
				<div class="container-fluid pt-3">
					<div class="row mt-3 mb-4">
						<div class="col">
							<div class="card card-outline card-primary">
								<div class="row">
									<div class="col"></div>
									<div class="col tab-judul">
										<h5>Tambah User Mekanik</h5>
									</div>
									<div class="col"></div>
								</div>
								<div class="card-body">
									<div class="row">
										<div class="col-12">
											<form @submit.prevent="saveUserMekanik">
                                                <div class="row mb-3">
													<label for="username" class="col-sm-3 col-form-label">Username<span class="text-danger"> *</span></label>
													<div class="col-sm-9">
														<input type="text" class="form-control" id="username"
															v-model.trim="$v.itemUser.username.$model" :class="{
																'is-invalid': validationStatus($v.itemUser.username),
															}" />
														<div v-if="!$v.itemUser.username.required"
															class="invalid-feedback">
															Username harus diisi
														</div>
													</div>
												</div>

                                                <div class="row mb-3">
													<label for="password" class="col-sm-3 col-form-label">Password<span class="text-danger"> *</span></label>
													<div class="col-sm-9">
														<input type="password" class="form-control" id="password"
															v-model.trim="$v.itemUser.password.$model" :class="{
																'is-invalid': validationStatus($v.itemUser.password),
															}" />
														<div v-if="!$v.itemUser.password.required"
															class="invalid-feedback">
															Password harus diisi
														</div>
													</div>
												</div>

                                                <div class="row mb-3">
													<label for="karyawanId" class="col-sm-3 col-form-label">Mekanik<span
															class="text-danger">*</span></label>
													<div class="col-sm-9">
														<select class="form-control" aria-label="Default select example"
															v-model.trim="$v.itemUser.karyawanId.$model" :class="{
																'is-invalid': validationStatus(
																	$v.itemUser.karyawanId
																),
															}">
															<option v-for="rowMekanik in itemMekanik" :key="rowMekanik.karyawanId"
																:value="rowMekanik.karyawanId">
																{{ rowMekanik.namaKaryawan }} 
															</option>
														</select>
														<div v-if="!$v.itemUser.karyawanId.required"
															class="invalid-feedback">
															Mekanik harus diisi
														</div>
													</div>
												</div>

												<button type="submit" class="btn btn-primary">
													<i class="fas fa-save"></i>
													Simpan
												</button>
											</form>
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
import { ipBackend } from '@/ipBackend';
import axios from "axios";
import { required } from "vuelidate/lib/validators";

export default {
	name: "FormTambahUserMekanik",
	data() {
		return {
			itemUser: {
				username: "",
				password: "",
				karyawanId: "",
			},

			itemMekanik: []
		};
	},

	validations: {
		itemUser: {
			username: { required },
			password: { required },
			karyawanId: { required },
		}
	},

	created() {
		this.getAllMekanik();
	},

	methods: {
		validationStatus: function (validation) {
			return typeof validation != "undefined" ? validation.$error : false;
		},

		async getAllMekanik() {
			try {
				let dataToken = localStorage.getItem('token')
				const dataKaryawan = await axios.get(`${ipBackend}/karyawan/listKaryawanBelumPunyaUser`, {
					headers: {
						token: dataToken
					}
				});
				let result = dataKaryawan.data.data;
				this.itemMekanik = result
			} catch (error) {
				console.log(error);
			}
		},

		async saveUserMekanik() {
			try {
				this.$v.$touch();
				if (this.$v.$pendding || this.$v.$error) return;
				
				let dataToken = localStorage.getItem('token')
				
				await axios.post(`${ipBackend}/user/add-user-mekanik`, this.itemUser, {
					headers: {
						token: dataToken
					}
				});
				this.itemUser.username = ""
				this.itemUser.password = ""
				this.itemUser.karyawanId = ""

				this.$swal({
					icon: "success",
					title: "Sukses",
					text: "Data User berhasil disimpan",
					showConfirmButton: false,
					timer: 3000,
				});
				this.$router.push("/user");
			} catch (error) {
				console.log(error);
			}
		},
	},
};
</script>


<style>
div.tab-judul {
	text-align: center;
	color: white;
	background-color: #0d6efd;
	border-bottom-left-radius: 10px;
	border-bottom-right-radius: 10px;
}
</style>