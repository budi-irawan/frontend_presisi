<template>
    <div>
        <form>
			<div class="row mt-2">
				<div class="col">
					<button type="button" class="btn btn-info" @click="toggleComponentTambahJenisPelumas">
						<i class="fas fa-solid fa-plus-circle"></i>
						Tambah Data Jenis Pelumas
					</button>
				</div>
			</div>
		
			<div v-if="showComponentTambahJenisPelumas">
				<div class="row mt-3 mb-3">
					<div class="col-md-3">
						<label for="namaJenisPelumas" class="col-form-label">Nama Jenis Pelumas<span class="text-danger"> *</span></label>
					</div>
					<div class="col-md-5">
						<input type="text" class="form-control" id="namaJenisPelumas" v-model="itemJenisPelumas.namaJenisPelumas" :class="{'is-invalid': validationStatus($v.itemJenisPelumas.namaJenisPelumas)}" />
						<div v-if="!$v.itemJenisPelumas.namaJenisPelumas.required"
							class="invalid-feedback">
							Nama Jenis Pelumas harus diisi
						</div>
					</div>
					<div class="col-md-3">
						<button type="button" class="btn btn-primary mr-2" @click="saveJenisPelumas">
							<i class="fas fa-save"></i>
							Simpan
						</button>
						<button type="button" class="btn btn-secondary" @click="tutupFormJenisPelumas">
							<i class="fas fa-undo"></i>
							Tutup
						</button>
					</div>
				</div>
			</div>
			<div v-if="showComponentEditJenisPelumas">
				<div class="row mt-3 mb-3">
					<div class="col-md-3">
						<label for="namaJenisPelumas" class="col-form-label">Nama Jenis Pelumas<span class="text-danger"> *</span></label>
					</div>
					<div class="col-md-5">
						<input type="text" class="form-control" id="namaJenisPelumas" v-model="itemJenisPelumas.namaJenisPelumas" :class="{'is-invalid': validationStatus($v.itemJenisPelumas.namaJenisPelumas)}" />
						<div v-if="!$v.itemJenisPelumas.namaJenisPelumas.required"
							class="invalid-feedback">
							Nama Jenis Pelumas harus diisi
						</div>
					</div>
					<div class="col-md-3">
						<button type="button" class="btn btn-primary mr-2" @click="updateJenisPelumas">
							<i class="fas fa-save"></i>
							Update
						</button>
						<button type="button" class="btn btn-secondary" @click="tutupFormEditJenisPelumas">
							<i class="fas fa-undo"></i>
							Batal
						</button>
					</div>
				</div>
			</div>
		</form>
		<div class="table mt-2 table-responsive">
			<table class="table table-striped table-hover table-bordered">
				<thead>
					<tr>
						<th class="align-middle" scope="col" style="width: 5%;">No</th>
						<th class="align-middle" scope="col" style="width: 80%;">Nama Jenis Pelumas</th>
						<th class="align-middle" scope="col"></th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="djp in dataJenisPelumas" :key="djp.id">
						<td>{{ djp.no }}</td>
						<td>{{ djp.namaJenisPelumas }}</td>
						<td>
							<div @click="toggleComponentEditJenisPelumas(djp.id, djp.namaJenisPelumas)" class="action-icon mr-2">
								<i class="fas fa-solid fa-pen" style="color: #ffb703"></i>
							</div>
							<div @click="deleteJenisPelumas(djp.id)" class="action-icon">
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
	name: "TambahJenisPelumas",
	data() {
		return {
			showComponentTambahJenisPelumas: false,
			showComponentEditJenisPelumas: false,

			itemJenisPelumas: {
                namaJenisPelumas: '',
                id: '',
			},

			dataJenisPelumas: [],
		};
	},

	validations: {
		itemJenisPelumas: {
			namaJenisPelumas: { required },
		}, 
	},

	mounted() {
		this.getAllJenisPelumas();
	},

	created() {
		this.getAllJenisPelumas();
	},

	methods: {
		validationStatus: function (validation) {
			return typeof validation != "undefined" ? validation.$error : false;
		},

		async saveJenisPelumas() {
			try {
				this.$v.$touch();
				if (this.$v.$invalid) {
					return;
				}

				let dataToken = localStorage.getItem('token')
				await axios.post(`${ipBackend}/jenis-pelumas/create`, this.itemJenisPelumas, {
					headers: {
						token: dataToken
					}
				});
				
				iziToast.success({
					title: 'Success',
					message: 'Data Jenis Pelumas berhasil disimpan',
					position: 'topRight', 
					timeout: 2000 
				});
				await this.getAllJenisPelumas();
				this.itemJenisPelumas.namaJenisPelumas = null
				this.$nextTick(() => { this.$v.$reset() })
				
			} catch (error) {
				console.log(error);
			}
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

		toggleComponentTambahJenisPelumas() {
			this.showComponentTambahJenisPelumas = !this.showComponentTambahJenisPelumas;
		},

		tutupFormJenisPelumas() {
			this.showComponentTambahJenisPelumas = false
		},

		deleteJenisPelumas(id) {
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
					await axios.post(`${ipBackend}/jenis-pelumas/delete`, { id }, {
						headers: {
							token: dataToken
						}
					});
					await this.getAllJenisPelumas();
					iziToast.success({
						title: 'Success',
						message: 'Data Jenis Pelumas berhasil dihapus',
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

		toggleComponentEditJenisPelumas(id, namaJenisPelumas) {
			this.showComponentEditJenisPelumas = !this.showComponentEditJenisPelumas;
			this.itemJenisPelumas.id = id
			this.itemJenisPelumas.namaJenisPelumas = namaJenisPelumas
		},

		tutupFormEditJenisPelumas() {
			this.showComponentEditJenisPelumas = false
		},

		async updateJenisPelumas() {
			try {
				let dataToken = localStorage.getItem('token')
				await axios.post(`${ipBackend}/jenis-pelumas/update`, this.itemJenisPelumas, {
					headers: {
						token: dataToken
					}
				});
				
				iziToast.success({
					title: 'Success',
					message: 'Data Jenis Pelumas berhasil diupdate',
					position: 'topRight', 
					timeout: 2000 
				});
				await this.getAllJenisPelumas();
				this.itemJenisPelumas.namaJenisPelumas = null
				this.$nextTick(() => { this.$v.$reset() })
				this.showComponentEditJenisPelumas = false
				
			} catch (error) {
				console.log(error);
			}
		},

	},
};
</script>