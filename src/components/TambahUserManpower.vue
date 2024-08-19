<template>
    <div>
		<form>
			<div>
				<div class="row mt-3 mb-3">
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
									<input type="password" class="form-control" id="password" v-model="itemUser.password" :class="{'is-invalid': validationStatus($v.itemUser.password)}" />
									<div v-if="!$v.itemUser.password.required"
										class="invalid-feedback">
										Password harus diisi
									</div>
								</div>
							</div>
                            <div class="row mb-3">
								<div class="col-md-2">
									<label for="role" class="col-form-label">Manpower<span class="text-danger"> *</span></label>
								</div>
								<div class="col-md-5">
									<select class="form-control" aria-label="Default select example"
										v-model="itemUser.karyawanId" :class="{
											'is-invalid': validationStatus(
												$v.itemUser.karyawanId
											),
										}">
										<option v-for="dm in dataManpower" :key="dm.karyawanId"
											:value="dm.karyawanId">
											{{ dm.namaManpower }}
										</option>
									</select>
									<div v-if="!$v.itemUser.karyawanId.required"
										class="invalid-feedback">
										Manpower harus diisi
									</div>
								</div>
							</div>
						<div class="row">
							<div class="col">
								<button type="button" class="btn btn-primary mr-2" @click="saveUser">
									<i class="fas fa-save"></i>
									Simpan
								</button>
								<!-- <button type="button" class="btn btn-secondary" @click="tutupFormTambah">
									<i class="fas fa-undo"></i>
									Tutup
								</button> -->
							</div>
						</div>
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
	name: "TambahUserManpower",
	data() {
        return {
			itemUser: {
				username: '',
				password: '',
				karyawanId: null,
				id: ''
			},

            dataManpower: [],
		};
	},

	validations: {
		itemUser: {
			username: { required },
			password: { required },
			karyawanId: { required },
		}, 
	},

	mounted() {
		this.getAllKaryawanBelumPunyaUser();
	},

	created() {
		this.getAllKaryawanBelumPunyaUser();
	},

	methods: {
		validationStatus: function (validation) {
			return typeof validation != "undefined" ? validation.$error : false;
        },

        tutupFormTambah() {
			this.showFormTambah = false
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

				this.$eventBus.$emit("dataUser", this.getAllUser());
                await this.getAllUser();
                await this.getAllKaryawanBelumPunyaUser();
                
				this.itemUser.username = ''
				this.itemUser.password = ''
				this.itemUser.karyawanId = null
				
				this.$nextTick(() => { this.$v.$reset() })
				
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

	},
};
</script>