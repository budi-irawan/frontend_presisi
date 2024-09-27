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
							<div class="card">
								<div class="card-header">
									<h3 class="card-title">
                                        <i class="fas fa-solid fa-layer-group mr-3"></i>
                                        <b>Data Part</b>
									</h3>
								</div>
								<div class="card-body">
									<div class="row">
										<div class="col">
											<tambah-part-name />
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
import TambahPartName from '@/components/TambahPartName.vue';
export default {
  components: { TambahPartName },
	name: "ListPartView",
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