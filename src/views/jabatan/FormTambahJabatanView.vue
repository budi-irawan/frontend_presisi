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
										<h5>Tambah Data Posisi</h5>
									</div>
									<div class="col"></div>
								</div>
								<div class="card-body">
									<div class="row">
										<div class="col-12">
											<form @submit.prevent="savePosisi">
												<div class="row mb-3">
													<label for="namaPosisi" class="col-sm-3 col-form-label">Nama
														Posisi<span class="text-danger"> *</span></label>
													<div class="col-sm-9">
														<input type="text" class="form-control" id="namaPosisi"
															v-model.trim="$v.itemPosisi.namaPosisi.$model" :class="{
																'is-invalid': validationStatus($v.itemPosisi.namaPosisi),
															}" />
														<div v-if="!$v.itemPosisi.namaPosisi.required"
															class="invalid-feedback">
															Nama posisi harus diisi
														</div>
													</div>
												</div>

												<div class="row mb-3">
													<label for="desa" class="col-sm-3 col-form-label">Divisi<span
															class="text-danger">*</span></label>
													<div class="col-sm-9">
														<select class="form-control" aria-label="Default select example"
															v-model.trim="$v.itemPosisi.divisiId.$model" :class="{
																'is-invalid': validationStatus(
																	$v.itemPosisi.divisiId
																),
															}">
															<option v-for="rowDivisi in itemDivisi" :key="rowDivisi.id"
																:value="rowDivisi.id">
																{{ rowDivisi.namaDivisi }}
															</option>
														</select>
														<div v-if="!$v.itemPosisi.divisiId.required"
															class="invalid-feedback">
															Divisi harus diisi
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
	name: "FormTambahDivisiView",
	data() {
		return {
			itemPosisi: {
				namaPosisi: "",
				divisiId: "",
			},

			itemDivisi: []
		};
	},

	validations: {
		itemPosisi: {
			namaPosisi: { required },
			divisiId: { required },
		}
	},

	created() {
		this.getAllDivisi();
	},

	methods: {
		validationStatus: function (validation) {
			return typeof validation != "undefined" ? validation.$error : false;
		},

		async getAllDivisi() {
			try {
				let dataToken = localStorage.getItem('token')
				const dataDivisi = await axios.get(`${ipBackend}/divisi/list`, {
					headers: {
						token: dataToken
					}
				});
				let result = dataDivisi.data.data;
				this.itemDivisi = result
			} catch (error) {
				console.log(error);
			}
		},

		async savePosisi() {
			try {
				this.$v.$touch();
				if (this.$v.$pendding || this.$v.$error) return;

				let dataToken = localStorage.getItem('token')
				await axios.post(`${ipBackend}/posisi/create`, this.itemPosisi, {
					headers: {
						token: dataToken
					}
				});
				this.itemPosisi.namaPosisi = ""
				this.itemPosisi.divisiId = ""

				this.$swal({
					icon: "success",
					title: "Sukses",
					text: "Data posisi berhasil disimpan",
					showConfirmButton: false,
					timer: 3000,
				});
				this.$router.push("/posisi");
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