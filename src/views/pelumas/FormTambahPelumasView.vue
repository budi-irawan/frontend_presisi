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
										<h5>Tambah Data Pelumas</h5>
									</div>
									<div class="col"></div>
								</div>
								<div class="card-body">
									<div class="row">
										<div class="col-12">
											<form @submit.prevent="savePelumas">
												<div class="row mb-3">
													<label for="namaPelumas" class="col-sm-3 col-form-label">Nama
														Pelumas<span class="text-danger"> *</span></label>
													<div class="col-sm-9">
														<input type="text" class="form-control" id="namaPelumas"
															v-model.trim="$v.itemPelumas.namaPelumas.$model" :class="{
																'is-invalid': validationStatus($v.itemPelumas.namaPelumas),
															}" />
														<div v-if="!$v.itemPelumas.namaPelumas.required"
															class="invalid-feedback">
															Nama pelumas harus diisi
														</div>
													</div>
												</div>

												<div class="row mb-3">
													<label for="desa" class="col-sm-3 col-form-label">Jenis Pelumas<span
															class="text-danger">*</span></label>
													<div class="col-sm-9">
														<select class="form-control" aria-label="Default select example"
															v-model.trim="$v.itemPelumas.jenisPelumasId.$model" :class="{
																'is-invalid': validationStatus(
																	$v.itemPelumas.jenisPelumasId
																),
															}">
															<option v-for="rowJenisPelumas in itemJenisPelumas" :key="rowJenisPelumas.id"
																:value="rowJenisPelumas.id">
																{{ rowJenisPelumas.namaJenisPelumas }}
															</option>
														</select>
														<div v-if="!$v.itemPelumas.jenisPelumasId.required"
															class="invalid-feedback">
															Jenis pelumas harus diisi
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
	name: "FormTambahPelumasView",
	data() {
		return {
			itemPelumas: {
				namaPelumas: "",
				jenisPelumasId: "",
			},

			itemJenisPelumas: []
		};
	},

	validations: {
		itemPelumas: {
			namaPelumas: { required },
			jenisPelumasId: { required },
		}
	},

	created() {
		this.getAllJenisPelumas();
	},

	methods: {
		validationStatus: function (validation) {
			return typeof validation != "undefined" ? validation.$error : false;
		},

		async getAllJenisPelumas() {
			try {
				let dataToken = localStorage.getItem('token')
				const dataJenisPelumas = await axios.get(`${ipBackend}/jenis-pelumas/list`, {
					headers: {
						token: dataToken
					}
				});
				let result = dataJenisPelumas.data.data;
				this.itemJenisPelumas = result
			} catch (error) {
				console.log(error);
			}
		},

		async savePelumas() {
			try {
				this.$v.$touch();
				if (this.$v.$pendding || this.$v.$error) return;

				let dataToken = localStorage.getItem('token')
				await axios.post(`${ipBackend}/pelumas/create`, this.itemPelumas, {
					headers: {
						token: dataToken
					}
				});
				this.itemPelumas.namaPelumas = ""
				this.itemPelumas.jenisPelumasId = ""

				this.$swal({
					icon: "success",
					title: "Sukses",
					text: "Data pelumas berhasil disimpan",
					showConfirmButton: false,
					timer: 3000,
				});
				this.$router.push("/pelumas");
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