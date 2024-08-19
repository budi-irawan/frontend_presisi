<template>
    <div>
        <form>
			<div v-if="showComponentTambahFuelman">
				<div class="row mt-3 mb-3">
					<div class="col-md-2">
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
				<div class="row mt-3 mb-3">
					<div class="col-md-3">
						<label for="namaFuelman" class="col-form-label">Nama Fuelman<span class="text-danger"> *</span></label>
					</div>
					<div class="col-md-5">
						<input type="text" class="form-control" id="namaFuelman" v-model="itemGradeEdit.namaFuelman" :class="{'is-invalid': validationStatus($v.itemGradeEdit.namaFuelman)}" />
						<div v-if="!$v.itemGradeEdit.namaFuelman.required"
							class="invalid-feedback">
							Nama Fuelman harus diisi
						</div>
					</div>
					<div class="col-md-3">
						<button type="button" class="btn btn-primary mr-2" @click="updateFuelman">
							<i class="fas fa-save"></i>
							Update
						</button>
						<button type="button" class="btn btn-secondary" @click="tutupFormEditGrade">
							<i class="fas fa-undo"></i>
							Batal
						</button>
					</div>
				</div>
			</div>
		</form>
    </div>
</template>


<script>
import { ipBackend } from '@/ipBackend';
import axios from "axios";
import { required } from "vuelidate/lib/validators";
import 'izitoast/dist/css/iziToast.css';
import iziToast from 'izitoast';
export default {
	name: "TambahFuelman",
	data() {
		return {
			showComponentTambahFuelman: false,
			showComponentEditFuelman: false,

			itemFuelman: {
				namaFuelman: '',
			},

			itemGradeEdit: {
				id: '',
				namaFuelman: ''
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
				console.log(this.itemFuelman);
				

				let dataToken = localStorage.getItem('token')
				let response = await axios.post(`${ipBackend}/fuelman/create`, this.itemFuelman, {
					headers: {
						token: dataToken
					}
				});
				console.log(response.data);
				

				if (response.data.message == "sukses") {
					iziToast.success({
						title: 'Success',
						message: 'Data Fuelman berhasil disimpan',
						position: 'topRight', 
						timeout: 2000 
					});
					await this.getAllFuelman();
					this.itemFuelman.namaFuelman = null
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

		async getAllFuelman() {
			let dataToken = localStorage.getItem('token')
			try {
				const response = await axios.get(
					`${ipBackend}/fuelman/list`, {
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

		toggleComponentTambahFuelman() {
			this.showComponentTambahFuelman = !this.showComponentTambahFuelman;
		},

		tutupFormFuelman() {
			this.showComponentTambahFuelman = false
		},

		deleteGrade(id) {
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
					await axios.post(`${ipBackend}/Fuelman-kompetensi/delete`, { id }, {
						headers: {
							token: dataToken
						}
					});
					await this.getAllFuelman();
					iziToast.success({
						title: 'Success',
						message: 'Data Fuelman berhasil dihapus',
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

		toggleComponentEditFuelman(id, namaFuelman) {
			this.showComponentEditFuelman = !this.showComponentEditFuelman;
			this.itemGradeEdit.id = id
			this.itemGradeEdit.namaFuelman = namaFuelman
		},

		tutupFormEditFuelman() {
			this.showComponentEditFuelman = false
		},

		async updateFuelman() {
			try {
				let dataToken = localStorage.getItem('token')
				await axios.post(`${ipBackend}/fuelman/update`, this.itemGradeEdit, {
					headers: {
						token: dataToken
					}
				});
				
				iziToast.success({
					title: 'Success',
					message: 'Data Fuelman berhasil diupdate',
					position: 'topRight', 
					timeout: 2000 
				});
				await this.getAllFuelman();
				this.itemGradeEdit.namaFuelman = null
				this.$nextTick(() => { this.$v.$reset() })
				this.showComponentEditFuelman = false
				
			} catch (error) {
				console.log(error);
			}
		},

	},
};
</script>