<template>
	<div>
		<app-nav-bar />
		<app-side-bar />
		<div class="content-wrapper">
			<router-view />
			<section class="content">
				<div class="container-fluid pt-3">
					
					<div class="row mb-4">
						<div class="col">
							<div class="card shadow-lg">
								<div class="card-header">
									<h3 class="card-title">
									<i class="fas fa-solid fa-layer-group mr-3"></i>
									<b>Data Unit</b>
									</h3>
								</div>
								<div class="card-body">
									<div class="row">
										<div class="col">
											<ul class="nav nav-tabs" id="custom-content-below-tab" role="tablist">
												<li class="nav-item">
													<a class="nav-link active text-secondary" id="custom-content-below-home-tab"
														data-toggle="pill" href="#custom-content-below-home" role="tab"
														aria-controls="custom-content-below-home" aria-selected="true"
														style="font-weight: 600">Unit</a>
												</li>
												<li class="nav-item">
													<a class="nav-link text-secondary" id="custom-content-below-profile-tab"
														data-toggle="pill" href="#custom-content-below-profile"
														role="tab" aria-controls="custom-content-below-profile"
														aria-selected="false" style="font-weight: 600">Jenis Alat</a>
												</li>
												<li class="nav-item">
													<a class="nav-link text-secondary" id="custom-content-below-type-tab"
														data-toggle="pill" href="#custom-content-below-type"
														role="tab" aria-controls="custom-content-below-type"
														aria-selected="false" style="font-weight: 600">Type</a>
												</li>
												<li class="nav-item">
													<a class="nav-link text-secondary" id="custom-content-below-merk-tab"
														data-toggle="pill" href="#custom-content-below-merk"
														role="tab" aria-controls="custom-content-below-merk"
														aria-selected="false" style="font-weight: 600">Merk</a>
												</li>
												<li class="nav-item">
													<a class="nav-link text-secondary" id="custom-content-below-lokasi-tab"
														data-toggle="pill" href="#custom-content-below-lokasi"
														role="tab" aria-controls="custom-content-below-lokasi"
														aria-selected="false" style="font-weight: 600">Lokasi</a>
												</li>
											</ul>
											<div class="tab-content" id="custom-content-below-tabContent">
												<div class="tab-pane fade show active" id="custom-content-below-home" role="tabpanel" aria-labelledby="custom-content-below-home-tab">
													<tambah-unit />
												</div>
												<div class="tab-pane fade" id="custom-content-below-profile" role="tabpanel" aria-labelledby="custom-content-below-profile-tab">
													<tambah-jenis-alat />
												</div>
												<div class="tab-pane fade" id="custom-content-below-type" role="tabpanel" aria-labelledby="custom-content-below-type-tab">
													<tambah-type />
												</div>
												<div class="tab-pane fade" id="custom-content-below-merk" role="tabpanel" aria-labelledby="custom-content-below-merk-tab">
													<tambah-merk />
												</div>
												<div class="tab-pane fade" id="custom-content-below-lokasi" role="tabpanel" aria-labelledby="custom-content-below-lokasi-tab">
													<tambah-lokasi />
												</div>
											</div>
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
import TambahUnit from '@/components/TambahUnit.vue';
import TambahJenisAlat from '@/components/TambahJenisAlat.vue';
import TambahType from '@/components/TambahType.vue';
import TambahMerk from '@/components/TambahMerk.vue';
import TambahLokasi from '@/components/TambahLokasi.vue';
export default {
  components: { TambahUnit, TambahJenisAlat, TambahType, TambahMerk, TambahLokasi },
	name: "ListUnitView",
	data() {
		return {
			
		};
	},
	methods: {
		
	},
};
</script>


<style>
.action-icon {
  display: inline-block;
  cursor: pointer;
}
</style>