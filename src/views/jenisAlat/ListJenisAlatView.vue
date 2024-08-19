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
                            <router-link class="btn btn-primary" to="/jenis-alat/tambah">
                            <i class="fas fa-solid fa-plus-circle"></i>
                            Tambah Data Jenis Alat
                            </router-link>
                        </div>
                    </div>
					<div class="row mt-3 mb-4">
						<div class="col">
							<div class="card card-outline card-primary">
								<div class="row">
									<div class="col"></div>
									<div class="col tab-judul">
										<h5>Data Jenis Alat</h5>
									</div>
									<div class="col"></div>
								</div>
								<div class="card-body pad table-responsive">
									<div class="table-responsive">
										<table class="table table-bordered table-hover">
											<thead class="header-tabel">
												<tr>
													<th class="align-middle" scope="col" style="width: 5%">No</th>
													<th class="align-middle" scope="col">Nama Jenis Alat</th>
													<th class="align-middle" scope="col"></th>
												</tr>
											</thead>
											<tbody>
												<tr v-for="rowJenisAlat in itemJenisAlat" :key="rowJenisAlat.id">
													<td>{{ rowJenisAlat.no }}</td>
													<td>{{ rowJenisAlat.namaJenisAlat }}</td>
													<td class="tombol">
														<router-link class="btn btn-sm btn-warning" :to="{
															name: 'edit-jenis-alat',
															params: { id: rowJenisAlat.id },
														}">
															<i class="fas fa-solid fa-pen"></i>
														</router-link>
														<button type="button" class="btn btn-sm btn-danger"
															@click.prevent="deleteJenisAlat(rowJenisAlat.id)">
															<i class="fas fa-trash" style="color: white"></i>
														</button>
													</td>
												</tr>
											</tbody>
										</table>
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
export default {
	name: "ListJenisAlatView",
	data() {
		return {
			itemJenisAlat: [],
		};
	},

	mounted() {
		this.getAllJenisAlat();
	},

	created() {
		this.getAllJenisAlat();
	},

	methods: {
		async getAllJenisAlat() {
			let dataToken = localStorage.getItem('token')
			try {
				const dataJenisAlat = await axios.get(
					`${ipBackend}/jenis-alat/list`, {
					headers: {
						token: dataToken
					}
				}
				);
				let result = dataJenisAlat.data.data;
				for (let i = 0; i < result.length; i++) {
					result[i].no = i + 1
				}
				this.itemJenisAlat = result
			} catch (error) {
				console.log(error);
			}
		},

		async deleteJenisAlat(id) {
			try {
				let dataToken = localStorage.getItem('token')
				const dataJenisAlat = await axios.get(
					`${ipBackend}/jenis-alat/detailsById/${id}`, {
					headers: {
						token: dataToken
					}
				}
				);
				this.$swal({
					title: "Peringatan !",
					text: "Apakah anda yakin akan menghapus data " + dataJenisAlat.data.data[0].namaJenisAlat + "?",
					icon: "warning",
					showCancelButton: true,
					confirmButtonColor: "#3085d6",
					cancelButtonColor: "#d33",
					confirmButtonText: "Ya, hapus!",
				}).then(async (hasil) => {
					if (hasil.isConfirmed == true) {
						await axios.post(`${ipBackend}/jenis-alat/delete`, { id }, {
							headers: {
								token: dataToken
							}
						});
						this.$swal({
							icon: "success",
							title: "Sukses",
							text: "Data jenis alat berhasil dihapus",
							showConfirmButton: false,
							timer: 1500,
						});
					}
					this.getAllJenisAlat();
				});
			} catch (error) {
				console.log(error);
			}
		},
	},
};
</script>


<style></style>