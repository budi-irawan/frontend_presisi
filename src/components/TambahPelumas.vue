<template>
    <div>
		<form>
			<div class="row mt-2">
				<div class="col">
					<button type="button" class="btn btn-info" @click="toggleComponentTambahPelumas">
						<i class="fas fa-solid fa-plus-circle"></i>
						Tambah Data Pelumas
					</button>
				</div>
			</div>
			<div v-if="showComponentTambahPelumas">
				<div class="row mt-3 mb-3">
					<div class="col">
						<div class="row mb-3">
							<label for="namaPelumas" class="col-sm-3 col-form-label">Nama Pelumas<span class="text-danger"> *</span></label>
							<div class="col-sm-6">
								<input type="text" class="form-control" id="namaPelumas" v-model="itemPelumas.namaPelumas" :class="{'is-invalid': validationStatus($v.itemPelumas.namaPelumas)}" />
								<div v-if="!$v.itemPelumas.namaPelumas.required"
									class="invalid-feedback">
									Nama Pelumas
								</div>
							</div>
						</div>
						<div class="row mb-3">
							<label for="jenisPelumasId" class="col-sm-3 col-form-label">Nama Jenis Pelumas<span class="text-danger"> *</span></label>
							<div class="col-sm-6">
								<select class="form-control" aria-label="Default select example"
									v-model="itemPelumas.jenisPelumasId" :class="{
										'is-invalid': validationStatus(
											$v.itemPelumas.jenisPelumasId
										),
									}">
									<option v-for="djp in dataJenisPelumas" :key="djp.id" :value="djp.id">
										{{ djp.namaJenisPelumas }}
									</option>
								</select>
								<div v-if="!$v.itemPelumas.jenisPelumasId.required" class="invalid-feedback">
									Nama Jenis Pelumas harus diisi
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col">
								<button type="button" class="btn btn-primary mr-2" @click="savePelumas">
									<i class="fas fa-save"></i>
									Simpan
								</button>
								<button type="button" class="btn btn-secondary" @click="tutupFormTambahPelumas">
									<i class="fas fa-undo"></i>
									Tutup
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div v-if="showComponentEditPelumas">
				<div class="row mt-3 mb-3">
					<div class="col">
						<div class="row mb-3">
							<label for="namaPelumas" class="col-sm-3 col-form-label">Nama Pelumas<span class="text-danger"> *</span></label>
							<div class="col-sm-6">
								<input type="text" class="form-control" id="namaPelumas" v-model="itemPelumas.namaPelumas" :class="{'is-invalid': validationStatus($v.itemPelumas.namaPelumas)}" />
								<div v-if="!$v.itemPelumas.namaPelumas.required"
									class="invalid-feedback">
									Nama Pelumas
								</div>
							</div>
						</div>
						<div class="row mb-3">
							<label for="jenisPelumasId" class="col-sm-3 col-form-label">Nama Jenis Pelumas<span class="text-danger"> *</span></label>
							<div class="col-sm-6">
								<select class="form-control select2" aria-label="Default select example"
									v-model="itemPelumas.jenisPelumasId" :class="{
										'is-invalid': validationStatus(
											$v.itemPelumas.jenisPelumasId
										),
									}">
									<option v-for="djp in dataJenisPelumas" :key="djp.id" :value="djp.id">
										{{ djp.namaJenisPelumas }}
									</option>
								</select>
								<div v-if="!$v.itemPelumas.jenisPelumasId.required" class="invalid-feedback">
									Nama Jenis Pelumas harus diisi
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col">
								<button type="button" class="btn btn-primary mr-2" @click="updatePelumas" >
									<i class="fas fa-save"></i>
									Update
								</button>
								<button type="button" class="btn btn-secondary" @click="tutupFormEditPelumas">
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
			<table class="table table-striped table-hover table-bordered">
				<thead>
					<tr>
						<th class="align-middle" scope="col" style="width: 5%;">No</th>
						<th class="align-middle" scope="col" style="width: 40%;">Nama Pelumas</th>
						<th class="align-middle" scope="col" style="width: 40%;">Jenis Pelumas</th>
						<th class="align-middle" scope="col" style="width: 10%;"></th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="dp in dataPelumas" :key="dp.pelumasId">
						<td>{{ dp.no }}</td>
						<td>{{ dp.namaPelumas }}</td>
						<td>{{ dp.namaJenisPelumas }}</td>
						<td>
							<div @click="toggleComponentEditPelumas(dp.pelumasId, dp.namaPelumas, dp.jenisPelumasId)" class="action-icon mr-2">
								<i class="fas fa-solid fa-pen" style="color: #ffb703"></i>
							</div>
							<div @click="deletePelumas(dp.pelumasId)" class="action-icon">
								<i class="fas fa-trash" style="color: red"></i>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
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
	name: "TambahPelumas",
	data() {
		return {
			showComponentTambahPelumas: false,
			showComponentEditPelumas: false,

			itemPelumas: {
				pelumasId: '',
				namaPelumas: '',
				jenisPelumasId: '',
			},

            dataJenisPelumas: [],
            dataPelumas: [],
		};
	},

	validations: {
		itemPelumas: {
			namaPelumas: { required },
			jenisPelumasId: { required },
		}, 
	},

	mounted() {
		this.getAllJenisPelumas();
		this.getAllPelumas();
	},

	created() {
		this.getAllJenisPelumas();
		this.getAllPelumas();
	},

	methods: {
		validationStatus: function (validation) {
			return typeof validation != "undefined" ? validation.$error : false;
		},

		async getAllJenisPelumas() {
			let dataToken = localStorage.getItem('token')
			try {
				const response = await axios.get(
					`${ipBackend}/jenis-pelumas/list`, {
					headers: {
						token: dataToken
					}
				}
				);
				let result = response.data.data;
				for (let i = 0; i < result.length; i++) {
					result[i].no = i + 1
				}
				this.dataJenisPelumas = result
			} catch (error) {
				console.log(error);
			}
		},

		toggleComponentTambahPelumas() {
			this.showComponentTambahPelumas = !this.showComponentTambahPelumas;
			this.getAllJenisPelumas();
		},

		tutupFormTambahPelumas() {
			this.showComponentTambahPelumas = false
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
				
				iziToast.success({
					title: 'Success',
					message: 'Data Pelumas berhasil disimpan',
					position: 'topRight', 
					timeout: 2000 
				});
				await this.getAllPelumas();
				this.itemPelumas.namaPelumas = null
				this.itemPelumas.jenisPelumasId = null
				this.$nextTick(() => { this.$v.$reset() })
				
			} catch (error) {
				console.log(error);
			}
		},

		async getAllPelumas() {
			let dataToken = localStorage.getItem('token')
			try {
				const response = await axios.get(
                        `${ipBackend}/pelumas/list`, {
                        headers: {
                            token: dataToken
                        }
                    }
				);
				let result = response.data.data;
				for (let i = 0; i < result.length; i++) {
					result[i].no = i + 1
				}
				this.dataPelumas = result
			} catch (error) {
				console.log(error);
			}
		},

		deletePelumas(id) {
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
					await axios.post(`${ipBackend}/pelumas/delete`, { pelumasId: id }, {
						headers: {
							token: dataToken
						}
					});
					await this.getAllPelumas();
					iziToast.success({
						title: 'Success',
						message: 'Data Pelumas berhasil dihapus',
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

		toggleComponentEditPelumas(pelumasId, namaPelumas, jenisPelumasId) {
			this.getAllJenisPelumas()
			this.showComponentEditPelumas = !this.showComponentEditPelumas;
			this.itemPelumas.namaPelumas = namaPelumas
			this.itemPelumas.jenisPelumasId = jenisPelumasId
			this.itemPelumas.pelumasId = pelumasId
		},

		tutupFormEditPelumas() {
			this.showComponentEditPelumas = false
		},

		async updatePelumas() {
			try {
				let dataToken = localStorage.getItem('token')
				await axios.post(`${ipBackend}/Pelumas/update`, {
					namaPelumas: this.itemPelumas.namaPelumas,
					jenisPelumasId: this.itemPelumas.jenisPelumasId,
					pelumasId: this.itemPelumas.pelumasId,
				}, {
					headers: {
						token: dataToken
					}
				});
				
				iziToast.success({
					title: 'Success',
					message: 'Data Pelumas berhasil diupdate',
					position: 'topRight', 
					timeout: 2000 
				});
				await this.getAllPelumas();
				this.itemPelumas.namaPelumas = null
				this.itemPelumas.jenisPelumasId = null
				this.itemPelumas.pelumasId = null
				this.$nextTick(() => { this.$v.$reset() })
				this.showComponentEditPelumas = false
				
			} catch (error) {
				console.log(error);
			}
		},
	},
};
</script>