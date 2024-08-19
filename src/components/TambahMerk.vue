<template>
    <div>
        <form>
			<div class="row mt-2">
				<div class="col">
					<button type="button" class="btn btn-info" @click="toggleComponentTambahMerk">
						<i class="fas fa-solid fa-plus-circle"></i>
						Tambah Data Merk
					</button>
				</div>
			</div>
		
			<div v-if="showComponentTambahMerk">
				<div class="row mt-3 mb-3">
					<div class="col-md-3">
						<label for="namaMerk" class="col-form-label">Nama Merk<span class="text-danger"> *</span></label>
					</div>
					<div class="col-md-5">
						<input type="text" class="form-control" id="namaMerk" v-model="itemMerk.namaMerk" :class="{'is-invalid': validationStatus($v.itemMerk.namaMerk)}" />
						<div v-if="!$v.itemMerk.namaMerk.required"
							class="invalid-feedback">
							Nama Merk harus diisi
						</div>
					</div>
					<div class="col-md-3">
						<button type="button" class="btn btn-primary mr-2" @click="saveMerk">
							<i class="fas fa-save"></i>
							Simpan
						</button>
						<button type="button" class="btn btn-secondary" @click="tutupFormMerk">
							<i class="fas fa-undo"></i>
							Tutup
						</button>
					</div>
				</div>
			</div>
			<div v-if="showComponentEditMerk">
				<div class="row mt-3 mb-3">
					<div class="col-md-3">
						<label for="namaMerk" class="col-form-label">Nama Merk<span class="text-danger"> *</span></label>
					</div>
					<div class="col-md-5">
						<input type="text" class="form-control" id="namaMerk" v-model="itemMerk.namaMerk" :class="{'is-invalid': validationStatus($v.itemMerk.namaMerk)}" />
						<div v-if="!$v.itemMerk.namaMerk.required"
							class="invalid-feedback">
							Nama Merk harus diisi
						</div>
					</div>
					<div class="col-md-3">
						<button type="button" class="btn btn-primary mr-2" @click="updateMerk">
							<i class="fas fa-save"></i>
							Update
						</button>
						<button type="button" class="btn btn-secondary" @click="tutupFormEditMerk">
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
						<th class="align-middle" scope="col" style="width: 80%;">Nama Merk</th>
						<th class="align-middle" scope="col"></th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="dm in dataMerk" :key="dm.id">
						<td>{{ dm.no }}</td>
						<td>{{ dm.namaMerk }}</td>
						<td>
							<div @click="toggleComponentEditMerk(dm.id, dm.namaMerk)" class="action-icon mr-2">
								<i class="fas fa-solid fa-pen" style="color: #ffb703"></i>
							</div>
							<div @click="deleteMerk(dm.id)" class="action-icon">
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
	name: "TambahMerk",
	data() {
		return {
			showComponentTambahMerk: false,
			showComponentEditMerk: false,

			itemMerk: {
                namaMerk: '',
                id: '',
			},

			dataMerk: [],
		};
	},

	validations: {
		itemMerk: {
			namaMerk: { required },
		}, 
	},

	mounted() {
		this.getAllMerk();
	},

	created() {
		this.getAllMerk();
	},

	methods: {
		validationStatus: function (validation) {
			return typeof validation != "undefined" ? validation.$error : false;
		},

		async saveMerk() {
			try {
				this.$v.$touch();
				if (this.$v.$invalid) {
					return;
				}

				let dataToken = localStorage.getItem('token')
				let response = await axios.post(`${ipBackend}/merk`, this.itemMerk, {
					headers: {
						token: dataToken
					}
				});
                
                if (response.data.message == "sukses") {
                    iziToast.success({
                        title: 'Success',
                        message: 'Data Merk berhasil disimpan',
                        position: 'topRight', 
                        timeout: 2000 
                    });
                    await this.getAllMerk();
                    this.itemMerk.namaMerk = null
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

		toggleComponentTambahMerk() {
			this.showComponentTambahMerk = !this.showComponentTambahMerk;
		},

		tutupFormMerk() {
			this.showComponentTambahMerk = false
		},

		deleteMerk(id) {
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
					await axios.post(`${ipBackend}/merk/delete`, { id }, {
						headers: {
							token: dataToken
						}
					});
					await this.getAllMerk();
					iziToast.success({
						title: 'Success',
						message: 'Data Merk berhasil dihapus',
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

		toggleComponentEditMerk(id, namaMerk) {
			this.showComponentEditMerk = !this.showComponentEditMerk;
			this.itemMerk.id = id
			this.itemMerk.namaMerk = namaMerk
		},

		tutupFormEditMerk() {
			this.showComponentEditMerk = false
		},

		async updateMerk() {
			try {
				let dataToken = localStorage.getItem('token')
				await axios.post(`${ipBackend}/merk/update`, this.itemMerk, {
					headers: {
						token: dataToken
					}
				});
				
				iziToast.success({
					title: 'Success',
					message: 'Data Merk berhasil diupdate',
					position: 'topRight', 
					timeout: 2000 
				});
				await this.getAllMerk();
				this.itemMerk.namaMerk = null
				this.$nextTick(() => { this.$v.$reset() })
				this.showComponentEditMerk = false
				
			} catch (error) {
				console.log(error);
			}
		},

	},
};
</script>