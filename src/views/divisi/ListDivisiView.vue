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
							<router-link class="btn btn-primary" to="/divisi/tambah">
								<i class="fas fa-solid fa-plus-circle"></i>
								Tambah Data Divisi
							</router-link>
						</div>
					</div>
					<div class="row mt-3 mb-4">
						<div class="col">
							<div class="card card-outline card-primary">
								<div class="row">
									<div class="col"></div>
									<div class="col tab-judul">
										<h5>Data Divisi</h5>
									</div>
									<div class="col"></div>
								</div>
								<div class="card-body pad table-responsive">
									<div class="table-responsive">
										<table class="table table-bordered table-hover">
											<thead class="header-tabel">
												<tr>
													<th class="align-middle" scope="col" style="width: 5%">No</th>
													<th class="align-middle" scope="col">Nama Divisi</th>
													<th class="align-middle" scope="col"></th>
												</tr>
											</thead>
											<tbody>
												<tr v-for="divisi in itemDivisi" :key="divisi.id">
													<td>{{ divisi.no }}</td>
													<td>{{ divisi.namaDivisi }}</td>
													<td class="tombol">
														<router-link class="btn btn-sm btn-warning" :to="{
															name: 'edit-divisi',
															params: { id: divisi.id },
														}">
															<i class="fas fa-solid fa-pen"></i>
														</router-link>
														<button type="button" class="btn btn-sm btn-danger"
															@click.prevent="deleteDivisi(divisi.id)">
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
	name: "ListDivisiView",
	data() {
		return {
			itemDivisi: [],
		};
	},

	mounted() {
		this.getAllDivisi();
	},

	created() {
		this.getAllDivisi();
	},

	methods: {
		async getAllDivisi() {
			let dataToken = localStorage.getItem('token')
			try {
				const dataDivisi = await axios.get(
					`${ipBackend}/divisi/list`, {
					headers: {
						token: dataToken
					}
				}
				);
				let result = dataDivisi.data.data;
				for (let i = 0; i < result.length; i++) {
					result[i].no = i + 1
				}
				this.itemDivisi = result
			} catch (error) {
				console.log(error);
			}
		},

		async deleteDivisi(id) {
			try {
				let dataToken = localStorage.getItem('token')
				const dataDivisi = await axios.get(
					`${ipBackend}/divisi/detailsById/${id}`, {
					headers: {
						token: dataToken
					}
				}
				);
				this.$swal({
					title: "Peringatan !",
					text: "Apakah anda yakin akan menghapus data " + dataDivisi.data.data[0].namaDivisi + "?",
					icon: "warning",
					showCancelButton: true,
					confirmButtonColor: "#3085d6",
					cancelButtonColor: "#d33",
					confirmButtonText: "Ya, hapus!",
				}).then(async (hasil) => {
					if (hasil.isConfirmed == true) {
						await axios.post(`${ipBackend}/divisi/delete`, { id }, {
							headers: {
								token: dataToken
							}
						});
						this.$swal({
							icon: "success",
							title: "Sukses",
							text: "Data divisi berhasil dihapus",
							showConfirmButton: false,
							timer: 1500,
						});
					}
					this.getAllDivisi();
				});
			} catch (error) {
				console.log(error);
			}
		},
	},
};
</script>


<style></style>