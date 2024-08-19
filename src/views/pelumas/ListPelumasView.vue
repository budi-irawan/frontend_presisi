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
									<i class="fas fa-solid fa-street-view mr-3"></i>
									<b>Data Pelumas</b>
									</h3>
								</div>
								<div class="card-body pad table-responsive">
									<div class="row">
										<div class="col">
											<ul class="nav nav-tabs" id="custom-content-below-tab" role="tablist">
												<li class="nav-item">
													<a class="nav-link active text-secondary" id="custom-content-below-home-tab"
														data-toggle="pill" href="#custom-content-below-home" role="tab"
														aria-controls="custom-content-below-home" aria-selected="true"
														style="font-weight: 600">Pelumas</a>
												</li>
												<li class="nav-item">
													<a class="nav-link text-secondary" id="custom-content-below-profile-tab"
														data-toggle="pill" href="#custom-content-below-profile"
														role="tab" aria-controls="custom-content-below-profile"
														aria-selected="false" style="font-weight: 600">Jenis Pelumas</a>
												</li>
											</ul>
											<div class="tab-content" id="custom-content-below-tabContent">
												<div class="tab-pane fade show active" id="custom-content-below-home" role="tabpanel" aria-labelledby="custom-content-below-home-tab">
													<tambah-pelumas />
												</div>
												<div class="tab-pane fade" id="custom-content-below-profile" role="tabpanel" aria-labelledby="custom-content-below-profile-tab">
													<tambah-jenis-pelumas />
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
import TambahJenisPelumas from '@/components/TambahJenisPelumas.vue';
import TambahPelumas from '@/components/TambahPelumas.vue';
export default {
  components: { TambahJenisPelumas, TambahPelumas },
	name: "ListPelumasView",
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